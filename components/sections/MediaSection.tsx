import { Section, SectionHeading, FactList } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import YouTubeCard from "@/components/media/YouTubeCard";
import EmailWireframe from "@/components/media/EmailWireframe";
import AnovaPlot from "@/components/viz/AnovaPlot";
import { dailySublime, literature, thesis } from "@/lib/data";

export default function MediaSection() {
  return (
    <Section id="media">
      <SectionHeading
        index="05"
        eyebrow="Media, research & content ventures"
        title={
          <>
            Publishing, on camera,{" "}
            <span className="text-gold whitespace-nowrap">in print</span>, and
            under peer review
          </>
        }
        lede="A channel, a thirty-issue magazine, a thesis with a significant result, and two books. Different surfaces, one habit: make the observation, then make it public."
      />

      <div className="space-y-8" data-stagger>
        {/* ---- 5.1 YouTube ---- */}
        <YouTubeCard />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* ---- 5.2 The Daily Sublime ---- */}
          <GlassCard as="article" className="p-7 sm:p-9 md:p-11 lg:col-span-6">
            <span className="reveal eyebrow block">{dailySublime.kicker}</span>
            <h3 className="reveal display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-gradient-ivory">
              {dailySublime.name}
            </h3>
            <p className="reveal mt-5 max-w-[54ch] text-[0.95rem] leading-relaxed text-ivory-dim">
              {dailySublime.summary}
            </p>
            <div className="reveal mt-9">
              <EmailWireframe />
            </div>
            <FactList facts={dailySublime.facts} className="reveal mt-8" />
          </GlassCard>

          {/* ---- 5.4 Literature ---- */}
          <div className="lg:col-span-6">
            <GlassCard as="article" className="h-full p-7 sm:p-9 md:p-11">
              <span className="reveal eyebrow block">Literature</span>
              <h3 className="reveal display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-gradient-ivory">
                Two books in the same notebook
              </h3>
              <p className="reveal mt-5 max-w-[54ch] text-[0.95rem] leading-relaxed text-ivory-dim">
                The manuscript from the hero sequence is not a metaphor. One
                non-fiction book on the discipline of observation, one novel
                that refuses to resolve.
              </p>

              <ul className="mt-10 space-y-10">
                {literature.map((book) => (
                  <li key={book.title} className="reveal">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h4 className="font-serif text-[clamp(1.35rem,2.6vw,1.85rem)] leading-tight text-ivory">
                        {book.title}
                      </h4>
                      <span className="font-mono text-[0.625rem] tracking-[0.24em] text-gold uppercase">
                        {book.status}
                      </span>
                    </div>
                    <p className="mt-4 max-w-[56ch] text-[0.875rem] leading-relaxed text-ivory-dim">
                      {book.body}
                    </p>
                    <div className="mt-5 flex items-center gap-4">
                      <span
                        aria-hidden
                        className="block h-px flex-1 bg-ivory/12"
                      >
                        <span
                          className="block h-px bg-gold/70"
                          style={{ width: `${Math.round(book.progress * 100)}%` }}
                        />
                      </span>
                      <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ivory-faint tabular-nums">
                        {Math.round(book.progress * 100)}% drafted
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* ---- 5.3 Academic thesis ---- */}
        <GlassCard as="article" gold className="p-7 sm:p-9 md:p-11">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <span className="reveal eyebrow block">{thesis.kicker}</span>
              <h3 className="reveal display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-gradient-ivory">
                {thesis.name}
              </h3>
              <p className="reveal mt-5 text-[0.95rem] leading-relaxed text-ivory-dim">
                {thesis.summary}
              </p>
              <p className="reveal mt-8 border-l border-gold/40 pl-5 font-serif text-[1.0625rem] leading-snug text-ivory italic">
                {thesis.finding}
              </p>
              <FactList facts={thesis.stats} className="reveal mt-8" />
            </div>
            <div className="reveal lg:col-span-8">
              <AnovaPlot />
            </div>
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}
