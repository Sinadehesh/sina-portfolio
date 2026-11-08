import { Section, SectionHeading } from "@/components/ui/Section";
import { getCaseStudy } from "@/lib/content";
import type { FaqItem } from "@/lib/faq";
import { caseStudyPath } from "@/lib/schema";

export default function Faq({
  items,
  title = "Questions people ask before hiring me.",
  tone = "stage",
  numeral,
}: {
  items: FaqItem[];
  title?: string;
  tone?: "stage" | "paper" | "paper-deep";
  numeral?: string;
}) {
  const dark = tone === "stage";
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq" numeral={numeral} eyebrow="FAQ" title={title} className="!mb-0" />
          </div>
        </div>
        <div
          className={`border-y lg:col-span-7 ${dark ? "divide-y divide-ivory/10 border-ivory/10" : "divide-y divide-ink/12 border-ink/12"}`}
        >
          {items.map((f, i) => (
            <details key={f.question} className="group py-7">
              <summary className="flex items-start gap-5">
                <span
                  className={`mt-1.5 font-mono text-[0.75rem] tracking-[0.14em] ${dark ? "text-ember" : "text-ember-ink"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 font-serif text-[clamp(1.3rem,2vw,1.6rem)] leading-snug font-bold tracking-[-0.02em]">
                  {f.question}
                </h3>
                <span
                  aria-hidden="true"
                  className={`faq-plus flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl transition-transform duration-500 ${dark ? "border-ivory/20 text-ember group-open:border-ember" : "border-ink/20 text-ember-ink"}`}
                >
                  +
                </span>
              </summary>
              <div className="pl-10">
                <p className={`mt-4 max-w-[62ch] ${dark ? "text-ivory-dim" : "text-ink-dim"}`}>{f.answer}</p>
                <p className="mt-3 text-sm">
                  <span className={dark ? "text-ivory-faint" : "text-ink-faint"}>See </span>
                  {f.proof
                    .map((slug) => getCaseStudy(slug))
                    .filter((c) => c !== undefined)
                    .map((c, j) => (
                      <span key={c.slug}>
                        {j > 0 && ", "}
                        <a
                          href={caseStudyPath(c.slug)}
                          className={`font-semibold underline underline-offset-4 ${dark ? "decoration-ivory/25 hover:decoration-ember" : "decoration-ink/25 hover:decoration-ink"}`}
                        >
                          {c.name}
                        </a>
                      </span>
                    ))}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
