"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scrollytelling: a sticky stage beside (desktop) or above (phone) a column of
 * steps. Each step is a block marked `data-scrolly-step`. As the steps pass a
 * reading line, progress `p` runs from 0 to the number of steps — the integer
 * part is the current step, the fraction how far into it the reader is — and
 * the stage redraws from it. Everything is driven by scroll position, so the
 * reader sets the pace.
 */

type Listener = (p: number, step: number) => void;

const ScrollyContext = createContext<{ subscribe: (fn: Listener) => () => void } | null>(null);

/** Called on every frame the scroll position changes while the chapter is on screen. */
export function useScrollyProgress(fn: Listener) {
  const ctx = useContext(ScrollyContext);
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  useEffect(() => ctx?.subscribe((p, step) => ref.current(p, step)), [ctx]);
}

export default function Scrolly({
  stage,
  children,
  stageClassName = "",
}: {
  /** The pinned graphic. Client component that reads progress with useScrollyProgress. */
  stage: ReactNode;
  /** The steps, each a block with `data-scrolly-step`. */
  children: ReactNode;
  stageClassName?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const listeners = useRef(new Set<Listener>());
  const [api] = useState(() => ({
    subscribe: (fn: Listener) => {
      listeners.current.add(fn);
      return () => {
        listeners.current.delete(fn);
      };
    },
  }));

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-scrolly-step]"));
    if (!steps.length) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    let visible = false;
    let active = -1;
    let last = -1;

    const measure = () => {
      // The reading line: mid-screen beside the stage on desktop, below the
      // stage on phones (the stage covers the top half there).
      const line = window.innerHeight * (wide.matches ? 0.55 : 0.74);
      let p = 0;
      for (const s of steps) {
        const r = s.getBoundingClientRect();
        p += Math.min(1, Math.max(0, (line - r.top) / r.height));
      }
      const step = Math.min(steps.length - 1, Math.floor(p));
      if (step !== active) {
        steps.forEach((s, i) => s.classList.toggle("is-active", i === step));
        active = step;
      }
      if (Math.abs(p - last) > 1e-4) {
        last = p;
        listeners.current.forEach((fn) => fn(p, step));
      }
    };
    const loop = () => {
      measure();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(el);
    measure();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ScrollyContext.Provider value={api}>
      <div ref={root} className="scrolly relative lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Phone: the stage itself sticks under the nav. Desktop: it fills the
            row beside the steps and its inner box sticks. */}
        <div
          className={`scrolly-stage sticky top-16 z-10 -mx-5 h-[50svh] px-5 sm:-mx-10 sm:px-10 lg:static lg:z-auto lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mx-0 lg:h-auto lg:px-0 ${stageClassName}`}
        >
          <div className="h-full py-3 lg:sticky lg:top-20 lg:h-[calc(100svh-6rem)] lg:py-0">{stage}</div>
        </div>
        <div className="relative lg:col-span-5 lg:col-start-1 lg:row-start-1">
          {children}
          <div aria-hidden="true" className="h-[18svh] lg:h-[30svh]" />
        </div>
      </div>
    </ScrollyContext.Provider>
  );
}
