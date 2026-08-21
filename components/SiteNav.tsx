"use client";

import { useEffect, useState } from "react";
import { navSections, personal } from "@/lib/data";

export default function SiteNav() {
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = ["hero-scroll", "musicity", "lab", "media", "cv"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(visible.target.id === "hero-scroll" ? "hero" : visible.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Reading progress — a single gold thread across the top edge. */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px">
        <span
          data-progress-bar
          className="block h-px w-full origin-left scale-x-0 bg-gold/80"
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          lifted
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <nav
          aria-label="Sections"
          className="mx-auto mt-4 flex max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-8"
        >
          <a
            href="#hero-scroll"
            className="glass flex items-center gap-3 rounded-full px-5 py-2.5 font-mono text-[0.625rem] tracking-[0.26em] text-ivory uppercase transition-colors hover:text-gold"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
            {personal.name}
          </a>

          <ul className="glass hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex">
            {navSections.map((s) => {
              const href = s.id === "hero" ? "#hero-scroll" : `#${s.id}`;
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={href}
                    aria-current={on ? "true" : undefined}
                    className={`block rounded-full px-4 py-2 font-mono text-[0.625rem] tracking-[0.24em] uppercase transition-colors ${
                      on
                        ? "bg-gold/12 text-gold"
                        : "text-ivory-faint hover:text-ivory"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={`mailto:${personal.email}`}
            className="glass rounded-full px-5 py-2.5 font-mono text-[0.625rem] tracking-[0.26em] text-ivory uppercase transition-colors hover:text-gold"
          >
            Contact
          </a>
        </nav>
      </header>
    </>
  );
}
