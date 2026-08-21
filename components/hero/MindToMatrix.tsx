"use client";

/**
 * "Mind to Matrix" — the hero WebGL sequence.
 *
 * Four scroll-driven stages across the 420vh `#hero-scroll` section:
 *
 *   0  chessboard        a single tactical knight move, played autonomously
 *   1  particle dissolve  the board comes apart from the landing impact
 *   2  notebook           the dust settles into a drafted manuscript spread
 *   3  matrix + reveal    the ink snaps into code rain, then the camera pulls back
 *
 * One `WebGPURenderer` drives everything; it falls back to its own WebGL2
 * backend when `navigator.gpu` is absent, which is why every material here is
 * a TSL node material rather than a GLSL `ShaderMaterial`.
 *
 * One particle system carries all four stages: per-particle target positions
 * for board / notebook / matrix live in static instanced attributes and are
 * blended inside `positionNode`, so nothing is rebuilt per frame and React
 * state is never touched outside of integer stage changes.
 */

import { useEffect, useRef } from "react";
import type { JSX } from "react";

import * as THREE from "three/webgpu";
import {
  cameraPosition,
  color,
  cos,
  float,
  floor,
  fract,
  instancedBufferAttribute,
  length,
  mix,
  mod,
  pow,
  sin,
  smoothstep,
  texture,
  time,
  uniform,
  uv,
  varying,
  vec2,
  vec3,
} from "three/tsl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { manuscriptFragments } from "@/lib/data";
import {
  BOARD_OPACITY,
  INK_OPACITY,
  KNIGHT_HEAD,
  KNIGHT_MOVE,
  PAGE_OPACITY,
  PARTICLE_OPACITY,
  PARTICLE_SIZE,
  PIECES,
  SCENE_FADE,
  TILE_SIZE,
  TILE_THICKNESS,
  boardTiles,
  buildParticleBuffers,
  envelope,
  latheProfile,
  pageSurfacePoint,
  pageTexCoord,
  sampleCamera,
  squareToWorld,
  stageForProgress,
  type CameraSample,
  type PieceKind,
} from "./sequence";
import {
  createDotTexture,
  createGlyphAtlas,
  createManuscriptTexture,
} from "./textures";

/* ------------------------------------------------------------------ *
 * Public contract
 * ------------------------------------------------------------------ */

export type HeroStage = 0 | 1 | 2 | 3;

export interface MindToMatrixProps {
  onStageChange?: (stage: HeroStage) => void;
  /** Fires once the first frame has actually rendered — or once we know it never will. */
  onReady?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ *
 * Chiaroscuro palette
 * ------------------------------------------------------------------ */

const GROUND = 0x0a0a0c;
const IVORY = 0xede4d3;
const IVORY_DIM = 0x8d867a;
const GOLD = 0xc8a45c;
const GOLD_HOT = 0xe8d3a2;
const TILE_LIGHT = 0x6f6757;
const TILE_DARK = 0x14141a;
const PIECE_IVORY = 0xb9ae98;
const PIECE_CHARCOAL = 0x1b1b21;

/** Reduced-motion viewers get this single composed frame and nothing else. */
const STATIC_PROGRESS = 0.6;

export default function MindToMatrix(props: MindToMatrixProps): JSX.Element {
  const { className } = props;

  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Callbacks live in refs so the GPU effect never re-runs when the parent
  // re-renders with fresh closures.
  const onStageChangeRef = useRef(props.onStageChange);
  const onReadyRef = useRef(props.onReady);
  onStageChangeRef.current = props.onStageChange;
  onReadyRef.current = props.onReady;

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (host === null || canvas === null) return;

    let disposed = false;

    /* -- teardown registry ----------------------------------------- */
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];
    const teardown: Array<() => void> = [];

    let renderer: THREE.WebGPURenderer | null = null;
    let readyFired = false;

    const fireReady = (): void => {
      if (readyFired) return;
      readyFired = true;
      onReadyRef.current?.();
    };

    const releaseResources = (): void => {
      for (const fn of teardown.splice(0)) {
        try {
          fn();
        } catch {
          /* teardown must never throw during unmount */
        }
      }
      for (const geometry of geometries.splice(0)) geometry.dispose();
      for (const material of materials.splice(0)) material.dispose();
      for (const map of textures.splice(0)) map.dispose();
      if (renderer !== null) {
        renderer.dispose();
        renderer = null;
      }
    };

    /* -- capability probes ----------------------------------------- */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lowPower =
      coarsePointer ||
      window.innerWidth < 820 ||
      (navigator.hardwareConcurrency ?? 8) <= 4;

    const particleCount = lowPower ? 7000 : 18000;
    const maxPixelRatio = lowPower ? 1.5 : 2;

    void (async () => {
      /* ---------------------------------------------------------- *
       * Textures
       * ---------------------------------------------------------- */
      let dotMap: THREE.CanvasTexture;
      let atlas: ReturnType<typeof createGlyphAtlas>;
      let paperMap: THREE.CanvasTexture;
      let inkMap: THREE.CanvasTexture;

      try {
        dotMap = createDotTexture(lowPower ? 64 : 128);
        atlas = createGlyphAtlas(lowPower ? 48 : 64);
        const spread = createManuscriptTexture(
          manuscriptFragments,
          lowPower ? { width: 1024, height: 512 } : {},
        );
        paperMap = spread.paper;
        inkMap = spread.ink;
        textures.push(dotMap, atlas.texture, paperMap, inkMap);
      } catch {
        // No 2D canvas: the poster underneath is the whole experience.
        releaseResources();
        fireReady();
        return;
      }

      if (disposed) {
        releaseResources();
        return;
      }

      /* ---------------------------------------------------------- *
       * Renderer — WebGPU, falling back to WebGL2 automatically
       * ---------------------------------------------------------- */
      try {
        renderer = new THREE.WebGPURenderer({
          canvas,
          alpha: true,
          antialias: !lowPower,
          powerPreference: "high-performance",
        });
        await renderer.init();
      } catch {
        // No WebGPU adapter and no WebGL2 context. Bail out cleanly: the
        // wrapper keeps its CSS poster and the page never sees a black hole.
        releaseResources();
        fireReady();
        return;
      }

      if (disposed || renderer === null) {
        releaseResources();
        return;
      }

      const gpu = renderer;
      gpu.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
      gpu.setClearColor(GROUND, 1);
      gpu.toneMapping = THREE.ACESFilmicToneMapping;
      gpu.toneMappingExposure = 1.05;
      gpu.outputColorSpace = THREE.SRGBColorSpace;

      /* ---------------------------------------------------------- *
       * Scene, camera, single warm key light
       * ---------------------------------------------------------- */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 220);
      scene.add(camera);

      const ambient = new THREE.AmbientLight(0x6a6152, 0.14);
      const key = new THREE.DirectionalLight(0xf3e6cd, 2.1);
      key.position.set(-5.4, 8.2, 5.6);
      const candle = new THREE.PointLight(0xffcf8a, 26, 22, 2.05);
      candle.position.set(2.5, 3.1, 3.4);
      const rim = new THREE.DirectionalLight(0xcfc4ad, 0.28);
      rim.position.set(3.6, 2.4, -6.5);
      scene.add(ambient, key, candle, rim);
      teardown.push(() => {
        ambient.dispose();
        key.dispose();
        candle.dispose();
        rim.dispose();
      });

      /* ---------------------------------------------------------- *
       * Uniforms — every per-frame value the GPU needs
       * ---------------------------------------------------------- */
      const uProgress = uniform(0);
      const uParticleAlpha = uniform(0);
      const uParticleSize = uniform(0.055);
      const uSceneFade = uniform(1);
      const uImpact = uniform(0);
      const uBoardOpacity = uniform(1);
      const uPageOpacity = uniform(0);
      const uInk = uniform(0);

      /* ---------------------------------------------------------- *
       * Stage 0 — the board
       * ---------------------------------------------------------- */
      const boardGroup = new THREE.Group();
      scene.add(boardGroup);

      const makeSurface = (
        hex: number,
        roughness: number,
        metalness: number,
      ): THREE.MeshStandardNodeMaterial => {
        const material = new THREE.MeshStandardNodeMaterial({
          color: hex,
          roughness,
          metalness,
          transparent: true,
        });
        material.opacityNode = uBoardOpacity;
        materials.push(material);
        return material;
      };

      const lightTileMaterial = makeSurface(TILE_LIGHT, 0.62, 0.04);
      const darkTileMaterial = makeSurface(TILE_DARK, 0.48, 0.1);
      const frameMaterial = makeSurface(0x0f0f13, 0.72, 0.06);
      const groundMaterial = makeSurface(0x070709, 0.96, 0);
      const ivoryPieceMaterial = makeSurface(PIECE_IVORY, 0.55, 0.05);
      const charcoalPieceMaterial = makeSurface(PIECE_CHARCOAL, 0.44, 0.12);

      const tileGeometry = new THREE.BoxGeometry(
        TILE_SIZE * 0.955,
        TILE_THICKNESS,
        TILE_SIZE * 0.955,
      );
      geometries.push(tileGeometry);

      const tiles = boardTiles();
      const lightTiles = tiles.filter((tile) => !tile.dark);
      const darkTiles = tiles.filter((tile) => tile.dark);

      const lightMesh = new THREE.InstancedMesh(
        tileGeometry,
        lightTileMaterial,
        lightTiles.length,
      );
      const darkMesh = new THREE.InstancedMesh(
        tileGeometry,
        darkTileMaterial,
        darkTiles.length,
      );
      lightMesh.frustumCulled = false;
      darkMesh.frustumCulled = false;
      boardGroup.add(lightMesh, darkMesh);
      teardown.push(() => {
        lightMesh.dispose();
        darkMesh.dispose();
      });

      // Ripple state: the only thing that ever rewrites instance matrices, and
      // only while the knight's landing shock is still ringing.
      const scratchMatrix = new THREE.Matrix4();
      const scratchPosition = new THREE.Vector3();
      const scratchQuaternion = new THREE.Quaternion();
      const scratchScale = new THREE.Vector3(1, 1, 1);
      const impactOrigin = squareToWorld(KNIGHT_MOVE.to);

      const writeTiles = (strength: number, elapsed: number): void => {
        for (const [mesh, cells] of [
          [lightMesh, lightTiles],
          [darkMesh, darkTiles],
        ] as const) {
          for (let i = 0; i < cells.length; i++) {
            const cell = cells[i]!;
            let y = 0;
            if (strength > 0) {
              const d = Math.hypot(cell.x - impactOrigin.x, cell.z - impactOrigin.z);
              y =
                Math.sin(d * 2.6 - elapsed * 9) *
                Math.exp(-d * 0.5) *
                strength *
                0.085;
            }
            scratchPosition.set(cell.x, y, cell.z);
            scratchMatrix.compose(scratchPosition, scratchQuaternion, scratchScale);
            mesh.setMatrixAt(i, scratchMatrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
        }
      };
      writeTiles(0, 0);

      const frameGeometry = new THREE.BoxGeometry(9.05, 0.36, 9.05);
      geometries.push(frameGeometry);
      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
      frameMesh.position.set(0, -0.185, 0);
      boardGroup.add(frameMesh);

      const groundGeometry = new THREE.PlaneGeometry(80, 80);
      geometries.push(groundGeometry);
      const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      groundMesh.rotation.set(-Math.PI / 2, 0, 0);
      groundMesh.position.set(0, -0.37, 0);
      boardGroup.add(groundMesh);

      /* ---- pieces ------------------------------------------------ */
      const latheCache = new Map<PieceKind, THREE.LatheGeometry>();
      const latheFor = (kind: PieceKind): THREE.LatheGeometry => {
        const cached = latheCache.get(kind);
        if (cached !== undefined) return cached;
        const points = latheProfile(kind).map(([r, y]) => new THREE.Vector2(r, y));
        const geometry = new THREE.LatheGeometry(points, 22);
        geometry.computeVertexNormals();
        latheCache.set(kind, geometry);
        geometries.push(geometry);
        return geometry;
      };

      // The knight's head, extruded from a silhouette rather than boxed: it is
      // the piece the opening beat is about, so it has to read as a knight from
      // the camera's single angle. Shape space is (forward, up); the extrusion
      // axis is rotated onto world X so the thickness runs across the board.
      const headShape = new THREE.Shape();
      const headOutline: Array<[number, number]> = [
        [-0.15, -0.26], [0.10, -0.26], [0.15, -0.14], [0.17, -0.02],
        [0.21, 0.05], [0.19, 0.12], [0.11, 0.16], [0.05, 0.17],
        [0.035, 0.30], [-0.035, 0.16], [-0.075, 0.25], [-0.10, 0.11],
        [-0.15, 0.02],
      ];
      headShape.moveTo(headOutline[0]![0], headOutline[0]![1]);
      for (const [x, y] of headOutline.slice(1)) headShape.lineTo(x, y);
      headShape.closePath();

      const knightHeadGeometry = new THREE.ExtrudeGeometry(headShape, {
        depth: KNIGHT_HEAD.half[0] * 1.7,
        bevelEnabled: true,
        bevelThickness: 0.012,
        bevelSize: 0.012,
        bevelSegments: 2,
        curveSegments: 1,
      });
      knightHeadGeometry.translate(0, 0, -KNIGHT_HEAD.half[0] * 0.85);
      knightHeadGeometry.rotateY(-Math.PI / 2);
      knightHeadGeometry.computeVertexNormals();
      geometries.push(knightHeadGeometry);

      let knightGroup: THREE.Group | null = null;
      for (const piece of PIECES) {
        const group = new THREE.Group();
        const square = squareToWorld(piece.square);
        group.position.set(square.x, TILE_THICKNESS * 0.5, square.z);
        group.rotation.set(0, (piece.square.charCodeAt(0) % 5) * 0.31, 0);

        const material =
          piece.side === "ivory" ? ivoryPieceMaterial : charcoalPieceMaterial;
        group.add(new THREE.Mesh(latheFor(piece.kind), material));

        if (piece.kind === "knight") {
          const head = new THREE.Mesh(knightHeadGeometry, material);
          head.position.set(...KNIGHT_HEAD.center);
          head.rotation.set(KNIGHT_HEAD.tiltX, 0, 0);
          group.add(head);
          knightGroup = group;
        }

        boardGroup.add(group);
      }

      /* ---------------------------------------------------------- *
       * Stage 2 — the notebook pages
       * ---------------------------------------------------------- */
      const pageGroup = new THREE.Group();
      pageGroup.visible = false;
      scene.add(pageGroup);

      const pageMaterial = new THREE.MeshStandardNodeMaterial({
        roughness: 0.94,
        metalness: 0,
        transparent: true,
        side: THREE.DoubleSide,
      });
      materials.push(pageMaterial);
      {
        const pageUv = uv();
        const paperSample = texture(paperMap, pageUv);
        const inkSample = texture(inkMap, pageUv);
        const inkColor = vec3(0.055, 0.048, 0.038);
        const surface = mix(paperSample.rgb, inkColor, inkSample.a.mul(uInk));
        pageMaterial.colorNode = surface;
        // A touch of self-illumination so the manuscript stays legible under a
        // single key light without flattening the falloff.
        pageMaterial.emissiveNode = surface.mul(0.11);
        pageMaterial.opacityNode = uPageOpacity;
      }

      const buildPage = (side: -1 | 1): THREE.PlaneGeometry => {
        const geometry = new THREE.PlaneGeometry(1, 1, 26, 34);
        const position = geometry.getAttribute("position");
        const uvAttribute = geometry.getAttribute("uv");
        if (position !== undefined && uvAttribute !== undefined) {
          const point: [number, number, number] = [0, 0, 0];
          for (let i = 0; i < position.count; i++) {
            const u = uvAttribute.getX(i);
            const v = uvAttribute.getY(i);
            pageSurfacePoint(side, u, v, point);
            position.setXYZ(i, point[0], point[1], point[2]);
            const [tu, tv] = pageTexCoord(side, u, v);
            uvAttribute.setXY(i, tu, tv);
          }
          position.needsUpdate = true;
          uvAttribute.needsUpdate = true;
        }
        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();
        geometries.push(geometry);
        return geometry;
      };

      pageGroup.add(
        new THREE.Mesh(buildPage(-1), pageMaterial),
        new THREE.Mesh(buildPage(1), pageMaterial),
      );

      /* ---------------------------------------------------------- *
       * The particle system — one cloud, four target sets
       * ---------------------------------------------------------- */
      const buffers = buildParticleBuffers({
        count: particleCount,
        glyphCount: atlas.count,
        impactSquare: KNIGHT_MOVE.to,
      });

      // `instancedBufferAttribute` hands back a bare Node; wrapping it in the
      // matching vector constructor is a no-op on the GPU but restores the
      // fluent swizzle/operator surface the morph below is written against.
      // The node type has to be given explicitly: inferred from the argument
      // it widens to `string`, which drops the fluent swizzle/operator surface
      // the morph below is written against.
      const attribute3 = (data: Float32Array) =>
        instancedBufferAttribute<"vec3">(
          new THREE.InstancedBufferAttribute(data, 3),
          "vec3",
        );
      const attribute4 = (data: Float32Array) =>
        instancedBufferAttribute<"vec4">(
          new THREE.InstancedBufferAttribute(data, 4),
          "vec4",
        );

      const aBoard = attribute3(buffers.board);
      const aBurst = attribute3(buffers.burst);
      const aNote = attribute3(buffers.note);
      const aMatrix = attribute3(buffers.matrix);
      // (seed, columnSpeed, glyphIndex, sizeMultiplier)
      const aRand = attribute4(buffers.rand);
      // (headness, boardTone, inkMask, glyphChurnRate)
      const aMeta = attribute4(buffers.meta);

      // Stage weights. Every one is a clamped smoothstep of scroll progress, so
      // the whole morph is a pure function of a single uniform.
      const wBurst = smoothstep(0.165, 0.4, uProgress);
      const wNote = smoothstep(0.285, 0.545, uProgress);
      const wMatrix = smoothstep(0.605, 0.8, uProgress);
      const wGlyph = smoothstep(0.615, 0.665, uProgress);

      /* ---- position: board -> burst -> notebook -> matrix -------- */
      const burst2 = wBurst.mul(wBurst);
      const turbulence = vec3(
        sin(aBoard.z.mul(1.6).add(time.mul(0.55)).add(aRand.x.mul(6.2832))),
        cos(aBoard.x.mul(1.9).add(time.mul(0.42)).add(aRand.x.mul(3.1416))),
        sin(aBoard.x.mul(2.1).add(time.mul(0.63)).add(aRand.x.mul(4.7124))),
      ).mul(burst2.mul(0.8));

      const dissolved = aBoard
        .add(aBurst.mul(wBurst.mul(3.05)))
        .add(vec3(0, burst2.mul(-2.95), 0))
        .add(turbulence);

      const settled = aNote.add(
        vec3(
          0,
          0,
          sin(aNote.x.mul(2.4).add(aNote.y.mul(1.7)).add(time.mul(0.4))).mul(0.016),
        ),
      );

      const columnHeight = float(buffers.layout.columnHeight);
      const columnSpeed = aRand.y.mul(2.1).add(0.45).mul(wMatrix);
      const cascade = fract(
        aMatrix.y.sub(time.mul(columnSpeed)).div(columnHeight),
      )
        .mul(columnHeight)
        .sub(columnHeight.mul(0.5));
      const rained = vec3(aMatrix.x, cascade, aMatrix.z);

      const particlePosition = mix(
        mix(dissolved, settled, wNote),
        rained,
        wMatrix,
      );

      /* ---- glyph selection --------------------------------------- */
      const spriteUv = uv();
      // Inset the quad UV so bilinear filtering cannot bleed between atlas cells.
      const cellUv = spriteUv.mul(0.94).add(0.03);
      const columns = float(atlas.columns);
      const rows = float(atlas.rows);
      const glyphIndex = mod(
        aRand.z.add(floor(time.mul(aMeta.w))),
        float(atlas.count),
      );
      const glyphColumn = mod(glyphIndex, columns);
      const glyphRow = floor(glyphIndex.div(columns));
      const glyphUv = vec2(
        cellUv.x.add(glyphColumn).div(columns),
        // Canvas rows run top-down; the texture is flipped on upload.
        cellUv.y.add(rows.sub(1).sub(glyphRow)).div(rows),
      );

      const dotSample = texture(dotMap, spriteUv);
      const glyphSample = texture(atlas.texture, glyphUv);
      const coverage = mix(dotSample.a, glyphSample.a, wGlyph);

      /* ---- colour ------------------------------------------------ */
      const ivory = color(IVORY);
      const ivoryDim = color(IVORY_DIM);
      const gold = color(GOLD);
      const goldHot = color(GOLD_HOT);

      const headness = aMeta.x;
      const dust = mix(ivoryDim, ivory, aMeta.y);
      const inked = mix(dust, gold, aMeta.z.mul(0.5));
      const beforeMatrix = mix(dust, inked, wNote);
      const rain = mix(ivory.mul(0.42), goldHot, pow(headness, float(4))).add(
        gold.mul(pow(headness, float(14)).mul(0.55)),
      );

      const tint = mix(beforeMatrix, rain, wGlyph);
      const brightness = mix(
        float(0.62).add(uImpact.mul(0.85)),
        float(0.26).add(pow(headness, float(3)).mul(1.45)),
        wGlyph,
      );

      // Depth falloff, evaluated once in the vertex stage. The sprite sits at
      // the origin with an identity transform, so local space is world space.
      const viewDistance = varying(
        length(particlePosition.sub(cameraPosition)),
        "vHeroDepth",
      );
      const depthFalloff = float(1).sub(
        smoothstep(float(9), float(46), viewDistance).mul(0.82),
      );

      const particleMaterial = new THREE.PointsNodeMaterial({
        transparent: true,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        toneMapped: true,
      });
      materials.push(particleMaterial);
      particleMaterial.positionNode = particlePosition;
      particleMaterial.sizeNode = aRand.w
        .mul(uParticleSize)
        .mul(float(1).add(headness.mul(wGlyph).mul(0.4)));
      particleMaterial.colorNode = tint.mul(brightness).mul(depthFalloff);
      particleMaterial.opacityNode = coverage
        .mul(uParticleAlpha)
        .mul(uSceneFade);

      // `Sprite` + instancing rather than `Points`: the WebGPU backend can only
      // draw 1px point primitives, so sized sprites are the one code path that
      // works on both backends.
      const particles = new THREE.Sprite(particleMaterial);
      particles.count = buffers.count;
      particles.frustumCulled = false;
      particles.renderOrder = 2;
      scene.add(particles);

      /* ---------------------------------------------------------- *
       * Resize
       * ---------------------------------------------------------- */
      const applySize = (): void => {
        const width = Math.max(1, host.clientWidth || window.innerWidth);
        const heightPx = Math.max(1, host.clientHeight || window.innerHeight);
        gpu.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
        gpu.setSize(width, heightPx, false);
        camera.aspect = width / heightPx;
        camera.updateProjectionMatrix();
      };
      applySize();

      const resizeObserver = new ResizeObserver(applySize);
      resizeObserver.observe(host);
      teardown.push(() => resizeObserver.disconnect());

      /* ---------------------------------------------------------- *
       * Frame
       * ---------------------------------------------------------- */
      const cameraSample: CameraSample = {
        position: [0, 0, 0],
        target: [0, 0, 0],
        fov: 38,
      };
      const lookTarget = new THREE.Vector3();
      const impactState = { value: 0 };
      const scrollState = { progress: 0 };
      let lastStage: HeroStage = 0;
      let lastFov = -1;
      let rippleActive = false;

      const applyProgress = (next: number): void => {
        const p = next < 0 ? 0 : next > 1 ? 1 : next;
        scrollState.progress = p;
        uProgress.value = p;
        uParticleAlpha.value = envelope(PARTICLE_OPACITY, p);
        uParticleSize.value = envelope(PARTICLE_SIZE, p);
        uSceneFade.value = envelope(SCENE_FADE, p);
        uBoardOpacity.value = envelope(BOARD_OPACITY, p);
        uPageOpacity.value = envelope(PAGE_OPACITY, p);
        uInk.value = envelope(INK_OPACITY, p);
      };
      applyProgress(0);

      const renderFrame = (elapsedMs: number): void => {
        if (disposed) return;
        const elapsed = elapsedMs * 0.001;
        const p = scrollState.progress;

        /* camera: keyframed dolly plus a drift that damps out by stage 1 */
        sampleCamera(p, cameraSample);
        const drift = 1 - Math.min(1, Math.max(0, (p - 0.1) / 0.26));
        camera.position.set(
          cameraSample.position[0] + Math.sin(elapsed * 0.21) * 0.5 * drift,
          cameraSample.position[1] + Math.sin(elapsed * 0.17 + 1.1) * 0.2 * drift,
          cameraSample.position[2] + Math.cos(elapsed * 0.13) * 0.32 * drift,
        );
        lookTarget.set(
          cameraSample.target[0],
          cameraSample.target[1],
          cameraSample.target[2],
        );
        camera.lookAt(lookTarget);
        if (Math.abs(cameraSample.fov - lastFov) > 0.002) {
          lastFov = cameraSample.fov;
          camera.fov = cameraSample.fov;
          camera.updateProjectionMatrix();
        }

        /* the key light breathes with the candle, and flares on impact */
        uImpact.value = impactState.value;
        candle.intensity = 26 + Math.sin(elapsed * 1.7) * 2.4 + impactState.value * 30;
        key.intensity = 2.1 + impactState.value * 0.8;

        /* landing shock ripple — CPU work only while it is ringing */
        if (impactState.value > 0.002) {
          writeTiles(impactState.value, elapsed);
          rippleActive = true;
        } else if (rippleActive) {
          writeTiles(0, elapsed);
          rippleActive = false;
        }

        boardGroup.visible = uBoardOpacity.value > 0.003;
        pageGroup.visible = uPageOpacity.value > 0.003;
        particles.visible = uParticleAlpha.value > 0.002;

        // Near the end the whole stage dissolves so the portfolio underneath
        // reads cleanly through the canvas.
        gpu.setClearColor(GROUND, uSceneFade.value);

        gpu.render(scene, camera);
        fireReady();

        const stage = stageForProgress(p);
        if (stage !== lastStage) {
          lastStage = stage;
          onStageChangeRef.current?.(stage);
        }
      };

      /* ---------------------------------------------------------- *
       * Reduced motion: one composed still, no loop, no ScrollTrigger
       * ---------------------------------------------------------- */
      if (prefersReducedMotion) {
        applyProgress(STATIC_PROGRESS);
        sampleCamera(STATIC_PROGRESS, cameraSample);
        camera.position.set(
          cameraSample.position[0],
          cameraSample.position[1],
          cameraSample.position[2],
        );
        camera.fov = cameraSample.fov;
        camera.updateProjectionMatrix();
        lookTarget.set(
          cameraSample.target[0],
          cameraSample.target[1],
          cameraSample.target[2],
        );
        camera.lookAt(lookTarget);
        boardGroup.visible = false;
        pageGroup.visible = true;
        gpu.setClearColor(GROUND, 1);
        gpu.render(scene, camera);
        // A second pass one tick later so any deferred texture upload lands.
        const settle = window.requestAnimationFrame(() => {
          if (disposed) return;
          gpu.render(scene, camera);
          fireReady();
        });
        teardown.push(() => window.cancelAnimationFrame(settle));
        fireReady();
        return;
      }

      /* ---------------------------------------------------------- *
       * Scroll driver
       * ---------------------------------------------------------- */
      gsap.registerPlugin(ScrollTrigger);

      const driver = { value: 0 };
      const scrubTween = gsap.to(driver, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-scroll",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: () => applyProgress(driver.value),
        },
        onUpdate: () => applyProgress(driver.value),
      });
      teardown.push(() => {
        scrubTween.scrollTrigger?.kill();
        scrubTween.kill();
      });

      /* ---------------------------------------------------------- *
       * Autonomous knight move — Ng1-f3, then the landing shock
       * ---------------------------------------------------------- */
      if (knightGroup !== null) {
        const knight = knightGroup;
        const destination = squareToWorld(KNIGHT_MOVE.to);
        const impactTween = gsap.timeline({ delay: 1.2 });
        impactTween
          .to(knight.position, { y: 1.05, duration: 0.4, ease: "power2.out" })
          .to(
            knight.position,
            { x: destination.x, z: destination.z, duration: 0.66, ease: "power1.inOut" },
            "<0.04",
          )
          .to(
            knight.rotation,
            { y: knight.rotation.y + 0.62, duration: 0.78, ease: "sine.inOut" },
            "<",
          )
          .to(knight.position, { y: TILE_THICKNESS * 0.5, duration: 0.3, ease: "power3.in" })
          .to(
            knight.scale,
            { x: 1.1, y: 0.84, z: 1.1, duration: 0.08, ease: "power2.out" },
            ">-0.01",
          )
          .add(() => {
            impactState.value = 1;
            gsap.to(impactState, { value: 0, duration: 1.15, ease: "power2.out" });
          }, "<")
          .to(knight.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.42)",
          });

        teardown.push(() => {
          impactTween.kill();
          gsap.killTweensOf(impactState);
          gsap.killTweensOf(knight.position);
          gsap.killTweensOf(knight.rotation);
          gsap.killTweensOf(knight.scale);
        });
      }

      /* ---------------------------------------------------------- *
       * Run / pause. `setAnimationLoop(null)` stops every render call;
       * the renderer's internal node-frame tick is all that remains.
       * ---------------------------------------------------------- */
      let running = false;
      let inView = true;
      let pageVisible = !document.hidden;

      const syncLoop = (): void => {
        const shouldRun = !disposed && inView && pageVisible;
        if (shouldRun === running) return;
        running = shouldRun;
        void gpu.setAnimationLoop(shouldRun ? renderFrame : null);
      };

      const onVisibility = (): void => {
        pageVisible = !document.hidden;
        syncLoop();
      };
      document.addEventListener("visibilitychange", onVisibility);
      teardown.push(() =>
        document.removeEventListener("visibilitychange", onVisibility),
      );

      const section = document.getElementById("hero-scroll") ?? host;
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) inView = entry.isIntersecting;
          syncLoop();
        },
        { rootMargin: "10% 0px" },
      );
      intersectionObserver.observe(section);
      teardown.push(() => intersectionObserver.disconnect());

      syncLoop();
      teardown.push(() => {
        void gpu.setAnimationLoop(null);
      });
    })();

    return () => {
      disposed = true;
      releaseResources();
    };
  }, []);

  return (
    <div ref={hostRef} className={"absolute inset-0 " + (className ?? "")}>
      <canvas ref={canvasRef} className="h-full w-full block" />
    </div>
  );
}
