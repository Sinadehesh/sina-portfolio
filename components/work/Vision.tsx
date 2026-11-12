import { articlePath, getArticle, type Article } from "@/lib/articles";
import type { CaseStudy } from "@/lib/content";

const pad = (n: number) => String(n).padStart(2, "0");

const tones = {
  stage: { accent: "text-ember", dim: "text-ivory-dim", rule: "border-ivory/15", link: "text-ivory hover:text-ember-bright" },
  paper: { accent: "text-ember-ink", dim: "text-ink-dim", rule: "border-ink/15", link: "text-ink hover:text-ember-ink" },
} as const;

/**
 * The bigger idea behind a product (`vision` in lib/content.ts): a heading and a few paragraphs that stay
 * in view on wide screens, the numbered points beside them, and the articles that go deeper.
 */
export function VisionBody({
  study: c,
  tone,
  headingLevel = "h2",
}: {
  study: CaseStudy;
  tone: keyof typeof tones;
  headingLevel?: "h2" | "h4";
}) {
  const v = c.vision;
  if (!v) return null;
  const t = tones[tone];
  const H = headingLevel;
  const P = headingLevel === "h2" ? "h3" : "h5";
  const reading = (v.articles ?? []).map(getArticle).filter((a): a is Article => Boolean(a));
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className={`font-mono text-[0.75rem] tracking-[0.2em] uppercase ${t.accent}`}>Why it matters</p>
          <H className="display mt-5 text-[clamp(2.2rem,4.2vw,3.75rem)]">{v.title}</H>
          <div className={`mt-6 space-y-5 text-[1.0625rem] leading-relaxed ${t.dim}`}>
            {v.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          {reading.length > 0 && (
            <div className="mt-8">
              <p className={`font-mono text-[0.75rem] tracking-[0.18em] uppercase ${t.accent}`}>Read more</p>
              <ul className="mt-3 space-y-2">
                {reading.map((a) => (
                  <li key={a.slug}>
                    <a href={articlePath(a.slug)} className={`link-arrow text-[1rem] font-semibold ${t.link}`}>
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ol className="grid content-start gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7" data-stagger>
        {v.points.map((pt, i) => (
          <li key={pt.title} className={`reveal border-t pt-5 ${t.rule}`}>
            <span className={`font-mono text-[0.8125rem] ${t.accent}`}>{pad(i + 1)}</span>
            <P className="mt-3 font-serif text-[1.375rem] leading-snug font-semibold tracking-[-0.02em]">{pt.title}</P>
            <p className={`mt-2 text-[0.9375rem] leading-relaxed ${t.dim}`}>{pt.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The vision as a section of its own, on a case page. */
export default function VisionSection({ study: c }: { study: CaseStudy }) {
  if (!c.vision) return null;
  return (
    <section id="vision" className="stage relative overflow-clip" aria-label={`Why ${c.name} matters`}>
      <div aria-hidden="true" className="light-canvas grain absolute inset-0 opacity-60" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-20 sm:px-10 md:py-28">
        <VisionBody study={c} tone="stage" />
      </div>
    </section>
  );
}
