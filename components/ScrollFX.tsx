"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Mounted once, near the root. Owns the page-wide scroll choreography so
 * individual sections can stay server components that only carry classes:
 *   .reveal          — fades/rises in once, on entry
 *   [data-stagger]   — children with .reveal inside animate as a group
 *   [data-parallax]  — drifts at a fraction of scroll speed
 * Sections that own their own canvas (hero, D3 charts) run their own
 * triggers; this only handles the ambient layer.
 */
export default function ScrollFX() {
  useEffect(() => {
    // Tell CSS that JS is live, so .reveal is allowed to start hidden.
    document.body.classList.remove("js-off");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(".reveal", { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Grouped reveals: a card and its contents arrive together, slightly
      // offset, instead of every element firing its own trigger.
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>(".reveal");
        if (!items.length) return;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      // Everything else that is not inside a stagger group.
      gsap.utils
        .toArray<HTMLElement>(".reveal")
        .filter((el) => !el.closest("[data-stagger]"))
        .forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const depth = Number(el.dataset.parallax || 0.12);
        gsap.fromTo(
          el,
          { yPercent: -depth * 50 },
          {
            yPercent: depth * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Gold reading-progress thread at the top of the viewport.
      const bar = document.querySelector<HTMLElement>("[data-progress-bar]");
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          },
        );
      }
    });

    // `ctx.revert()` kills exactly the triggers created inside this context.
    // Killing every ScrollTrigger on the page would take the hero, the four
    // charts, the email wireframe and the CV terminal down with it on any
    // StrictMode remount.
    return () => ctx.revert();
  }, []);

  return null;
}
