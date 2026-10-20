"use client";

/**
 * WorkflowGraph — the n8n → Pipedrive capture pipeline as a flow diagram.
 *
 * The story the picture has to tell: call + email capture land in n8n, get
 * parsed into structured deal fields, and hit a confidence gate. High
 * confidence writes straight through to Pipedrive. Anything ambiguous is
 * *held* — diverted to manual review, where a human approves before the CRM
 * is ever touched. That held branch is the only thing wearing gold, and the
 * flowing packets visibly stall on it.
 *
 * D3 owns the entire <svg> subtree; React only owns the mount node and the
 * screen-reader table beneath it.
 */

import type * as React from "react";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflowAutomation } from "@/lib/data";

/* ------------------------------------------------------------------ *
 * Chiaroscuro — charcoal ground, ivory light, one gold accent.
 * ------------------------------------------------------------------ */
const INK_800 = "#101013";
const INK_700 = "#17171b";
const IVORY = "#ede4d3";
const IVORY_DIM = "#c9c0b1";
const IVORY_FAINT = "#8d867a";
const GOLD = "#c8a45c";
const GOLD_BRIGHT = "#e0c184";
const GOLD_DEEP = "#8a6d32";

const MONO = 'var(--font-mono, ui-monospace, "SFMono-Regular", monospace)';

/**
 * Nodes whose caption sits above the mark in the landscape layout. The flow
 * chain packs several nodes onto one cross-axis line, so alternating the
 * caption side is what keeps "Entity extraction" clear of "Confidence gate"
 * and the Pipedrive label clear of the approved-write branch.
 */
const LABEL_ABOVE = new Set(["extract", "pipedrive"]);

type NodeKind = "source" | "engine" | "process" | "gate" | "safeguard" | "sink";

interface GNode {
  id: string;
  label: string;
  kind: NodeKind;
  /** normalised flow position (0–1, along the pipeline) */
  nx: number;
  /** normalised cross position (0–1, across the pipeline) */
  ny: number;
  /** resolved screen position */
  x: number;
  y: number;
  /** resolved half-extents of the mark, used to anchor links to the edge */
  hw: number;
  hh: number;
}

interface GLink {
  id: string;
  source: GNode;
  target: GNode;
  label: string;
  /** true for the two legs of the manual-review safeguard branch */
  gated: boolean;
  el: SVGPathElement | null;
  len: number;
}

interface Packet {
  el: SVGCircleElement;
  active: boolean;
  route: number[];
  seg: number;
  dist: number;
  hold: number;
  gated: boolean;
}

/** What each node kind *is*, in one phrase — used to build hover captions. */
const ROLE: Record<NodeKind, string> = {
  source: "capture source",
  engine: "orchestration trigger",
  process: "transform step",
  gate: "routing decision",
  safeguard: "human-in-the-loop hold",
  sink: "system of record",
};

const ARIA_LABEL =
  "Flow diagram of the n8n to Pipedrive automation. Call recordings and email threads feed an n8n trigger, " +
  "then entity extraction, then a confidence gate. High-confidence extractions write straight to Pipedrive; " +
  "ambiguous ones are diverted to a manual review queue and only reach Pipedrive as an approved write.";

/* ------------------------------------------------------------------ *
 * Pure helpers
 * ------------------------------------------------------------------ */

const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

/** Greedy word wrap against an estimated monospace advance width. */
function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  if (maxChars < 8) return [text];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line.length === 0 ? w : `${line} ${w}`;
    if (next.length <= maxChars) {
      line = next;
    } else {
      if (line.length > 0) lines.push(line);
      line = w;
      if (lines.length === maxLines) break;
    }
  }
  if (line.length > 0 && lines.length < maxLines) lines.push(line);
  if (lines.length === maxLines) {
    const consumed = lines.join(" ");
    if (consumed.length < text.length - 1) {
      const last = lines[maxLines - 1];
      lines[maxLines - 1] =
        last.length > maxChars - 1 ? `${last.slice(0, maxChars - 1)}…` : `${last}…`;
    }
  }
  return lines.length > 0 ? lines : [text];
}

/** Every simple source→sink route through the graph, as link indices. */
function enumerateRoutes(nodes: GNode[], links: GLink[]): number[][] {
  const outgoing = new Map<string, number[]>();
  const hasIncoming = new Set<string>();
  links.forEach((l, i) => {
    const arr = outgoing.get(l.source.id);
    if (arr) arr.push(i);
    else outgoing.set(l.source.id, [i]);
    hasIncoming.add(l.target.id);
  });

  const routes: number[][] = [];
  const walk = (nodeId: string, acc: number[], seen: Set<string>): void => {
    const next = outgoing.get(nodeId);
    if (!next || next.length === 0) {
      if (acc.length > 0) routes.push(acc.slice());
      return;
    }
    for (const li of next) {
      const t = links[li].target;
      if (seen.has(t.id)) continue;
      seen.add(t.id);
      acc.push(li);
      walk(t.id, acc, seen);
      acc.pop();
      seen.delete(t.id);
    }
  };

  for (const n of nodes) {
    if (!hasIncoming.has(n.id)) walk(n.id, [], new Set<string>([n.id]));
  }
  return routes;
}

/** Half-extents of a node mark, in px, for the given base radius. */
function extents(kind: NodeKind, r: number): { hw: number; hh: number } {
  switch (kind) {
    case "source":
      return { hw: r * 1.18, hh: r * 0.74 };
    case "engine":
      return { hw: r * 0.94, hh: r * 0.94 };
    case "process":
      return { hw: r * 1.1, hh: r * 0.74 };
    case "gate":
      return { hw: r * 1.02, hh: r * 0.98 };
    case "safeguard":
      return { hw: r * 0.98, hh: r * 0.98 };
    case "sink":
      return { hw: r * 1.2, hh: r * 0.84 };
  }
}

/** A short caption per node, derived from the graph itself. */
function captionFor(n: GNode, links: GLink[]): string {
  const outs = links.filter((l) => l.source.id === n.id);
  const ins = links.filter((l) => l.target.id === n.id);
  const head = `${n.label} — ${ROLE[n.kind]}.`;
  if (outs.length > 0) {
    const tail = outs
      .map((l) => (l.label ? `${l.target.label} (${l.label})` : l.target.label))
      .join(", ");
    return `${head} Sends to ${tail}.`;
  }
  const tail = ins
    .map((l) => (l.label ? `${l.label} from ${l.source.label}` : l.source.label))
    .join(", ");
  return `${head} Receives ${tail}.`;
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export default function WorkflowGraph({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------- data ---------------- */
    const nodes: GNode[] = workflowAutomation.nodes.map((n) => ({
      id: n.id,
      label: n.label,
      kind: n.kind,
      nx: n.x,
      ny: n.y,
      x: 0,
      y: 0,
      hw: 0,
      hh: 0,
    }));
    const nodeById = new Map<string, GNode>(nodes.map((n) => [n.id, n]));

    const links: GLink[] = [];
    for (const l of workflowAutomation.links) {
      const s = nodeById.get(l.from);
      const t = nodeById.get(l.to);
      if (!s || !t) continue;
      links.push({
        id: `${l.from}__${l.to}`,
        source: s,
        target: t,
        label: l.label,
        gated: s.kind === "safeguard" || t.kind === "safeguard",
        el: null,
        len: 0,
      });
    }

    const captions = new Map<string, string>(
      nodes.map((n) => [n.id, captionFor(n, links)]),
    );
    const defaultCaption =
      workflowAutomation.notes[workflowAutomation.notes.length - 1];

    /* Packet itineraries: direct routes and safeguard routes, interleaved so
       roughly one in three parcels takes the held branch. */
    const routes = enumerateRoutes(nodes, links);
    const gatedRoutes = routes.filter((r) => r.some((i) => links[i].gated));
    const directRoutes = routes.filter((r) => !r.some((i) => links[i].gated));
    const spawnPattern: number[][] = [];
    for (let i = 0; i < 6; i += 1) {
      if (i % 3 === 2 && gatedRoutes.length > 0) {
        spawnPattern.push(gatedRoutes[Math.floor(i / 3) % gatedRoutes.length]);
      } else if (directRoutes.length > 0) {
        spawnPattern.push(directRoutes[i % directRoutes.length]);
      } else if (routes.length > 0) {
        spawnPattern.push(routes[i % routes.length]);
      }
    }

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
      .style("height", "auto")
      .style("font-family", MONO);

    svg.append("title").text("n8n to Pipedrive workflow automation");
    svg.append("desc").text(ARIA_LABEL);

    const gLinks = svg.append("g").attr("class", "wf-links").attr("fill", "none");
    const gLinkLabels = svg.append("g").attr("class", "wf-link-labels");
    const gPackets = svg.append("g").attr("class", "wf-packets");
    const gNodes = svg.append("g").attr("class", "wf-nodes");
    const gCaption = svg.append("g").attr("class", "wf-caption");

    /* ---------------- links ---------------- */
    const linkSel = gLinks
      .selectAll<SVGPathElement, GLink>("path")
      .data(links, (d) => d.id)
      .join("path")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .attr("stroke", (d) => (d.gated ? GOLD : IVORY_FAINT))
      .attr("stroke-width", (d) => (d.gated ? 1.5 : 1.15))
      .attr("opacity", (d) => (d.gated ? 0.9 : 0.55));

    linkSel.each(function (d) {
      d.el = this;
    });

    const labelledLinks = links.filter((l) => l.label.length > 0);
    const linkLabelSel = gLinkLabels
      .selectAll<SVGTextElement, GLink>("text")
      .data(labelledLinks, (d) => d.id)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("letter-spacing", "0.12em")
      .attr("fill", (d) => (d.gated ? GOLD_BRIGHT : IVORY_FAINT))
      .attr("opacity", (d) => (d.gated ? 0.95 : 0.75))
      .text((d) => d.label.toUpperCase());

    /* ---------------- nodes ---------------- */
    const nodeSel = gNodes
      .selectAll<SVGGElement, GNode>("g.wf-node")
      .data(nodes, (d) => d.id)
      .join("g")
      .attr("class", "wf-node")
      .attr("tabindex", 0)
      .attr("data-id", (d) => d.id)
      .style("cursor", "pointer")
      .style("outline", "none");

    const markSel = nodeSel.append("g").attr("class", "wf-mark");
    /* The safeguard's halo lives outside the mark group so it survives a
       mark rebuild on resize and can pulse independently of the entrance. */
    const holdRingSel = nodeSel
      .filter((d) => d.kind === "safeguard")
      .append("circle")
      .attr("class", "wf-hold-ring")
      .attr("fill", "none")
      .attr("stroke", GOLD)
      .attr("stroke-width", 0.9)
      .attr("stroke-dasharray", "2 5")
      .attr("opacity", 0.32)
      .attr("pointer-events", "none");
    const focusRingSel = nodeSel
      .append("rect")
      .attr("class", "wf-focus")
      .attr("fill", "none")
      .attr("stroke", GOLD_BRIGHT)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3 3")
      .attr("opacity", 0)
      .attr("pointer-events", "none");
    const nodeLabelSel = nodeSel
      .append("text")
      .attr("class", "wf-node-label")
      .attr("text-anchor", "middle")
      .attr("letter-spacing", "0.08em")
      .attr("pointer-events", "none")
      .attr("fill", (d) =>
        d.kind === "safeguard" ? GOLD_BRIGHT : d.kind === "sink" ? IVORY : IVORY_DIM,
      )
      .text((d) => d.label);
    const hitSel = nodeSel
      .append("circle")
      .attr("class", "wf-hit")
      .attr("fill", "transparent")
      .attr("stroke", "none");

    /** (Re)build the mark geometry for a given base radius. */
    function renderMarks(r: number): void {
      markSel.each(function (d) {
        const g = d3.select<SVGGElement, GNode>(this);
        g.selectAll("*").remove();
        const { hw, hh } = extents(d.kind, r);

        switch (d.kind) {
          case "source":
            g.append("rect")
              .attr("x", -hw)
              .attr("y", -hh)
              .attr("width", hw * 2)
              .attr("height", hh * 2)
              .attr("rx", hh * 0.55)
              .attr("fill", INK_800)
              .attr("stroke", IVORY_FAINT)
              .attr("stroke-width", 1);
            break;
          case "engine":
            g.append("circle")
              .attr("r", hw)
              .attr("fill", INK_800)
              .attr("stroke", IVORY_DIM)
              .attr("stroke-width", 1.1);
            g.append("circle")
              .attr("r", hw * 0.42)
              .attr("fill", "none")
              .attr("stroke", IVORY_FAINT)
              .attr("stroke-width", 0.9);
            break;
          case "process":
            g.append("polygon")
              .attr(
                "points",
                [
                  [-hw, 0],
                  [-hw * 0.52, -hh],
                  [hw * 0.52, -hh],
                  [hw, 0],
                  [hw * 0.52, hh],
                  [-hw * 0.52, hh],
                ]
                  .map((p) => p.join(","))
                  .join(" "),
              )
              .attr("fill", INK_800)
              .attr("stroke", IVORY_FAINT)
              .attr("stroke-width", 1);
            break;
          case "gate":
            g.append("polygon")
              .attr(
                "points",
                [
                  [0, -hh],
                  [hw, 0],
                  [0, hh],
                  [-hw, 0],
                ]
                  .map((p) => p.join(","))
                  .join(" "),
              )
              .attr("fill", INK_800)
              .attr("stroke", GOLD_DEEP)
              .attr("stroke-width", 1.2);
            g.append("circle").attr("r", 1.7).attr("fill", GOLD_DEEP);
            break;
          case "safeguard": {
            const oct = d3
              .range(8)
              .map((i) => {
                const a = (Math.PI / 4) * i + Math.PI / 8;
                return [Math.cos(a) * hw, Math.sin(a) * hh];
              })
              .map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`)
              .join(" ");
            g.append("polygon")
              .attr("points", oct)
              .attr("fill", INK_700)
              .attr("stroke", GOLD_BRIGHT)
              .attr("stroke-width", 1.4);
            g.append("path")
              .attr(
                "d",
                `M ${-hw * 0.34} 0 L ${-hw * 0.08} ${hh * 0.3} L ${hw * 0.36} ${-hh * 0.32}`,
              )
              .attr("fill", "none")
              .attr("stroke", GOLD_BRIGHT)
              .attr("stroke-width", 1.2)
              .attr("stroke-linecap", "round")
              .attr("stroke-linejoin", "round");
            break;
          }
          case "sink":
            g.append("rect")
              .attr("x", -hw)
              .attr("y", -hh)
              .attr("width", hw * 2)
              .attr("height", hh * 2)
              .attr("rx", 3)
              .attr("fill", INK_800)
              .attr("stroke", IVORY_DIM)
              .attr("stroke-width", 1.4);
            g.append("rect")
              .attr("x", -hw + 4)
              .attr("y", -hh + 4)
              .attr("width", hw * 2 - 8)
              .attr("height", hh * 2 - 8)
              .attr("rx", 2)
              .attr("fill", "none")
              .attr("stroke", INK_700)
              .attr("stroke-width", 1);
            g.append("line")
              .attr("x1", -hw + 8)
              .attr("x2", hw - 8)
              .attr("y1", -hh + 8)
              .attr("y2", -hh + 8)
              .attr("stroke", IVORY_FAINT)
              .attr("stroke-width", 0.9);
            break;
        }
      });
    }

    /* ---------------- caption band ---------------- */
    const captionRule = gCaption
      .append("line")
      .attr("stroke", GOLD)
      .attr("stroke-width", 1)
      .attr("opacity", 0.5);
    const captionText = gCaption
      .append("text")
      .attr("fill", IVORY_DIM)
      .attr("letter-spacing", "0.045em");

    /* ---------------- packets ---------------- */
    const POOL = 12;
    const packets: Packet[] = [];
    for (let i = 0; i < POOL; i += 1) {
      const el = gPackets
        .append("circle")
        .attr("r", 3.2)
        .attr("fill", IVORY)
        .attr("opacity", 0)
        .attr("pointer-events", "none")
        .node();
      if (!el) continue;
      packets.push({
        el,
        active: false,
        route: [],
        seg: 0,
        dist: 0,
        hold: 0,
        gated: false,
      });
    }
    const warm = d3.interpolateRgb(IVORY, GOLD_BRIGHT);

    /* ---------------- layout ---------------- */
    const linkH = d3.linkHorizontal();
    const linkV = d3.linkVertical();

    let vbW = 0;
    let vbH = 0;
    let markR = 0;
    let portrait = false;
    let flowSpeed = 150;
    let entered = reduceMotion;

    /* An arrow (not a declaration) so the non-null narrowing on `host`
       survives into the closure. */
    const layout = (): void => {
      const measured = Math.round(host.clientWidth);
      if (measured < 8) return;

      const w = measured;
      portrait = w < 640;

      const r = Math.round(clamp(w * 0.023, 18, 27));
      if (r !== markR) {
        markR = r;
        renderMarks(markR);
      }
      for (const n of nodes) {
        const e = extents(n.kind, markR);
        n.hw = e.hw;
        n.hh = e.hh;
      }

      const labelFont = w < 420 ? 9.5 : w < 900 ? 10.5 : 11.5;
      const linkFont = w < 420 ? 8.5 : 9.5;
      const capFont = w < 420 ? 10 : 11;
      const capBand = 18 + 2 * (capFont + 5);
      const labelGap = markR + labelFont + 12;

      const plotH = portrait
        ? Math.round(clamp(w * 1.55, 480, 720))
        : Math.round(clamp(w * 0.58, 320, 540));

      vbW = w;
      vbH = plotH + capBand;

      svg.attr("viewBox", `0 0 ${vbW} ${vbH}`).attr("height", vbH);

      const flowScale = d3.scaleLinear().domain([0, 1]);
      const crossScale = d3.scaleLinear().domain([0, 1]);

      if (portrait) {
        const padX = clamp(w * 0.17, 52, 120);
        flowScale.range([markR + 16, plotH - labelGap - 6]);
        crossScale.range([padX, w - padX]);
        for (const n of nodes) {
          n.x = crossScale(n.ny);
          n.y = flowScale(n.nx);
        }
      } else {
        const padX = clamp(w * 0.075, 44, 96) + markR;
        flowScale.range([padX, w - padX]);
        crossScale.range([markR + 18, plotH - labelGap - 4]);
        for (const n of nodes) {
          n.x = flowScale(n.nx);
          n.y = crossScale(n.ny);
        }
      }

      /* node marks + labels */
      nodeSel.attr("transform", (d) => `translate(${d.x.toFixed(2)},${d.y.toFixed(2)})`);
      nodeLabelSel
        .attr("font-size", labelFont)
        .attr("y", (d) =>
          !portrait && LABEL_ABOVE.has(d.id)
            ? -(d.hh + 8)
            : d.hh + labelFont + 6,
        )
        .attr("x", (d) => {
          /* Nudge the label back inside the frame when a node hugs an edge. */
          const half = (d.label.length * labelFont * 0.58) / 2;
          const lo = 6 + half - d.x;
          const hi = vbW - 6 - half - d.x;
          return lo > hi ? 0 : clamp(0, lo, hi);
        });
      holdRingSel.attr("r", (d) => d.hw + 7);
      focusRingSel
        .attr("x", (d) => -d.hw - 7)
        .attr("y", (d) => -d.hh - 7)
        .attr("width", (d) => (d.hw + 7) * 2)
        .attr("height", (d) => (d.hh + 7) * 2)
        .attr("rx", 5);
      hitSel.attr("r", (d) => Math.max(d.hw, d.hh) + 13);

      /* link geometry */
      linkSel.attr("d", (d) => {
        const s = d.source;
        const t = d.target;
        const path = portrait
          ? linkV({
              source: [s.x, s.y + s.hh + 3],
              target: [t.x, t.y - t.hh - 5],
            })
          : linkH({
              source: [s.x + s.hw + 3, s.y],
              target: [t.x - t.hw - 5, t.y],
            });
        return path ?? "";
      });

      for (const l of links) {
        l.len = l.el ? l.el.getTotalLength() : 0;
      }

      /* link labels ride the path, offset along its normal */
      linkLabelSel.attr("font-size", linkFont).attr("transform", (d) => {
        if (!d.el || d.len === 0) return "translate(-999,-999)";
        const t = d.gated ? 0.62 : 0.5;
        const p = d.el.getPointAtLength(d.len * t);
        const q = d.el.getPointAtLength(Math.min(d.len, d.len * t + 2));
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const m = Math.hypot(dx, dy) || 1;
        let nx = -dy / m;
        let ny = dx / m;
        if (portrait ? (p.x > vbW / 2 ? nx < 0 : nx > 0) : ny > 0) {
          nx = -nx;
          ny = -ny;
        }
        const off = linkFont + 3;
        const half = (d.label.length * linkFont * 0.6) / 2;
        const lx = clamp(p.x + nx * off, half + 4, vbW - half - 4);
        const ly = clamp(p.y + ny * off, linkFont, vbH - 4);
        return `translate(${lx.toFixed(2)},${ly.toFixed(2)})`;
      });

      /* caption band */
      captionRule
        .attr("x1", 0)
        .attr("x2", Math.min(46, vbW * 0.12))
        .attr("y1", plotH + 12)
        .attr("y2", plotH + 12);
      captionText.attr("font-size", capFont).attr("transform", `translate(0,${plotH + 28})`);
      renderCaption(currentCaption, capFont);

      /* keep in-flight packets on their (now different) path */
      for (const p of packets) {
        if (!p.active) continue;
        const l = links[p.route[p.seg]];
        p.dist = Math.min(p.dist, l.len);
      }

      flowSpeed = clamp((vbW + plotH) * 0.11, 95, 205);

      if (reduceMotion) {
        /* Composed state: static parcels resting on every leg, no motion. */
        packets.forEach((p, i) => {
          const l = links[i];
          if (!l || !l.el || l.len === 0) {
            d3.select(p.el).attr("opacity", 0);
            return;
          }
          const pt = l.el.getPointAtLength(l.len * 0.62);
          d3.select(p.el)
            .attr("cx", pt.x)
            .attr("cy", pt.y)
            .attr("fill", l.gated ? GOLD_BRIGHT : IVORY)
            .attr("opacity", 0.75);
        });
      }
    };

    /* ---------------- caption rendering ---------------- */
    let currentCaption = defaultCaption;

    function renderCaption(text: string, fontSize: number): void {
      const maxChars = Math.max(16, Math.floor((vbW - 8) / (fontSize * 0.6)));
      const lines = wrapText(text, maxChars, 2);
      const sel = captionText
        .selectAll<SVGTSpanElement, string>("tspan")
        .data(lines)
        .join("tspan")
        .attr("x", 0)
        .attr("dy", (_d, i) => (i === 0 ? 0 : fontSize + 4))
        .text((d) => d);
      sel.exit().remove();
    }

    /* ---------------- hover / focus behaviour ---------------- */
    function setCaption(text: string): void {
      currentCaption = text;
      const fontSize = Number(captionText.attr("font-size")) || 11;
      renderCaption(text, fontSize);
    }

    /* Opacity is written as a *style* everywhere below: GSAP's entrance also
       writes inline styles, and an attribute would silently lose to them. */
    function highlight(id: string | null): void {
      linkSel
        .transition()
        .duration(180)
        .style("opacity", (d) => {
          if (id === null) return d.gated ? 0.9 : 0.55;
          const on = d.source.id === id || d.target.id === id;
          return on ? 1 : 0.1;
        })
        .attr("stroke", (d) => {
          if (id === null) return d.gated ? GOLD : IVORY_FAINT;
          const on = d.source.id === id || d.target.id === id;
          if (!on) return d.gated ? GOLD : IVORY_FAINT;
          return d.gated ? GOLD_BRIGHT : IVORY_DIM;
        })
        .attr("stroke-width", (d) => {
          const base = d.gated ? 1.5 : 1.15;
          if (id === null) return base;
          return d.source.id === id || d.target.id === id ? base + 0.7 : base;
        });

      linkLabelSel
        .transition()
        .duration(180)
        .style("opacity", (d) => {
          if (id === null) return d.gated ? 0.95 : 0.75;
          return d.source.id === id || d.target.id === id ? 1 : 0.12;
        });

      nodeSel
        .transition()
        .duration(180)
        .style("opacity", (d) => {
          if (id === null) return 1;
          if (d.id === id) return 1;
          const linked = links.some(
            (l) =>
              (l.source.id === id && l.target.id === d.id) ||
              (l.target.id === id && l.source.id === d.id),
          );
          return linked ? 0.9 : 0.32;
        });

      gPackets
        .transition()
        .duration(180)
        .style("opacity", id === null ? 1 : 0.25);

      setCaption(id === null ? defaultCaption : (captions.get(id) ?? defaultCaption));
    }

    nodeSel
      .on("mouseenter", (_event, d) => highlight(d.id))
      .on("mouseleave", () => highlight(null))
      .on("focus", function (_event, d) {
        d3.select(this).select<SVGRectElement>("rect.wf-focus").attr("opacity", 1);
        highlight(d.id);
      })
      .on("blur", function () {
        d3.select(this).select<SVGRectElement>("rect.wf-focus").attr("opacity", 0);
        highlight(null);
      });

    /* ---------------- first layout ---------------- */
    layout();

    /* ---------------- packet flow ---------------- */
    let spawnAcc = 0;
    let spawnIndex = 0;
    let elapsed = 0;
    let flowing = false;
    let heldCount = 0;

    function spawn(): void {
      if (spawnPattern.length === 0) return;
      const slot = packets.find((p) => !p.active);
      if (!slot) return;
      const route = spawnPattern[spawnIndex % spawnPattern.length];
      spawnIndex += 1;
      slot.active = true;
      slot.route = route;
      slot.seg = 0;
      slot.dist = 0;
      slot.hold = 0;
      slot.gated = route.some((i) => links[i].gated);
      d3.select(slot.el).attr("opacity", 0.95).attr("fill", IVORY);
    }

    function tick(_time: number, deltaMs: number): void {
      if (!flowing) return;
      const dt = Math.min(deltaMs, 48);
      elapsed += dt;
      spawnAcc += dt;
      if (spawnAcc >= 820) {
        spawnAcc = 0;
        spawn();
      }

      heldCount = 0;

      for (const p of packets) {
        if (!p.active) continue;
        const link = links[p.route[p.seg]];
        if (!link.el || link.len === 0) continue;

        if (p.hold > 0) {
          /* Parked at the review node — the whole point of the diagram. */
          p.hold -= dt;
          heldCount += 1;
          const pulse = 3.2 + Math.sin(elapsed / 130) * 0.9;
          d3.select(p.el)
            .attr("cx", link.target.x)
            .attr("cy", link.target.y)
            .attr("r", pulse)
            .attr("fill", GOLD_BRIGHT);
          if (p.hold <= 0) {
            p.seg += 1;
            p.dist = 0;
            d3.select(p.el).attr("r", 3.2);
            if (p.seg >= p.route.length) {
              p.active = false;
              d3.select(p.el).attr("opacity", 0);
            }
          }
          continue;
        }

        p.dist += (flowSpeed * dt) / 1000;

        if (p.dist >= link.len) {
          if (link.target.kind === "safeguard" && p.seg < p.route.length - 1) {
            p.hold = 1150;
            p.dist = link.len;
            continue;
          }
          p.seg += 1;
          p.dist = 0;
          if (p.seg >= p.route.length) {
            p.active = false;
            d3.select(p.el).attr("opacity", 0);
            continue;
          }
        }

        const cur = links[p.route[p.seg]];
        if (!cur.el || cur.len === 0) continue;
        const pt = cur.el.getPointAtLength(Math.min(p.dist, cur.len));
        const sel = d3.select(p.el).attr("cx", pt.x).attr("cy", pt.y);
        if (cur.gated) {
          sel.attr("fill", warm(clamp(0.35 + 0.65 * (p.dist / cur.len), 0, 1)));
        } else if (p.gated) {
          sel.attr("fill", warm(0.2));
        } else {
          sel.attr("fill", IVORY);
        }
      }

      const pulsing = heldCount > 0;
      const beat = Math.sin(elapsed / 190);
      holdRingSel
        .style("opacity", pulsing ? 0.55 + beat * 0.22 : 0.32)
        .attr("r", (d) => d.hw + 7 + (pulsing ? beat * 2.4 : 0));
    }

    /* ---------------- entrance ---------------- */
    let tl: gsap.core.Timeline | null = null;

    if (!reduceMotion) {
      gsap.registerPlugin(ScrollTrigger);

      nodeSel.style("opacity", 0);
      gsap.set(markSel.nodes(), { scale: 0.78, transformOrigin: "50% 50%" });
      linkSel.each(function (d) {
        const len = d.len || this.getTotalLength();
        d3.select(this).attr("stroke-dasharray", `${len} ${len}`).attr("stroke-dashoffset", len);
      });
      linkLabelSel.style("opacity", 0);
      holdRingSel.style("opacity", 0);
      gCaption.style("opacity", 0);

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: host,
          start: "top 82%",
          once: true,
        },
        onComplete: () => {
          entered = true;
          linkSel.each(function (d) {
            d3.select(this)
              .attr("stroke-dasharray", d.gated ? "7 6" : null)
              .attr("stroke-dashoffset", null);
          });
          flowing = true;
        },
      });

      tl.to(nodeSel.nodes(), {
        opacity: 1,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
      })
        .to(
          markSel.nodes(),
          { scale: 1, duration: 0.6, stagger: 0.07, ease: "back.out(1.6)" },
          "<",
        )
        .to(
          linkSel.nodes(),
          {
            strokeDashoffset: 0,
            duration: 0.85,
            stagger: 0.07,
            ease: "power1.inOut",
          },
          "-=0.45",
        )
        .to(
          linkLabelSel.nodes(),
          { opacity: (i: number) => (labelledLinks[i].gated ? 0.95 : 0.75), duration: 0.4 },
          "-=0.3",
        )
        .to(gCaption.nodes(), { opacity: 1, duration: 0.4 }, "-=0.35")
        .to(
          holdRingSel.nodes(),
          { opacity: 0.32, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );

      gsap.ticker.add(tick);
    }

    /* ---------------- resize ---------------- */
    let lastW = Math.round(host.clientWidth);
    const ro = new ResizeObserver(() => {
      const w = Math.round(host.clientWidth);
      if (w === lastW) return;
      lastW = w;
      /* A resize mid-entrance would fight the dash tweens — finish them. */
      if (tl && !entered && tl.progress() > 0) tl.progress(1);
      layout();
      if (!entered && tl) {
        linkSel.each(function (d) {
          const len = d.len || this.getTotalLength();
          d3.select(this)
            .attr("stroke-dasharray", `${len} ${len}`)
            .attr("stroke-dashoffset", len);
        });
      }
    });
    ro.observe(host);

    /* ---------------- cleanup ---------------- */
    return () => {
      ro.disconnect();
      if (!reduceMotion) gsap.ticker.remove(tick);
      if (tl) {
        tl.scrollTrigger?.kill();
        tl.kill();
      }
      nodeSel.on("mouseenter", null).on("mouseleave", null).on("focus", null).on("blur", null);
      svg.interrupt();
      svg.selectAll("*").interrupt();
      svg.remove();
      host.replaceChildren();
    };
  }, []);

  return (
    <figure className={className}>
      <div ref={hostRef} className="w-full max-w-full" />
      <figcaption className="sr-only">
        <p>{workflowAutomation.summary}</p>
        <table>
          <caption>Workflow steps, {workflowAutomation.name}</caption>
          <thead>
            <tr>
              <th scope="col">Step</th>
              <th scope="col">Role</th>
              <th scope="col">Sends to</th>
            </tr>
          </thead>
          <tbody>
            {workflowAutomation.nodes.map((n) => {
              const outs = workflowAutomation.links.filter((l) => l.from === n.id);
              return (
                <tr key={n.id}>
                  <th scope="row">{n.label}</th>
                  <td>{ROLE[n.kind]}</td>
                  <td>
                    {outs.length === 0
                      ? "terminal"
                      : outs
                          .map((l) => {
                            const target = workflowAutomation.nodes.find(
                              (t) => t.id === l.to,
                            );
                            const name = target ? target.label : l.to;
                            return l.label ? `${name} (${l.label})` : name;
                          })
                          .join("; ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ul>
          {workflowAutomation.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
