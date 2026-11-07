import { Section, SectionHeading } from "@/components/ui/Section";
import { getCaseStudy, workExperience } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

/** Research internship, venture and volunteer research, as on the CV, as a timeline. */
export default function Experience() {
  const roles = workExperience.filter((e) => e.kind !== "consulting");
  return (
    <Section id="experience" tone="paper-deep">
      <SectionHeading id="experience" numeral="II" eyebrow="Experience" title="Research, a venture, and fieldwork" />
      <ol className="relative ml-1.5 border-l border-ink/20" data-stagger>
        {roles.map((e) => (
          <li key={e.company + e.position} className="reveal relative grid gap-4 pb-16 pl-8 last:pb-0 md:grid-cols-12 md:gap-8 md:pl-12">
            <span aria-hidden="true" className="absolute top-2 -left-[5px] h-[9px] w-[9px] rounded-full bg-gold-ink ring-4 ring-paper-deep" />
            <div className="md:col-span-4">
              <p className="font-serif text-2xl leading-none font-semibold text-gold-ink">{e.period}</p>
              <p className="mt-2 text-sm text-ink-faint">{e.location}</p>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-serif text-[1.9rem] leading-tight font-semibold">
                {e.position} <span className="text-ink-dim italic">— {e.company}</span>
              </h3>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-ink-dim">
                {e.achievements.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-gold-ink" />
                    {a}
                  </li>
                ))}
              </ul>
              {e.caseStudy && (
                <a href={caseStudyPath(e.caseStudy)} className="link-arrow mt-5 text-gold-ink">
                  {getCaseStudy(e.caseStudy)?.name} case study <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
