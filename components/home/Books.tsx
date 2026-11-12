import { Section, SectionHeading } from "@/components/ui/Section";
import { personalInfo } from "@/lib/content";
import { literature } from "@/lib/data";

/** TAO: concentric rings around one point — the point of observation. */
function TaoCover() {
  return (
    <div className="book bg-[linear-gradient(150deg,#f4f1ea,#ddd7cb)] text-ink">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute top-[13%] left-1/2 w-[70%] -translate-x-1/2 text-ember-ink"
      >
        {[90, 72, 54, 36, 18].map((r, i) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={i === 4 ? 1.6 : 0.8}
            opacity={0.3 + i * 0.14}
          />
        ))}
        <circle cx="100" cy="100" r="3.6" fill="currentColor" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 px-[9%] pb-[10%]">
        <p className="font-serif text-[clamp(2.6rem,5vw,3.4rem)] leading-[0.85] font-black tracking-[-0.04em] [font-stretch:125%]">
          TAO
        </p>
        <p className="mt-2 font-serif text-[0.8rem] font-semibold tracking-[0.02em] uppercase [font-stretch:112%]">
          The Art of Observation
        </p>
        <span aria-hidden="true" className="mt-4 block h-px w-full bg-ink/25" />
        <p className="mt-2.5 font-mono text-[0.5rem] tracking-[0.3em] uppercase">{personalInfo.name}</p>
      </div>
    </div>
  );
}

/** Man in the Moment: one line falling through time to a single point. */
function MomentCover() {
  return (
    <div className="book bg-[linear-gradient(150deg,#1b1e23,#060708)] text-ivory">
      <span
        aria-hidden="true"
        className="absolute top-0 left-[62%] h-[52%] w-px bg-gradient-to-b from-transparent via-ember/60 to-ember"
      />
      <span
        aria-hidden="true"
        className="absolute top-[52%] left-[62%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_30px_6px_rgba(255,91,31,0.55)]"
      />
      <div className="absolute inset-x-0 bottom-0 px-[9%] pb-[10%]">
        <p className="font-serif text-[clamp(1.9rem,3.4vw,2.35rem)] leading-[0.9] font-black tracking-[-0.04em] uppercase [font-stretch:115%]">
          Man in
          <br />
          the
          <br />
          Moment
        </p>
        <span aria-hidden="true" className="mt-4 block h-px w-full bg-ivory/20" />
        <p className="mt-2.5 font-mono text-[0.5rem] tracking-[0.3em] text-ivory-dim uppercase">{personalInfo.name}</p>
      </div>
    </div>
  );
}

export default function Books({ numeral = "06" }: { numeral?: string }) {
  return (
    <Section id="books" tone="stage" className="overflow-hidden">
      <div aria-hidden="true" className="books-glow pointer-events-none absolute inset-0" />
      <SectionHeading
        id="books"
        numeral={numeral}
        eyebrow="Books"
        title="Two books, both finished."
        lede="Both manuscripts are complete and waiting for editorial work."
      />
      <div className="relative space-y-20 md:space-y-24" data-stagger>
        {literature.map((book, i) => (
          <article
            key={book.title}
            className="reveal group grid items-center gap-8 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-10"
          >
            <div aria-hidden="true" className="w-48 sm:w-auto">
              {i === 0 ? <TaoCover /> : <MomentCover />}
            </div>
            <div>
              <p className="font-mono text-[0.75rem] tracking-[0.18em] text-ember uppercase">{book.genre}</p>
              <h3 className="mt-3 font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] font-bold tracking-[-0.03em]">
                {book.title}
              </h3>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ivory/20 px-3 py-1.5 font-mono text-[0.75rem] tracking-[0.14em] text-ivory-dim uppercase">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember" />
                {book.status}
              </p>
              {book.body && (
                <p className="mt-5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-ivory-dim">{book.body}</p>
              )}
              {book.themes.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {book.themes.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-ivory/[0.06] px-3 py-1.5 font-mono text-[0.75rem] tracking-[0.1em] text-ivory-dim uppercase"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
