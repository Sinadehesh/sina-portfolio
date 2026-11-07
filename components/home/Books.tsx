import { Section, SectionHeading } from "@/components/ui/Section";
import { personalInfo } from "@/lib/content";
import { literature } from "@/lib/data";
import { caseStudyPath } from "@/lib/schema";

/** TAO: concentric circles around one point, the point of observation. */
function TaoCover() {
  return (
    <div className="book bg-gradient-to-br from-[#f6f1e6] to-[#e3d9c5] text-ink">
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute top-[18%] left-1/2 w-[64%] -translate-x-1/2 text-gold-ink">
        {[88, 70, 52, 34, 16].map((r, i) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth={i === 4 ? 1.4 : 0.8} opacity={0.35 + i * 0.13} />
        ))}
        <circle cx="100" cy="100" r="3.2" fill="currentColor" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 px-[10%] pb-[12%] text-center">
        <p className="font-serif text-[clamp(2rem,4vw,2.6rem)] leading-none font-semibold tracking-[0.08em]">TAO</p>
        <p className="mt-2 font-serif text-[0.95rem] italic">The Art of Observation</p>
        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-10 bg-gold-ink/60" />
        <p className="mt-3 font-mono text-[0.5625rem] tracking-[0.3em] uppercase">{personalInfo.name}</p>
      </div>
    </div>
  );
}

/** Man in the Moment: one gold line falling to a single point in time. */
function MomentCover() {
  return (
    <div className="book bg-gradient-to-br from-charcoal-700 to-void text-ivory">
      <span aria-hidden="true" className="absolute top-0 left-1/2 h-[46%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-gold" />
      <span aria-hidden="true" className="absolute top-[46%] left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_24px_rgba(224,193,132,0.7)]" />
      <div className="absolute inset-x-0 bottom-0 px-[10%] pb-[12%] text-center">
        <p className="font-serif text-[clamp(1.7rem,3.2vw,2.15rem)] leading-[1.05] font-medium italic">
          Man in the
          <br />
          Moment
        </p>
        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-10 bg-gold/60" />
        <p className="mt-3 font-mono text-[0.5625rem] tracking-[0.3em] text-ivory-dim uppercase">{personalInfo.name}</p>
      </div>
    </div>
  );
}

export default function Books({ numeral = "V" }: { numeral?: string }) {
  return (
    <Section id="books" tone="paper-deep">
      <SectionHeading
        id="books"
        numeral={numeral}
        eyebrow="Books"
        title="Two books, both finished"
        lede="Both manuscripts are complete and waiting for editorial work."
      />
      <div className="grid gap-16 md:grid-cols-2 md:gap-12" data-stagger>
        {literature.map((book, i) => (
          <article key={book.title} className="reveal group grid items-center gap-8 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-9">
            <div className="w-44 sm:w-auto">{i === 0 ? <TaoCover /> : <MomentCover />}</div>
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-faint uppercase">{book.genre}</p>
              <h3 className="mt-2 font-serif text-[clamp(1.75rem,3vw,2.4rem)] leading-tight font-semibold">{book.title}</h3>
              <span className="mt-4 inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">{book.status}</span>
              {book.body && <p className="mt-5 text-[0.9375rem] text-ink-dim">{book.body}</p>}
              {i === 0 && (
                <a href={caseStudyPath("tao-app")} className="link-arrow mt-5 text-sm text-gold-ink">
                  The companion Android app <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
