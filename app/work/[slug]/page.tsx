import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/home/Contact";
import JsonLd from "@/components/seo/JsonLd";
import { MediaSlot } from "@/components/ui/MediaSlot";
import CaseViz from "@/components/work/CaseViz";
import InvestmentSection from "@/components/work/Investment";
import { getCaseStudy, personalInfo, publishedCaseStudies } from "@/lib/content";
import { hueFor, workVideo } from "@/lib/media";
import { breadcrumbNode, caseStudyNode, caseStudyPageNode, caseStudyPath } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  const title = `${c.name} case study: ${c.tagline} | ${personalInfo.name}`;
  return {
    title,
    description: c.summary,
    alternates: { canonical: caseStudyPath(c.slug) },
    openGraph: { type: "article", title, description: c.summary, url: caseStudyPath(c.slug) },
  };
}

const thCls = "p-4 text-left text-sm font-semibold";
const tdCls = "p-4 align-top text-[0.9375rem] text-ink-dim";

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const index = publishedCaseStudies.findIndex((s) => s.slug === c.slug);
  const next = publishedCaseStudies[(index + 1) % publishedCaseStudies.length];
  const impact = [
    { k: "Problem", v: c.impact.problem },
    { k: "Psychology used", v: c.impact.mechanism },
    { k: "Stack & methods", v: c.impact.stack.join(" · ") },
    { k: "Outcome", v: c.impact.outcome },
  ];

  return (
    <article>
      <JsonLd
        nodes={[
          caseStudyPageNode(c),
          caseStudyNode(c),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: c.name, path: caseStudyPath(c.slug) },
          ]),
        ]}
      />

      {/* Header */}
      <header className="stage relative overflow-hidden">
        <MediaSlot video={workVideo(c.slug)} hue={hueFor(c.slug)} priority className="vignette absolute inset-0" />
        <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[2]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 pt-36 pb-16 sm:px-10 md:pt-44 md:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-ivory-faint">
            <a href="/" className="hover:text-ivory">Home</a> / <a href="/work" className="hover:text-ivory">Work</a> /{" "}
            <span className="text-ivory">{c.name}</span>
          </nav>
          <p className="eyebrow mt-8">
            {c.category} · {c.status}
          </p>
          <h1 className="display mt-5 max-w-[18ch] text-[clamp(2.6rem,6.4vw,5.5rem)]">
            {c.name}: <span className="text-ivory-dim">{c.tagline}</span>
          </h1>
          <dl className="mt-10 grid max-w-3xl gap-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ivory-faint">Role</dt>
              <dd className="mt-1 font-medium">{c.role}</dd>
            </div>
            <div>
              <dt className="text-ivory-faint">Client / context</dt>
              <dd className="mt-1 font-medium">{c.organization}</dd>
            </div>
            <div>
              <dt className="text-ivory-faint">Headline figure</dt>
              <dd className="mt-1 font-medium">
                {c.cover.metric} — {c.cover.caption}
              </dd>
            </div>
          </dl>
          {c.url && (
            <a href={c.url} target="_blank" rel="noopener" className="btn btn-gold mt-10">
              Open the live product ↗
            </a>
          )}
        </div>
      </header>

      {c.image && (
        <section className="stage" aria-label={`${c.name} screenshot`}>
          <div className="mx-auto max-w-[1280px] px-5 pb-16 sm:px-10 md:pb-24">
            <figure className="overflow-hidden rounded-2xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-ivory/10">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
              <img src={c.image} alt={`${c.name} — ${c.tagline}`} width={1600} height={1000} className="block h-auto w-full" />
            </figure>
          </div>
        </section>
      )}

      {/* Answer-first summary + impact */}
      <section className="paper">
        <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="border-l-4 border-gold pl-6 font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-snug font-medium">
                {c.summary}
              </p>
              <h2 className="eyebrow mt-16">Executive impact summary</h2>
              <dl className="mt-4">
                {impact.map((row) => (
                  <div key={row.k} className="grid gap-1 border-t border-ink/12 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                    <dt className="font-semibold">{row.k}</dt>
                    <dd className="text-ink-dim">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className="lg:col-span-5">
              <h2 className="eyebrow">Key numbers</h2>
              <dl className="mt-4 grid gap-4">
                {c.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col rounded-2xl bg-white/50 p-6 ring-1 ring-ink/10">
                    <dt className="order-2 mt-1 text-sm text-ink-dim">{m.label}</dt>
                    <dd className="order-1 font-serif text-[2.5rem] leading-none font-semibold">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {c.investment && <InvestmentSection study={c} inv={c.investment} />}

      {/* Interactive chart */}
      {c.viz && (
        <section className="stage" aria-labelledby="viz-heading">
          <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-10 md:py-28">
            <p className="eyebrow">Interactive</p>
            <h2 id="viz-heading" className="display mt-4 mb-12 text-[clamp(2rem,4.4vw,3.5rem)]">
              See how {c.name} works
            </h2>
            <CaseViz kind={c.viz} />
          </div>
        </section>
      )}

      {/* Comparison, trade-offs, decision log, features */}
      <section className="paper">
        <div className="mx-auto max-w-[1280px] space-y-20 px-5 py-20 sm:px-10 md:py-28">
          {c.benchmarks && (
            <div>
              <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">
                How does {c.name} compare with{" "}
                {c.benchmarks
                  .filter((b) => b.name !== c.name)
                  .map((b) => b.name)
                  .join(" and ")}
                ?
              </h2>
              <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-ink/10">
                <table className="w-full min-w-[36rem] bg-white/40">
                  <thead className="bg-ink/[0.05]">
                    <tr>
                      <th scope="col" className={thCls}>Product</th>
                      <th scope="col" className={thCls}>Strength</th>
                      <th scope="col" className={thCls}>Gap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {c.benchmarks.map((b) => (
                      <tr key={b.name} className={b.name === c.name ? "bg-gold/10" : ""}>
                        <th scope="row" className={`${thCls} align-top`}>{b.name}</th>
                        <td className={tdCls}>{b.strength}</td>
                        <td className={tdCls}>{b.gap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-12">
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)] lg:col-span-5">Trade-offs that shaped {c.name}</h2>
            <ul className="space-y-5 lg:col-span-7">
              {c.tradeoffs.map((t) => (
                <li key={t} className="flex gap-4 text-[1.0625rem] text-ink-dim">
                  <span aria-hidden="true" className="mt-[0.8em] h-px w-5 shrink-0 bg-gold-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">Decision log</h2>
            <p className="mt-3 text-ink-dim">Each decision, the hypothesis behind it, how it was tested, and what came of it.</p>
            <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-ink/10">
              <table className="w-full min-w-[48rem] bg-white/40">
                <thead className="bg-ink/[0.05]">
                  <tr>
                    <th scope="col" className={thCls}>Challenge</th>
                    <th scope="col" className={thCls}>Behavioral / technical hypothesis</th>
                    <th scope="col" className={thCls}>Method</th>
                    <th scope="col" className={thCls}>Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10">
                  {c.decisionLog.map((d) => (
                    <tr key={d.challenge}>
                      <td className={`${tdCls} font-semibold text-ink`}>{d.challenge}</td>
                      <td className={tdCls}>{d.hypothesis}</td>
                      <td className={tdCls}>{d.method}</td>
                      <td className={tdCls}>{d.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)] lg:col-span-5">Key features</h2>
            <div className="lg:col-span-7">
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.featureList.map((f) => (
                  <li key={f} className="rounded-xl bg-white/50 px-4 py-3 text-[0.9375rem] ring-1 ring-ink/10">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-ink-faint">{c.keywords.join(" · ")}</p>
            </div>
          </div>

          <a
            href={caseStudyPath(next.slug)}
            className="group flex items-center justify-between gap-6 border-t border-ink/15 pt-10"
          >
            <span>
              <span className="eyebrow block">Next case study</span>
              <span className="mt-2 block font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold">
                {next.name}: {next.tagline}
              </span>
            </span>
            <span aria-hidden="true" className="text-3xl transition-transform group-hover:translate-x-2">→</span>
          </a>
        </div>
      </section>

      <Contact title={`Need ${c.category === "Research" ? "research" : "work"} like ${c.name} on your team?`} />
    </article>
  );
}
