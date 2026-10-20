import { Section, SectionHeading } from "@/components/ui/Section";
import { literature } from "@/lib/data";
import { caseStudyPath } from "@/lib/schema";

export default function Books() {
  return (
    <Section id="books" tone="paper">
      <SectionHeading
        id="books"
        eyebrow="Books"
        title="Two books, both finished"
        lede="Both manuscripts are complete and waiting for editorial work."
      />
      <div className="grid gap-6 md:grid-cols-2" data-stagger>
        {literature.map((book, i) => (
          <article key={book.title} className="reveal flex flex-col rounded-2xl bg-white/55 p-8 ring-1 ring-ink/10 md:p-10">
            <span className="w-fit rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">
              Finished · awaiting editorial work
            </span>
            <h3 className="mt-6 font-serif text-[clamp(2rem,3.4vw,2.6rem)] leading-tight font-semibold">{book.title}</h3>
            <p className="mt-2 text-sm text-ink-faint">{i === 0 ? "Non-fiction" : "Literary fiction"}</p>
            <p className="mt-5 text-ink-dim">{book.body}</p>
            {i === 0 && (
              <a href={caseStudyPath("tao-app")} className="link-arrow mt-auto pt-7 text-gold-ink">
                The companion Android app <span aria-hidden="true">→</span>
              </a>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
