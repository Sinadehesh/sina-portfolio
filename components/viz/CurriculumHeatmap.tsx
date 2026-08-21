"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { passway } from "@/lib/data";

/* ==========================================================================
   Passway — canonical curriculum × observed university coverage.

   Two sources on one grid. Rows carry Source A (the canonical weight of a
   topic, ivory); cells carry Source B (what a program actually covers,
   gold). The toggle re-encodes the cells as the difference between them, so
   the gap the product exists to expose is the thing you read.
   ========================================================================== */

/* Chiaroscuro: charcoal ground, ivory light, gold accent. Oxide is admitted
   for one job only — the deficit direction of the diverging scale. */
const INK = {
  ivory: "#ede4d3",
  ivoryDim: "#c9c0b1",
  ivoryFaint: "#8d867a",
  gold: "#c8a45c",
  goldBright: "#e0c184",
  goldDeep: "#8a6d32",
  oxide: "#8c4a3f",
} as const;

/* The empty end of both scales: ivory mixed almost all the way down into the
   charcoal ground, so a cell with nothing in it recedes but still reads as a
   cell. This is also the diverging midpoint — "no gap" must look like nothing. */
const CELL_FLOOR = "#232128";
const GAP_NEUTRAL = "#2b2925";

const TOPICS: readonly string[] = passway.topics;
const PROGRAMS: readonly string[] = passway.programs;

/* ==========================================================================
   Seeded matrix generation.

   lib/data.ts ships the two axes but no coverage matrix, so the matrix is
   derived here — deterministically. Every draw comes from a hash of the
   topic and program names, so the server render, the client render and every
   reload produce byte-identical numbers. Math.random() is never called.
   ========================================================================== */

const SEED_SALT = "passway/curriculum-matrix/v1";

/** FNV-1a over the salted key — a stable 32-bit seed from a pair of names. */
function hashSeed(key: string): number {
  const source = `${SEED_SALT}|${key}`;
  let h = 2166136261 >>> 0;
  for (let i = 0; i < source.length; i += 1) {
    h ^= source.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

/** mulberry32 — small, fast, well-distributed PRNG over [0, 1). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A stream seeded from `key`, with the first draw discarded to shake off
    the correlation mulberry32 shows between neighbouring seeds. */
function streamFor(key: string): () => number {
  const next = mulberry32(hashSeed(key));
  next();
  return next;
}

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

/* Generator constants — the shape of the story the matrix tells. */
const CANONICAL_MIN = 0.46; // no topic is fully peripheral to the canon
const CANONICAL_MAX = 1.0;
const PROGRAM_BIAS = 0.19; // ± institutional breadth, constant per program
const FIDELITY_MIN = 0.6; // ordinary coverage: a fraction of the canon
const FIDELITY_MAX = 1.2; // occasionally a program over-serves a topic
const GAP_RATE = 0.2; // share of cells that are outright gaps
const GAP_FIDELITY_MIN = 0.18;
const GAP_FIDELITY_MAX = 0.46;
const COVERAGE_FLOOR = 0.02; // nothing is literally 0% or 100% covered
const COVERAGE_CEIL = 0.97;

export type CurriculumCell = {
  row: number;
  col: number;
  topic: string;
  program: string;
  /** Source A — how central the topic is to the canon. Constant per row. */
  canonical: number;
  /** Source B — how much of it the program is observed to teach. */
  observed: number;
  /** observed − canonical. Negative is a deficit; positive a surplus. */
  gap: number;
};

export type CurriculumMatrix = {
  canonical: number[];
  cells: CurriculumCell[];
  /** Symmetric half-domain for the diverging scale, rounded up to 0.05. */
  gapDomain: number;
};

function buildCurriculumMatrix(
  topics: readonly string[],
  programs: readonly string[],
): CurriculumMatrix {
  const canonical = topics.map((topic) =>
    lerp(CANONICAL_MIN, CANONICAL_MAX, streamFor(`canonical|${topic}`)()),
  );
  const bias = programs.map(
    (program) => (streamFor(`program|${program}`)() * 2 - 1) * PROGRAM_BIAS,
  );

  const cells: CurriculumCell[] = [];
  topics.forEach((topic, row) => {
    programs.forEach((program, col) => {
      const draw = streamFor(`cell|${topic}|${program}`);
      const isGap = draw() < GAP_RATE;
      const fidelity = isGap
        ? lerp(GAP_FIDELITY_MIN, GAP_FIDELITY_MAX, draw())
        : lerp(FIDELITY_MIN, FIDELITY_MAX, draw());
      /* A program's breadth lifts what it teaches, but it cannot rescue a
         topic it has decided to skip — so the bias is damped inside a gap. */
      const observed = clamp(
        canonical[row] * fidelity + bias[col] * (isGap ? 0.4 : 1),
        COVERAGE_FLOOR,
        COVERAGE_CEIL,
      );
      cells.push({
        row,
        col,
        topic,
        program,
        canonical: canonical[row],
        observed,
        gap: observed - canonical[row],
      });
    });
  });

  const maxAbsGap = d3.max(cells, (c) => Math.abs(c.gap)) ?? 1;
  return { canonical, cells, gapDomain: Math.ceil(maxAbsGap * 20) / 20 };
}

const MATRIX = buildCurriculumMatrix(TOPICS, PROGRAMS);
const CELLS = MATRIX.cells;
const GAP_DOMAIN = MATRIX.gapDomain;

/** A cell is a "clear gap" once it falls this far below its canonical weight. */
const CLEAR_GAP = -0.25;
const CLEAR_GAP_COUNT = CELLS.filter((c) => c.gap <= CLEAR_GAP).length;

/* ==========================================================================
   Colour ramps — built from the palette, never from a d3 colour scheme.
   ========================================================================== */

/** Lab-interpolated ramp through the given palette stops. */
function rampFrom(stops: readonly string[]): (t: number) => string {
  const interpolate = d3.piecewise(d3.interpolateLab, [...stops]);
  return (t: number): string => String(interpolate(clamp(t, 0, 1)));
}

/* Sequential: empty → ivory → gold. Monotonic in lightness, so more coverage
   always reads as more light on the charcoal. */
const observedRamp = rampFrom([
  CELL_FLOOR,
  "#413c33",
  INK.ivoryFaint,
  INK.gold,
  INK.goldBright,
]);

/* Diverging: oxide deficit ← ivory-on-charcoal neutral → gold surplus, with
   the neutral pinned to exactly zero gap. */
const deficitRamp = rampFrom([GAP_NEUTRAL, INK.oxide]);
const surplusRamp = rampFrom([GAP_NEUTRAL, INK.goldDeep, INK.goldBright]);
const gapRamp = (t: number): string =>
  t < 0.5 ? deficitRamp((0.5 - t) * 2) : surplusRamp((t - 0.5) * 2);

const observedScale = d3.scaleSequential<string>(observedRamp).domain([0, 1]);
const gapScale = d3
  .scaleSequential<string>(gapRamp)
  .domain([-GAP_DOMAIN, GAP_DOMAIN]);

/* ==========================================================================
   Layout — every dimension is a ratio of the measured container width.
   ========================================================================== */
const GUTTER_RATIO = 0.34;
const GUTTER_MIN = 112;
const GUTTER_MAX = 190;
const ROW_H_MIN = 30;
const ROW_H_MAX = 46;
const ROW_H_RATIO = 0.7; // of cell width
const CELL_GAP = 2; // the surface shows through between cells
const FONT_RATIO = 0.024;
const FONT_MIN = 8.5;
const FONT_MAX = 12;
const MONO_ADVANCE = 0.6; // fallback advance width, in em, if measuring fails
const ROTATE_SIN = Math.SQRT1_2; // sin(45°) — height a rotated label claims
const LEGEND_H = 48;
const LEGEND_MAX_W = 240;
const LEGEND_STOPS = 24;

/* --- animation ------------------------------------------------------------ */
const MODE_MS = 620;
const MODE_STAGGER_MS = 14; // per diagonal step
const ENTRANCE_STAGGER = 0.014;

const fmt = d3.format(".2f");
const fmtSigned = d3.format("+.2f");
/** Typographic minus for the chart; the hidden table keeps ASCII. */
const signed = (v: number): string => fmtSigned(v).replace("-", "−");

type Mode = "observed" | "gap";

const MODE_LABEL: Record<Mode, string> = {
  observed: "Observed coverage",
  gap: "Gap vs. canonical",
};

type HeatmapController = { setMode: (mode: Mode) => void };

let instanceSeq = 0;

export default function CurriculumHeatmap({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<HeatmapController | null>(null);
  /* The effect builds the SVG once; this ref carries the chosen mode across a
     remount so a rebuild never silently reverts what the reader selected. */
  const modeRef = useRef<Mode>("observed");
  const [mode, setMode] = useState<Mode>("observed");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    gsap.registerPlugin(ScrollTrigger);

    const uid = `heatmap-${(instanceSeq += 1)}`;
    const titleId = `${uid}-title`;
    const descId = `${uid}-desc`;
    const legendGradientId = `${uid}-legend`;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let motionReduced = motionQuery.matches;

    let currentMode: Mode = modeRef.current;
    const colourFor = (cell: CurriculumCell): string =>
      currentMode === "observed"
        ? observedScale(cell.observed)
        : gapScale(cell.gap);

    const describeCell = (cell: CurriculumCell): string =>
      `${cell.topic}, ${cell.program}. Canonical weight ${fmt(
        cell.canonical,
      )}. Observed coverage ${fmt(cell.observed)}. Gap ${fmtSigned(cell.gap)}.`;

    /* ---------------------------------------------------------------- DOM */
    const svg = d3
      .create("svg")
      .attr("role", "img")
      .attr("aria-labelledby", `${titleId} ${descId}`)
      .style("display", "block")
      .style("width", "100%");

    svg
      .append("title")
      .attr("id", titleId)
      .text("Passway curriculum coverage matrix");
    svg
      .append("desc")
      .attr("id", descId)
      .text(
        `Heatmap of ${TOPICS.length} engineering topics against ${PROGRAMS.length} university programs. Cell brightness encodes observed coverage from 0 to 1; a toggle re-encodes it as the gap against each topic's canonical weight. ${CLEAR_GAP_COUNT} of ${CELLS.length} cells fall at least 0.25 below the canon. The same numbers are listed in the table that follows.`,
      );

    const defs = svg.append("defs");
    const legendGradient = defs
      .append("linearGradient")
      .attr("id", legendGradientId)
      .attr("x1", "0%")
      .attr("x2", "100%");
    const legendStops = legendGradient
      .selectAll<SVGStopElement, number>("stop")
      .data(d3.range(LEGEND_STOPS))
      .join("stop")
      .attr("offset", (i) => `${(i / (LEGEND_STOPS - 1)) * 100}%`);

    const colHeaderGroup = svg.append("g");
    const colLabels = colHeaderGroup
      .selectAll<SVGTextElement, string>("text")
      .data(PROGRAMS as string[])
      .join("text")
      .attr("fill", INK.ivoryFaint)
      .attr("font-family", "var(--font-mono)")
      .attr("letter-spacing", "0.1em")
      .style("cursor", "default")
      .text((d) => d);

    const rowHeaderGroup = svg.append("g");
    const rowHeaders = rowHeaderGroup
      .selectAll<SVGGElement, string>("g")
      .data(TOPICS as string[])
      .join("g")
      .style("cursor", "default");
    const rowLabels = rowHeaders
      .append("text")
      .attr("fill", INK.ivoryFaint)
      .attr("font-family", "var(--font-mono)")
      .attr("letter-spacing", "0.04em");
    /* Source A rides in the gutter: a hairline bar of canonical weight under
       every topic, so both sources are legible without switching modes. */
    const canonTrack = rowHeaders
      .append("rect")
      .attr("fill", INK.ivory)
      .attr("fill-opacity", 0.09)
      .attr("rx", 1.5);
    const canonFill = rowHeaders
      .append("rect")
      .attr("fill", INK.ivoryDim)
      .attr("fill-opacity", 0.55)
      .attr("rx", 1.5);
    /* Transparent hit strips make a whole row header hoverable. */
    const rowHits = rowHeaders
      .append("rect")
      .attr("fill", "transparent")
      .attr("y", 0);

    const gridGroup = svg.append("g");
    const cells = gridGroup
      .selectAll<SVGRectElement, CurriculumCell>("rect")
      .data(CELLS)
      .join("rect")
      .attr("rx", 1.5)
      /* Roving tabindex: one cell in the tab order, arrows move between them.
         Assistive tech reads the picture through the svg's role="img" label
         and the hidden table below it; these labels are the belt to that
         suspenders, and the focus ring is what sighted keyboard users get. */
      .attr("tabindex", (d) => (d.row === 0 && d.col === 0 ? 0 : -1))
      .attr("aria-label", describeCell)
      .attr("fill", colourFor)
      .style("cursor", "pointer")
      .style("outline", "none");

    const colHits = svg
      .append("g")
      .selectAll<SVGRectElement, string>("rect")
      .data(PROGRAMS as string[])
      .join("rect")
      .attr("fill", "transparent")
      .style("cursor", "default");

    const focusRing = svg
      .append("rect")
      .attr("fill", "none")
      .attr("stroke", INK.ivory)
      .attr("stroke-width", 1.5)
      .attr("rx", 2.5)
      .attr("opacity", 0)
      .style("pointer-events", "none");

    const legendGroup = svg.append("g");
    const legendKeyBar = legendGroup
      .append("rect")
      .attr("fill", INK.ivoryDim)
      .attr("fill-opacity", 0.55)
      .attr("rx", 1.5)
      .attr("height", 3);
    const legendKeyText = legendGroup
      .append("text")
      .attr("fill", INK.ivoryFaint)
      .attr("font-family", "var(--font-mono)")
      .attr("letter-spacing", "0.08em");
    const legendBar = legendGroup
      .append("rect")
      .attr("fill", `url(#${legendGradientId})`)
      .attr("rx", 1.5)
      .attr("height", 8);
    const legendTicks = legendGroup
      .selectAll<SVGTextElement, number>("text.tick")
      .data([0, 1, 2])
      .join("text")
      .attr("class", "tick")
      .attr("fill", INK.ivoryFaint)
      .attr("font-family", "var(--font-mono)")
      .attr("letter-spacing", "0.06em");

    const svgNode = svg.node();
    if (!svgNode) return;
    host.appendChild(svgNode);

    /* ------------------------------------------------------------ tooltip */
    const tip = document.createElement("div");
    Object.assign(tip.style, {
      position: "absolute",
      left: "0",
      top: "0",
      pointerEvents: "none",
      opacity: "0",
      transition: "opacity 140ms ease",
      padding: "8px 10px",
      minWidth: "150px",
      background: "#101013",
      border: `1px solid ${INK.ivory}1f`,
      borderRadius: "2px",
      fontFamily: "var(--font-mono)",
      fontSize: "10.5px",
      lineHeight: "1.5",
      color: INK.ivoryDim,
      zIndex: "5",
    } satisfies Partial<CSSStyleDeclaration>);

    const tipHead = document.createElement("div");
    Object.assign(tipHead.style, {
      color: INK.ivory,
      letterSpacing: "0.04em",
      marginBottom: "5px",
    } satisfies Partial<CSSStyleDeclaration>);
    tip.appendChild(tipHead);

    /* Value first, label second — the reader already knows which cell. */
    function tipRow(label: string): { row: HTMLDivElement; value: HTMLSpanElement } {
      const row = document.createElement("div");
      Object.assign(row.style, {
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
      } satisfies Partial<CSSStyleDeclaration>);
      const key = document.createElement("span");
      key.textContent = label;
      key.style.color = INK.ivoryFaint;
      const value = document.createElement("span");
      value.style.color = INK.ivory;
      row.appendChild(key);
      row.appendChild(value);
      tip.appendChild(row);
      return { row, value };
    }
    const tipCanonical = tipRow("canonical");
    const tipObserved = tipRow("observed");
    const tipGap = tipRow("gap");
    host.appendChild(tip);

    /* ------------------------------------------------------------- layout */
    let width = 0;
    let gutter = GUTTER_MIN;
    let headerH = 28;
    let rowH = ROW_H_MIN;
    let cellW = 40;
    let font = FONT_MIN;
    let rotateLabels = false;

    /** Exact measurement where the engine gives us one, estimate otherwise. */
    function textWidth(node: SVGTextElement, fallbackChars: number): number {
      const measured = node.getComputedTextLength();
      return measured > 0 ? measured : fallbackChars * font * MONO_ADVANCE;
    }

    /** Trims a label with an ellipsis until it fits the available width. */
    function fitText(node: SVGTextElement, full: string, maxWidth: number): void {
      node.textContent = full;
      if (textWidth(node, full.length) <= maxWidth) return;
      for (let n = full.length - 1; n > 0; n -= 1) {
        node.textContent = `${full.slice(0, n)}…`;
        if (textWidth(node, n + 1) <= maxWidth) return;
      }
    }

    function layout(nextWidth: number): void {
      width = Math.max(nextWidth, 1);
      font = clamp(width * FONT_RATIO, FONT_MIN, FONT_MAX);
      gutter = clamp(width * GUTTER_RATIO, GUTTER_MIN, GUTTER_MAX);

      colLabels.attr("font-size", font).each(function (d) {
        this.textContent = d;
      });
      const maxColLabel = d3.max(colLabels.nodes(), (node, i) =>
        textWidth(node, PROGRAMS[i].length),
      ) ?? font * 4;

      /* Horizontal program labels while they fit; a 45° lean once they don't.
         The lean claims width on the right, which the grid gives back. */
      const provisionalCellW = (width - gutter) / PROGRAMS.length;
      rotateLabels = maxColLabel + 10 > provisionalCellW;
      const rightPad = rotateLabels
        ? Math.ceil(maxColLabel * ROTATE_SIN) + 4
        : 0;
      headerH = rotateLabels
        ? Math.ceil(maxColLabel * ROTATE_SIN) + font * 0.8 + 6
        : Math.ceil(font * 1.7) + 8;

      const gridW = Math.max(width - gutter - rightPad, PROGRAMS.length * 12);
      cellW = gridW / PROGRAMS.length;
      rowH = clamp(cellW * ROW_H_RATIO, ROW_H_MIN, ROW_H_MAX);

      const gridH = rowH * TOPICS.length;
      const height = Math.ceil(headerH + gridH + LEGEND_H);
      svg.attr("viewBox", `0 0 ${width} ${height}`).attr("height", height);

      /* --- column headers --- */
      colLabels
        .attr("font-size", font)
        .attr("text-anchor", rotateLabels ? "start" : "middle")
        .attr("transform", (_, i) => {
          const x = gutter + i * cellW + cellW / 2;
          const y = headerH - font * 0.7;
          return rotateLabels
            ? `translate(${x},${y}) rotate(-45)`
            : `translate(${x},${y})`;
        })
        .each(function (d) {
          if (rotateLabels) this.textContent = d;
          else fitText(this, d, Math.max(cellW - 6, 12));
        });

      colHits
        .attr("x", (_, i) => gutter + i * cellW)
        .attr("y", 0)
        .attr("width", cellW)
        .attr("height", headerH);

      /* --- row headers: label above, canonical weight below --- */
      const barMax = Math.min(gutter * 0.62, 88);
      rowHeaders.attr(
        "transform",
        (_, i) => `translate(0,${headerH + i * rowH})`,
      );
      rowLabels
        .attr("font-size", font)
        .attr("x", 0)
        .attr("y", rowH * 0.42)
        .attr("dominant-baseline", "middle")
        .each(function (d) {
          fitText(this, d, gutter - 12);
        });
      canonTrack
        .attr("x", 0)
        .attr("y", rowH * 0.66)
        .attr("width", barMax)
        .attr("height", 3);
      canonFill
        .attr("x", 0)
        .attr("y", rowH * 0.66)
        .attr("width", (_, i) => Math.max(MATRIX.canonical[i] * barMax, 1))
        .attr("height", 3);
      rowHits.attr("x", 0).attr("width", gutter - 4).attr("height", rowH);

      /* --- cells --- */
      cells
        .attr("x", (d) => gutter + d.col * cellW + CELL_GAP / 2)
        .attr("y", (d) => headerH + d.row * rowH + CELL_GAP / 2)
        .attr("width", Math.max(cellW - CELL_GAP, 1))
        .attr("height", Math.max(rowH - CELL_GAP, 1));

      /* --- legend --- */
      const legendY = headerH + gridH + 16;
      const legendW = Math.min(gridW, LEGEND_MAX_W);
      legendGroup.attr("transform", `translate(0,${legendY})`);
      legendKeyBar.attr("x", 0).attr("y", 2).attr("width", Math.min(barMax, 44));
      legendKeyText
        .attr("font-size", Math.max(font * 0.86, 8))
        .attr("x", Math.min(barMax, 44) + 8)
        .attr("y", 4)
        .attr("dominant-baseline", "middle")
        .each(function () {
          fitText(this, "canonical weight", gutter - Math.min(barMax, 44) - 14);
        });
      legendBar.attr("x", gutter).attr("y", 0).attr("width", legendW);
      legendTicks
        .attr("font-size", Math.max(font * 0.86, 8))
        .attr("y", 20)
        .attr("x", (i) => gutter + (legendW * i) / 2)
        .attr("text-anchor", (i) =>
          i === 0 ? "start" : i === 1 ? "middle" : "end",
        );

      positionFocusRing();
    }

    /* --------------------------------------------------------- encodings */
    function paintLegend(animate: boolean): void {
      const ramp = currentMode === "observed" ? observedRamp : gapRamp;
      const stopColour = (i: number): string => ramp(i / (LEGEND_STOPS - 1));
      if (animate) {
        legendStops
          .transition("legend")
          .duration(MODE_MS)
          .attr("stop-color", stopColour);
      } else {
        legendStops.interrupt("legend").attr("stop-color", stopColour);
      }
      const ticks =
        currentMode === "observed"
          ? ["0", "0.5", "1.0"]
          : [signed(-GAP_DOMAIN), "0", signed(GAP_DOMAIN)];
      legendTicks.text((i) => ticks[i]);
    }

    function paintCells(animate: boolean): void {
      if (animate && !motionReduced) {
        cells
          .transition("mode")
          .duration(MODE_MS)
          .delay((d) => (d.row + d.col) * MODE_STAGGER_MS)
          .attr("fill", colourFor);
      } else {
        cells.interrupt("mode").attr("fill", colourFor);
      }
      paintLegend(animate && !motionReduced);
    }

    /* ------------------------------------------------------- highlighting */
    let hoverRow: number | null = null;
    let hoverCol: number | null = null;

    function applyHighlight(): void {
      const active = hoverRow !== null || hoverCol !== null;
      cells.style("opacity", (d) =>
        !active || d.row === hoverRow || d.col === hoverCol ? 1 : 0.22,
      );
      rowLabels.attr("fill", (_, i) =>
        i === hoverRow ? INK.ivory : INK.ivoryFaint,
      );
      colLabels.attr("fill", (_, i) =>
        i === hoverCol ? INK.ivory : INK.ivoryFaint,
      );
    }

    function setHover(row: number | null, col: number | null): void {
      if (row === hoverRow && col === hoverCol) return;
      hoverRow = row;
      hoverCol = col;
      applyHighlight();
    }

    /* ----------------------------------------------------------- tooltip */
    function showTip(cell: CurriculumCell): void {
      tipHead.textContent = `${cell.topic} × ${cell.program}`;
      tipCanonical.value.textContent = fmt(cell.canonical);
      tipObserved.value.textContent = fmt(cell.observed);
      tipGap.value.textContent = signed(cell.gap);
      tipGap.value.style.color =
        cell.gap <= CLEAR_GAP ? INK.oxide : cell.gap > 0 ? INK.goldBright : INK.ivory;

      tip.style.opacity = "1";
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const cx = gutter + cell.col * cellW + cellW / 2;
      const cy = headerH + cell.row * rowH;
      const left = clamp(cx - tw / 2, 2, Math.max(2, width - tw - 2));
      const top = cy - th - 8 < 0 ? cy + rowH + 8 : cy - th - 8;
      tip.style.transform = `translate(${Math.round(left)}px,${Math.round(top)}px)`;
    }

    function hideTip(): void {
      tip.style.opacity = "0";
    }

    /* ------------------------------------------------------- focus & keys */
    let focused: CurriculumCell | null = null;

    function positionFocusRing(): void {
      if (!focused) return;
      focusRing
        .attr("x", gutter + focused.col * cellW + CELL_GAP / 2 - 2)
        .attr("y", headerH + focused.row * rowH + CELL_GAP / 2 - 2)
        .attr("width", Math.max(cellW - CELL_GAP, 1) + 4)
        .attr("height", Math.max(rowH - CELL_GAP, 1) + 4);
    }

    const cellNodes = cells.nodes();
    const nodeAt = (row: number, col: number): SVGRectElement | undefined =>
      cellNodes[row * PROGRAMS.length + col];

    cells
      .on("pointerenter", (_event: PointerEvent, d: CurriculumCell) => {
        setHover(d.row, d.col);
        showTip(d);
      })
      .on("pointerleave", () => {
        if (!focused) {
          setHover(null, null);
          hideTip();
        }
      })
      .on("focus", (_event: FocusEvent, d: CurriculumCell) => {
        focused = d;
        cells.attr("tabindex", (c) => (c === d ? 0 : -1));
        setHover(d.row, d.col);
        positionFocusRing();
        focusRing.attr("opacity", 0.85);
        showTip(d);
      })
      .on("blur", () => {
        focused = null;
        focusRing.attr("opacity", 0);
        setHover(null, null);
        hideTip();
      });

    gridGroup.on("keydown", (event: KeyboardEvent) => {
      if (!(event.target instanceof SVGRectElement)) return;
      const datum = d3
        .select<SVGRectElement, CurriculumCell>(event.target)
        .datum();
      if (!datum) return;
      let { row, col } = datum;
      switch (event.key) {
        case "ArrowRight":
          col += 1;
          break;
        case "ArrowLeft":
          col -= 1;
          break;
        case "ArrowDown":
          row += 1;
          break;
        case "ArrowUp":
          row -= 1;
          break;
        case "Home":
          col = 0;
          break;
        case "End":
          col = PROGRAMS.length - 1;
          break;
        case "Escape":
          event.target.blur();
          return;
        default:
          return;
      }
      event.preventDefault();
      const next = nodeAt(
        clamp(row, 0, TOPICS.length - 1),
        clamp(col, 0, PROGRAMS.length - 1),
      );
      next?.focus();
    });

    /* Whole-row and whole-column highlighting from the headers. */
    rowHits.each(function (_d, i) {
      d3.select(this)
        .on("pointerenter", () => setHover(i, null))
        .on("pointerleave", () => {
          if (!focused) setHover(null, null);
        });
    });
    colHits.each(function (_d, i) {
      d3.select(this)
        .on("pointerenter", () => setHover(null, i))
        .on("pointerleave", () => {
          if (!focused) setHover(null, null);
        });
    });

    /* -------------------------------------------------------- controller */
    controllerRef.current = {
      setMode(next: Mode) {
        if (next === currentMode) return;
        currentMode = next;
        paintCells(true);
      },
    };

    /* --------------------------------------------------------- observers */
    let lastWidth = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      const w = Math.round(rect.width);
      if (w <= 0 || w === lastWidth) return;
      lastWidth = w;
      layout(w);
      hideTip();
    });
    resizeObserver.observe(host);

    const onMotionChange = (event: MediaQueryListEvent): void => {
      motionReduced = event.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    /* -------------------------------------------------------- first paint */
    layout(host.clientWidth || 360);
    lastWidth = Math.round(host.clientWidth) || 0;
    paintCells(false);

    let entrance: gsap.core.Timeline | null = null;
    if (!motionReduced) {
      entrance = gsap.timeline({
        scrollTrigger: { trigger: host, start: "top 82%", once: true },
        onComplete: () => {
          gsap.set(cellNodes, { clearProps: "transform,opacity" });
          gsap.set(
            [
              ...rowHeaderGroup.nodes(),
              ...colHeaderGroup.nodes(),
              ...legendGroup.nodes(),
            ],
            { clearProps: "opacity" },
          );
        },
      });
      entrance
        .from(cellNodes, {
          opacity: 0,
          scale: 0.68,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "power2.out",
          /* Diagonal wavefront: the matrix fills from the first topic of the
             first program outward. */
          stagger: {
            each: ENTRANCE_STAGGER,
            grid: [TOPICS.length, PROGRAMS.length],
            from: "start",
          },
        })
        .from(
          [
            ...rowHeaderGroup.nodes(),
            ...colHeaderGroup.nodes(),
            ...legendGroup.nodes(),
          ],
          { opacity: 0, duration: 0.55, ease: "power1.out" },
          "-=0.35",
        );
    }

    /* ------------------------------------------------------------ cleanup */
    return () => {
      controllerRef.current = null;
      cells.interrupt("mode").on(".", null);
      legendStops.interrupt("legend");
      gridGroup.on("keydown", null);
      rowHits.on(".", null);
      colHits.on(".", null);
      entrance?.scrollTrigger?.kill();
      entrance?.kill();
      gsap.killTweensOf(cellNodes);
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      tip.remove();
      svgNode.remove();
    };
  }, []);

  const toggleBase =
    "font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1";

  return (
    <figure className={["w-full", className ?? ""].join(" ").trim()}>
      {/* Titling only — the surrounding section owns the heading level. */}
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-serif text-lg font-light tracking-tight text-[#ede4d3]">
          Canonical curriculum × observed coverage
        </span>
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#8d867a]">
          {TOPICS.length} topics · {PROGRAMS.length} programs
        </span>
      </figcaption>

      <div
        role="group"
        aria-label="Cell encoding"
        className="mb-4 flex flex-wrap gap-2"
      >
        {(["observed", "gap"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => {
              modeRef.current = option;
              setMode(option);
              controllerRef.current?.setMode(option);
            }}
            className={[
              toggleBase,
              mode === option
                ? "border-[#c8a45c]/60 bg-[#c8a45c]/10 text-[#e0c184] focus-visible:ring-[#e0c184]"
                : "border-[#ede4d3]/12 text-[#8d867a] hover:border-[#ede4d3]/30 hover:text-[#c9c0b1] focus-visible:ring-[#c8a45c]",
            ].join(" ")}
          >
            {MODE_LABEL[option]}
          </button>
        ))}
      </div>

      {/* D3 owns everything inside this node — React renders it empty. */}
      <div ref={hostRef} className="relative w-full" />

      <p className="mt-4 max-w-[62ch] font-mono text-[10px] leading-relaxed tracking-[0.06em] text-[#8d867a]">
        {CLEAR_GAP_COUNT} of {CELLS.length} cells sit at least 0.25 below the
        canonical weight of their topic. Coverage values are generated from a
        seeded model of the two-source matrix — the same numbers every load.
      </p>

      <div className="sr-only">
        <table>
          <caption>
            Passway curriculum matrix — canonical weight per topic and observed
            coverage per program, each 0 to 1, with the gap in brackets
          </caption>
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Canonical weight</th>
              {PROGRAMS.map((program) => (
                <th key={program} scope="col">
                  {program}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOPICS.map((topic, row) => (
              <tr key={topic}>
                <th scope="row">{topic}</th>
                <td>{fmt(MATRIX.canonical[row])}</td>
                {PROGRAMS.map((program, col) => {
                  const cell = CELLS[row * PROGRAMS.length + col];
                  return (
                    <td key={program}>
                      {fmt(cell.observed)} (gap {fmtSigned(cell.gap)})
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
