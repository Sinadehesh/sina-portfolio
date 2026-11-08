import { Section, SectionHeading } from "@/components/ui/Section";
import { getCaseStudy, workExperience } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

const kindLabel = {
  consulting: "Consulting",
  research: "Research internship",
  venture: "Venture",
  volunteer: "Volunteer research",
} as const;

/** "Jan 2020 – Sep 2021" → "2020–21"; "Feb 2025 – Aug 2025" → "2025". */
function years(period: string) {
  const ys = period.match(/\d{4}/g) ?? [];
  if (!ys.length) return period;
  const [first, last] = [ys[0], ys[ys.length - 1]];
  return first === last ? first : `${first}–${last.slice(2)}`;
}

/** Research internship, venture and volunteer research, as on the CV. The line fills as you read. */
export default function Experience() {
  const roles = workExperience.filter((e) => e.kind !== "consulting");
  return (
    <Section id="experience" tone="paper">
      <SectionHeading
        id="experience"
        numeral="02"
        eyebrow="Experience"
        title="Research, a venture, and fieldwork."
        lede="Before consulting: product research at university, a company of my own, and 200 interviews in the field."
      />

      <ol data-beam className="beam relative">
        <span aria-hidden="true" className="beam-track" />
        <span aria-hidden="true" data-beam-fill className="beam-fill" />
        {roles.map((e) => (
          <li key={e.company + e.position} data-beam-node className="beam-node">
            <span aria-hidden="true" className="beam-dot" />
            <div className="beam-when">
              <p className="beam-year">{years(e.period)}</p>
              <p className="mt-3 font-mono text-[0.75rem] tracking-[0.16em] text-ember-ink uppercase">{e.period}</p>
              <p className="mt-1 text-sm text-ink-faint">{e.location}</p>
            </div>
            <div className="beam-what">
              <p className="font-mono text-[0.75rem] tracking-[0.18em] text-ink-faint uppercase">{kindLabel[e.kind]}</p>
              <h3 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.03em]">
                {e.position}
              </h3>
              <p className="mt-1.5 text-lg text-ink-dim">{e.company}</p>
              <ul className="mt-6 grid gap-x-10 gap-y-3 text-[0.9375rem] text-ink-dim xl:grid-cols-2">
                {e.achievements.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.72em] h-px w-4 shrink-0 bg-ember-ink" />
                    {a}
                  </li>
                ))}
              </ul>
              {e.caseStudy && (
                <a href={caseStudyPath(e.caseStudy)} className="link-arrow mt-6 text-ink">
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
