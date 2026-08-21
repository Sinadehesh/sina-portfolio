/**
 * Canvas-generated textures for the hero sequence.
 *
 * Nothing is fetched over the network: the dot sprite, the glyph atlas and the
 * manuscript spread are all painted procedurally at mount time. Every function
 * touches `document`, so they must only ever be called from inside an effect.
 */

import * as THREE from "three/webgpu";

import { MANUSCRIPT_LINES, createRng } from "./sequence";

/* ------------------------------------------------------------------ *
 * Palette — the same chiaroscuro contract as `app/globals.css`.
 * ------------------------------------------------------------------ */

const PAPER_BASE = "#e2d8c3";
const RULE_INK = "rgba(88, 78, 60, 0.20)";
const MARGIN_INK = "rgba(138, 109, 50, 0.30)";
const INK = "rgba(30, 26, 21, 0.78)";
const INK_FAINT = "rgba(30, 26, 21, 0.46)";
const INK_MARGIN = "rgba(56, 46, 30, 0.62)";

function context2d(width: number, height: number): CanvasRenderingContext2D {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    throw new Error("MindToMatrix: 2D canvas context unavailable");
  }
  return ctx;
}

function finish(ctx: CanvasRenderingContext2D, srgb: boolean): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(ctx.canvas);
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.LinearSRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/* ------------------------------------------------------------------ *
 * 1 — Dot sprite
 * ------------------------------------------------------------------ */

/**
 * The soft particle sprite: a warm core with a long, uneven falloff. The
 * deliberate tooth in the mid-radius keeps it from reading as a perfect CSS
 * circle when thousands of them overlap.
 */
export function createDotTexture(size = 128): THREE.CanvasTexture {
  const ctx = context2d(size, size);
  const half = size / 2;

  const glow = ctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0.0, "rgba(255, 250, 240, 1)");
  glow.addColorStop(0.18, "rgba(255, 246, 231, 0.92)");
  glow.addColorStop(0.42, "rgba(244, 230, 205, 0.36)");
  glow.addColorStop(0.72, "rgba(226, 208, 176, 0.09)");
  glow.addColorStop(1.0, "rgba(214, 194, 160, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  // Brush tooth: a scatter of faint specks masked by the falloff.
  const rng = createRng(0x70075);
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < 220; i++) {
    const angle = rng() * Math.PI * 2;
    const radius = Math.pow(rng(), 0.55) * half * 0.92;
    const x = half + Math.cos(angle) * radius;
    const y = half + Math.sin(angle) * radius;
    const falloff = Math.max(0, 1 - radius / half);
    ctx.fillStyle = `rgba(255, 244, 224, ${(0.05 * falloff * falloff).toFixed(4)})`;
    ctx.beginPath();
    ctx.arc(x, y, rng() * size * 0.035 + 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";

  return finish(ctx, true);
}

/* ------------------------------------------------------------------ *
 * 2 — Glyph atlas
 * ------------------------------------------------------------------ */

export interface GlyphAtlas {
  texture: THREE.CanvasTexture;
  columns: number;
  rows: number;
  /** Total addressable cells; particle glyph indices are taken modulo this. */
  count: number;
}

/** Typed marks that always render, whatever fonts the device happens to have. */
const GLYPH_CHARACTERS = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "=", "+", "-", "/", "\\", "<", ">", "*", "~", "^",
  "|", ":", ";", ".", "?", "!",
];

type Stroke = (ctx: CanvasRenderingContext2D, cell: number, rng: () => number) => void;

/**
 * Stroke vocabulary for the invented marks. Katakana-adjacent by construction:
 * short orthogonal bars, one dominant diagonal, occasional hook — never curves.
 */
const STROKES: Stroke[] = [
  (ctx, cell, rng) => {
    const y = cell * (0.24 + rng() * 0.5);
    const x0 = cell * (0.14 + rng() * 0.12);
    ctx.moveTo(x0, y);
    ctx.lineTo(cell - x0 * (0.7 + rng() * 0.6), y);
  },
  (ctx, cell, rng) => {
    const x = cell * (0.28 + rng() * 0.44);
    const y0 = cell * (0.12 + rng() * 0.12);
    ctx.moveTo(x, y0);
    ctx.lineTo(x, cell * (0.62 + rng() * 0.28));
  },
  (ctx, cell, rng) => {
    const flip = rng() < 0.5 ? 1 : -1;
    const cx = cell * 0.5;
    const cy = cell * 0.5;
    const r = cell * (0.2 + rng() * 0.18);
    ctx.moveTo(cx - r * flip, cy - r);
    ctx.lineTo(cx + r * flip, cy + r);
  },
  (ctx, cell, rng) => {
    const x = cell * (0.24 + rng() * 0.4);
    const y = cell * (0.24 + rng() * 0.3);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + cell * 0.3);
    ctx.lineTo(x + cell * (0.18 + rng() * 0.16), y + cell * 0.3);
  },
  (ctx, cell, rng) => {
    const y = cell * (0.6 + rng() * 0.2);
    ctx.moveTo(cell * 0.2, y);
    ctx.lineTo(cell * 0.8, y);
    ctx.moveTo(cell * 0.5, y - cell * 0.16);
    ctx.lineTo(cell * 0.5, y + cell * 0.14);
  },
];

/**
 * An 8x8 atlas of code-rain marks: invented katakana-adjacent strokes plus
 * digits and operators. Drawn in white so the material can tint it.
 */
export function createGlyphAtlas(cell = 64, columns = 8, rows = 8): GlyphAtlas {
  const ctx = context2d(cell * columns, cell * rows);
  const count = columns * rows;
  const rng = createRng(0x9147a5);

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let index = 0; index < count; index++) {
    const col = index % columns;
    const row = Math.floor(index / columns);
    ctx.save();
    ctx.translate(col * cell, row * cell);

    // Every fourth cell is a real typed character; the rest are invented marks.
    const typed = index % 4 === 1;
    if (typed) {
      const char = GLYPH_CHARACTERS[index % GLYPH_CHARACTERS.length]!;
      ctx.fillStyle = "#ffffff";
      ctx.font = `500 ${Math.round(cell * 0.6)}px "JetBrains Mono", ui-monospace, "DejaVu Sans Mono", monospace`;
      ctx.fillText(char, cell * 0.5, cell * 0.52);
    } else {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = cell * (0.075 + rng() * 0.035);
      ctx.beginPath();
      const strokeCount = 2 + Math.floor(rng() * 3);
      for (let s = 0; s < strokeCount; s++) {
        STROKES[Math.floor(rng() * STROKES.length) % STROKES.length]!(ctx, cell, rng);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  return { texture: finish(ctx, true), columns, rows, count };
}

/* ------------------------------------------------------------------ *
 * 3 — Manuscript spread
 * ------------------------------------------------------------------ */

export interface ManuscriptTextures {
  /** Opaque paper: tone, mottling, ruled lines, spine shadow. */
  paper: THREE.CanvasTexture;
  /** Transparent overlay: the drafted text, strike-throughs, margin notes. */
  ink: THREE.CanvasTexture;
}

export interface ManuscriptOptions {
  width?: number;
  height?: number;
}

interface PageBox {
  x0: number;
  x1: number;
  side: -1 | 1;
}

/**
 * Page rectangles in canvas space, matching `pageTexCoord()` in `sequence.ts`:
 * the left leaf occupies u in [0.007, 0.485], the right leaf [0.515, 0.993].
 */
function pageBoxes(width: number): [PageBox, PageBox] {
  return [
    { x0: 0.007 * width, x1: 0.485 * width, side: -1 },
    { x0: 0.515 * width, x1: 0.993 * width, side: 1 },
  ];
}

function paintPaper(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const noise = createRng(0x1f0a2b);

  ctx.fillStyle = PAPER_BASE;
  ctx.fillRect(0, 0, width, height);

  // Broad tonal wash: warm in the middle of each leaf, cooler at the edges.
  const wash = ctx.createLinearGradient(0, 0, 0, height);
  wash.addColorStop(0, "rgba(150, 138, 112, 0.30)");
  wash.addColorStop(0.22, "rgba(237, 228, 211, 0.05)");
  wash.addColorStop(0.78, "rgba(237, 228, 211, 0.05)");
  wash.addColorStop(1, "rgba(150, 138, 112, 0.34)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, height);

  for (const box of pageBoxes(width)) {
    const w = box.x1 - box.x0;
    const centre = box.side === -1 ? box.x0 + w * 0.62 : box.x0 + w * 0.38;
    const bloom = ctx.createRadialGradient(
      centre, height * 0.46, w * 0.05,
      centre, height * 0.46, w * 1.15,
    );
    bloom.addColorStop(0, "rgba(240, 232, 216, 0.55)");
    bloom.addColorStop(1, "rgba(240, 232, 216, 0)");
    ctx.fillStyle = bloom;
    ctx.fillRect(box.x0, 0, w, height);
  }

  // Mottling and fibre — the tooth that stops the page reading as flat vector.
  for (let i = 0; i < 900; i++) {
    const x = noise() * width;
    const y = noise() * height;
    const r = 3 + noise() * 46;
    const dark = noise() < 0.45;
    ctx.fillStyle = dark
      ? `rgba(150, 136, 108, ${(0.012 + noise() * 0.028).toFixed(4)})`
      : `rgba(247, 240, 226, ${(0.012 + noise() * 0.032).toFixed(4)})`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.4 + noise() * 0.9), noise() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 1400; i++) {
    const x = noise() * width;
    const y = noise() * height;
    ctx.fillStyle = `rgba(120, 108, 84, ${(0.02 + noise() * 0.05).toFixed(4)})`;
    ctx.fillRect(x, y, 1 + noise() * 2.6, 1);
  }

  // Ruled lines + margin rule.
  const lineStep = height / MANUSCRIPT_LINES;
  for (const box of pageBoxes(width)) {
    const inset = (box.x1 - box.x0) * 0.055;
    ctx.strokeStyle = RULE_INK;
    ctx.lineWidth = Math.max(1, height / 700);
    for (let i = 1; i < MANUSCRIPT_LINES; i++) {
      const y = i * lineStep;
      ctx.beginPath();
      ctx.moveTo(box.x0 + inset, y + noise() * 0.8);
      ctx.lineTo(box.x1 - inset, y + noise() * 0.8);
      ctx.stroke();
    }

    ctx.strokeStyle = MARGIN_INK;
    ctx.lineWidth = Math.max(1, height / 620);
    const marginX = box.side === -1 ? box.x0 + inset * 2.4 : box.x1 - inset * 2.4;
    ctx.beginPath();
    ctx.moveTo(marginX, lineStep * 0.4);
    ctx.lineTo(marginX, height - lineStep * 0.4);
    ctx.stroke();
  }

  // Spine: two leaves meeting, with the gutter shadow between them.
  const spine = ctx.createLinearGradient(width * 0.46, 0, width * 0.54, 0);
  spine.addColorStop(0, "rgba(60, 52, 38, 0)");
  spine.addColorStop(0.32, "rgba(52, 45, 33, 0.34)");
  spine.addColorStop(0.5, "rgba(34, 29, 22, 0.62)");
  spine.addColorStop(0.68, "rgba(52, 45, 33, 0.34)");
  spine.addColorStop(1, "rgba(60, 52, 38, 0)");
  ctx.fillStyle = spine;
  ctx.fillRect(width * 0.46, 0, width * 0.08, height);

  // Outer edges catch the falloff of the key light.
  for (const [x0, x1] of [[0, width * 0.05], [width * 0.95, width]] as const) {
    const edge = ctx.createLinearGradient(x0, 0, x1, 0);
    const dark = "rgba(66, 58, 44, 0.42)";
    edge.addColorStop(0, x0 === 0 ? dark : "rgba(66, 58, 44, 0)");
    edge.addColorStop(1, x0 === 0 ? "rgba(66, 58, 44, 0)" : dark);
    ctx.fillStyle = edge;
    ctx.fillRect(x0, 0, x1 - x0, height);
  }

}

interface DrawLineOptions {
  strikeWord?: number;
  faint?: boolean;
}

/** Draws one manuscript line word by word, with handwriting-ish jitter. */
function drawManuscriptLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  rng: () => number,
  options: DrawLineOptions = {},
): void {
  const words = text.split(" ");
  const spaceWidth = ctx.measureText(" ").width;
  const natural =
    words.reduce((sum, w) => sum + ctx.measureText(w).width, 0) +
    spaceWidth * (words.length - 1);
  const squeeze = natural > maxWidth ? maxWidth / natural : 1;

  ctx.fillStyle = options.faint === true ? INK_FAINT : INK;

  let cursor = x;
  words.forEach((word, index) => {
    const w = ctx.measureText(word).width * squeeze;
    const wobble = (rng() - 0.5) * 2.1;
    const tilt = (rng() - 0.5) * 0.016;

    ctx.save();
    ctx.translate(cursor, y + wobble);
    ctx.rotate(tilt);
    ctx.scale(squeeze, 1);
    ctx.fillText(word, 0, 0);
    ctx.restore();

    if (options.strikeWord === index) {
      ctx.save();
      ctx.strokeStyle = INK;
      ctx.lineWidth = Math.max(1.2, ctx.canvas.height / 620);
      ctx.beginPath();
      ctx.moveTo(cursor - 2, y - ctx.canvas.height * 0.006 + wobble);
      ctx.lineTo(cursor + w + 2, y - ctx.canvas.height * 0.0075 + wobble);
      ctx.stroke();
      ctx.restore();
    }

    cursor += w + spaceWidth * squeeze * (0.9 + rng() * 0.25);
  });
}

/** Unreadable filler: the rest of a drafted page, as pen movement only. */
function drawScribbleLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  rng: () => number,
  height: number,
): void {
  ctx.save();
  ctx.strokeStyle = `rgba(34, 29, 22, ${(0.16 + rng() * 0.16).toFixed(3)})`;
  ctx.lineWidth = Math.max(1, height / 780);
  ctx.lineCap = "round";
  ctx.beginPath();

  const amplitude = height * 0.008;
  let cursor = x;
  const end = x + width * (0.55 + rng() * 0.45);
  ctx.moveTo(cursor, y);
  while (cursor < end) {
    const step = height * (0.006 + rng() * 0.012);
    const mid = cursor + step * 0.5;
    ctx.quadraticCurveTo(mid, y - amplitude * (rng() * 2 - 1), cursor + step, y);
    cursor += step;
    // Word gaps.
    if (rng() < 0.13) {
      cursor += height * (0.006 + rng() * 0.01);
      ctx.moveTo(cursor, y);
    }
  }
  ctx.stroke();
  ctx.restore();
}

function paintInk(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  fragments: readonly string[],
): void {
  const jitter = createRng(0x3c1de5);
  const lineStep = height / MANUSCRIPT_LINES;
  const boxes = pageBoxes(width);

  const proseFont = `italic 400 ${Math.round(height * 0.0295)}px Georgia, "Times New Roman", "Liberation Serif", serif`;
  const noteFont = `400 ${Math.round(height * 0.0275)}px Georgia, "Times New Roman", "Liberation Serif", serif`;
  const marginFont = `italic 400 ${Math.round(height * 0.019)}px Georgia, "Times New Roman", "Liberation Serif", serif`;
  const stampFont = `400 ${Math.round(height * 0.0165)}px "JetBrains Mono", ui-monospace, monospace`;

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const half = Math.ceil(fragments.length / 2);
  const pages: readonly string[][] = [
    fragments.slice(0, half),
    fragments.slice(half),
  ];

  boxes.forEach((box, pageIndex) => {
    const inset = (box.x1 - box.x0) * 0.055;
    const marginPad = inset * 3.2;
    const textX = box.side === -1 ? box.x0 + marginPad : box.x0 + inset * 1.2;
    const textWidth = box.x1 - box.x0 - marginPad - inset * 1.4;
    const lines = pages[pageIndex] ?? [];

    // Header stamp.
    ctx.font = stampFont;
    ctx.fillStyle = "rgba(56, 46, 30, 0.45)";
    ctx.fillText(
      pageIndex === 0 ? "notebook  ·  vii" : "notes  ·  cont'd",
      textX,
      lineStep * 0.72,
    );

    let row = 2;
    for (let i = 0; i < lines.length && row < MANUSCRIPT_LINES - 1; i++) {
      const text = lines[i]!;
      const isNote = pageIndex === 1 || text.startsWith("—");
      ctx.font = isNote ? noteFont : proseFont;

      const y = row * lineStep + lineStep * 0.74;
      drawManuscriptLine(ctx, text, textX, y, textWidth, jitter, {
        strikeWord: i === 1 ? 3 : i === 2 ? 1 : undefined,
        faint: text.startsWith("—"),
      });
      row += 1;

      // Two scribbled lines of "unread" draft between the legible fragments.
      const filler = 1 + Math.floor(jitter() * 2);
      for (let f = 0; f < filler && row < MANUSCRIPT_LINES - 1; f++) {
        drawScribbleLine(
          ctx,
          textX + jitter() * lineStep * 0.4,
          row * lineStep + lineStep * 0.66,
          textWidth,
          jitter,
          height,
        );
        row += 1;
      }
    }

    while (row < MANUSCRIPT_LINES - 1) {
      drawScribbleLine(
        ctx,
        textX + jitter() * lineStep * 0.5,
        row * lineStep + lineStep * 0.66,
        textWidth * (0.5 + jitter() * 0.5),
        jitter,
        height,
      );
      row += 1;
    }

    // Margin annotations, rotated into the gutter margin.
    const notes =
      pageIndex === 0
        ? ["check this", "P vs NP?", "she answers in 4s"]
        : ["verifier = self", "cf. p. 41", "not a proof"];
    ctx.font = marginFont;
    ctx.fillStyle = INK_MARGIN;
    notes.forEach((note, n) => {
      const y = lineStep * (3.4 + n * 5.1);
      const x = box.side === -1 ? box.x0 + inset * 0.9 : box.x1 - inset * 2.6;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(box.side === -1 ? -Math.PI / 2 + 0.02 : -Math.PI / 2 - 0.02);
      ctx.fillText(note, 0, 0);
      ctx.restore();
    });

    // Folio.
    ctx.font = stampFont;
    ctx.fillStyle = "rgba(56, 46, 30, 0.4)";
    ctx.fillText(
      pageIndex === 0 ? "142" : "143",
      box.side === -1 ? textX : box.x1 - inset * 2.4,
      height - lineStep * 0.34,
    );
  });
}

/**
 * The open-notebook spread: a drafted literary manuscript on the recto,
 * complexity-theory notes on the verso, both taken from `manuscriptFragments`.
 * Returns paper and ink as separate maps so the typography can fade in on its
 * own schedule after the pages have formed.
 */
export function createManuscriptTexture(
  fragments: readonly string[],
  options: ManuscriptOptions = {},
): ManuscriptTextures {
  const width = options.width ?? 2048;
  const height = options.height ?? 1024;

  const paperCtx = context2d(width, height);
  paintPaper(paperCtx, width, height);

  const inkCtx = context2d(width, height);
  paintInk(inkCtx, width, height, fragments);

  return { paper: finish(paperCtx, true), ink: finish(inkCtx, true) };
}
