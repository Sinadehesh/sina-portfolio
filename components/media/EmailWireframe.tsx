"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dailySublime } from "@/lib/data";

/**
 * An HTML email wireframe that assembles itself, then demonstrates the
 * engagement device: the one-click reply buttons at the foot of every
 * issue. A pointer glides in, picks one, and the reply is logged — the
 * whole point being that responding costs the reader a single tap.
 */
export default function EmailWireframe({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [replies, setReplies] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(root.querySelectorAll("[data-wire]"), { opacity: 1, scaleX: 1, y: 0 });
      setPicked(0);
      setReplies(1);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll<HTMLElement>("[data-wire='line']");
      const blocks = root.querySelectorAll<HTMLElement>("[data-wire='block']");
      const buttons = root.querySelectorAll<HTMLElement>("[data-wire='button']");
      const pointer = root.querySelector<HTMLElement>("[data-wire='pointer']");

      gsap.set([lines, blocks], { opacity: 0, scaleX: 0.2, transformOrigin: "left center" });
      gsap.set(buttons, { opacity: 0, y: 12 });
      gsap.set(pointer, { opacity: 0, xPercent: -50, yPercent: -50 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      tl.to(blocks, {
        opacity: 1,
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.09,
      })
        .to(
          lines,
          { opacity: 1, scaleX: 1, duration: 0.45, ease: "power2.out", stagger: 0.045 },
          "-=0.35",
        )
        .to(
          buttons,
          { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)", stagger: 0.1 },
          "-=0.1",
        );

      // The demonstration: pointer travels to a reply button and taps it.
      const target = buttons[0];
      if (pointer && target) {
        tl.add(() => {
          const pr = target.getBoundingClientRect();
          const rr = root.getBoundingClientRect();
          gsap.set(pointer, {
            x: pr.left - rr.left + pr.width * 0.62,
            y: pr.top - rr.top + pr.height * 0.6,
          });
        })
          .to(pointer, { opacity: 1, duration: 0.3 })
          .fromTo(
            pointer,
            { scale: 1 },
            { scale: 0.72, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.inOut" },
          )
          .add(() => {
            setPicked(0);
            setReplies((r) => r + 1);
          })
          .to(pointer, { opacity: 0, duration: 0.4, delay: 0.35 });
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Mail client chrome */}
      <div className="overflow-hidden rounded-md border border-ivory/12 bg-void/60">
        <div className="flex items-center gap-2 border-b border-ivory/10 px-4 py-3">
          <span aria-hidden className="h-2 w-2 rounded-full bg-ivory/20" />
          <span aria-hidden className="h-2 w-2 rounded-full bg-ivory/20" />
          <span aria-hidden className="h-2 w-2 rounded-full bg-ivory/20" />
          <span className="ml-3 truncate font-mono text-[0.625rem] tracking-[0.22em] text-ivory-faint uppercase">
            inbox — the daily sublime — issue no. {dailySublime.issues}
          </span>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {/* Masthead */}
          <div data-wire="block" className="border-b border-ivory/10 pb-5">
            <p className="font-serif text-[clamp(1.25rem,3vw,1.75rem)] leading-none text-ivory">
              The Daily Sublime
            </p>
            <p className="mt-2 font-mono text-[0.625rem] tracking-[0.24em] text-ivory-faint uppercase">
              from: sina · issue {dailySublime.issues} of {dailySublime.issues}
            </p>
          </div>

          {/* Hero art slot */}
          <div
            data-wire="block"
            className="relative h-32 w-full overflow-hidden rounded-sm border border-ivory/10 sm:h-40"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_35%_45%,color-mix(in_oklab,var(--color-gold)_22%,transparent),transparent_70%),linear-gradient(120deg,var(--color-charcoal-700),var(--color-charcoal-900))]" />
            <div className="grain absolute inset-0" />
            <span className="absolute bottom-3 left-4 font-mono text-[0.5625rem] tracking-[0.28em] text-ivory-faint uppercase">
              plate 30 — figure in low light
            </span>
          </div>

          {/* Body copy skeleton */}
          <div className="space-y-2.5">
            {[100, 96, 88, 94, 72].map((w, i) => (
              <span
                key={i}
                data-wire="line"
                className="block h-2 rounded-full bg-ivory/12"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>

          {/* The engagement device */}
          <div className="border-t border-ivory/10 pt-6">
            <p className="font-mono text-[0.625rem] tracking-[0.24em] text-ivory-faint uppercase">
              One tap to reply
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {dailySublime.replyButtons.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  data-wire="button"
                  onClick={() => {
                    setPicked(i);
                    setReplies((r) => r + 1);
                  }}
                  className={`rounded-full border px-5 py-2.5 font-mono text-[0.6875rem] tracking-[0.18em] uppercase transition-all duration-500 ${
                    picked === i
                      ? "border-gold bg-gold/15 text-gold shadow-[0_0_28px_-10px_var(--color-gold)]"
                      : "border-ivory/20 text-ivory-dim hover:border-gold/60 hover:text-ivory"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p
              className="mt-5 font-mono text-[0.625rem] tracking-[0.22em] text-ivory-faint uppercase"
              aria-live="polite"
            >
              replies logged this issue:{" "}
              <span className="text-gold">{String(replies).padStart(3, "0")}</span>
              {picked !== null ? (
                <span className="ml-3 text-ivory-dim">
                  — “{dailySublime.replyButtons[picked]}” recorded
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated pointer */}
      <span
        data-wire="pointer"
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 h-6 w-6 rounded-full border border-gold bg-gold/20 opacity-0 shadow-[0_0_24px_-4px_var(--color-gold)]"
      />
    </div>
  );
}
