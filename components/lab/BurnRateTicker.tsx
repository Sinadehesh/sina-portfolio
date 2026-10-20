"use client";

import { useEffect, useRef, useState } from "react";
import { costly } from "@/lib/data";

const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Costly's core readout: the cost of the time you are spending right now,
 * priced against a savings goal and never allowed to sit at zero.
 *
 * The number is written straight to the DOM on a rAF loop — putting a
 * 60fps counter through React state would re-render the whole card for
 * every cent.
 */
export default function BurnRateTicker({ className = "" }: { className?: string }) {
  const wholeRef = useRef<HTMLSpanElement>(null);
  const fracRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef<HTMLSpanElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const perSecond = costly.hourlyRate / 3600;
    const start = performance.now();
    let raf = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const paint = () => {
      const seconds = (performance.now() - start) / 1000;
      const burned = seconds * perSecond;

      if (wholeRef.current) wholeRef.current.textContent = money.format(burned);
      if (fracRef.current) {
        // Sub-cent digits: the visible proof that the meter never stops.
        const sub = Math.floor((burned * 10000) % 100);
        fracRef.current.textContent = String(sub).padStart(2, "0");
      }
      if (elapsedRef.current) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        elapsedRef.current.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      }
      if (barRef.current) {
        const pct = Math.min(1, burned / costly.goalAmount) * 100;
        // Always a visible sliver: the stake is never completely zero.
        barRef.current.style.width = `${Math.max(0.6, pct)}%`;
      }
    };

    if (mq.matches) {
      paint();
      timer = setInterval(paint, 1000);
    } else {
      const loop = () => {
        paint();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[0.625rem] tracking-[0.28em] text-ivory-faint uppercase">
          Burn · this session
        </span>
        <span className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.28em] text-ivory-faint uppercase">
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full bg-gold ${reduced ? "" : "animate-pulse"}`}
          />
          <span ref={elapsedRef}>00:00</span>
        </span>
      </div>

      <p
        className="mt-4 flex items-baseline font-mono leading-none tabular-nums"
        role="status"
        aria-live="off"
        aria-label="Live cost of the current session"
      >
        <span
          ref={wholeRef}
          className="text-[clamp(2.5rem,7vw,4.25rem)] font-light tracking-tight text-ivory"
        >
          €0.00
        </span>
        <span
          ref={fracRef}
          className="ml-1 text-[clamp(1rem,2.4vw,1.5rem)] font-light text-gold"
        >
          00
        </span>
      </p>

      <div className="mt-7">
        <div className="flex items-baseline justify-between gap-4 font-mono text-[0.625rem] tracking-[0.24em] text-ivory-faint uppercase">
          <span>{costly.goalLabel}</span>
          <span className="text-ivory-dim">
            {money.format(costly.goalAmount)}
          </span>
        </div>
        <span className="mt-3 block h-px w-full bg-ivory/12">
          <span
            ref={barRef}
            className="block h-px bg-gold shadow-[0_0_12px_var(--color-gold)]"
            style={{ width: "0.6%" }}
          />
        </span>
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-ivory-faint">
          Priced at {money.format(costly.hourlyRate)}/hour against the goal.
          The meter has no zero state — that is the entire argument.
        </p>
      </div>
    </div>
  );
}
