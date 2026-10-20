import { Section, SectionHeading } from "@/components/ui/Section";
import { consumerPsychology, getCaseStudy } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

export default function Principles() {
  return (
    <Section id="psychology" tone="paper">
      <SectionHeading
        id="psychology"
        eyebrow="How I think"
        title="The psychology behind the work"
        lede="Eight principles from consumer psychology and behavioral economics, and where each one is already shipped."
      />
      <ol className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
        {consumerPsychology.principles.map((p, i) => (
          <li key={p.name} className="reveal flex flex-col bg-paper p-7">
            <span className="font-mono text-xs text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 font-serif text-[1.6rem] leading-tight font-semibold">{p.name}</h3>
            <p className="mt-3 text-[0.9375rem] text-ink-dim">{p.effect}</p>
            <p className="mt-auto pt-6 text-sm">
              <span className="text-ink-faint">Used in </span>
              {p.proof
                .map((slug) => getCaseStudy(slug))
                .filter((c) => c !== undefined)
                .map((c, j) => (
                  <span key={c.slug}>
                    {j > 0 && ", "}
                    <a href={caseStudyPath(c.slug)} className="font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                      {c.name}
                    </a>
                  </span>
                ))}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
