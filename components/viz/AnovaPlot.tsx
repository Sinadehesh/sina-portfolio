"use client";

/**
 * AnovaPlot — the MSc thesis result, drawn as an estimation plot.
 *
 * Three within-subject conditions, N = 96. Each condition carries its mean,
 * a 95% CI, and a deterministic simulated cloud of per-participant points
 * (the raw data is not in the repo — the cloud is generated from the reported
 * M and SD with a seeded PRNG, and says so in the footnote and the table).
 *
 * The hero is the p = .009 contrast between "No visual feedback" and
 * "Self-referential feedback": it is the only gold in the frame.
 *
 * D3 owns the entire <svg> subtree; React owns the mount node, the mode
 * toggle, and the screen-reader table.
 */

import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { thesis } from "@/lib/data";

/* ------------------------------------------------------------------ *
 * Chiaroscuro — charcoal ground, ivory light, one gold accent.
 * ------------------------------------------------------------------ */
const INK_900 = "#0a0a0c";
const INK_800 = "#101013";
const IVORY = "#ede4d3";
const IVORY_DIM = "#c9c0b1";
const IVORY_FAINT = "#8d867a";
const GOLD = "#c8a45c";
const GOLD_BRIGHT = "#e0c184";
const GOLD_DEEP = "#8a6d32";

const MONO = 'var(--font-mono, ui-monospace, "SFMono-Regular", monospace)';
const SERIF = 'var(--font-serif, "Cormorant Garamond", Georgia, serif)';

type Mode = "ci" | "trajectories";

interface Cond {
  id: string;
  label: string;
  mean: number;
  sd: number;
  ci: number;
  x: number;
}

interface Dot {
  /** condition index */
  c: number;
  /** participant index */
  p: number;
}

/* The p = .009 contrast, per thesis.stats: self-referential vs. none. */
const HERO_FROM = "no-feedback";
const HERO_TO = "self-feedback";

/** thesis.finding without its trailing "p = .009" — the bracket carries that. */
const CALLOUT = thesis.finding
  .replace(/,?\s*p\s*=\s*\.?[0-9.]+\s*\.?$/i, "")
  .replace(/\.$/, "");

const ARIA_LABEL =
  `Estimation plot of a repeated-measures ANOVA, N = ${thesis.n}. ` +
  thesis.conditions
    .map((c) => `${c.label}: mean ${c.mean.toFixed(2)}, SD ${c.sd.toFixed(2)}`)
    .join("; ") +
  `. The contrast between no visual feedback and self-referential feedback is significant at p = ${thesis.pValue}.`;

const FOOTNOTE = `Individual points simulated from the reported M and SD · N = ${thesis.n}`;

/* ------------------------------------------------------------------ *
 * Deterministic simulation
 * ------------------------------------------------------------------ */

/** mulberry32 — small, fast, fully deterministic across engines. */
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

/**
 * Irwin–Hall(12) standard normal. Only additions and subtractions, so the
 * result is bit-identical on every JS engine — Math.log/Math.cos (Box–Muller)
 * are implementation-defined and would not be.
 */
function gauss(rand: () => number): number {
  let s = 0;
  for (let i = 0; i < 12; i += 1) s += rand();
  return s - 6;
}

const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

/**
 * Per-participant values with a subject random effect, then rescaled so each
 * condition reproduces the published mean and SD exactly. Rescaling is linear,
 * so the within-subject correlation survives it intact.
 */
function simulate(conds: Cond[], n: number): number[][] {
  const rand = mulberry32(0x51_5a_09);
  const subjectSd = 0.55;
  const subject: number[] = [];
  for (let i = 0; i < n; i += 1) subject.push(gauss(rand));

  const raw: number[][] = [];
  for (let i = 0; i < n; i += 1) raw.push([]);

  conds.forEach((c, j) => {
    const residSd = Math.sqrt(Math.max(0.05, c.sd * c.sd - subjectSd * subjectSd));
    for (let i = 0; i < n; i += 1) {
      raw[i][j] = c.mean + subject[i] * subjectSd + gauss(rand) * residSd;
    }
  });

  conds.forEach((c, j) => {
    const col = raw.map((r) => r[j]);
    const m = d3.mean(col) ?? c.mean;
    const s = d3.deviation(col) ?? c.sd;
    const k = s === 0 ? 0 : c.sd / s;
    for (let i = 0; i < n; i += 1) raw[i][j] = c.mean + (raw[i][j] - m) * k;
  });

  return raw;
}

/** Deterministic jitter offsets in [-1, 1], one per participant/condition. */
function jitterOffsets(n: number, conds: number): number[][] {
  const rand = mulberry32(0x0b_ad_5e);
  const out: number[][] = [];
  for (let i = 0; i < n; i += 1) {
    const row: number[] = [];
    for (let j = 0; j < conds; j += 1) row.push(rand() * 2 - 1);
    out.push(row);
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Text helpers
 * ------------------------------------------------------------------ */

/** Split on whitespace, keeping hyphenated fragments splittable. */
function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .flatMap((w) => w.split(/(?<=-)/))
    .filter((t) => t.length > 0);
}

function joinToken(line: string, token: string): string {
  if (line.length === 0) return token;
  return line.endsWith("-") ? line + token : `${line} ${token}`;
}

/** Wrap against a measured advance width (accurate for any face). */
function wrapMeasured(
  text: string,
  maxWidth: number,
  maxLines: number,
  measure: (s: string) => number,
): string[] {
  const tokens = tokenize(text);
  const lines: string[] = [];
  let line = "";
  for (const t of tokens) {
    const next = joinToken(line, t);
    if (line !== "" && measure(next) > maxWidth) {
      lines.push(line);
      line = t;
      if (lines.length === maxLines) break;
    } else {
      line = next;
    }
  }
  if (line !== "" && lines.length < maxLines) lines.push(line);
  return lines.length > 0 ? lines : [text];
}

const fmt2 = d3.format(".2f");

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export default function AnovaPlot({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<{ setMode: (m: Mode, animate: boolean) => void } | null>(null);
  const [mode, setMode] = useState<Mode>("ci");
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------- data ---------------- */
    const conds: Cond[] = thesis.conditions.map((c) => ({
      id: c.id,
      label: c.label,
      mean: c.mean,
      sd: c.sd,
      ci: c.ci,
      x: 0,
    }));
    const n = thesis.n;
    const values = simulate(conds, n);
    const offsets = jitterOffsets(n, conds.length);

    const heroA = Math.max(
      0,
      conds.findIndex((c) => c.id === HERO_FROM),
    );
    const heroBRaw = conds.findIndex((c) => c.id === HERO_TO);
    const heroB = heroBRaw < 0 ? conds.length - 1 : heroBRaw;

    const dots: Dot[] = [];
    for (let p = 0; p < n; p += 1) {
      for (let c = 0; c < conds.length; c += 1) dots.push({ c, p });
    }

    const flat = values.flat();
    const vMin = d3.min(flat) ?? 0;
    const vMax = d3.max(flat) ?? 1;

    /* ---------------- svg scaffold ---------------- */
    const svg = d3
      .select(host)
      .append("svg")
      .attr("role", "img")
      .attr("aria-label", ARIA_LABEL)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("display", "block")
      .style("width", "100%")
      .style("max-width", "100%")
      .style("height", "auto");

    svg.append("title").text(`${thesis.name} — repeated-measures ANOVA`);
    svg.append("desc").text(ARIA_LABEL);

    /* hidden probe used to measure real advance widths before wrapping */
    const probe = svg
      .append("text")
      .attr("x", -9999)
      .attr("y", -9999)
      .attr("visibility", "hidden")
      .attr("aria-hidden", "true");
    const measureWith = (family: string, size: number) => (s: string): number => {
      probe.attr("font-family", family).attr("font-size", size).text(s);
      const node = probe.node();
      return node ? node.getComputedTextLength() : s.length * size * 0.55;
    };

    const gAxis = svg.append("g").attr("class", "an-axis");
    const gTraj = svg.append("g").attr("class", "an-traj").attr("fill", "none");
    const gPoints = svg.append("g").attr("class", "an-points");
    const gMeans = svg.append("g").attr("class", "an-means");
    const gSig = svg.append("g").attr("class", "an-sig");
    const gCallout = svg.append("g").attr("class", "an-callout");
    const gFoot = svg.append("g").attr("class", "an-foot");
    const gHit = svg.append("g").attr("class", "an-hit");
    const gReadout = svg
      .append("g")
      .attr("class", "an-readout")
      .attr("pointer-events", "none")
      .style("opacity", 0);

    /* y axis + its title */
    const yAxisG = gAxis.append("g").attr("class", "an-yaxis");
    const yTitle = gAxis
      .append("text")
      .attr("class", "an-ytitle")
      .attr("fill", IVORY_FAINT)
      .attr("font-family", MONO)
      .attr("letter-spacing", "0.22em")
      .attr("text-anchor", "middle")
      .text("EXPRESSIVENESS");
    const xLabelSel = gAxis
      .selectAll<SVGTextElement, Cond>("text.an-xlabel")
      .data(conds, (d) => d.id)
      .join("text")
      .attr("class", "an-xlabel")
      .attr("fill", IVORY_DIM)
      .attr("font-family", MONO)
      .attr("letter-spacing", "0.1em")
      .attr("text-anchor", "middle");

    /* trajectories, cloud, means */
    const trajSel = gTraj
      .selectAll<SVGPathElement, number>("path")
      .data(d3.range(n))
      .join("path")
      .attr("fill", "none")
      .attr("stroke", IVORY_FAINT)
      .attr("stroke-width", 0.7)
      .attr("stroke-linejoin", "round");

    const dotSel = gPoints
      .selectAll<SVGCircleElement, Dot>("circle")
      .data(dots)
      .join("circle")
      .attr("fill", IVORY_FAINT)
      .attr("r", 1.8);

    const meanPath = gMeans
      .append("path")
      .attr("class", "an-meanline")
      .attr("fill", "none")
      .attr("stroke", IVORY)
      .attr("stroke-width", 1.2)
      .attr("stroke-opacity", 0.55);

    /* error bars: outer <g> carries the position, inner <g> the scale, so
       GSAP can extend them without fighting the layout transform */
    const barSel = gMeans
      .selectAll<SVGGElement, Cond>("g.an-bar")
      .data(conds, (d) => d.id)
      .join("g")
      .attr("class", "an-bar");
    const barInnerSel = barSel.append("g").attr("class", "an-bar-inner");
    barInnerSel
      .append("line")
      .attr("class", "an-bar-stem")
      .attr("stroke", IVORY_DIM)
      .attr("stroke-width", 1.3);
    barInnerSel
      .append("line")
      .attr("class", "an-bar-cap-top")
      .attr("stroke", IVORY_DIM)
      .attr("stroke-width", 1.3);
    barInnerSel
      .append("line")
      .attr("class", "an-bar-cap-bottom")
      .attr("stroke", IVORY_DIM)
      .attr("stroke-width", 1.3);

    const meanDotSel = gMeans
      .selectAll<SVGCircleElement, Cond>("circle.an-mean")
      .data(conds, (d) => d.id)
      .join("circle")
      .attr("class", "an-mean")
      .attr("fill", IVORY)
      /* 2px ground-coloured ring keeps the mean legible over the cloud */
      .attr("stroke", INK_900)
      .attr("stroke-width", 2)
      .attr("r", 4.6);
    const heroRing = gMeans
      .append("circle")
      .attr("class", "an-hero-ring")
      .attr("fill", "none")
      .attr("stroke", GOLD)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.85);

    /* significance bracket — the hero */
    const sigPath = gSig
      .append("path")
      .attr("fill", "none")
      .attr("stroke", GOLD)
      .attr("stroke-width", 1.3)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");
    const sigLabel = gSig
      .append("text")
      .attr("fill", GOLD_BRIGHT)
      .attr("font-family", MONO)
      .attr("letter-spacing", "0.14em")
      .attr("text-anchor", "middle")
      .text(`p = ${thesis.pValue}`);

    /* callout */
    const calloutRule = gCallout
      .append("line")
      .attr("stroke", GOLD)
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 0.65);
    const calloutText = gCallout
      .append("text")
      .attr("fill", IVORY)
      .attr("font-family", SERIF)
      .attr("font-style", "italic");

    /* footnote */
    const footText = gFoot
      .append("text")
      .attr("fill", IVORY_FAINT)
      .attr("font-family", MONO)
      .attr("letter-spacing", "0.08em")
      .attr("fill-opacity", 0.75)
      .text(FOOTNOTE);

    /* readout */
    const readoutBg = gReadout
      .append("rect")
      .attr("fill", INK_800)
      .attr("fill-opacity", 0.94)
      .attr("stroke", GOLD_DEEP)
      .attr("stroke-opacity", 0.5)
      .attr("rx", 2);
    const readoutText = gReadout
      .append("text")
      .attr("fill", IVORY)
      .attr("font-family", MONO)
      .attr("letter-spacing", "0.06em");

    /* hit areas */
    const hitSel = gHit
      .selectAll<SVGRectElement, Cond>("rect")
      .data(conds, (d) => d.id)
      .join("rect")
      .attr("fill", "transparent")
      .attr("tabindex", 0)
      .style("cursor", "crosshair")
      .style("outline", "none");
    const hitFocusSel = gHit
      .selectAll<SVGRectElement, Cond>("rect.an-focus")
      .data(conds, (d) => d.id)
      .enter()
      .append("rect")
      .attr("class", "an-focus")
      .attr("fill", "none")
      .attr("stroke", GOLD_BRIGHT)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3 3")
      .attr("pointer-events", "none")
      .style("opacity", 0);

    /* ---------------- scales & layout state ---------------- */
    const x = d3.scalePoint<string>().domain(conds.map((c) => c.id)).padding(0.5);
    const y = d3.scaleLinear();
    const line = d3.line();

    let vbW = 0;
    let vbH = 0;
    let plotTop = 0;
    let plotBottom = 0;
    let bandW = 0;
    let jitterHalf = 12;
    let jitterFactor = 1;
    let fontTick = 10;
    let fontRead = 10;
    let entered = reduceMotion;
    let currentMode: Mode = modeRef.current;

    const cxOf = (p: number, c: number): number =>
      conds[c].x + offsets[p][c] * jitterHalf * jitterFactor;

    function positionCloud(): void {
      dotSel.attr("cx", (d) => cxOf(d.p, d.c)).attr("cy", (d) => y(values[d.p][d.c]));
      trajSel.attr("d", (p) => {
        const pts: [number, number][] = conds.map((_c, j) => [
          cxOf(p, j),
          y(values[p][j]),
        ]);
        return line(pts) ?? "";
      });
    }

    const layout = (): void => {
      const w = Math.round(host.clientWidth);
      if (w < 8) return;

      const narrow = w < 470;
      const fAxis = narrow ? 9 : 10;
      fontTick = narrow ? 9 : 10;
      fontRead = narrow ? 9 : 10;
      const fNote = narrow ? 13 : 15.5;
      const fP = narrow ? 13 : 15;
      const fFoot = narrow ? 8 : 8.75;

      const mLeft = narrow ? 34 : 44;
      const mRight = narrow ? 12 : 18;

      /* callout band */
      const measureSerif = measureWith(SERIF, fNote);
      const calloutLines = wrapMeasured(CALLOUT, w - 4, 3, measureSerif);
      const calloutTop = 6;
      const calloutH =
        calloutTop + 9 + fNote + (calloutLines.length - 1) * (fNote + 4) + 12;

      const bracketBand = Math.round(fP + 23);
      plotTop = Math.round(calloutH + bracketBand);
      const plotH = Math.round(clamp(w * 0.46, 170, 310));
      plotBottom = plotTop + plotH;

      const xLines = narrow ? 3 : 2;
      const xLabelH = 12 + xLines * (fAxis + 3);
      vbW = w;
      vbH = Math.round(plotBottom + xLabelH + fFoot + 14);

      svg.attr("viewBox", `0 0 ${vbW} ${vbH}`).attr("height", vbH);

      x.range([mLeft, w - mRight]);
      conds.forEach((c) => {
        c.x = x(c.id) ?? mLeft;
      });
      bandW = (w - mLeft - mRight) / conds.length;
      jitterHalf = Math.min(bandW * 0.2, 26);

      const pad = (vMax - vMin) * 0.06;
      y.domain([vMin - pad, vMax + pad]).range([plotBottom, plotTop]).nice(4);

      /* y axis */
      yAxisG
        .attr("transform", `translate(${mLeft},0)`)
        .call(d3.axisLeft(y).ticks(4).tickSize(-4).tickPadding(6))
        .call((g) => {
          g.select(".domain")
            .attr("stroke", IVORY_FAINT)
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1);
          g.selectAll(".tick line")
            .attr("stroke", IVORY_FAINT)
            .attr("stroke-opacity", 0.4);
          g.selectAll(".tick text")
            .attr("fill", IVORY_FAINT)
            .attr("font-family", MONO)
            .attr("font-size", fontTick)
            .attr("letter-spacing", "0.06em");
        });

      yTitle
        .attr("font-size", fAxis - 1)
        .attr(
          "transform",
          `translate(${narrow ? 9 : 12},${(plotTop + plotBottom) / 2}) rotate(-90)`,
        );

      /* x labels, wrapped against the real mono advance */
      const measureMono = measureWith(MONO, fAxis);
      xLabelSel
        .attr("font-size", fAxis)
        .attr("transform", (d) => `translate(${d.x},${plotBottom + 12 + fAxis})`)
        .attr("fill", (_d, i) =>
          i === heroB ? IVORY : IVORY_DIM,
        )
        .each(function (d) {
          const lines = wrapMeasured(d.label, bandW - 8, xLines, measureMono);
          d3.select(this)
            .selectAll<SVGTSpanElement, string>("tspan")
            .data(lines)
            .join("tspan")
            .attr("x", 0)
            .attr("dy", (_l, i) => (i === 0 ? 0 : fAxis + 3))
            .text((l) => l);
        });

      /* cloud + trajectories */
      positionCloud();

      /* means, error bars, hero ring */
      const meanPts: [number, number][] = conds.map((c) => [c.x, y(c.mean)]);
      meanPath.attr("d", line(meanPts) ?? "");

      barSel.attr("transform", (d) => `translate(${d.x},${y(d.mean)})`);
      barInnerSel.each(function (d) {
        const h = Math.abs(y(d.mean - d.ci) - y(d.mean));
        const capW = Math.min(7, Math.max(4, bandW * 0.045));
        const g = d3.select(this);
        g.select("line.an-bar-stem").attr("x1", 0).attr("x2", 0).attr("y1", -h).attr("y2", h);
        g.select("line.an-bar-cap-top")
          .attr("x1", -capW)
          .attr("x2", capW)
          .attr("y1", -h)
          .attr("y2", -h);
        g.select("line.an-bar-cap-bottom")
          .attr("x1", -capW)
          .attr("x2", capW)
          .attr("y1", h)
          .attr("y2", h);
      });

      meanDotSel.attr("cx", (d) => d.x).attr("cy", (d) => y(d.mean));
      heroRing
        .attr("cx", conds[heroB].x)
        .attr("cy", y(conds[heroB].mean))
        .attr("r", 9.5);

      /* significance bracket */
      const bx0 = conds[heroA].x;
      const bx1 = conds[heroB].x;
      const drop = 9;
      const bTop = plotTop - drop - 5;
      sigPath.attr(
        "d",
        `M ${bx0} ${bTop + drop} V ${bTop} H ${bx1} V ${bTop + drop}`,
      );
      sigLabel
        .attr("font-size", fP)
        .attr("x", (bx0 + bx1) / 2)
        .attr("y", bTop - 7);

      /* callout */
      calloutRule
        .attr("x1", 0)
        .attr("x2", 26)
        .attr("y1", calloutTop)
        .attr("y2", calloutTop);
      calloutText
        .attr("font-size", fNote)
        .attr("x", 0)
        .attr("y", calloutTop + 9 + fNote)
        .selectAll<SVGTSpanElement, string>("tspan")
        .data(calloutLines)
        .join("tspan")
        .attr("x", 0)
        .attr("dy", (_l, i) => (i === 0 ? 0 : fNote + 4))
        .text((l) => l);

      /* footnote */
      footText.attr("font-size", fFoot).attr("x", 0).attr("y", vbH - 4);

      /* hit areas */
      hitSel
        .attr("x", (d) => d.x - bandW / 2)
        .attr("y", plotTop - 6)
        .attr("width", bandW)
        .attr("height", plotBottom - plotTop + 12);
      hitFocusSel
        .attr("x", (d) => d.x - bandW / 2 + 1)
        .attr("y", plotTop - 5)
        .attr("width", bandW - 2)
        .attr("height", plotBottom - plotTop + 10);

      readoutText.attr("font-size", fontRead);
      hideReadout();
    };

    /* ---------------- readout ---------------- */
    function hideReadout(): void {
      gReadout.style("opacity", 0);
    }

    function showReadout(d: Cond): void {
      const lo = fmt2(d.mean - d.ci);
      const hi = fmt2(d.mean + d.ci);
      const lines = [
        `${d.label.toUpperCase()}`,
        `M ${fmt2(d.mean)}   SD ${fmt2(d.sd)}`,
        `95% CI [${lo}, ${hi}]   n = ${n}`,
      ];
      /* Measure from a known origin — reusing the previous y would compound. */
      readoutText.attr("x", 0).attr("y", 0);
      const tspans = readoutText
        .selectAll<SVGTSpanElement, string>("tspan")
        .data(lines)
        .join("tspan")
        .attr("x", 0)
        .attr("dy", (_l, i) => (i === 0 ? 0 : fontRead + 4))
        .attr("fill", (_l, i) => (i === 0 ? IVORY_FAINT : IVORY))
        .text((l) => l);

      const node = readoutText.node();
      if (!node) return;
      const box = node.getBBox();
      const padX = 8;
      const padY = 7;
      const boxW = box.width + padX * 2;
      const boxH = box.height + padY * 2;

      const cx = clamp(d.x, boxW / 2 + 2, Math.max(boxW / 2 + 2, vbW - boxW / 2 - 2));
      const anchorY = y(d.mean) - 18 - boxH;
      const top = clamp(anchorY, plotTop + 2, plotBottom - boxH - 2);

      readoutBg
        .attr("x", -boxW / 2)
        .attr("y", 0)
        .attr("width", boxW)
        .attr("height", boxH);
      readoutText.attr("x", -boxW / 2 + padX).attr("y", padY - box.y);
      tspans.attr("x", -boxW / 2 + padX);

      gReadout.attr("transform", `translate(${cx},${top})`).style("opacity", 1);
    }

    /* ---------------- emphasis ---------------- */
    function emphasise(index: number | null): void {
      const dur = reduceMotion ? 0 : 160;
      const on = (i: number): number => (index === null || index === i ? 1 : 0.28);

      meanDotSel.transition().duration(dur).style("opacity", (_d, i) => on(i));
      barSel.transition().duration(dur).style("opacity", (_d, i) => on(i));
      xLabelSel.transition().duration(dur).style("opacity", (_d, i) => on(i));
      dotSel
        .transition()
        .duration(dur)
        .style("opacity", (d) => (index === null || index === d.c ? 1 : 0.25));
    }

    /* ---------------- mode ---------------- */
    function applyMode(next: Mode, animate: boolean): void {
      currentMode = next;
      const traj = next === "trajectories";
      const dur = animate && !reduceMotion ? 620 : 0;
      const targetJitter = traj ? 0.34 : 1;
      const trajOpacity = traj ? 0.55 : 0;
      const cloudOpacity = traj ? 0.5 : 0.32;
      const dotR = traj ? 1.5 : 1.8;
      const barOpacity = traj ? 0.35 : 1;
      const lineOpacity = traj ? 0.9 : 0.55;
      const lineWidth = traj ? 1.6 : 1.2;

      if (dur === 0) {
        gTraj.style("opacity", trajOpacity);
        gPoints.style("opacity", cloudOpacity);
        dotSel.attr("r", dotR);
        barSel.style("opacity", barOpacity);
        meanPath.attr("stroke-opacity", lineOpacity).attr("stroke-width", lineWidth);
        jitterFactor = targetJitter;
        positionCloud();
        return;
      }

      gTraj.transition("mode").duration(dur).style("opacity", trajOpacity);
      gPoints.transition("mode").duration(dur).style("opacity", cloudOpacity);
      dotSel.transition("mode").duration(dur).attr("r", dotR);
      barSel.transition("mode").duration(dur).style("opacity", barOpacity);
      meanPath
        .transition("mode")
        .duration(dur)
        .attr("stroke-opacity", lineOpacity)
        .attr("stroke-width", lineWidth);

      /* One tween drives both the dots and the paths, so a participant's
         line always terminates exactly on that participant's dot. */
      const from = jitterFactor;
      gTraj
        .transition("jitter")
        .duration(dur)
        .ease(d3.easeCubicInOut)
        .tween("jitter", () => {
          const i = d3.interpolateNumber(from, targetJitter);
          return (t: number) => {
            jitterFactor = i(t);
            positionCloud();
          };
        });
    }

    /* ---------------- events ---------------- */
    hitSel
      .on("mouseenter", (_event, d) => {
        emphasise(conds.indexOf(d));
        showReadout(d);
      })
      .on("mouseleave", () => {
        emphasise(null);
        hideReadout();
      })
      .on("focus", (_event, d) => {
        const i = conds.indexOf(d);
        hitFocusSel.style("opacity", (_f, fi) => (fi === i ? 1 : 0));
        emphasise(i);
        showReadout(d);
      })
      .on("blur", () => {
        hitFocusSel.style("opacity", 0);
        emphasise(null);
        hideReadout();
      });

    /* ---------------- first paint ---------------- */
    layout();
    applyMode(currentMode, false);

    apiRef.current = {
      setMode: (m: Mode, animate: boolean) => {
        if (m !== currentMode) applyMode(m, animate);
      },
    };

    /* ---------------- entrance ---------------- */
    let tl: gsap.core.Timeline | null = null;

    if (!reduceMotion) {
      gsap.registerPlugin(ScrollTrigger);

      const domainNode = yAxisG.select<SVGPathElement>(".domain").node();
      const domainLen = domainNode ? domainNode.getTotalLength() : 0;
      if (domainNode) {
        d3.select(domainNode)
          .attr("stroke-dasharray", `${domainLen} ${domainLen}`)
          .attr("stroke-dashoffset", domainLen);
      }
      const sigNode = sigPath.node();
      const sigLen = sigNode ? sigNode.getTotalLength() : 0;
      if (sigNode) {
        sigPath
          .attr("stroke-dasharray", `${sigLen} ${sigLen}`)
          .attr("stroke-dashoffset", sigLen);
      }

      gsap.set(yAxisG.selectAll(".tick").nodes(), { opacity: 0 });
      gsap.set(xLabelSel.nodes(), { opacity: 0 });
      gsap.set(yTitle.nodes(), { opacity: 0 });
      gsap.set(dotSel.nodes(), { opacity: 0, y: 12 });
      gsap.set(barInnerSel.nodes(), { scaleY: 0, transformOrigin: "50% 50%" });
      gsap.set(meanDotSel.nodes(), { opacity: 0 });
      gsap.set([meanPath.node(), heroRing.node()].filter(Boolean), { opacity: 0 });
      gsap.set(sigLabel.nodes(), { opacity: 0 });
      gsap.set(gCallout.nodes(), { opacity: 0 });
      gsap.set(gFoot.nodes(), { opacity: 0 });

      tl = gsap.timeline({
        scrollTrigger: { trigger: host, start: "top 82%", once: true },
        onComplete: () => {
          entered = true;
          if (sigNode) {
            sigPath.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
          }
          if (domainNode) {
            d3.select(domainNode)
              .attr("stroke-dasharray", null)
              .attr("stroke-dashoffset", null);
          }
        },
      });

      if (domainNode) {
        tl.to(domainNode, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 0);
      }
      tl.to(yAxisG.selectAll(".tick").nodes(), { opacity: 1, duration: 0.4, stagger: 0.05 }, 0.15)
        .to(yTitle.nodes(), { opacity: 1, duration: 0.4 }, 0.2)
        .to(xLabelSel.nodes(), { opacity: 1, duration: 0.45, stagger: 0.08 }, 0.25)
        .to(
          dotSel.nodes(),
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: { amount: 0.7, from: "start" },
          },
          0.3,
        )
        .to(
          barInnerSel.nodes(),
          { scaleY: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 },
          "-=0.35",
        )
        .to(meanDotSel.nodes(), { opacity: 1, duration: 0.35, stagger: 0.1 }, "<")
        .to([meanPath.node(), heroRing.node()].filter(Boolean), { opacity: 1, duration: 0.45 }, "-=0.2")
        .to(gFoot.nodes(), { opacity: 1, duration: 0.4 }, "<")
        .to(gCallout.nodes(), { opacity: 1, duration: 0.5 }, "-=0.25");

      if (sigNode) {
        tl.to(sigNode, { strokeDashoffset: 0, duration: 0.75, ease: "power2.inOut" }, "-=0.15");
      }
      tl.to(sigLabel.nodes(), { opacity: 1, duration: 0.4 }, "-=0.25");
    }

    /* ---------------- resize ---------------- */
    let lastW = Math.round(host.clientWidth);
    const ro = new ResizeObserver(() => {
      const w = Math.round(host.clientWidth);
      if (w === lastW) return;
      lastW = w;
      /* Finish the entrance rather than let a relayout fight its tweens. */
      if (tl && !entered && tl.progress() > 0) tl.progress(1);
      layout();
      if (!entered && tl) {
        const dn = yAxisG.select<SVGPathElement>(".domain").node();
        if (dn) {
          const l = dn.getTotalLength();
          d3.select(dn)
            .attr("stroke-dasharray", `${l} ${l}`)
            .attr("stroke-dashoffset", l);
        }
        const sn = sigPath.node();
        if (sn) {
          const l = sn.getTotalLength();
          sigPath.attr("stroke-dasharray", `${l} ${l}`).attr("stroke-dashoffset", l);
        }
      }
    });
    ro.observe(host);

    /* ---------------- cleanup ---------------- */
    return () => {
      ro.disconnect();
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
      apiRef.current = null;
      hitSel.on("mouseenter", null).on("mouseleave", null).on("focus", null).on("blur", null);
      svg.interrupt();
      svg.selectAll("*").interrupt();
      svg.remove();
      host.replaceChildren();
    };
  }, []);

  useEffect(() => {
    apiRef.current?.setMode(mode, true);
  }, [mode]);

  const btn = (active: boolean): string =>
    [
      "font-mono text-[0.625rem] uppercase tracking-[0.22em] transition-colors duration-200",
      "border-b pb-1 outline-none focus-visible:ring-1 focus-visible:ring-[#e0c184]",
      active
        ? "border-[#c8a45c] text-[#e0c184]"
        : "border-transparent text-[#8d867a] hover:text-[#c9c0b1]",
    ].join(" ");

  return (
    <figure className={className}>
      <div
        role="group"
        aria-label="Chart display mode"
        className="mb-4 flex flex-wrap items-center justify-end gap-x-6 gap-y-2"
      >
        <button
          type="button"
          aria-pressed={mode === "ci"}
          onClick={() => setMode("ci")}
          className={btn(mode === "ci")}
        >
          Means ± 95% CI
        </button>
        <button
          type="button"
          aria-pressed={mode === "trajectories"}
          onClick={() => setMode("trajectories")}
          className={btn(mode === "trajectories")}
        >
          Individual trajectories
        </button>
      </div>

      <div ref={hostRef} className="w-full max-w-full" />

      <figcaption className="sr-only">
        <p>{thesis.summary}</p>
        <p>{thesis.finding}</p>
        <p>
          The individual points and trajectories shown are simulated from each
          condition&rsquo;s reported mean and standard deviation with a fixed seed; they
          are illustrative of the distribution, not the raw response data.
        </p>
        <table>
          <caption>
            {thesis.name} — repeated-measures ANOVA, N = {thesis.n}
          </caption>
          <thead>
            <tr>
              <th scope="col">Condition</th>
              <th scope="col">Mean</th>
              <th scope="col">SD</th>
              <th scope="col">95% CI</th>
              <th scope="col">n</th>
            </tr>
          </thead>
          <tbody>
            {thesis.conditions.map((c) => (
              <tr key={c.id}>
                <th scope="row">{c.label}</th>
                <td>{c.mean.toFixed(2)}</td>
                <td>{c.sd.toFixed(2)}</td>
                <td>
                  [{(c.mean - c.ci).toFixed(2)}, {(c.mean + c.ci).toFixed(2)}]
                </td>
                <td>{thesis.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul>
          {thesis.stats.map((s) => (
            <li key={s.k}>
              {s.k}: {s.v}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
