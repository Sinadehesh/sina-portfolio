"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's background: a field of particles drifting along a slow flow
 * field, like thousands of small choices. The pointer acts as attention:
 * particles near it are pulled into orbit and heat up to ember. Without a
 * pointer (phones, or the pointer elsewhere) a soft attractor wanders the
 * field on its own. Pauses off-screen and in hidden tabs; under reduced motion
 * it draws one still frame of streamlines.
 */
export default function DecisionField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    const area = canvas?.parentElement;
    if (!canvas || !ctx || !area) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const count = small ? 520 : 1350;
    const radius = small ? 150 : 230;

    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const life = new Float32Array(count);
    let w = 0;
    let h = 0;
    let t = Math.random() * 100;
    let frame = 0;
    let last = 0;
    let visible = true;
    const ptr = { x: 0, y: 0, tx: 0, ty: 0, auto: true, heat: 0 };

    const seed = (i: number) => {
      px[i] = Math.random() * w;
      py[i] = Math.random() * h;
      life[i] = 60 + Math.random() * 260;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round";
      for (let i = 0; i < count; i++) seed(i);
      ptr.x = ptr.tx = w * 0.7;
      ptr.y = ptr.ty = h * 0.5;
    };

    // A smooth, cheap pseudo-noise: three slow interfering waves.
    const angle = (x: number, y: number) => {
      const s = 0.0019;
      return (
        (Math.sin(x * s + t * 0.9) + Math.cos(y * s * 1.33 - t * 0.7) + Math.sin((x - y) * s * 0.57 + t * 0.45)) * 1.2
      );
    };

    const step = (dt: number, fade: boolean) => {
      const k = Math.min(dt / 16.67, 3);
      t += 0.0016 * k;

      if (ptr.auto) {
        const a = t * 2.4;
        if (small) {
          ptr.tx = w * (0.72 + 0.14 * Math.sin(a));
          ptr.ty = h * (0.86 + 0.06 * Math.sin(a * 1.6 + 1));
        } else {
          ptr.tx = w * (0.66 + 0.16 * Math.sin(a));
          ptr.ty = h * (0.5 + 0.24 * Math.sin(a * 1.6 + 1));
        }
      }
      ptr.x += (ptr.tx - ptr.x) * 0.09 * k;
      ptr.y += (ptr.ty - ptr.y) * 0.09 * k;
      // Attention "heats up" while the visitor is pointing, cools when not.
      ptr.heat += ((ptr.auto ? 0.45 : 1) - ptr.heat) * 0.04 * k;

      if (fade) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.09)";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }

      const cold = new Path2D();
      const warm = new Path2D();
      const hot = new Path2D();
      const r2 = radius * radius;

      for (let i = 0; i < count; i++) {
        const x = px[i];
        const y = py[i];
        const a = angle(x, y);
        let vx = Math.cos(a) * 0.9;
        let vy = Math.sin(a) * 0.9;
        let path = cold;

        const dx = x - ptr.x;
        const dy = y - ptr.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / radius) * ptr.heat;
          // Orbit the point of attention, with a gentle pull inwards and a
          // small dead zone at the centre so it never collapses to a dot.
          const pull = d < 26 ? -0.8 : 0.42;
          vx += ((-dy / d) * 2.6 - (dx / d) * pull) * f;
          vy += ((dx / d) * 2.6 - (dy / d) * pull) * f;
          path = f > 0.42 ? hot : f > 0.12 ? warm : cold;
        }

        const nx = x + vx * k;
        const ny = y + vy * k;
        path.moveTo(x, y);
        path.lineTo(nx, ny);
        px[i] = nx;
        py[i] = ny;
        life[i] -= k;
        if (life[i] <= 0 || nx < -20 || nx > w + 20 || ny < -20 || ny > h + 20) seed(i);
      }

      ctx.lineWidth = 0.9;
      ctx.strokeStyle = fade ? "rgba(243,240,234,0.24)" : "rgba(243,240,234,0.07)";
      ctx.stroke(cold);
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = "rgba(255,138,92,0.6)";
      ctx.stroke(warm);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "rgba(255,91,31,0.95)";
      ctx.stroke(hot);
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const dt = last ? now - last : 16.67;
      last = now;
      step(dt, true);
    };
    const start = () => {
      if (frame || !visible || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();

    if (reduced) {
      // One still frame: let the field draw its own streamlines.
      ptr.heat = 0;
      for (let s = 0; s < 140; s++) step(16.67, false);
      return;
    }

    const ro = new ResizeObserver(() => {
      if (Math.abs(canvas.clientWidth - w) > 1 || Math.abs(canvas.clientHeight - h) > 1) resize();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      ptr.tx = e.clientX - r.left;
      ptr.ty = e.clientY - r.top;
      ptr.auto = false;
    };
    const onLeave = () => {
      ptr.auto = true;
    };
    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
