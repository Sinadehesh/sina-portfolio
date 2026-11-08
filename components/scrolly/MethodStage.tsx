"use client";

import { useEffect, useRef } from "react";
import { useScrollyProgress } from "@/components/scrolly/Scrolly";
import { gates } from "@/lib/gates";

/**
 * The "How I work" diagram. Visitors stream through four decision gates
 * toward "Customers"; the story's scroll progress p (0–6) sets what the
 * diagram shows:
 *   0–1  the flow          1–2  drop-offs at each gate
 *   2–3  the doubt behind each gate
 *   3–4  a scan diagnoses each doubt as a named barrier
 *   4–5  the gates open as each barrier gets its fix
 *   5–6  the product frame draws around it; the meter shows more get through
 * The flow is a simulation (labelled as such); positions live in flow space
 * (u along the flow, v across it) so the same diagram runs left-to-right on
 * desktop and top-to-bottom on phones.
 */

const moments = gates;

const GATES = [0.18, 0.38, 0.58, 0.78];
const POOL = 0.86;
const WALL = 1.32;
// Chance a visitor turns back at each gate: calm, emphasised (the problem), fixed.
const BASE = [0.12, 0.14, 0.15, 0.12];
const HIGH = [0.3, 0.34, 0.36, 0.3];
const LOW = [0.04, 0.05, 0.05, 0.04];

const DEAD = 0;
const FLOW = 1;
const DROP = 2;
const DONE = 3;

const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ss = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

type Geo = {
  horizontal: boolean;
  W: number;
  H: number;
  half: number;
  pt: (u: number, v: number) => [number, number];
  frame: { x: number; y: number; w: number; h: number; bar: number };
  dropSign: number;
};

function geometry(W: number, H: number, horizontal: boolean): Geo {
  if (horizontal) {
    const x0 = W * 0.05;
    const L = W * 0.9;
    const cy = H * 0.57;
    const half = Math.min(H * 0.095, W * 0.09, 86);
    return {
      horizontal,
      W,
      H,
      half,
      dropSign: 1,
      pt: (u, v) => [x0 + u * L, cy + v * half],
      frame: { x: x0 - 26, y: cy - half * WALL - 226, w: L + 52, h: half * WALL * 2 + 300, bar: 34 },
    };
  }
  const y0 = H * 0.17;
  const L = H * 0.7;
  const cx = W * 0.22;
  const half = Math.min(W * 0.13, 60);
  return {
    horizontal,
    W,
    H,
    half,
    dropSign: -1,
    pt: (u, v) => [cx + v * half, y0 + u * L],
    frame: { x: 4, y: 4, w: W - 8, h: H - 8, bar: 30 },
  };
}

function state(p: number) {
  const emph = ss(0.55, 1.35, p);
  const fixed = GATES.map((_, g) => ss(4.1 + 0.13 * g, 4.55 + 0.13 * g, p));
  return {
    drop: GATES.map((_, g) => lerp(lerp(BASE[g], HIGH[g], emph), LOW[g], fixed[g])),
    open: fixed.map((f) => lerp(0.42, 0.98, f)),
    fixed,
    diag: GATES.map((u) => ss(3.05 + 0.8 * u - 0.03, 3.05 + 0.8 * u + 0.05, p)),
    doubt: GATES.map((_, g) => ss(2.02 + 0.13 * g, 2.3 + 0.13 * g, p)),
    scanU: (p - 3.05) / 0.8,
    scanA: ss(3.0, 3.1, p) * (1 - ss(3.88, 3.98, p)),
    frame: ss(5.05, 5.55, p),
    frameLabel: ss(5.3, 5.55, p),
    meter: ss(1.05, 1.35, p),
    drops: ss(1.05, 1.35, p) * (1 - ss(4.2, 4.6, p)),
    glow: ss(4.4, 5.2, p),
  };
}

export default function MethodStage() {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  useScrollyProgress((p) => {
    progress.current = p;
  });

  useEffect(() => {
    const el = root.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!el || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)");
    const q = <T extends HTMLElement>(sel: string) => Array.from(el.querySelectorAll<T>(sel));
    const chips = q<HTMLElement>("[data-chip]");
    const layers = chips.map((c) => ({
      doubt: c.querySelector<HTMLElement>('[data-layer="doubt"]')!,
      barrier: c.querySelector<HTMLElement>('[data-layer="barrier"]')!,
      fix: c.querySelector<HTMLElement>('[data-layer="fix"]')!,
    }));
    const drops = q<HTMLElement>("[data-drop]");
    const customers = el.querySelector<HTMLElement>("[data-customers]")!;
    const meter = el.querySelector<HTMLElement>("[data-meter]")!;
    const meterFill = el.querySelector<HTMLElement>("[data-meter-fill]")!;
    const frameLabel = el.querySelector<HTMLElement>("[data-frame-label]")!;

    const MAX = wide.matches ? 240 : 150;
    const U = new Float32Array(MAX);
    const V = new Float32Array(MAX);
    const DU = new Float32Array(MAX);
    const DV = new Float32Array(MAX);
    const LANE = new Float32Array(MAX);
    const LIFE = new Float32Array(MAX);
    const A = new Float32Array(MAX);
    const PU = new Float32Array(MAX);
    const PV = new Float32Array(MAX);
    const S = new Uint8Array(MAX);
    let meterVal = 0.45;
    let spawnAcc = 0;
    let ps = progress.current;
    let geo = geometry(1, 1, true);

    const place = (n: HTMLElement, x: number, y: number, tx: string, ty: string) => {
      n.style.left = `${x}px`;
      n.style.top = `${y}px`;
      n.style.transform = `translate(${tx}, ${ty})`;
    };

    const layout = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      if (!W || !H) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      geo = geometry(W, H, wide.matches);
      const g = geo;
      el.dataset.orient = g.horizontal ? "h" : "v";
      chips.forEach((c, i) => {
        const [x, y] = g.pt(GATES[i], g.horizontal ? -WALL : WALL);
        if (g.horizontal) place(c, x, y - (i % 2 ? 22 : 104), "-50%", "-100%");
        else place(c, x + 16, y, "0", "-50%");
      });
      drops.forEach((d, i) => {
        const [x, y] = g.pt(GATES[i], WALL);
        place(d, x, y + 16, "-50%", "0");
      });
      const [cx, cy] = g.pt(0.925, WALL);
      if (g.horizontal) place(customers, cx, cy + 16, "-50%", "0");
      else place(customers, cx + 16, cy, "0", "-50%");
      if (g.horizontal) {
        place(meter, g.frame.x, g.frame.y + g.frame.h + 28, "0", "0");
        meter.style.width = `${Math.min(300, g.frame.w * 0.5)}px`;
      } else {
        // Phones: the meter sits top-right, clear of the pool and its label.
        const mx = g.pt(0, WALL)[0] + 16;
        place(meter, mx, g.frame.bar + 12, "0", "0");
        meter.style.width = `${g.W - mx - 14}px`;
      }
      place(frameLabel, g.frame.x + 66, g.frame.y + g.frame.bar / 2, "0", "-50%");
      frameLabel.textContent = (g.horizontal ? frameLabel.dataset.long : frameLabel.dataset.short) ?? "";
    };

    const spawn = () => {
      for (let i = 0; i < MAX; i++) {
        if (S[i] !== DEAD) continue;
        S[i] = FLOW;
        U[i] = -0.02;
        LANE[i] = (Math.random() * 2 - 1) * 0.85;
        V[i] = LANE[i];
        DU[i] = 0.00014 + Math.random() * 0.00007;
        A[i] = 1;
        return;
      }
    };

    const update = (dt: number, st: ReturnType<typeof state>) => {
      const k = Math.min(dt / 16.67, 3);
      spawnAcc += dt * (MAX / 5600);
      while (spawnAcc >= 1) {
        spawn();
        spawnAcc -= 1;
      }
      for (let i = 0; i < MAX; i++) {
        const s = S[i];
        if (s === FLOW) {
          const u0 = U[i];
          const u1 = u0 + DU[i] * dt;
          let dropped = false;
          for (let g = 0; g < GATES.length; g++) {
            if (u0 < GATES[g] && u1 >= GATES[g] && Math.random() < st.drop[g]) {
              // Turned back at the gate: bounce off and fall out of the flow.
              S[i] = DROP;
              U[i] = GATES[g] - 0.004;
              DU[i] = -0.00002;
              DV[i] = (0.0004 + Math.random() * 0.0006) * geo.dropSign;
              dropped = true;
              break;
            }
          }
          if (dropped) continue;
          U[i] = u1;
          let next = -1;
          for (let g = 0; g < GATES.length; g++) {
            if (GATES[g] > u1) {
              next = g;
              break;
            }
          }
          if (next >= 0 && GATES[next] - u1 < 0.07) {
            // Squeeze through the gate's opening.
            const lim = st.open[next] * 0.9;
            if (Math.abs(V[i]) > lim) V[i] += (Math.sign(V[i]) * lim - V[i]) * 0.16 * k;
          } else {
            V[i] += (LANE[i] - V[i]) * 0.02 * k;
          }
          if (u1 >= POOL) {
            S[i] = DONE;
            PU[i] = 0.885 + Math.random() * 0.085;
            PV[i] = (Math.random() * 2 - 1) * 0.92;
            LIFE[i] = 2600 + Math.random() * 2400;
          }
        } else if (s === DROP) {
          U[i] += DU[i] * dt;
          V[i] += DV[i] * dt;
          DV[i] += geo.dropSign * 0.0000028 * dt;
          A[i] -= 0.0011 * dt;
          if (A[i] <= 0 || Math.abs(V[i]) > 6) S[i] = DEAD;
        } else if (s === DONE) {
          U[i] += (PU[i] - U[i]) * 0.05 * k;
          V[i] += (PV[i] - V[i]) * 0.05 * k;
          LIFE[i] -= dt;
          A[i] = Math.min(1, LIFE[i] / 700);
          if (LIFE[i] <= 0) S[i] = DEAD;
        }
      }
      const through = st.drop.reduce((acc, d) => acc * (1 - d), 1);
      meterVal += (through - meterVal) * 0.06 * k;
    };

    const mix = (a: number[], b: number[], t: number) => a.map((x, i) => lerp(x, b[i], t));
    const rgba = (c: number[]) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${c[3].toFixed(3)})`;
    const IDLE = [243, 240, 234, 0.42];
    const HOT = [255, 91, 31, 1];
    const OPEN = [255, 138, 92, 0.5];

    const draw = (st: ReturnType<typeof state>) => {
      const g = geo;
      ctx.clearRect(0, 0, g.W, g.H);

      // The product frame, drawn as it gets built.
      if (st.frame > 0) {
        const { x, y, w, h, bar } = g.frame;
        const per = 2 * (w + h);
        ctx.save();
        ctx.strokeStyle = "rgba(243,240,234,0.3)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([per * st.frame, per]);
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, w, h, 12);
        else ctx.rect(x, y, w, h);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = ss(0.5, 1, st.frame);
        ctx.beginPath();
        ctx.moveTo(x, y + bar);
        ctx.lineTo(x + w, y + bar);
        ctx.stroke();
        [HOT, IDLE, IDLE].forEach((c, i) => {
          ctx.fillStyle = rgba(i === 0 ? c : [c[0], c[1], c[2], 0.3]);
          ctx.beginPath();
          ctx.arc(x + 18 + i * 14, y + bar / 2, 4, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // Channel walls.
      ctx.strokeStyle = "rgba(243,240,234,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const side of [-WALL, WALL]) {
        const [ax, ay] = g.pt(-0.02, side);
        const [bx, by] = g.pt(1, side);
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
      }
      ctx.stroke();

      // Customers: the warm pool at the end.
      const [px, py] = g.pt(0.925, 0);
      const R = g.half * 1.9;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, R);
      grad.addColorStop(0, `rgba(255,91,31,${(0.07 + 0.24 * st.glow).toFixed(3)})`);
      grad.addColorStop(1, "rgba(255,91,31,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(px - R, py - R, R * 2, R * 2);

      // Visitors.
      const flow = new Path2D();
      const fall = new Path2D();
      const done = new Path2D();
      const L = g.horizontal ? g.W * 0.9 : g.H * 0.74;
      for (let i = 0; i < MAX; i++) {
        const s = S[i];
        if (s === DEAD) continue;
        const [x, y] = g.pt(U[i], V[i]);
        if (s === FLOW) {
          const tail = DU[i] * 90 * L;
          if (g.horizontal) {
            flow.moveTo(x - tail, y);
            flow.lineTo(x, y);
          } else {
            flow.moveTo(x, y - tail);
            flow.lineTo(x, y);
          }
        } else if (s === DROP) {
          fall.moveTo(x + 2, y);
          fall.arc(x, y, 2, 0, Math.PI * 2);
        } else {
          done.moveTo(x + 2.2, y);
          done.arc(x, y, 2.2, 0, Math.PI * 2);
        }
      }
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(243,240,234,0.72)";
      ctx.stroke(flow);
      ctx.fillStyle = "rgba(217,130,111,0.62)";
      ctx.fill(fall);
      ctx.fillStyle = "rgba(255,91,31,0.95)";
      ctx.fill(done);

      // Leader lines from the far tier of chips to their gates.
      if (g.horizontal) {
        GATES.forEach((u, gi) => {
          if (gi % 2) return;
          const [x, y] = g.pt(u, -WALL);
          ctx.strokeStyle = rgba(mix([243, 240, 234, 0.22], [255, 91, 31, 0.8], Math.max(st.diag[gi], st.fixed[gi])));
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 4]);
          ctx.beginPath();
          ctx.moveTo(x, y - 104);
          ctx.lineTo(x, y - 6);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Gates: grey, then lit when diagnosed, then opened when fixed.
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      GATES.forEach((u, gi) => {
        const c = mix(mix(IDLE, HOT, st.diag[gi]), OPEN, st.fixed[gi]);
        ctx.strokeStyle = rgba(c);
        ctx.save();
        if (st.diag[gi] > 0.05 && st.fixed[gi] < 0.95) {
          ctx.shadowColor = "rgba(255,91,31,0.8)";
          ctx.shadowBlur = 14 * st.diag[gi] * (1 - st.fixed[gi]);
        }
        const o = st.open[gi];
        ctx.beginPath();
        let [ax, ay] = g.pt(u, -WALL);
        let [bx, by] = g.pt(u, -o);
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        [ax, ay] = g.pt(u, o);
        [bx, by] = g.pt(u, WALL);
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.restore();
      });

      // The diagnostic scan.
      if (st.scanA > 0) {
        const u = clamp(st.scanU, 0, 1);
        const [x1, y1] = g.pt(u, -1.9);
        const [x2, y2] = g.pt(u, 1.9);
        ctx.save();
        ctx.globalAlpha = st.scanA;
        const band = g.horizontal
          ? ctx.createLinearGradient(x1 - 46, 0, x1, 0)
          : ctx.createLinearGradient(0, y1 - 46, 0, y1);
        band.addColorStop(0, "rgba(255,91,31,0)");
        band.addColorStop(1, "rgba(255,91,31,0.22)");
        ctx.fillStyle = band;
        if (g.horizontal) ctx.fillRect(x1 - 46, y1, 46, y2 - y1);
        else ctx.fillRect(x1, y1 - 46, x2 - x1, 46);
        ctx.strokeStyle = "#ff5b1f";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#ff5b1f";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }
    };

    const setO = (n: HTMLElement, o: number) => {
      const v = o.toFixed(3);
      if (n.dataset.o !== v) {
        n.dataset.o = v;
        n.style.opacity = v;
      }
    };

    const paintOverlays = (st: ReturnType<typeof state>) => {
      chips.forEach((c, g) => {
        setO(layers[g].doubt, st.doubt[g] * (1 - st.diag[g]));
        setO(layers[g].barrier, st.diag[g] * (1 - st.fixed[g]));
        setO(layers[g].fix, st.fixed[g]);
        const mode = st.fixed[g] > 0.5 ? "fix" : st.diag[g] > 0.5 ? "barrier" : st.doubt[g] > 0.5 ? "doubt" : "idle";
        if (c.dataset.mode !== mode) c.dataset.mode = mode;
      });
      drops.forEach((d) => setO(d, geo.horizontal ? st.drops : 0));
      setO(meter, st.meter);
      meterFill.style.transform = `scaleX(${clamp(meterVal, 0.02, 1).toFixed(3)})`;
      setO(frameLabel, st.frameLabel);
      const glow = st.glow > 0.5 ? "1" : "0";
      if (customers.dataset.glow !== glow) customers.dataset.glow = glow;
    };

    layout();

    if (reduced) {
      // One still frame of the finished story, redrawn only on resize.
      const st = state(6);
      for (let n = 0; n < 420; n++) update(16.67, st);
      meterVal = 0.8;
      const still = () => {
        layout();
        draw(st);
        paintOverlays(st);
      };
      still();
      const ro = new ResizeObserver(still);
      ro.observe(el);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    let visible = false;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = last ? Math.min(now - last, 50) : 16.67;
      last = now;
      ps += (progress.current - ps) * Math.min(1, 0.14 * (dt / 16.67));
      const st = state(ps);
      update(dt, st);
      draw(st);
      paintOverlays(st);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Warm up so the flow is already running when it scrolls into view.
    const warm = state(ps);
    for (let n = 0; n < 240; n++) update(16.67, warm);

    const ro = new ResizeObserver(layout);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    const onMedia = () => layout();
    wide.addEventListener("change", onMedia);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      wide.removeEventListener("change", onMedia);
    };
  }, []);

  return (
    <div ref={root} data-stage aria-hidden="true" className="method-stage relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {moments.map((m, g) => (
        <div key={m.n} data-chip={g} data-mode="fix" className="method-chip">
          <span className="method-chip-head">
            <span className="method-chip-n">{m.n}</span> {m.name}
          </span>
          <span className="method-chip-body">
            <span data-layer="doubt">{m.doubt}</span>
            <span data-layer="barrier">{m.barrier}</span>
            <span data-layer="fix">{m.fix}</span>
          </span>
        </div>
      ))}
      {moments.map((m) => (
        <span key={m.n} data-drop className="method-drop">
          drop-off ↓
        </span>
      ))}
      <span data-customers className="method-customers">
        Customers
      </span>
      <div data-meter className="method-meter">
        <span>Reach the end · simulation</span>
        <span className="method-meter-track">
          <span data-meter-fill className="method-meter-fill" />
        </span>
      </div>
      <span
        data-frame-label
        data-long="Shipped: website · funnel · app — every step measured"
        data-short="Shipped · measured"
        className="method-frame-label"
      >
        Shipped: website · funnel · app — every step measured
      </span>
    </div>
  );
}
