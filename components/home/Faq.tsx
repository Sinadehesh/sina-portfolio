import { Section, SectionHeading } from "@/components/ui/Section";
import { getCaseStudy } from "@/lib/content";
import type { FaqItem } from "@/lib/faq";
import { caseStudyPath } from "@/lib/schema";

export default function Faq({
  items,
  title = "Questions people ask before hiring me",
  tone = "paper-deep",
}: {
  items: FaqItem[];
  title?: string;
  tone?: "paper" | "paper-deep";
}) {
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq" eyebrow="FAQ" title={title} className="lg:sticky lg:top-28" />
        </div>
        <div className="divide-y divide-ink/12 border-y border-ink/12 lg:col-span-8">
          {items.map((f) => (
            <details key={f.question} className="group py-6">
              <summary className="flex items-start justify-between gap-6">
                <h3 className="font-serif text-[1.5rem] leading-snug font-semibold">{f.question}</h3>
                <span aria-hidden="true" className="faq-plus mt-1 text-2xl text-gold-ink transition-transform duration-300">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[64ch] text-ink-dim">{f.answer}</p>
              <p className="mt-3 text-sm">
                <span className="text-ink-faint">See </span>
                {f.proof
                  .map((slug) => getCaseStudy(slug))
                  .filter((c) => c !== undefined)
                  .map((c, i) => (
                    <span key={c.slug}>
                      {i > 0 && ", "}
                      <a href={caseStudyPath(c.slug)} className="font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                        {c.name}
                      </a>
                    </span>
                  ))}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
