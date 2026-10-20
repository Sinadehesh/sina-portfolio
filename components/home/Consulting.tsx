import { Section, SectionHeading } from "@/components/ui/Section";
import { getCaseStudy, workExperience } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

/** Brief consulting section: consumer psychology & growth, with client names. */
export default function Consulting() {
  const engagements = workExperience.filter((e) => e.kind === "consulting");
  return (
    <Section id="consulting" tone="paper">
      <SectionHeading
        id="consulting"
        eyebrow="Consulting"
        title="Consultant — consumer psychology & growth"
        lede="I help businesses understand why customers hesitate, choose or leave, then change the website, offer or funnel around it."
      />
      <div className="grid gap-6 md:grid-cols-2" data-stagger>
        {engagements.map((e) => {
          const study = e.caseStudy ? getCaseStudy(e.caseStudy) : undefined;
          return (
            <article key={e.company} className="reveal flex flex-col overflow-hidden rounded-2xl bg-white/55 ring-1 ring-ink/10">
              {study?.image && (
                // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
                <img src={study.image} alt={`${e.company} website`} loading="lazy" className="aspect-[16/9] w-full object-cover object-top" />
              )}
              <div className="flex flex-1 flex-col p-7">
                <p className="eyebrow">{e.position}</p>
                <h3 className="mt-3 font-serif text-[2.25rem] leading-none font-semibold">{e.company}</h3>
                <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-ink-dim">
                  {e.achievements.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-gold-ink" />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-7">
                  {study && (
                    <a href={caseStudyPath(study.slug)} className="link-arrow text-gold-ink">
                      Case study <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {study?.url && (
                    <a href={study.url} target="_blank" rel="noopener" className="link-arrow text-ink-dim">
                      Visit {e.company} ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <a href="/consumer-psychology" className="link-arrow reveal mt-10 text-gold-ink">
        Consumer psychology consulting services <span aria-hidden="true">→</span>
      </a>
    </Section>
  );
}
