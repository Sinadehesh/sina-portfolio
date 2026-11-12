import type { CSSProperties } from "react";
import DecisionField from "@/components/home/DecisionField";
import { personalInfo, proofStats } from "@/lib/content";

const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent("Working together")}`;
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** "N = 96" → { prefix: "N = ", n: 96, suffix: "" }. Non-numeric values stay static. */
function parseStat(value: string) {
  const m = value.match(/^(\D*?)(\d+)(\D*)$/);
  return m ? { prefix: m[1], n: Number(m[2]), suffix: m[3] } : null;
}

/** The three disciplines, floating around the portrait on desktop. */
const roles = [
  { n: "01", title: "Researcher", line: "Why people choose", pos: "-left-14 top-[9%]", depth: 1.5, d: 0 },
  { n: "02", title: "Strategist", line: "What to offer, and to whom", pos: "-right-6 top-[46%]", depth: 2.6, d: 1.4 },
  { n: "03", title: "Experimenter", line: "The test that proves it", pos: "-left-20 bottom-[10%]", depth: 2, d: 0.7 },
];

export default function Hero() {
  return (
    <section id="top" data-tilt aria-label="Introduction" className="stage relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-bg absolute inset-0 -z-20" />
      <DecisionField className="absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden="true" className="hero-veil pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pt-16 pb-8 sm:px-10 lg:pt-28">
        <div className="grid flex-1 items-center gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          {/* Portrait: a full-bleed cover on phones, a framed plate on desktop. */}
          <div className="relative -mx-5 sm:-mx-10 lg:order-2 lg:col-span-5 lg:mx-0">
            <div className="rise relative lg:mr-8 lg:ml-auto lg:max-w-[26rem]" style={delay(250)}>
              <figure data-tilt-target className="relative">
                <div className="af-frame-lg relative">
                  <div className="portrait-fade relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-[4/5] lg:rounded-[4px] lg:shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] lg:ring-1 lg:ring-ivory/15">
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
                    <img
                      src="/images/portrait.jpg"
                      alt="Sina Dehesh, consumer psychology consultant, outdoors with arms crossed"
                      width={512}
                      height={640}
                      fetchPriority="high"
                      className="h-full w-full object-cover object-[50%_24%]"
                    />
                    <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
                  </div>
                </div>
                <figcaption className="mt-5 hidden items-center gap-3 font-mono text-[0.75rem] tracking-[0.18em] text-ivory-faint uppercase lg:flex">
                  <span className="text-ember">Fig. 01</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-ivory/20" />
                  {personalInfo.name}
                </figcaption>
              </figure>

              <ul className="hidden lg:block">
                {roles.map((r) => (
                  <li key={r.n} data-depth={r.depth} className={`absolute z-10 ${r.pos}`}>
                    <div className="chip float" style={{ "--float-delay": `${r.d}s` } as CSSProperties}>
                      <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ember">{r.n}</span>
                      <span>
                        <span className="block font-serif text-[1.0625rem] leading-tight font-bold">{r.title}</span>
                        <span className="block text-[0.8125rem] leading-snug text-ivory-dim">{r.line}</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative -mt-28 sm:-mt-24 lg:order-1 lg:col-span-7 lg:mt-0">
            <h1>
              <span
                className="rise flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-dim uppercase sm:text-[0.75rem]"
                style={delay(60)}
              >
                <span aria-hidden="true" className="live-dot shrink-0" />
                {personalInfo.name} — Consumer Psychology Consultant, Milan
              </span>
              <span className="display hero-title mt-5 block">
                <span className="line">
                  <span style={delay(140)}>Consumer</span>
                </span>
                <span className="line">
                  <span style={delay(230)}>psychology,</span>
                </span>
                <span className="line">
                  <span className="text-ember" style={delay(320)}>
                    applied.
                  </span>
                </span>
              </span>
            </h1>

            <p className="lede rise mt-7 max-w-[46ch] text-ivory-dim" style={delay(480)}>
              I find out why customers hesitate, choose or leave — then design the change and test it with real people, in a
              website, a funnel, an app or a game. Research, strategy and testing, done by the same person.
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={delay(620)}>
              <a href={mailto} data-magnetic className="btn btn-ember">
                Work with me <span aria-hidden="true">→</span>
              </a>
              <a href="#work" data-magnetic className="btn btn-ghost">
                See the work
              </a>
            </div>

            <p
              className="rise mt-8 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-faint uppercase lg:hidden"
              style={delay(720)}
            >
              <span className="text-ember">01</span> Researcher · <span className="text-ember">02</span> Strategist ·{" "}
              <span className="text-ember">03</span> Experimenter
            </p>
          </div>
        </div>

        <div className="rise mt-14 border-t border-ivory/12 pt-7 lg:mt-10" style={delay(820)}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4">
            {proofStats.map((s) => {
              const p = parseStat(s.value);
              return (
                <div key={s.label} className="flex flex-col">
                  <dt className="order-2 mt-2 max-w-[24ch] text-[0.8125rem] leading-snug text-ivory-faint">
                    {s.label.replace(/ = /g, "\u00a0=\u00a0")}
                  </dt>
                  <dd className="stat-figure order-1">
                    {p ? (
                      <>
                        <span className="sr-only">{s.value}</span>
                        <span
                          aria-hidden="true"
                          data-count={p.n}
                          data-prefix={p.prefix}
                          data-suffix={p.suffix}
                          data-delay="0.9"
                        >
                          {s.value}
                        </span>
                      </>
                    ) : (
                      s.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
