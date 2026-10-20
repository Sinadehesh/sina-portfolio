import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { dailySublime, literature, thesis, youtube } from "@/lib/data";
import { caseStudyPath } from "@/lib/schema";

const maxMean = Math.max(...thesis.conditions.map((c) => c.mean));

export default function Research() {
  return (
    <Section id="research" tone="stage">
      <SectionHeading
        id="research"
        eyebrow="Research & writing"
        title="Measured, published and written down"
        lede="A controlled experiment with a significant result, a thirty-issue magazine, a channel, and two books in progress."
      />

      <div className="grid gap-6 lg:grid-cols-12" data-stagger>
        {/* Thesis */}
        <article className="reveal rounded-2xl bg-charcoal-800 p-7 ring-1 ring-ivory/10 sm:p-10 lg:col-span-7">
          <p className="eyebrow">{thesis.kicker}</p>
          <h3 className="mt-4 font-serif text-[clamp(2rem,3.6vw,2.75rem)] leading-tight font-semibold">
            Seeing yourself makes you more expressive
          </h3>
          <p className="mt-4 max-w-[56ch] text-ivory-dim">{thesis.summary}</p>

          <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-4">
            <p className="font-serif text-[clamp(3.5rem,8vw,6rem)] leading-none font-semibold text-gold-bright">
              p = {thesis.pValue}
            </p>
            <p className="pb-2 text-sm text-ivory-faint">
              N = {thesis.n} · within-subjects
              <br />
              repeated-measures ANOVA
            </p>
          </div>

          <figure className="mt-8">
            <figcaption className="text-xs text-ivory-faint">Mean expressiveness by condition (reported means)</figcaption>
            <ul className="mt-3 space-y-3">
              {thesis.conditions.map((c) => (
                <li key={c.id}>
                  <div className="flex justify-between text-sm">
                    <span className="text-ivory-dim">{c.label}</span>
                    <span className="font-mono tabular-nums">{c.mean.toFixed(2)}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-ivory/10">
                    <div
                      className={`h-2 rounded-full ${c.id === "self-feedback" ? "bg-gold" : "bg-ivory/35"}`}
                      style={{ width: `${(c.mean / maxMean) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </figure>
          <a href={caseStudyPath("interview-simulation-study")} className="link-arrow mt-8 text-gold-bright">
            Explore the interactive plot <span aria-hidden="true">→</span>
          </a>
        </article>

        <div className="grid gap-6 lg:col-span-5">
          {/* Daily Sublime */}
          <article className="reveal overflow-hidden rounded-2xl bg-charcoal-800 ring-1 ring-ivory/10">
            <MediaSlot video="/videos/work-daily-sublime.mp4" hue="#b0704f" className="aspect-[16/8]">
              <p className="absolute bottom-4 left-5 z-10 font-serif text-5xl font-semibold">30 issues</p>
            </MediaSlot>
            <div className="p-7">
              <p className="eyebrow">{dailySublime.kicker}</p>
              <h3 className="mt-3 font-serif text-[1.75rem] font-semibold">{dailySublime.name}</h3>
              <p className="mt-2 text-[0.9375rem] text-ivory-dim">
                One painting, five minutes of guided looking, every morning — ending in one-click reply buttons
                that turn readers into a measurable signal.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <a href={caseStudyPath("daily-sublime")} className="link-arrow text-gold-bright">
                  Case study <span aria-hidden="true">→</span>
                </a>
                <a href="https://daily.sinadehesh.com/" target="_blank" rel="noopener" className="link-arrow text-ivory-dim">
                  Read it live ↗
                </a>
              </div>
            </div>
          </article>

          {/* Channel */}
          <article className="reveal rounded-2xl bg-charcoal-800 p-7 ring-1 ring-ivory/10">
            <p className="eyebrow">{youtube.kicker}</p>
            <h3 className="mt-3 font-serif text-[1.75rem] font-semibold">{youtube.name}</h3>
            <p className="mt-2 text-[0.9375rem] text-ivory-dim">{youtube.summary}</p>
            <p className="mt-5 font-serif text-3xl text-gold-bright italic">{youtube.cta}</p>
          </article>
        </div>

        {/* Books */}
        <article className="reveal rounded-2xl bg-charcoal-800 p-7 ring-1 ring-ivory/10 sm:p-10 lg:col-span-12">
          <p className="eyebrow">Literature</p>
          <ul className="mt-6 grid gap-10 md:grid-cols-2">
            {literature.map((book) => (
              <li key={book.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-serif text-[1.75rem] leading-tight font-semibold">{book.title}</h3>
                  <span className="text-sm text-gold">{book.status}</span>
                </div>
                <p className="mt-3 text-[0.9375rem] text-ivory-dim">{book.body}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span aria-hidden="true" className="block h-1.5 flex-1 rounded-full bg-ivory/10">
                    <span className="block h-1.5 rounded-full bg-gold" style={{ width: `${Math.round(book.progress * 100)}%` }} />
                  </span>
                  <span className="text-sm text-ivory-faint tabular-nums">{Math.round(book.progress * 100)}% drafted</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}
