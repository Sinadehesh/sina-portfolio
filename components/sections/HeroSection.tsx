"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { HeroStage } from "@/components/hero/MindToMatrix";
import { personal } from "@/lib/data";

// The WebGL sequence is client-only and heavy: keep it out of the server
// payload and let the CSS poster hold the frame until it is ready.
const MindToMatrix = dynamic(() => import("@/components/hero/MindToMatrix"), {
  ssr: false,
});

const STAGE_CAPTIONS: Record<HeroStage, { numeral: string; label: string; line: string }> = {
  0: {
    numeral: "I",
    label: "The board",
    line: "Every system starts as a position, and every position is a claim about behavior.",
  },
  1: {
    numeral: "II",
    label: "Dissolution",
    line: "One tactical move and the structure comes apart into the particles it was always made of.",
  },
  2: {
    numeral: "III",
    label: "The manuscript",
    line: "A drafted novel on one page, notes on complexity theory on the other. Same notebook.",
  },
  3: {
    numeral: "IV",
    label: "The matrix",
    line: "Ink resolves into instruction. The observation becomes a system.",
  },
};

export default function HeroSection() {
  const [stage, setStage] = useState<HeroStage>(0);
  const [ready, setReady] = useState(false);

  const handleStage = useCallback((next: HeroStage) => setStage(next), []);
  const handleReady = useCallback(() => setReady(true), []);

  const caption = STAGE_CAPTIONS[stage];
  const titleFaded = stage >= 2;

  return (
    <section id="hero-scroll" className="relative h-[420vh]">
      <div className="vignette sticky top-0 h-screen w-full overflow-hidden bg-charcoal-900">
        {/* Poster: the frame before WebGL is up, and the whole frame if the
            device has no working WebGL context at all. */}
        <div
          aria-hidden
          className={`hero-poster absolute inset-0 transition-opacity duration-1000 ${
            ready ? "opacity-25" : "opacity-100"
          }`}
        />

        <MindToMatrix onStageChange={handleStage} onReady={handleReady} />

        <div className="grain pointer-events-none absolute inset-0 z-[3]" />

        {/* ---- Overlay typography ---- */}
        <div className="pointer-events-none absolute inset-0 z-[4] flex flex-col justify-between px-6 py-10 sm:px-10 md:py-14">
          <div className="flex items-start justify-between gap-6">
            <span className="eyebrow">Sina Dehesh — Portfolio</span>
            <span className="hidden font-mono text-[0.6875rem] tracking-[0.28em] text-ivory-faint sm:block">
              {personal.location.toUpperCase()}
            </span>
          </div>

          <div className="mx-auto w-full max-w-[1400px]">
            <h1
              className={`display text-[clamp(3rem,11.5vw,10rem)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                titleFaded
                  ? "translate-y-[-1.5rem] opacity-25 blur-[2px]"
                  : "translate-y-0 opacity-100 blur-0"
              }`}
            >
              <span className="text-gradient-ivory">Sina Dehesh</span>
            </h1>

            <div
              className={`mt-6 flex flex-col gap-5 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:flex-row sm:items-center sm:gap-8 ${
                titleFaded ? "opacity-30" : "opacity-100"
              }`}
            >
              <span
                aria-hidden
                className="hidden h-px w-24 shrink-0 bg-gold/60 sm:block"
              />
              <p className="max-w-[34ch] font-serif text-[clamp(1.35rem,2.6vw,2.25rem)] leading-tight font-light text-ivory italic">
                Engineering Behavior, Building Systems.
              </p>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between gap-8">
            {/* Stage read-out — the cinematic chapter card. */}
            <div key={stage} className="hero-caption max-w-[46ch]">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.6875rem] tracking-[0.3em] text-gold">
                  {caption.numeral}
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.3em] text-ivory-faint uppercase">
                  {caption.label}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ivory-dim">
                {caption.line}
              </p>
            </div>

            <div
              className={`hidden shrink-0 flex-col items-center gap-3 transition-opacity duration-700 sm:flex ${
                stage === 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="font-mono text-[0.625rem] tracking-[0.3em] text-ivory-faint uppercase">
                Scroll
              </span>
              <span className="scroll-thread relative block h-16 w-px bg-ivory/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
