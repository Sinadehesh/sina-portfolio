"use client";

import { useEffect, useRef } from "react";
import { useScrollyProgress } from "@/components/scrolly/Scrolly";

/** Screenshot size the boxes below are measured in. */
const W0 = 1600;
const H0 = 1000;

export type TourShot = {
  /** Spotlight label; empty for the overview. */
  label: string;
  /** Region to spotlight, [x, y, w, h] in screenshot pixels. */
  box?: [number, number, number, number];
  /** Camera: centre x, centre y (screenshot pixels) and zoom. */
  cam: [number, number, number];
};

/**
 * A guided camera over a real screenshot. Each step glides the camera to a
 * region, and a spotlight dims everything else; scroll progress drives both,
 * so the reader controls the tour.
 */
export default function TourStage({
  src,
  alt,
  host,
  shots,
}: {
  src: string;
  alt: string;
  host: string;
  shots: TourShot[];
}) {
  const view = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  useScrollyProgress((p) => {
    progress.current = p;
  });

  useEffect(() => {
    const v = view.current;
    const l = layer.current;
    const r = ring.current;
    const tag = pill.current;
    if (!v || !l || !r || !tag) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const full: [number, number, number, number] = [0, 0, W0, H0];
    let ps = progress.current;
    let label = "";

    const frame = (p: number) => {
      const W = v.clientWidth;
      const H = v.clientHeight;
      const n = shots.length;
      const i = clamp(Math.floor(p), 0, n - 1);
      const t = i === 0 ? 1 : ease(clamp((p - i) / 0.42, 0, 1));
      const a = shots[Math.max(0, i - 1)];
      const b = shots[i];

      // Camera: glide between regions, zooming in log space with a slight
      // pull-back mid-flight so long moves read as one gesture.
      const dip = i > 0 ? 1 - 0.22 * Math.sin(Math.PI * t) : 1;
      const z = Math.max(1, Math.exp(lerp(Math.log(a.cam[2]), Math.log(b.cam[2]), t)) * dip);
      const cx = lerp(a.cam[0], b.cam[0], t);
      const cy = lerp(a.cam[1], b.cam[1], t);
      const tx = clamp(W / 2 - (cx / W0) * W * z, W - W * z, 0);
      const ty = clamp(H / 2 - (cy / H0) * H * z, H - H * z, 0);
      l.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${z.toFixed(4)})`;
      l.style.setProperty("--z", z.toFixed(4));

      // Spotlight: shrinks from the whole page onto each region in turn.
      const ba = a.box ?? full;
      const bb = b.box ?? full;
      const box = ba.map((x, k) => lerp(x, bb[k], t));
      // Fades in on the first region, then stays on while it moves.
      const on = i === 0 ? 0 : i === 1 ? clamp((p - 1) / 0.3, 0, 1) : 1;
      r.style.left = `${(box[0] / W0) * 100}%`;
      r.style.top = `${(box[1] / H0) * 100}%`;
      r.style.width = `${(box[2] / W0) * 100}%`;
      r.style.height = `${(box[3] / H0) * 100}%`;
      r.style.opacity = on.toFixed(3);

      // Label pill above the region (below it when there is no room).
      if (b.label !== label) {
        label = b.label;
        tag.textContent = label;
      }
      const sx = tx + (box[0] / W0) * W * z;
      const sy = ty + (box[1] / H0) * H * z;
      const sh = (box[3] / H0) * H * z;
      const below = sy < 40;
      const px = clamp(sx, 8, Math.max(8, W - tag.offsetWidth - 8));
      const py = below ? sy + sh + 10 : sy - 10;
      tag.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translateY(${below ? "0" : "-100%"})`;
      tag.style.opacity = (i === 0 ? 0 : ease(clamp((p - i - 0.3) / 0.15, 0, 1))).toFixed(3);
    };

    if (reduced) {
      // No camera moves: the whole page, nothing dimmed.
      l.style.transform = "none";
      r.style.opacity = "0";
      tag.style.opacity = "0";
      return;
    }

    let raf = 0;
    let visible = false;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ps += (progress.current - ps) * 0.16;
      frame(ps);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
      if (!visible) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(v);
    frame(ps);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [shots]);

  return (
    <div data-stage className="flex h-full items-center">
      <div className="tour-browser w-full">
        <div className="tour-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="tour-url">{host}</span>
          <span className="tour-live">
            <span className="live-dot !h-1.5 !w-1.5" /> Live
          </span>
        </div>
        <div ref={view} className="relative aspect-[16/10] overflow-hidden bg-[#0b2131]">
          <div ref={layer} className="tour-layer absolute inset-0 origin-top-left">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
            <img
              src={src}
              alt={alt}
              width={W0}
              height={H0}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full"
            />
            <span ref={ring} aria-hidden="true" className="tour-ring" />
          </div>
          <span ref={pill} aria-hidden="true" className="tour-pill" />
        </div>
      </div>
    </div>
  );
}
