"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cv, personal } from "@/lib/data";

type Tone = "cmd" | "ok" | "head" | "item" | "dim";

interface Line {
  text: string;
  tone: Tone;
}

const TONE_CLASS: Record<Tone, string> = {
  cmd: "text-ivory",
  ok: "text-gold",
  head: "text-gold-bright",
  item: "text-ivory-dim",
  dim: "text-ivory-faint",
};

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const MS_PER_CHAR = 5;
const PAUSE_CHARS = 10; // beat between lines, expressed in character-times

function buildLines(): Line[] {
  const pad = (label: string, value: string, width = 40) => {
    const dots = Math.max(2, width - label.length - value.length);
    return `${label} ${".".repeat(dots)} ${value}`;
  };

  return [
    { text: `$ boot --profile "${personal.name.toLowerCase().replace(/\s+/g, "-")}"`, tone: "cmd" },
    { text: "[ok] mounting credentials volume", tone: "ok" },
    { text: "", tone: "dim" },
    { text: "── EDUCATION ─────────────────────", tone: "head" },
    { text: cv.education.degree, tone: "item" },
    { text: pad(cv.education.institution, cv.education.grade), tone: "item" },
    { text: "", tone: "dim" },
    { text: "── CERTIFICATIONS ────────────────", tone: "head" },
    ...cv.certifications.map<Line>((c) => ({ text: `[x] ${c}`, tone: "item" })),
    { text: "", tone: "dim" },
    { text: "── CORE STACK ────────────────────", tone: "head" },
    { text: cv.stack.slice(0, 3).join("  ·  "), tone: "item" },
    { text: cv.stack.slice(3, 5).join("  ·  "), tone: "item" },
    { text: cv.stack.slice(5).join("  ·  "), tone: "item" },
    { text: "", tone: "dim" },
    { text: "[ok] profile resolved — behavior compiles", tone: "ok" },
    { text: `$ contact --email ${personal.email}`, tone: "cmd" },
  ];
}

export default function CvTerminal() {
  const lines = useMemo(buildLines, []);
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [done, setDone] = useState(false);
  const [cursorAt, setCursorAt] = useState(0);

  // Character offset at which each line starts printing.
  const starts = useMemo(() => {
    let acc = 0;
    return lines.map((l) => {
      const start = acc;
      acc += l.text.length + PAUSE_CHARS;
      return start;
    });
  }, [lines]);

  // The markup ships the finished print-out so the credentials are readable
  // with JS disabled. When JS is running, clear it before the browser paints
  // so the boot sequence types into an empty terminal rather than flashing
  // the answer first. Layout effects do not run during SSR, which is exactly
  // the behaviour wanted here.
  useIsomorphicLayoutEffect(() => {
    lineRefs.current.forEach((node) => {
      if (node) node.textContent = "";
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const paintAll = () => {
      lines.forEach((l, i) => {
        const node = lineRefs.current[i];
        if (node) node.textContent = l.text;
      });
      setDone(true);
      setCursorAt(lines.length - 1);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paintAll();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let raf = 0;
    let startTime = 0;
    let running = false;

    const total =
      starts[starts.length - 1] + lines[lines.length - 1].text.length + PAUSE_CHARS;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const revealed = Math.floor((now - startTime) / MS_PER_CHAR);

      let cursorLine = 0;
      for (let i = 0; i < lines.length; i += 1) {
        const shown = Math.max(
          0,
          Math.min(lines[i].text.length, revealed - starts[i]),
        );
        const node = lineRefs.current[i];
        if (node && node.textContent !== lines[i].text.slice(0, shown)) {
          node.textContent = lines[i].text.slice(0, shown);
        }
        if (shown > 0) cursorLine = i;
      }
      setCursorAt((prev) => (prev === cursorLine ? prev : cursorLine));

      if (revealed >= total) {
        running = false;
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 72%",
      once: true,
      onEnter: () => {
        if (running) return;
        running = true;
        raf = requestAnimationFrame(tick);
      },
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      trigger.kill();
    };
  }, [lines, starts]);

  return (
    <section
      id="cv"
      className="relative mx-auto w-full max-w-[1400px] px-6 pt-28 pb-32 sm:px-10 md:pt-40 md:pb-44"
    >
      <header className="reveal mb-12 md:mb-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[0.6875rem] tracking-[0.34em] text-ivory-faint">
            06
          </span>
          <span className="eyebrow">About / raw credentials</span>
        </div>
        <div className="rule-gold mt-4 h-px w-full opacity-50" />
      </header>

      <div ref={rootRef} className="reveal">
        <div className="crt glass grain relative overflow-hidden rounded-md">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-ivory/10 bg-void/50 px-5 py-3">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ivory/15" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-gold/50" />
            <span className="ml-2 font-mono text-[0.625rem] tracking-[0.24em] text-ivory-faint uppercase">
              sina@bicocca — /usr/local/credentials — 80×24
            </span>
            <span
              className={`ml-auto font-mono text-[0.625rem] tracking-[0.24em] uppercase transition-colors duration-700 ${
                done ? "text-gold" : "text-ivory-faint"
              }`}
            >
              {done ? "ready" : "booting"}
            </span>
          </div>

          {/* Print-out */}
          <div className="relative overflow-x-auto px-4 py-7 sm:px-8 sm:py-9">
            <pre
              aria-hidden
              className="font-mono text-[clamp(0.64rem,1.55vw,0.9375rem)] leading-[1.85]"
            >
              {lines.map((l, i) => (
                <div key={i} className="flex min-h-[1.85em] items-baseline">
                  <span
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className={`whitespace-pre ${TONE_CLASS[l.tone]}`}
                  >
                    {l.text}
                  </span>
                  {cursorAt === i && !done ? (
                    <span className="terminal-cursor ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.16em] bg-gold" />
                  ) : null}
                </div>
              ))}
            </pre>
            {done ? (
              <span className="terminal-cursor absolute bottom-8 ml-1 inline-block h-[1.05em] w-[0.55ch] bg-gold/70 sm:bottom-10" />
            ) : null}
          </div>
        </div>

        {/* Same credentials, unconditionally available to assistive tech and
            to anyone who arrives with JS or animation disabled. */}
        <div className="sr-only">
          <h3>Education</h3>
          <p>
            {cv.education.degree}, {cv.education.institution}, {cv.education.grade}
          </p>
          <h3>Certifications</h3>
          <ul>
            {cv.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <h3>Core stack</h3>
          <ul>
            {cv.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
