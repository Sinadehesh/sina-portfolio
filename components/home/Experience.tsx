import { Section, SectionHeading } from "@/components/ui/Section";
import { getCaseStudy, workExperience } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

/** Research internship, venture and volunteer research, as on the CV. */
export default function Experience() {
  const roles = workExperience.filter((e) => e.kind !== "consulting");
  return (
    <Section id="experience" tone="paper-deep">
      <SectionHeading id="experience" eyebrow="Experience" title="Research, a venture, and fieldwork" />
      <ol className="border-t border-ink/15" data-stagger>
        {roles.map((e) => (
          <li key={e.company + e.position} className="reveal grid gap-4 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <p className="font-mono text-sm text-gold-ink">{e.period}</p>
              <p className="mt-1 text-sm text-ink-faint">{e.location}</p>
            </div>
            <div className="md:col-span-8">
              <h3 className="font-serif text-[1.9rem] leading-tight font-semibold">
                {e.position} <span className="text-ink-dim">— {e.company}</span>
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
