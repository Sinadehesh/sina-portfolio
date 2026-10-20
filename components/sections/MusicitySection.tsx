"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Section, SectionHeading } from "@/components/ui/Section";
import { musicity } from "@/lib/data";

export default function MusicitySection() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const node = panelRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node.querySelectorAll("[data-phase-item]"),
        { opacity: 0, y: 18, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
        },
      );
    }, node);
    return () => ctx.revert();
  }, [active]);

  const phase = musicity.phases[active];

  return (
    <Section id="musicity">
      <SectionHeading
        index="03"
        eyebrow="Business strategy & consultancy"
        title={
          <>
            The engagement that had to
            <span className="text-gold"> find fit</span>, not wait for it
          </>
        }
        lede={musicity.summary}
      />

      <div className="reveal">
        <article className="glass glass-gold grain sheen relative overflow-hidden rounded-lg p-7 sm:p-10 md:p-14">
          <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-ivory/10 pb-8">
            <div>
              <span className="eyebrow">{musicity.kicker}</span>
              <h3 className="display mt-3 text-[clamp(2.25rem,5vw,4rem)] text-ivory">
                {musicity.name}
              </h3>
            </div>
            <p className="max-w-[34ch] font-serif text-lg leading-snug text-ivory-dim italic">
              {musicity.title}
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-14">
            {/* Phase rail */}
            <nav
              aria-label="Engagement phases"
              className="md:col-span-4 lg:col-span-3"
            >
              <ul className="flex gap-2 md:flex-col md:gap-0">
                {musicity.phases.map((p, i) => {
                  const on = i === active;
                  return (
                    <li key={p.id} className="flex-1 md:flex-none">
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-current={on ? "step" : undefined}
                        className={`group relative w-full border-ivory/10 py-4 text-left transition-colors md:border-t md:first:border-t-0 md:py-5 ${
                          on ? "text-ivory" : "text-ivory-faint hover:text-ivory-dim"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`absolute top-0 bottom-0 -left-px hidden w-px bg-gold transition-transform duration-500 md:block ${
                            on ? "scale-y-100" : "scale-y-0"
                          }`}
                          style={{ transformOrigin: "top" }}
                        />
                        <span className="flex items-baseline gap-2 md:gap-3">
                          {/* The ordinal is a nicety; on a phone the three
                              labels need the whole row. */}
                          <span className="hidden font-mono text-[0.625rem] tracking-[0.3em] md:inline">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-[0.6875rem] tracking-[0.12em] uppercase md:text-[0.75rem] md:tracking-[0.24em]">
                            {p.label}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className={`mt-3 block h-px w-full origin-left bg-gold transition-transform duration-500 md:hidden ${
                            on ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Active phase */}
            <div ref={panelRef} className="md:col-span-8 lg:col-span-9">
              <h4
                data-phase-item
                className="display text-[clamp(1.6rem,3.2vw,2.6rem)] text-gradient-ivory"
              >
                {phase.title}
              </h4>
              <p
                data-phase-item
                className="mt-6 max-w-[64ch] text-[1.0625rem] leading-relaxed text-ivory-dim"
              >
                {phase.body}
              </p>

              <dl className="mt-10 grid gap-px overflow-hidden border-t border-ivory/10 sm:grid-cols-3">
                {phase.metrics.map((m) => (
                  <div
                    key={m.k}
                    data-phase-item
                    className="border-b border-ivory/10 py-5 sm:border-r sm:border-b-0 sm:pr-6 sm:last:border-r-0"
                  >
                    <dt className="font-mono text-[0.625rem] tracking-[0.26em] text-ivory-faint uppercase">
                      {m.k}
                    </dt>
                    <dd className="mt-2 font-serif text-lg text-ivory">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </article>
      </div>
    </Section>
  );
}
