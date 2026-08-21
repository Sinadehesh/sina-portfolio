"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { oopsCupid } from "@/lib/data";

/* ==========================================================================
   OopsCupid — psychometric radar.

   A replay of the platform's profile readout. Four stored profiles are
   queried in turn: a mono status line types out the query, the polygon
   deforms from the previous profile to the next, the vertices settle with a
   small overshoot, and a short psychological read fades in underneath.

   The read is composed deterministically from the scores on screen (highest
   axis, lowest axis, overall band) — this is a demo of the platform's output
   surface, not a live model call, and the caption says so.
   ========================================================================== */

/* Chiaroscuro: charcoal ground, ivory light, gold reserved as the accent. */
const INK = {
  ivory: "#ede4d3",
  ivoryDim: "#c9c0b1",
  ivoryFaint: "#8d867a",
  gold: "#c8a45c",
  goldBright: "#e0c184",
  goldDeep: "#8a6d32",
} as const;

/* Scores are 0–1, so two decimals is the honest precision. */
const fmt = d3.format(".2f");

/* --- geometry -------------------------------------------------------------
   Every number here is a ratio of the measured container width, so the same
   composition holds from 360px to 1440px.                                   */
const RING_STEPS = [0.25, 0.5, 0.75, 1] as const;
const SVG_ASPECT = 0.92; // svg height as a fraction of container width
const SVG_MIN_H = 280;
const SVG_MAX_H = 560;
const RADIUS_CAP = 208; // past this the web stops growing and gains air instead
const GUTTER_RATIO = 0.15; // ring edge → svg edge: the axis-label gutter
const GUTTER_MIN = 50;
const GUTTER_MAX = 108;
const MONO_ADVANCE = 0.6; // advance width of the mono stack, in em
const LABEL_FONT_RATIO = 0.026;
const LABEL_FONT_MIN = 9.5;
const LABEL_FONT_MAX = 12.5;

/* --- timing --------------------------------------------------------------- */
const CYCLE_MS = 5000; // one full query per profile
const TYPE_MS_PER_CHAR = 17;
const PAUSE_BETWEEN_LINES_MS = 200;
const MORPH_MS = 1250;
const VERTEX_OVERSHOOT = 1.05; // d3.easeBackOut overshoot — the settle, not a bounce
const CARET_BLINK_MS = 1100;

const AXES: readonly string[] = oopsCupid.axes;
const PROFILES = oopsCupid.profiles;

/* One phrase per axis for each end of the scale. Paired with the axis order
   in lib/data.ts; `readAt` falls back to neutral wording if that list grows. */
const AXIS_READ: ReadonlyArray<{ high: string; low: string }> = [
  {
    high: "holds a steady base when the other person is unavailable",
    low: "keeps one hand on the exit while the conversation is still open",
  },
  {
    high: "returns to a rupture instead of walking past it",
    low: "lets ruptures close over unrepaired and counts that as peace",
  },
  {
    high: "names its own affect with unusual resolution",
    low: "reports feeling in broad strokes, which blunts every downstream repair",
  },
  {
    high: "leaves the other person room to stay a separate person",
    low: "narrows the other person's room to move under load",
  },
  {
    high: "builds a shared story out of ordinary weeks",
    low: "runs short on shared meaning once novelty stops supplying it",
  },
  {
    high: "extends trust at roughly the rate the evidence supports",
    low: "sets trust ahead of the evidence and audits it later",
  },
];

const NEUTRAL_READ = {
  high: "carries this axis well above the rest of the profile",
  low: "sits well below the rest of the profile on this axis",
} as const;

function readAt(index: number): { high: string; low: string } {
  return AXIS_READ[index] ?? NEUTRAL_READ;
}

const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

/** Overall band, from the profile mean. Deterministic, four buckets. */
function bandFor(mean: number): string {
  if (mean >= 0.72) return "the profile reads securely organised overall";
  if (mean >= 0.62) return "the profile reads workable, with one clear seam";
  if (mean >= 0.52) return "the profile reads mixed — strengths that do not yet cover each other";
  return "the profile reads strained across most axes";
}

/**
 * Composes the resolved-profile narrative from the scores themselves:
 * highest axis, lowest axis, and the mean band. Same input, same sentence.
 */
function narrativeFor(values: readonly number[]): string {
  let hi = 0;
  let lo = 0;
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] > values[hi]) hi = i;
    if (values[i] < values[lo]) lo = i;
  }
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  return (
    `Peaks at ${AXES[hi]} (${fmt(values[hi])}) — ${readAt(hi).high}. ` +
    `Thinnest at ${AXES[lo]} (${fmt(values[lo])}) — ${readAt(lo).low}. ` +
    `Across six axes ${bandFor(mean)}.`
  );
}

/** Greedy two-line wrap, measured in characters of a fixed-advance face. */
function wrapLabel(label: string, maxChars: number): string[] {
  if (label.length <= maxChars) return [label];
  const lines: string[] = [];
  let line = "";
  for (const word of label.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= 2) return lines;
  return [lines[0], lines.slice(1).join(" ")];
}

/** Angle of axis i, measured clockwise from 12 o'clock — d3.lineRadial's convention. */
const angleAt = (i: number): number => (i / AXES.length) * Math.PI * 2;

type RadarController = {
  select: (index: number) => void;
  setAutoplay: (on: boolean) => void;
};

/* Unique per mount: the SVG is built client-side only, so ids never need to
   agree with a server render — they only need to not collide with a sibling. */
let instanceSeq = 0;

export default function PsychometricRadar({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLParagraphElement | null>(null);
  const narrativeRef = useRef<HTMLParagraphElement | null>(null);
  const liveRef = useRef<HTMLParagraphElement | null>(null);
  const controllerRef = useRef<RadarController | null>(null);

  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const statusEl = statusRef.current;
    const narrativeNode = narrativeRef.current;
    if (!host || !statusEl || !narrativeNode) return;
    /* Re-bound as a non-null const so the hoisted helpers below inherit the
       narrowed type rather than re-widening it. */
    const narrativeEl: HTMLParagraphElement = narrativeNode;

    gsap.registerPlugin(ScrollTrigger);

    const uid = `radar-${(instanceSeq += 1)}`;
    const titleId = `${uid}-title`;
    const descId = `${uid}-desc`;
    const gradientId = `${uid}-fill`;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let motionReduced = motionQuery.matches;
    setReduced(motionReduced);

    /* ---------------------------------------------------------------- DOM */
    const svg = d3
      .create("svg")
      .attr("role", "img")
      .attr("aria-labelledby", `${titleId} ${descId}`)
      .style("display", "block")
      .style("width", "100%")
      .style("overflow", "visible");

    svg
      .append("title")
      .attr("id", titleId)
      .text("OopsCupid psychometric radar");
    svg
      .append("desc")
      .attr("id", descId)
      .text(
        `Radar chart of ${AXES.length} relationship-assessment axes — ${AXES.join(
          ", ",
        )} — scored 0 to 1 for ${PROFILES.length} stored profiles. The chart replays each stored profile in turn; the same numbers are listed in the table that follows.`,
      );

    const gradient = svg
      .append("defs")
      .append("radialGradient")
      .attr("id", gradientId);
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", INK.gold)
      .attr("stop-opacity", 0.26);
    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", INK.goldDeep)
      .attr("stop-opacity", 0.07);

    const plot = svg.append("g");

    const ringGroup = plot.append("g").attr("fill", "none");
    const ringPaths = ringGroup
      .selectAll<SVGPathElement, number>("path")
      .data(RING_STEPS as readonly number[])
      .join("path")
      .attr("stroke", INK.ivory)
      /* Outer ring carries the boundary; inner rings stay a whisper. */
      .attr("stroke-opacity", (d) => (d === 1 ? 0.17 : 0.09))
      .attr("stroke-width", 1);

    const spokeGroup = plot.append("g");
    const spokeLines = spokeGroup
      .selectAll<SVGLineElement, number>("line")
      .data(d3.range(AXES.length))
      .join("line")
      .attr("stroke", INK.ivory)
      .attr("stroke-opacity", 0.1)
      .attr("stroke-width", 1)
      /* Normalised path length: the draw-on tween survives every resize. */
      .attr("pathLength", 1);

    const labelGroup = plot.append("g");
    const labelTexts = labelGroup
      .selectAll<SVGTextElement, string>("text")
      .data(AXES as string[])
      .join("text")
      .attr("fill", INK.ivoryFaint)
      .attr("font-family", "var(--font-mono)")
      .attr("letter-spacing", "0.08em");

    const shapePath = plot
      .append("path")
      .attr("fill", `url(#${gradientId})`)
      .attr("stroke", INK.goldBright)
      .attr("stroke-width", 1.6)
      .attr("stroke-linejoin", "round");

    const dotGroup = plot.append("g");
    const dots = dotGroup
      .selectAll<SVGCircleElement, number>("circle")
      .data(d3.range(AXES.length))
      .join("circle")
      .attr("fill", INK.gold)
      .attr("r", 2.4);

    /* The one direct label on the chart: the peak axis of the resolved
       profile. Every other number lives in the table. */
    const peakText = plot
      .append("text")
      .attr("fill", INK.goldBright)
      .attr("font-family", "var(--font-mono)")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("letter-spacing", "0.04em");

    const svgNode = svg.node();
    if (!svgNode) return;
    host.appendChild(svgNode);

    /* ------------------------------------------------------------- layout */
    let radius = 100;
    let lineGen = d3
      .lineRadial<number>()
      .curve(d3.curveCardinalClosed.tension(0.62))
      .angle((_, i) => angleAt(i))
      .radius((d) => d * radius);

    function layout(width: number): void {
      const w = Math.max(width, 1);
      const h = clamp(Math.round(w * SVG_ASPECT), SVG_MIN_H, SVG_MAX_H);
      const gutter = clamp(w * GUTTER_RATIO, GUTTER_MIN, GUTTER_MAX);
      const labelFont = clamp(
        w * LABEL_FONT_RATIO,
        LABEL_FONT_MIN,
        LABEL_FONT_MAX,
      );

      radius = Math.max(
        44,
        Math.min(w / 2 - gutter, h / 2 - gutter * 0.72, RADIUS_CAP),
      );
      lineGen = lineGen.radius((d) => d * radius);

      svg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", h);
      plot.attr("transform", `translate(${w / 2},${h / 2})`);

      ringPaths.attr("d", (step) =>
        d3
          .lineRadial<number>()
          .curve(d3.curveLinearClosed)
          .angle((_, i) => angleAt(i))
          .radius(() => step * radius)(new Array<number>(AXES.length).fill(step)),
      );

      spokeLines
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (i) => Math.sin(angleAt(i)) * radius)
        .attr("y2", (i) => -Math.cos(angleAt(i)) * radius);

      const labelRadius = radius + labelFont * 1.6;
      const lineHeight = labelFont * 1.18;

      labelTexts
        .attr("font-size", labelFont)
        .attr("text-anchor", (_, i) => {
          const sin = Math.sin(angleAt(i));
          if (Math.abs(sin) < 0.2) return "middle";
          return sin > 0 ? "start" : "end";
        })
        .each(function (label, i) {
          const a = angleAt(i);
          const sin = Math.sin(a);
          const cos = Math.cos(a);
          const px = sin * labelRadius;
          const py = -cos * labelRadius;
          /* Top and bottom labels get the whole width to breathe in; side
             labels only get the space that actually remains between where the
             text starts and the edge of the box, so nothing is ever clipped. */
          const room =
            Math.abs(sin) > 0.2
              ? Math.max(w / 2 - Math.abs(px) - labelFont * 0.6, labelFont * 4)
              : w * 0.42;
          const maxChars = Math.max(
            6,
            Math.floor(room / (labelFont * MONO_ADVANCE)),
          );
          const lines = wrapLabel(label, maxChars);
          const text = d3.select(this);
          text.selectAll("tspan").remove();
          lines.forEach((lineText, li) => {
            text
              .append("tspan")
              .attr("x", px)
              .attr(
                "y",
                py + (li - (lines.length - 1) / 2) * lineHeight,
              )
              .attr("dominant-baseline", "middle")
              .text(lineText);
          });
        });

      peakText.attr("font-size", Math.max(9, labelFont * 0.92));
    }

    /* -------------------------------------------------------------- paint */
    let current: number[] = new Array<number>(AXES.length).fill(0);
    let peakIndex = 0;

    function paint(values: number[]): void {
      shapePath.attr("d", lineGen(values) ?? "");
      dots.attr("transform", (i) => {
        const r = values[i] * radius;
        return `translate(${Math.sin(angleAt(i)) * r},${-Math.cos(angleAt(i)) * r})`;
      });
      const a = angleAt(peakIndex);
      /* Sits just inside its own vertex, so it never fights the axis label. */
      const pr = Math.max(values[peakIndex] * radius - radius * 0.12, radius * 0.22);
      peakText
        .attr("x", Math.sin(a) * pr)
        .attr("y", -Math.cos(a) * pr)
        .text(fmt(values[peakIndex]));
    }

    const shapeSel = d3.select<SVGPathElement, unknown>(shapePath.node()!);

    function morphTo(values: readonly number[], duration: number): void {
      const from = current.slice();
      const to = [...values];
      shapeSel
        .interrupt("morph")
        .transition("morph")
        .duration(duration)
        .ease(d3.easeBackOut.overshoot(VERTEX_OVERSHOOT))
        .tween("radar", () => {
          const interp = d3.interpolateArray(from, to);
          return (t: number) => {
            current = interp(t).slice();
            paint(current);
          };
        });
    }

    function settle(values: readonly number[]): void {
      shapeSel.interrupt("morph");
      current = [...values];
      paint(current);
    }

    /* ------------------------------------------------------- status line */
    const statusText = document.createTextNode("");
    statusEl.appendChild(statusText);
    const caret = document.createElement("span");
    caret.textContent = "█";
    caret.style.marginLeft = "0.15em";
    caret.style.color = INK.goldDeep;
    statusEl.appendChild(caret);

    let caretAnim: Animation | null = null;
    if (!motionReduced && typeof caret.animate === "function") {
      caretAnim = caret.animate(
        [{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.51 }, { opacity: 0 }],
        { duration: CARET_BLINK_MS, iterations: Infinity },
      );
    }

    const timers = new Set<number>();
    const later = (fn: () => void, ms: number): void => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };
    const clearTimers = (): void => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.clear();
    };

    let typeToken = 0;
    function typeLine(text: string, onDone?: () => void): void {
      typeToken += 1;
      const token = typeToken;
      if (motionReduced) {
        statusText.nodeValue = text;
        onDone?.();
        return;
      }
      statusText.nodeValue = "";
      let i = 0;
      const step = (): void => {
        if (token !== typeToken) return;
        i += 1;
        statusText.nodeValue = text.slice(0, i);
        if (i < text.length) later(step, TYPE_MS_PER_CHAR);
        else onDone?.();
      };
      later(step, TYPE_MS_PER_CHAR);
    }

    let narrativeAnim: Animation | null = null;
    function showNarrative(text: string, animateIn: boolean): void {
      narrativeEl.textContent = text;
      narrativeAnim?.cancel();
      if (!animateIn || typeof narrativeEl.animate !== "function") {
        narrativeEl.style.opacity = "1";
        return;
      }
      narrativeEl.style.opacity = "1";
      narrativeAnim = narrativeEl.animate(
        [
          { opacity: 0, transform: "translateY(6px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 520, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
    }

    /* --------------------------------------------------------- query loop */
    let index = 0;
    let entered = false;
    let onScreen = false;
    let userPaused = false;

    function setPeak(values: readonly number[]): void {
      let hi = 0;
      for (let i = 1; i < values.length; i += 1) {
        if (values[i] > values[hi]) hi = i;
      }
      peakIndex = hi;
    }

    function resolveProfile(i: number, animate: boolean): void {
      const profile = PROFILES[i];
      index = i;
      setActive(i);
      setPeak(profile.values);
      if (animate) morphTo(profile.values, MORPH_MS);
      else settle(profile.values);
    }

    function runCycle(i: number): void {
      const profile = PROFILES[i];
      index = i;
      setActive(i);
      narrativeEl.style.opacity = "0";

      typeLine(`> SELECT profile WHERE id = '${profile.id}'`, () => {
        later(() => {
          typeLine("> streaming inference…");
          setPeak(profile.values);
          morphTo(profile.values, MORPH_MS);
          later(() => {
            typeLine(`> profile resolved · ${AXES.length} axes`);
            showNarrative(narrativeFor(profile.values), true);
          }, MORPH_MS);
        }, PAUSE_BETWEEN_LINES_MS);
      });

      later(() => {
        if (canRun()) runCycle((i + 1) % PROFILES.length);
      }, CYCLE_MS);
    }

    function canRun(): boolean {
      return (
        entered &&
        onScreen &&
        !userPaused &&
        !motionReduced &&
        !document.hidden
      );
    }

    let running = false;
    function syncLoop(): void {
      const should = canRun();
      if (should === running) return;
      running = should;
      if (should) {
        runCycle((index + 1) % PROFILES.length);
      } else {
        clearTimers();
        typeToken += 1;
        shapeSel.interrupt("morph");
        /* Land on whatever profile was being queried rather than freezing
           the polygon mid-deformation. */
        settle(PROFILES[index].values);
        setPeak(PROFILES[index].values);
        paint(current);
      }
    }

    /* --------------------------------------------------------- controller */
    controllerRef.current = {
      select(i: number) {
        const next = PROFILES[i] ? i : 0;
        clearTimers();
        typeToken += 1;
        running = false;
        userPaused = true;
        setAutoplay(false);
        statusText.nodeValue = `> SELECT profile WHERE id = '${PROFILES[next].id}' · resolved`;
        resolveProfile(next, !motionReduced);
        showNarrative(narrativeFor(PROFILES[next].values), !motionReduced);
        if (liveRef.current) {
          liveRef.current.textContent = `${PROFILES[next].label} selected. ${narrativeFor(
            PROFILES[next].values,
          )}`;
        }
      },
      setAutoplay(on: boolean) {
        userPaused = !on;
        setAutoplay(on);
        if (on) {
          syncLoop();
        } else {
          clearTimers();
          typeToken += 1;
          running = false;
          statusText.nodeValue = "> query loop paused";
        }
      },
    };

    /* ------------------------------------------------------------ observers */
    let lastWidth = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      const w = Math.round(rect.width);
      if (w <= 0 || w === lastWidth) return;
      lastWidth = w;
      layout(w);
      paint(current);
    });
    resizeObserver.observe(host);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
        syncLoop();
      },
      { threshold: 0.12 },
    );
    intersectionObserver.observe(host);

    const onVisibility = (): void => syncLoop();
    document.addEventListener("visibilitychange", onVisibility);

    const onMotionChange = (event: MediaQueryListEvent): void => {
      motionReduced = event.matches;
      setReduced(motionReduced);
      if (motionReduced) {
        clearTimers();
        typeToken += 1;
        running = false;
        caretAnim?.cancel();
        settle(PROFILES[index].values);
        statusText.nodeValue = `> profile resolved · ${PROFILES[index].id}`;
        showNarrative(narrativeFor(PROFILES[index].values), false);
      } else {
        syncLoop();
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    /* --------------------------------------------------------- first paint */
    layout(host.clientWidth || 360);
    lastWidth = Math.round(host.clientWidth) || 0;
    setPeak(PROFILES[0].values);
    paint(current);

    let entrance: gsap.core.Timeline | null = null;

    if (motionReduced) {
      /* Reduced motion: the composed end state, immediately. No loop. */
      settle(PROFILES[0].values);
      statusText.nodeValue = `> profile resolved · ${PROFILES[0].id}`;
      showNarrative(narrativeFor(PROFILES[0].values), false);
      entered = true;
    } else {
      spokeLines.attr("stroke-dasharray", "1 1").attr("stroke-dashoffset", 1);
      labelTexts.attr("opacity", 0);
      peakText.attr("opacity", 0);
      dots.attr("opacity", 0);
      narrativeEl.style.opacity = "0";

      entrance = gsap.timeline({
        scrollTrigger: { trigger: host, start: "top 80%", once: true },
        onComplete: () => {
          gsap.set(ringPaths.nodes(), { clearProps: "transform" });
          spokeLines.attr("stroke-dasharray", null).attr("stroke-dashoffset", null);
          entered = true;
          syncLoop();
        },
      });

      entrance
        .from(ringPaths.nodes(), {
          scale: 0,
          transformOrigin: "center center",
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
        })
        .to(
          spokeLines.nodes(),
          { attr: { "stroke-dashoffset": 0 }, duration: 0.6, stagger: 0.04, ease: "power2.out" },
          "-=0.45",
        )
        .to(labelTexts.nodes(), { opacity: 1, duration: 0.5, stagger: 0.03 }, "-=0.35")
        .add(() => {
          setPeak(PROFILES[0].values);
          morphTo(PROFILES[0].values, MORPH_MS);
          typeLine(`> SELECT profile WHERE id = '${PROFILES[0].id}'`, () => {
            later(() => {
              typeLine(`> profile resolved · ${AXES.length} axes`);
              showNarrative(narrativeFor(PROFILES[0].values), true);
            }, PAUSE_BETWEEN_LINES_MS);
          });
        })
        .to(dots.nodes(), { opacity: 1, duration: 0.4, stagger: 0.04 }, "<")
        .to(peakText.node(), { opacity: 1, duration: 0.4 }, "<+=0.5")
        .to({}, { duration: MORPH_MS / 1000 });
    }

    /* ------------------------------------------------------------ cleanup */
    return () => {
      controllerRef.current = null;
      clearTimers();
      typeToken += 1;
      shapeSel.interrupt("morph");
      caretAnim?.cancel();
      narrativeAnim?.cancel();
      entrance?.scrollTrigger?.kill();
      entrance?.kill();
      gsap.killTweensOf(ringPaths.nodes());
      gsap.killTweensOf(spokeLines.nodes());
      gsap.killTweensOf(labelTexts.nodes());
      gsap.killTweensOf(dots.nodes());
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      svgNode.remove();
      statusEl.textContent = "";
      narrativeEl.textContent = "";
    };
  }, []);

  const chipBase =
    "font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1.5 border transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0";

  return (
    <figure className={["w-full", className ?? ""].join(" ").trim()}>
      {/* Titling only — the surrounding section owns the heading level. */}
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-serif text-lg font-light tracking-tight text-[#ede4d3]">
          Psychometric readout
        </span>
        <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#8d867a]">
          {AXES.length} axes · scored 0–1
        </span>
      </figcaption>

      {/* D3 owns everything inside this node — React renders it empty. */}
      <div ref={hostRef} className="w-full" />

      <div className="mt-5 space-y-3">
        <p
          ref={statusRef}
          aria-hidden="true"
          className="min-h-[1.35em] font-mono text-[11px] leading-[1.35] tracking-[0.1em] text-[#c8a45c]"
        />
        <p
          ref={narrativeRef}
          aria-hidden="true"
          className="min-h-[4.2em] max-w-[62ch] font-mono text-[12px] leading-relaxed text-[#c9c0b1] sm:min-h-[3.4em]"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Stored profiles"
          className="flex flex-wrap gap-2"
        >
          {PROFILES.map((profile, i) => (
            <button
              key={profile.id}
              type="button"
              aria-pressed={active === i}
              onClick={() => controllerRef.current?.select(i)}
              className={[
                chipBase,
                active === i
                  ? "border-[#c8a45c]/60 bg-[#c8a45c]/10 text-[#e0c184] focus-visible:ring-[#e0c184]"
                  : "border-[#ede4d3]/12 text-[#8d867a] hover:border-[#ede4d3]/30 hover:text-[#c9c0b1] focus-visible:ring-[#c8a45c]",
              ].join(" ")}
            >
              {profile.id}
            </button>
          ))}
        </div>

        {!reduced && (
          <button
            type="button"
            onClick={() => controllerRef.current?.setAutoplay(!autoplay)}
            className={[
              chipBase,
              "border-[#ede4d3]/12 text-[#8d867a] hover:border-[#ede4d3]/30 hover:text-[#c9c0b1] focus-visible:ring-[#c8a45c]",
            ].join(" ")}
          >
            {autoplay ? "Pause loop" : "Resume loop"}
          </button>
        )}
      </div>

      <p className="mt-4 max-w-[62ch] font-mono text-[10px] leading-relaxed tracking-[0.06em] text-[#8d867a]">
        Simulated readout. The query lines and the profile copy are composed on
        the client from the scores shown — a demo of the OopsCupid output
        surface, not a live model call.
      </p>

      <p ref={liveRef} className="sr-only" aria-live="polite" />

      <div className="sr-only">
        <table>
          <caption>
            OopsCupid psychometric profiles — axis scores from 0 to 1
          </caption>
          <thead>
            <tr>
              <th scope="col">Profile</th>
              {AXES.map((axis) => (
                <th key={axis} scope="col">
                  {axis}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROFILES.map((profile) => (
              <tr key={profile.id}>
                <th scope="row">{profile.label}</th>
                {profile.values.map((value, i) => (
                  <td key={AXES[i]}>{fmt(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
