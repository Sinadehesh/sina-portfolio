import type { AutomationShot, CaseStudy } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Two columns of pictures of about the same height, keeping the reading order: the list is cut at the point
 * where the two halves are closest in height.
 */
function splitInTwo(items: AutomationShot[]): AutomationShot[][] {
  const tall = (xs: AutomationShot[]) => xs.reduce((sum, x) => sum + x.height / x.width, 0);
  let best = 1;
  for (let k = 1; k < items.length; k++) {
    const diff = Math.abs(tall(items.slice(0, k)) - tall(items.slice(k)));
    if (diff < Math.abs(tall(items.slice(0, best)) - tall(items.slice(best)))) best = k;
  }
  return [items.slice(0, best), items.slice(best)].filter((col) => col.length > 0);
}

/** A picture that opens full size in a new tab, with its caption underneath. */
function Shot({ shot, className = "" }: { shot: AutomationShot; className?: string }) {
  return (
    <figure className={className}>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener"
        className="block overflow-hidden rounded-2xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-ivory/10"
        aria-label={`Open the picture full size: ${shot.alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          className="block h-auto w-full"
        />
      </a>
      <figcaption className="mt-3 text-sm leading-relaxed text-ivory-dim">{shot.caption}</figcaption>
    </figure>
  );
}

/**
 * The automation behind a product (`automation` in lib/content.ts): each workflow in plain steps with a
 * picture of the real workflow, screens from the build, what came out, and what it changed. Anchored at
 * #automation so a job application can link straight to it. For an automation that is not live yet, the
 * data sets `resultsTitle` (e.g. "Where it stands") and its own picture captions.
 */
export default function AutomationSection({ study: c }: { study: CaseStudy }) {
  const a = c.automation;
  if (!a) return null;
  return (
    <section id="automation" className="stage relative overflow-clip" aria-labelledby="automation-heading">
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-20 sm:px-10 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">Behind the scenes{a.status ? ` · ${a.status}` : ""}</p>
            <h2 id="automation-heading" className="display mt-4 text-[clamp(2rem,4.4vw,3.5rem)]">
              {a.title}
            </h2>
            <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ivory-dim">{a.intro}</p>
          </div>
          <div className="lg:col-span-4 lg:pt-12">
            <p className="font-mono text-[0.75rem] tracking-[0.18em] text-ember uppercase">Built with</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {a.tools.map((t) => (
                <li key={t} className="rounded-full px-3 py-1 text-sm text-ivory-dim ring-1 ring-ivory/20">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="mt-16 space-y-16">
          {a.workflows.map((w, i) => (
            <li key={w.name} className="border-t border-ivory/15 pt-8">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <span className="font-mono text-[0.8125rem] text-ember">{pad(i + 1)}</span>
                  <h3 className="mt-3 font-serif text-[1.6rem] leading-snug font-semibold tracking-[-0.02em]">
                    {w.name}
                  </h3>
                  <p className="mt-2 text-ivory-dim">{w.what}</p>
                </div>
                <ol className="list-decimal space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-ivory-dim marker:text-ember lg:col-span-8">
                  {w.steps.map((s) => (
                    <li key={s} className="pl-1">
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <figure className="mt-8">
                <div
                  className="overflow-x-auto rounded-2xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-ivory/10"
                  tabIndex={0}
                  role="region"
                  aria-label={`${w.name} workflow picture`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
                  <img
                    src={w.image.src}
                    alt={w.image.alt}
                    width={w.image.width}
                    height={w.image.height}
                    loading="lazy"
                    className={`block h-auto w-full ${w.image.wide ? "min-w-[60rem]" : "min-w-[44rem]"}`}
                  />
                </div>
                <figcaption className="mt-3 text-sm text-ivory-faint">
                  {w.image.caption ?? `The ${w.name.toLowerCase()} workflow in n8n.`}{" "}
                  <span className="sm:hidden">Swipe sideways to see all of it.</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>

        {a.screens && (
          <div className="mt-20 border-t border-ivory/15 pt-10">
            <h3 className="display text-[clamp(1.75rem,3.2vw,2.5rem)]">{a.screens.title}</h3>
            <div className="mt-8 grid max-w-[76rem] gap-12">
              {a.screens.items.map((s) => (
                <Shot key={s.src} shot={s} />
              ))}
            </div>
          </div>
        )}

        {a.outputs && (
          <div className="mt-20 border-t border-ivory/15 pt-10">
            <h3 className="display text-[clamp(1.75rem,3.2vw,2.5rem)]">{a.outputs.title}</h3>
            <div className="mt-8 grid max-w-[64rem] items-start gap-10 sm:grid-cols-2">
              {splitInTwo(a.outputs.items).map((col, i) => (
                <div key={i} className="grid gap-10">
                  {col.map((s) => (
                    <Shot key={s.src} shot={s} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-20 grid gap-10 border-t border-ivory/15 pt-10 lg:grid-cols-12">
          <h3 className="display text-[clamp(1.75rem,3.2vw,2.5rem)] lg:col-span-4">
            {a.resultsTitle ?? "What it changed"}
          </h3>
          <div className="lg:col-span-8">
            <ul className="space-y-4">
              {a.results.map((r) => (
                <li key={r} className="flex gap-4 text-[1.0625rem] leading-relaxed text-ivory-dim">
                  <span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-ember" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ivory-faint">{a.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
