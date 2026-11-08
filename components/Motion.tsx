"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

/**
 * The page-wide motion layer, mounted once in the root layout. Sections stay
 * server components and opt in with classes and data attributes:
 *   .reveal                fades and rises in once, on entry
 *   [data-stagger]         its .reveal children arrive as a group
 *   [data-split]           heading lines slide up out of a mask
 *   [data-scrub-words]     words brighten one by one as the block scrolls through
 *   [data-count]           number counts up on entry (data-prefix / data-suffix kept)
 *   [data-parallax="0.2"]  drifts at a fraction of scroll speed
 *   [data-clip]            image wipes open on entry
 *   [data-beam]            a timeline line fills with scroll; [data-beam-node] lights up
 *   [data-deck]            sticky cards shrink and darken as the next one covers them
 *   [data-magnetic]        pulls toward the pointer
 *   [data-tilt]            [data-tilt-target] tilts toward the pointer; [data-depth] layers float
 *   .spotlight             gets --sx / --sy for its pointer-following light
 *   [data-cursor="View"]   the custom cursor shows a label over it
 * Under prefers-reduced-motion nothing moves; pointer effects need a fine pointer.
 */
export default function Motion() {
  useEffect(() => {
    document.body.classList.remove("js-off");
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    const listen = <K extends keyof DocumentEventMap>(
      target: Document | Window | HTMLElement,
      type: K,
      fn: (e: DocumentEventMap[K]) => void,
      opts?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, fn as EventListener, opts);
      cleanups.push(() => target.removeEventListener(type, fn as EventListener, opts));
    };

    // Nav: transparent over the top of the hero, solid once the page moves.
    const nav = document.querySelector<HTMLElement>("[data-nav]");
    const syncNav = () => nav?.classList.toggle("at-top", window.scrollY < 24);
    syncNav();
    listen(window, "scroll", syncNav, { passive: true });

    // Spotlight cards follow the pointer. No movement involved, so it also
    // runs under reduced motion.
    if (fine) {
      listen(
        document,
        "pointermove",
        (e) => {
          const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
          if (!card) return;
          const r = card.getBoundingClientRect();
          card.style.setProperty("--sx", `${e.clientX - r.left}px`);
          card.style.setProperty("--sy", `${e.clientY - r.top}px`);
        },
        { passive: true },
      );
    }

    // The phone menu is a <details>: close it once a link inside is chosen.
    listen(document, "click", (e) => {
      const a = (e.target as Element | null)?.closest?.("details[open] a");
      a?.closest("details")?.removeAttribute("open");
    });

    if (reduced) {
      gsap.set(".reveal", { opacity: 1, y: 0 });
      return () => cleanups.forEach((fn) => fn());
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Smooth scroll on GSAP's ticker, so Lenis and ScrollTrigger share one clock.
    const lenis = new Lenis({ lerp: 0.1, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Same-page anchors glide through Lenis instead of jumping.
    listen(document, "click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el.id === "top" ? 0 : el, { offset: -72, duration: 1.5 });
      history.pushState(null, "", url.hash);
    });

    // FAQ answers change the page height; re-measure the triggers below them.
    listen(document, "toggle", () => ScrollTrigger.refresh(), { capture: true });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>(".reveal");
        if (!items.length) return;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 84%", once: true },
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".reveal")
        .filter((el) => !el.closest("[data-stagger]"))
        .forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

      // Headings: each line rises out of its own mask.
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 108,
              duration: 1.3,
              ease: "expo.out",
              stagger: 0.085,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }),
        });
      });

      // Manifesto: words light up in reading order as it scrolls through.
      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.13 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.5 },
              },
            ),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        const state = { v: 0 };
        el.textContent = `${prefix}0${suffix}`;
        gsap.to(state, {
          v: target,
          duration: 2,
          ease: "power3.out",
          delay: Number(el.dataset.delay ?? 0),
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
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
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
        const media = el.querySelector<HTMLElement>("img, video");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 86%", once: true } });
        tl.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
        );
        if (media) tl.fromTo(media, { scale: 1.22 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.1);
      });

      // Experience timeline: the line fills as you read, each entry lights up.
      gsap.utils.toArray<HTMLElement>("[data-beam]").forEach((el) => {
        const fill = el.querySelector<HTMLElement>("[data-beam-fill]");
        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: { trigger: el, start: "top 62%", end: "bottom 62%", scrub: true },
            },
          );
        }
        el.querySelectorAll<HTMLElement>("[data-beam-node]").forEach((node) => {
          ScrollTrigger.create({
            trigger: node,
            start: "top 62%",
            onEnter: () => node.classList.add("is-lit"),
            onLeaveBack: () => node.classList.remove("is-lit"),
          });
        });
      });

      const bar = document.querySelector<HTMLElement>("[data-progress-bar]");
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: { trigger: html, start: "top top", end: "bottom bottom", scrub: 0.3 },
          },
        );
      }
    });

    // Stacked deck of app cards: desktop only, where a card fits the viewport.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-deck]").forEach((deck) => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-deck-card]", deck);
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const trigger = { trigger: next, start: "top bottom", end: "top 22%", scrub: true };
          const inner = card.querySelector<HTMLElement>("[data-deck-inner]");
          const shade = card.querySelector<HTMLElement>("[data-deck-shade]");
          if (inner) gsap.to(inner, { scale: 0.9, ease: "none", transformOrigin: "50% 0%", scrollTrigger: trigger });
          if (shade) gsap.to(shade, { opacity: 0.7, ease: "none", scrollTrigger: { ...trigger } });
        });
      });
    });

    if (fine) {
      // Magnetic buttons.
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic || 0.35);
        const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.45)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.45)" });
        listen(el, "pointermove", (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        });
        listen(el, "pointerleave", () => {
          xTo(0);
          yTo(0);
        });
      });

      // 3D tilt with floating layers (the hero portrait).
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((area) => {
        const target = area.querySelector<HTMLElement>("[data-tilt-target]");
        if (!target) return;
        gsap.set(target, { transformPerspective: 1100 });
        const rx = gsap.quickTo(target, "rotationX", { duration: 0.9, ease: "power3.out" });
        const ry = gsap.quickTo(target, "rotationY", { duration: 0.9, ease: "power3.out" });
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]", area).map((layer) => ({
          depth: Number(layer.dataset.depth),
          x: gsap.quickTo(layer, "x", { duration: 1.1, ease: "power3.out" }),
          y: gsap.quickTo(layer, "y", { duration: 1.1, ease: "power3.out" }),
        }));
        listen(area, "pointermove", (e) => {
          const r = target.getBoundingClientRect();
          const nx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.6));
          const ny = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.6));
          ry(nx * 9);
          rx(-ny * 7);
          layers.forEach((l) => {
            l.x(nx * l.depth * 34);
            l.y(ny * l.depth * 34);
          });
        });
        listen(area, "pointerleave", () => {
          rx(0);
          ry(0);
          layers.forEach((l) => {
            l.x(0);
            l.y(0);
          });
        });
      });

      // Custom cursor: a precise ember dot and a trailing ring that grows over
      // links and shows a label over [data-cursor] targets.
      const dot = document.createElement("div");
      const ring = document.createElement("div");
      dot.className = "cursor-dot";
      ring.className = "cursor-ring";
      dot.setAttribute("aria-hidden", "true");
      ring.setAttribute("aria-hidden", "true");
      document.body.append(dot, ring);
      html.classList.add("has-cursor");
      gsap.set([dot, ring], { opacity: 0 });
      const dx = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power2.out" });
      const dy = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power2.out" });
      const rx = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
      const ry = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });
      let shown = false;
      listen(
        window,
        "pointermove",
        (e) => {
          if (e.pointerType !== "mouse") return;
          if (!shown) {
            shown = true;
            gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
            gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
          }
          dx(e.clientX);
          dy(e.clientY);
          rx(e.clientX);
          ry(e.clientY);
        },
        { passive: true },
      );
      listen(document, "pointerover", (e) => {
        const t = e.target as Element | null;
        const labelled = t?.closest?.<HTMLElement>("[data-cursor]");
        const link = t?.closest?.("a, button, summary, [role='button']");
        ring.classList.toggle("is-label", Boolean(labelled));
        ring.classList.toggle("is-link", !labelled && Boolean(link));
        ring.textContent = labelled?.dataset.cursor ?? "";
      });
      listen(html, "pointerleave", () => {
        shown = false;
        gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      });
      listen(document, "pointerdown", () => gsap.to(ring, { scale: 0.8, duration: 0.2 }));
      listen(document, "pointerup", () => gsap.to(ring, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" }));
      cleanups.push(() => {
        dot.remove();
        ring.remove();
        html.classList.remove("has-cursor");
      });
    }

    // Web fonts change line breaks: re-measure once they are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((fn) => fn());
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
