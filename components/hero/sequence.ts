/**
 * Geometry and target-buffer construction for the "Mind to Matrix" hero.
 *
 * Everything in this module is a pure function of its arguments (plus a
 * deterministic seeded PRNG), so the same scene is produced on every mount and
 * nothing here touches the DOM, `window`, or a GPU. `MindToMatrix.tsx` feeds
 * the returned arrays straight into instanced attributes.
 *
 * Coordinate convention: +Y up, board lying in the XZ plane centred on the
 * origin, camera on +Z looking towards -Z.
 */

/* ------------------------------------------------------------------ *
 * Deterministic PRNG
 * ------------------------------------------------------------------ */

export type Rng = () => number;

/** mulberry32 — small, fast, and stable across engines. */
export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAU = Math.PI * 2;

/* ------------------------------------------------------------------ *
 * Board
 * ------------------------------------------------------------------ */

export const TILE_SIZE = 1;
export const TILE_THICKNESS = 0.17;
/** Half-extent of the playing surface: files/ranks span [-4, 4]. */

export interface TileCell {
  /** 0..7, a-file first. */
  file: number;
  /** 0..7, rank 1 first. */
  rank: number;
  x: number;
  z: number;
  /** `true` for the charcoal squares, `false` for the ivory ones. */
  dark: boolean;
}

/** The 64 board squares, in file-major order. */
export function boardTiles(): TileCell[] {
  const cells: TileCell[] = [];
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      cells.push({
        file,
        rank,
        x: (file - 3.5) * TILE_SIZE,
        z: (3.5 - rank) * TILE_SIZE,
        dark: (file + rank) % 2 === 0,
      });
    }
  }
  return cells;
}

/** `"g1"` -> world position of that square's centre on the board surface. */
export function squareToWorld(square: string): { x: number; z: number } {
  const file = square.charCodeAt(0) - 97;
  const rank = Number.parseInt(square.slice(1), 10) - 1;
  return { x: (file - 3.5) * TILE_SIZE, z: (3.5 - rank) * TILE_SIZE };
}

/* ------------------------------------------------------------------ *
 * Pieces
 * ------------------------------------------------------------------ */

export type PieceKind = "pawn" | "rook" | "bishop" | "queen" | "king" | "knight";
export type PieceSide = "ivory" | "charcoal";

export interface PiecePlacement {
  id: string;
  kind: PieceKind;
  side: PieceSide;
  /** Algebraic square the piece occupies when the scene is first composed. */
  square: string;
}

/**
 * A sparse late-middlegame position. Deliberately not a full 32-piece set:
 * the frame reads better with negative space, and fewer pieces means the
 * dissolve has recognisable silhouettes rather than a wall of dust.
 */
export const PIECES: readonly PiecePlacement[] = [
  { id: "i-king", kind: "king", side: "ivory", square: "e1" },
  { id: "i-rook", kind: "rook", side: "ivory", square: "a1" },
  { id: "i-knight", kind: "knight", side: "ivory", square: "g1" },
  { id: "i-pawn-d", kind: "pawn", side: "ivory", square: "d2" },
  { id: "i-pawn-e", kind: "pawn", side: "ivory", square: "e4" },
  { id: "i-pawn-f", kind: "pawn", side: "ivory", square: "f2" },
  { id: "i-pawn-h", kind: "pawn", side: "ivory", square: "h2" },
  { id: "c-king", kind: "king", side: "charcoal", square: "g8" },
  { id: "c-rook", kind: "rook", side: "charcoal", square: "d8" },
  { id: "c-bishop", kind: "bishop", side: "charcoal", square: "c6" },
  { id: "c-queen", kind: "queen", side: "charcoal", square: "d5" },
  { id: "c-pawn-a", kind: "pawn", side: "charcoal", square: "a7" },
  { id: "c-pawn-b", kind: "pawn", side: "charcoal", square: "b7" },
  { id: "c-pawn-g", kind: "pawn", side: "charcoal", square: "g7" },
];

/** The one tactical move the autonomous timeline plays: Ng1-f3. */
export const KNIGHT_MOVE = { pieceId: "i-knight", from: "g1", to: "f3" } as const;

/**
 * Lathe profiles as `[radius, height]` pairs, bottom to top. Fed to
 * `LatheGeometry` on the render side and sampled analytically here, so the
 * particle cloud and the mesh describe exactly the same solid.
 */
export function latheProfile(kind: PieceKind): Array<[number, number]> {
  switch (kind) {
    case "pawn":
      return [
        [0, 0], [0.27, 0], [0.28, 0.05], [0.22, 0.09], [0.13, 0.14],
        [0.11, 0.32], [0.16, 0.40], [0.10, 0.44], [0.15, 0.50],
        [0.15, 0.56], [0.09, 0.62], [0, 0.66],
      ];
    case "rook":
      return [
        [0, 0], [0.31, 0], [0.32, 0.06], [0.25, 0.10], [0.18, 0.16],
        [0.17, 0.55], [0.24, 0.60], [0.26, 0.72], [0.20, 0.74],
        [0.20, 0.80], [0, 0.80],
      ];
    case "bishop":
      return [
        [0, 0], [0.30, 0], [0.31, 0.06], [0.23, 0.10], [0.14, 0.16],
        [0.12, 0.52], [0.20, 0.60], [0.13, 0.66], [0.17, 0.74],
        [0.10, 0.86], [0.05, 0.94], [0.07, 0.99], [0, 1.02],
      ];
    case "queen":
      return [
        [0, 0], [0.34, 0], [0.35, 0.07], [0.26, 0.12], [0.16, 0.20],
        [0.13, 0.62], [0.24, 0.72], [0.16, 0.78], [0.22, 0.90],
        [0.20, 1.00], [0.08, 1.06], [0.11, 1.12], [0, 1.15],
      ];
    case "king":
      return [
        [0, 0], [0.36, 0], [0.37, 0.07], [0.28, 0.12], [0.17, 0.20],
        [0.14, 0.68], [0.25, 0.78], [0.17, 0.84], [0.22, 0.96],
        [0.14, 1.06], [0.06, 1.12], [0.06, 1.26], [0.13, 1.26],
        [0.13, 1.30], [0, 1.30],
      ];
    case "knight":
      // Base + neck only; the angled head is a separate low-poly wedge so the
      // silhouette reads as a knight instead of a bishop.
      return [
        [0, 0], [0.32, 0], [0.33, 0.06], [0.25, 0.11], [0.17, 0.18],
        [0.15, 0.42], [0.19, 0.50], [0.14, 0.56], [0, 0.58],
      ];
  }
}

/**
 * The knight's head, as an oriented box in the piece's local space:
 * `[centre, halfExtents, tiltXRadians]`.
 */
export const KNIGHT_HEAD = {
  center: [0, 0.80, 0.06] as [number, number, number],
  half: [0.115, 0.26, 0.20] as [number, number, number],
  tiltX: -0.30,
} as const;

/** Uniformly samples the lateral surface of revolution described by `profile`. */
function sampleLatheSurface(
  profile: Array<[number, number]>,
  rng: Rng,
  out: [number, number, number],
): void {
  // Weight each segment by its lateral area (2*pi*rMid*slantLength).
  let total = 0;
  const weights: number[] = [];
  for (let i = 0; i < profile.length - 1; i++) {
    const a = profile[i]!;
    const b = profile[i + 1]!;
    const dr = b[0] - a[0];
    const dy = b[1] - a[1];
    const slant = Math.hypot(dr, dy);
    const w = Math.max(1e-4, ((a[0] + b[0]) / 2) * slant);
    weights.push(w);
    total += w;
  }

  let pick = rng() * total;
  let index = weights.length - 1;
  for (let i = 0; i < weights.length; i++) {
    pick -= weights[i]!;
    if (pick <= 0) {
      index = i;
      break;
    }
  }

  const a = profile[index]!;
  const b = profile[index + 1]!;
  const t = rng();
  const radius = a[0] + (b[0] - a[0]) * t;
  const height = a[1] + (b[1] - a[1]) * t;
  const theta = rng() * TAU;

  out[0] = Math.cos(theta) * radius;
  out[1] = height;
  out[2] = Math.sin(theta) * radius;
}

/* ------------------------------------------------------------------ *
 * Notebook pages
 * ------------------------------------------------------------------ */

export const PAGE_WIDTH = 3.15;
export const PAGE_HEIGHT = 4.15;
export const SPINE_GAP = 0.14;
/** Notebook leans back from the camera by this much. */
const PAGE_TILT = -0.24;
const PAGE_ORIGIN_Y = 0.32;

/**
 * The parametric surface of one open page.
 *
 * @param side  -1 for the left leaf, +1 for the right leaf.
 * @param u     0 at the spine, 1 at the outer edge.
 * @param v     0 at the foot of the page, 1 at the head.
 *
 * Used twice: to displace the page mesh and to place the particles that land
 * on it, which is why it has to live here rather than inside either consumer.
 */
export function pageSurfacePoint(
  side: -1 | 1,
  u: number,
  v: number,
  out: [number, number, number] = [0, 0, 0],
): [number, number, number] {
  const x = side * (SPINE_GAP * 0.5 + u * PAGE_WIDTH);
  const y = (v - 0.5) * PAGE_HEIGHT;

  // Paper curl: a shallow trough near the spine, a lift at the outer edge and
  // a gentle barrel across the height of the leaf.
  const trough = -0.30 * Math.sin(Math.PI * Math.min(1, u * 1.04));
  const lift = 0.27 * u * u * u;
  const barrel = 0.05 * Math.cos((v - 0.5) * Math.PI * 1.55);
  const z = trough + lift + barrel;

  const cos = Math.cos(PAGE_TILT);
  const sin = Math.sin(PAGE_TILT);

  out[0] = x;
  out[1] = y * cos - z * sin + PAGE_ORIGIN_Y;
  out[2] = y * sin + z * cos;
  return out;
}

/** Maps page-local `(u, v)` onto the manuscript spread texture. */
export function pageTexCoord(side: -1 | 1, u: number, v: number): [number, number] {
  return [0.5 + side * (0.015 + u * 0.478), v];
}

/** Rough "is there ink here" predicate, matching `createManuscriptTexture`. */
export function isInkBand(u: number, v: number): boolean {
  if (u < 0.06 || u > 0.95) return false;
  if (v < 0.07 || v > 0.93) return false;
  return ((v * MANUSCRIPT_LINES) % 1) < 0.42;
}

/** Ruled lines per page — shared by the texture generator and the ink mask. */
export const MANUSCRIPT_LINES = 19;

/* ------------------------------------------------------------------ *
 * Matrix volume
 * ------------------------------------------------------------------ */

export interface MatrixLayout {
  layers: number;
  columnsPerLayer: number;
  slotsPerColumn: number;
  /** World height of one column; the shader wraps positions modulo this. */
  columnHeight: number;
}

export function matrixLayout(count: number): MatrixLayout {
  const layers = count > 12000 ? 7 : 5;
  const slotsPerColumn = count > 12000 ? 45 : 34;
  const columnsPerLayer = Math.max(14, Math.round(count / (layers * slotsPerColumn)));
  return { layers, columnsPerLayer, slotsPerColumn, columnHeight: 15.5 };
}

/* ------------------------------------------------------------------ *
 * Particle buffers
 * ------------------------------------------------------------------ */

export interface ParticleBuffers {
  count: number;
  /** vec3 — resting position on the board (tiles + piece surfaces). */
  board: Float32Array;
  /** vec3 — per-particle dissolve impulse, scaled in the shader. */
  burst: Float32Array;
  /** vec3 — resting position on the notebook pages. */
  note: Float32Array;
  /** vec3 — (columnX, slotOffsetY, columnZ) inside the matrix volume. */
  matrix: Float32Array;
  /** vec4 — (seed, columnSpeed, glyphIndex, sizeMultiplier). */
  rand: Float32Array;
  /** vec4 — (headness, boardTone, inkMask, glyphChurnRate). */
  meta: Float32Array;
  layout: MatrixLayout;
}

export interface BuildOptions {
  count: number;
  /** Number of cells in the glyph atlas. */
  glyphCount: number;
  /** Square the knight lands on — origin of the dissolve shockwave. */
  impactSquare?: string;
  seed?: number;
  /** Fraction of particles sampled from the pieces rather than the tiles. */
  pieceShare?: number;
}

export function buildParticleBuffers(options: BuildOptions): ParticleBuffers {
  const {
    count,
    glyphCount,
    impactSquare = KNIGHT_MOVE.to,
    seed = 0x5eed1a,
    pieceShare = 0.44,
  } = options;

  const rng = createRng(seed);
  const board = new Float32Array(count * 3);
  const burst = new Float32Array(count * 3);
  const note = new Float32Array(count * 3);
  const matrix = new Float32Array(count * 3);
  const rand = new Float32Array(count * 4);
  const meta = new Float32Array(count * 4);

  const tiles = boardTiles();
  const layout = matrixLayout(count);
  const impact = squareToWorld(impactSquare);

  // Pieces resolve to their post-move squares so the dissolve starts from the
  // position the viewer is actually looking at when the knight has landed.
  const pieces = PIECES.map((piece) => {
    const square = piece.id === KNIGHT_MOVE.pieceId ? KNIGHT_MOVE.to : piece.square;
    const world = squareToWorld(square);
    return { piece, world, profile: latheProfile(piece.kind) };
  });

  const pieceCount = Math.round(count * pieceShare);
  const local: [number, number, number] = [0, 0, 0];
  const page: [number, number, number] = [0, 0, 0];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const i4 = i * 4;

    /* ---- board target ------------------------------------------- */
    let tone: number;
    if (i < pieceCount && pieces.length > 0) {
      const entry = pieces[Math.floor(rng() * pieces.length) % pieces.length]!;
      const kind = entry.piece.kind;

      if (kind === "knight" && rng() < 0.34) {
        // Head wedge, so the knight keeps a silhouette while it comes apart.
        const [cx, cy, cz] = KNIGHT_HEAD.center;
        const [hx, hy, hz] = KNIGHT_HEAD.half;
        const lx = (rng() * 2 - 1) * hx;
        const ly = (rng() * 2 - 1) * hy;
        const lz = (rng() * 2 - 1) * hz;
        const c = Math.cos(KNIGHT_HEAD.tiltX);
        const s = Math.sin(KNIGHT_HEAD.tiltX);
        local[0] = cx + lx;
        local[1] = cy + (ly * c - lz * s);
        local[2] = cz + (ly * s + lz * c);
      } else {
        sampleLatheSurface(entry.profile, rng, local);
      }

      board[i3] = entry.world.x + local[0];
      board[i3 + 1] = TILE_THICKNESS * 0.5 + local[1];
      board[i3 + 2] = entry.world.z + local[2];
      tone = entry.piece.side === "ivory" ? 1 : 0.16;
    } else {
      const tile = tiles[Math.floor(rng() * tiles.length) % tiles.length]!;
      const edge = rng() < 0.18;
      board[i3] = tile.x + (rng() - 0.5) * TILE_SIZE * 0.94;
      board[i3 + 1] = edge
        ? TILE_THICKNESS * rng()
        : TILE_THICKNESS * 0.5 + rng() * 0.012;
      board[i3 + 2] = tile.z + (rng() - 0.5) * TILE_SIZE * 0.94;
      tone = tile.dark ? 0.12 : 0.92;
    }

    /* ---- dissolve impulse --------------------------------------- */
    const dx = board[i3]! - impact.x;
    const dz = board[i3 + 2]! - impact.z;
    const dist = Math.hypot(dx, dz);
    const inv = 1 / Math.max(0.35, dist);
    const shock = 1.9 / (1 + dist * 0.55);
    const spread = 0.5 + shock + rng() * 0.85;
    const swirl = rng() * TAU;
    const swirlAmt = 0.35 + rng() * 0.5;

    burst[i3] = dx * inv * spread + Math.cos(swirl) * swirlAmt;
    burst[i3 + 1] = 0.85 + rng() * 1.9 + 1.5 / (1 + dist * 0.45);
    burst[i3 + 2] = dz * inv * spread + Math.sin(swirl) * swirlAmt;

    /* ---- notebook target ---------------------------------------- */
    const side: -1 | 1 = i % 2 === 0 ? -1 : 1;
    // Bias density towards the written area so the pages read as pages.
    const u = Math.min(0.995, Math.pow(rng(), 0.86) * 0.97 + 0.015);
    const v = 0.035 + rng() * 0.93;
    pageSurfacePoint(side, u, v, page);
    note[i3] = page[0];
    note[i3 + 1] = page[1];
    note[i3 + 2] = page[2] + 0.012 + rng() * 0.02;

    /* ---- matrix target ------------------------------------------ */
    const slot = i % layout.slotsPerColumn;
    const column = Math.floor(i / layout.slotsPerColumn) % layout.columnsPerLayer;
    const layer =
      Math.floor(i / (layout.slotsPerColumn * layout.columnsPerLayer)) % layout.layers;

    const layerT = layout.layers === 1 ? 0 : layer / (layout.layers - 1);
    const z = 3.4 - layerT * 21.5;
    // Columns fan out with depth so the volume covers the frame evenly as the
    // camera pulls back.
    const halfWidth = 8.2 + layerT * 13.5;
    const colT = layout.columnsPerLayer === 1 ? 0.5 : column / (layout.columnsPerLayer - 1);
    const columnRng = createRng(0x9e37 + layer * 977 + column * 31);
    const jitter = (columnRng() - 0.5) * (halfWidth / layout.columnsPerLayer) * 1.4;

    matrix[i3] = (colT * 2 - 1) * halfWidth + jitter;
    matrix[i3 + 1] =
      (slot / layout.slotsPerColumn) * layout.columnHeight +
      columnRng() * layout.columnHeight;
    matrix[i3 + 2] = z + (columnRng() - 0.5) * 1.4;

    /* ---- per-particle randomness -------------------------------- */
    const headness = 1 - slot / layout.slotsPerColumn;
    rand[i4] = rng();
    rand[i4 + 1] = 0.30 + columnRng() * 0.95 + layerT * 0.35;
    rand[i4 + 2] = Math.floor(rng() * glyphCount);
    rand[i4 + 3] = 0.70 + rng() * 0.68;

    meta[i4] = headness;
    meta[i4 + 1] = tone;
    meta[i4 + 2] = isInkBand(u, v) ? 1 : 0;
    meta[i4 + 3] = rng() < 0.42 ? 1 + rng() * 7 : 0;
  }

  return { count, board, burst, note, matrix, rand, meta, layout };
}

/* ------------------------------------------------------------------ *
 * Camera choreography
 * ------------------------------------------------------------------ */

export interface CameraKey {
  /** Scroll progress this key sits at. */
  p: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

/**
 * Camera anchors across the scroll. Sampled with smoothstep easing between
 * neighbouring keys, so the dolly reads as one continuous move rather than
 * four cuts.
 */
export const CAMERA_KEYS: readonly CameraKey[] = [
  { p: 0.0, position: [-1.35, 5.15, 8.4], target: [0, 0.35, -0.2], fov: 38 },
  { p: 0.18, position: [0.55, 3.55, 8.9], target: [0.2, 0.5, -0.3], fov: 39 },
  { p: 0.34, position: [0.2, 2.35, 9.6], target: [0, 0.9, 0], fov: 42 },
  { p: 0.52, position: [0, 0.9, 7.5], target: [0, 0.34, 0], fov: 40 },
  { p: 0.64, position: [0, 0.55, 7.0], target: [0, 0.3, 0], fov: 40 },
  { p: 0.84, position: [0, 0.2, 15.5], target: [0, 0, -2], fov: 50 },
  { p: 1.0, position: [0, 0.05, 27.5], target: [0, 0, -4], fov: 58 },
];

function smootherstep(t: number): number {
  const c = t < 0 ? 0 : t > 1 ? 1 : t;
  return c * c * c * (c * (c * 6 - 15) + 10);
}

export interface CameraSample {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

/** Interpolates {@link CAMERA_KEYS} at scroll progress `p`. */
export function sampleCamera(p: number, out?: CameraSample): CameraSample {
  const result: CameraSample =
    out ?? { position: [0, 0, 0], target: [0, 0, 0], fov: 40 };

  const keys = CAMERA_KEYS;
  let index = 0;
  for (let i = 0; i < keys.length - 1; i++) {
    if (p >= keys[i]!.p) index = i;
  }
  const a = keys[index]!;
  const b = keys[Math.min(index + 1, keys.length - 1)]!;
  const span = b.p - a.p;
  const t = span <= 0 ? 0 : smootherstep((p - a.p) / span);

  for (let i = 0; i < 3; i++) {
    result.position[i] = a.position[i]! + (b.position[i]! - a.position[i]!) * t;
    result.target[i] = a.target[i]! + (b.target[i]! - a.target[i]!) * t;
  }
  result.fov = a.fov + (b.fov - a.fov) * t;
  return result;
}

/* ------------------------------------------------------------------ *
 * Stage / envelope helpers
 * ------------------------------------------------------------------ */

export type SequenceStage = 0 | 1 | 2 | 3;

export const STAGE_BOUNDS = [0.18, 0.38, 0.62] as const;

export function stageForProgress(p: number): SequenceStage {
  if (p < STAGE_BOUNDS[0]) return 0;
  if (p < STAGE_BOUNDS[1]) return 1;
  if (p < STAGE_BOUNDS[2]) return 2;
  return 3;
}

/** Clamped smoothstep, matching the GLSL/WGSL semantics used in the shader. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x < edge0 ? 0 : 1;
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Piecewise linear envelope through `(p, value)` stops. */
export function envelope(stops: ReadonlyArray<readonly [number, number]>, p: number): number {
  if (stops.length === 0) return 0;
  const first = stops[0]!;
  if (p <= first[0]) return first[1];
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i]!;
    const b = stops[i + 1]!;
    if (p <= b[0]) {
      const span = b[0] - a[0];
      const t = span <= 0 ? 1 : smoothstep(0, 1, (p - a[0]) / span);
      return a[1] + (b[1] - a[1]) * t;
    }
  }
  return stops[stops.length - 1]![1];
}

/** How visible the solid board meshes are at progress `p`. */
export const BOARD_OPACITY = [
  [0.0, 1], [0.155, 1], [0.30, 0], [1.0, 0],
] as const;

/** How visible the particle cloud is at progress `p`. */
export const PARTICLE_OPACITY = [
  [0.0, 0], [0.16, 0.05], [0.24, 1], [0.46, 1],
  [0.56, 0.30], [0.63, 0.55], [0.70, 1], [0.90, 1], [1.0, 0],
] as const;

/** How visible the page meshes are at progress `p`. */
export const PAGE_OPACITY = [
  [0.0, 0], [0.40, 0], [0.50, 0.85], [0.58, 1],
  [0.645, 1], [0.70, 0], [1.0, 0],
] as const;

/** How visible the manuscript ink is at progress `p`. */
export const INK_OPACITY = [
  [0.0, 0], [0.505, 0], [0.575, 1], [0.645, 1], [0.69, 0], [1.0, 0],
] as const;

/** Sprite world-size envelope: fine dust on the board, glyphs in the matrix. */
export const PARTICLE_SIZE = [
  [0.0, 0.055], [0.30, 0.062], [0.50, 0.048], [0.62, 0.055],
  [0.68, 0.30], [0.86, 0.34], [1.0, 0.38],
] as const;

/** Global fade to transparent so the page underneath reads at the end. */
export const SCENE_FADE = [
  [0.0, 1], [0.90, 1], [1.0, 0],
] as const;
