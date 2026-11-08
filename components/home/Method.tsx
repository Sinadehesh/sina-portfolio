import { Section, SectionHeading } from "@/components/ui/Section";
import Scrolly from "@/components/scrolly/Scrolly";
import MethodStage from "@/components/scrolly/MethodStage";

const steps = [
  {
    kicker: "The situation",
    title: "Every visitor arrives with a decision to make.",
    body: "Buy or not. Sign up or not. Call you — or the competitor in the next tab.",
  },
  {
    kicker: "The symptom",
    title: "Most of them leave. Analytics shows you where.",
    body: "Every drop-off marks a moment where the decision tipped the other way.",
  },
  {
    kicker: "The real question",
    title: "It can’t show you why.",
    body: "People rarely leave over a button colour. They leave over a doubt: What is this, exactly? Can I trust them? Is it worth the effort? What if it goes wrong?",
  },
  {
    kicker: "Research",
    discipline: "Researcher",
    title: "I find the why.",
    body: "Interviews, experiments and behavioral data turn each doubt into a named barrier: uncertainty, low trust, effort, perceived risk.",
  },
  {
    kicker: "Strategy",
    discipline: "Strategist",
    title: "Then I redesign around it.",
    body: "One clear promise, proof where trust is needed, a shorter path and risk reversal — each placed at the moment its doubt appears.",
  },
  {
    kicker: "Engineering",
    discipline: "Engineer",
    title: "And I build it — then measure it.",
    body: "I ship the website, funnel or app myself and instrument every step, so the result is checked against the original hypothesis. Research, strategy and engineering: one person, no hand-offs.",
  },
];

/** "How I work", told as a scroll story over a live diagram. */
export default function Method() {
  return (
    <Section id="method" tone="stage" innerClassName="!pb-16 md:!pb-24">
      <SectionHeading
        id="method"
        numeral="01"
        eyebrow="How I work"
        title={
          <>
            Why customers hesitate — <span className="text-ember">and how I fix it.</span>
          </>
        }
        lede="One visitor flow, from the first doubt to the shipped fix. Keep scrolling: the diagram follows the story."
        className="!mb-10 md:!mb-14"
      />
      <Scrolly stage={<MethodStage />}>
        {steps.map((s, i) => (
          <div
            key={s.title}
            data-scrolly-step
            className="scrolly-step flex min-h-[60svh] flex-col justify-start pt-10 pb-6 lg:min-h-[84svh] lg:justify-center lg:py-0"
          >
            <p className="flex flex-wrap items-center gap-3 font-mono text-[0.75rem] tracking-[0.18em] text-ivory-faint uppercase">
              <span>
                <span className="text-ember">{String(i + 1).padStart(2, "0")}</span> /{" "}
                {String(steps.length).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-ivory/25" />
              {s.kicker}
              {s.discipline && <span className="discipline-tag">{s.discipline}</span>}
            </p>
            <h3 className="display mt-5 max-w-[16ch] text-[clamp(2.1rem,3.7vw,3.6rem)]">{s.title}</h3>
            <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ivory-dim">{s.body}</p>
          </div>
        ))}
      </Scrolly>
    </Section>
  );
}
