import { Section, SectionHeading } from "@/components/ui/Section";
import Scrolly from "@/components/scrolly/Scrolly";
import TourStage, { type TourShot } from "@/components/scrolly/TourStage";
import { getCaseStudy, workExperience } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

/** Camera stops over the real Optimolds homepage (boxes in 1600 × 1000 screenshot pixels). */
const tour: TourShot[] = [
  { label: "", cam: [800, 500, 1] },
  { label: "Clarity: the whole offer in one line", box: [188, 226, 624, 252], cam: [500, 352, 1.8] },
  { label: "Risk reversal", box: [190, 590, 220, 64], cam: [330, 622, 2.4] },
  { label: "Trust signals beside the ask", box: [190, 760, 1172, 60], cam: [775, 760, 1.25] },
  { label: "One call to action · EN · IT · DE", box: [1126, 12, 286, 52], cam: [1268, 60, 2.2] },
];

const levers = [
  {
    kicker: "Uncertainty → clarity",
    title: "Say the whole offer in one line.",
    body: "From CAD to composite part. A buyer knows within seconds whether this supplier fits, without digging through menus.",
  },
  {
    kicker: "Risk reversal",
    title: "Make the first step free.",
    body: "A free 48-hour feasibility check behind a short CAD-upload form. It removes the cost of saying yes, so cautious buyers act.",
  },
  {
    kicker: "Trust signals",
    title: "Put the proof next to the ask.",
    body: "Reviews, reply time, accepted CAD formats and location sit right under the call to action — exactly where the doubt appears.",
  },
  {
    kicker: "Choice architecture",
    title: "One next step. Three languages.",
    body: "The same call to action in the header and the hero, and the whole site in English, Italian and German.",
  },
];

/** Musicity has no public product: draw the three segments its interviews covered. */
function SegmentMap() {
  const segments = [
    { cx: 150, cy: 112, label: "Artists", lx: 150, ly: 38 },
    { cx: 112, cy: 178, label: "Listeners", lx: 58, ly: 258 },
    { cx: 188, cy: 178, label: "Venues", lx: 242, ly: 258 },
  ];
  return (
    <div className="grid-paper relative flex h-full w-full items-center justify-center bg-charcoal-900">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_55%,rgba(255,91,31,0.22),transparent_70%)]"
      />
      <svg
        data-draw
        viewBox="0 0 300 280"
        className="relative h-[78%] w-auto"
        role="img"
        aria-label="Three segments interviewed: artists, listeners and venues"
      >
        {segments.map((s, i) => (
          <circle
            key={s.label}
            cx={s.cx}
            cy={s.cy}
            r="62"
            fill="none"
            stroke="rgba(243,240,234,0.45)"
            strokeWidth="1"
            pathLength={1}
            className="draw-stroke"
            style={{ transitionDelay: `${i * 0.25}s` }}
          />
        ))}
        <circle cx="150" cy="156" r="5" fill="#ff5b1f" className="draw-pop" />
        <circle
          cx="150"
          cy="156"
          r="14"
          fill="none"
          stroke="#ff5b1f"
          strokeWidth="1"
          opacity="0.6"
          className="draw-pop"
        />
        {segments.map((s) => (
          <text
            key={s.label}
            x={s.lx}
            y={s.ly}
            textAnchor="middle"
            fill="rgba(243,240,234,0.8)"
            style={{ font: "500 12px var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            {s.label}
          </text>
        ))}
      </svg>
      <p className="absolute bottom-4 left-5 font-mono text-[0.75rem] tracking-[0.18em] text-ivory-faint uppercase">
        Interviews → jobs to be done → launch order
      </p>
    </div>
  );
}

/** Consulting: Optimolds told as a guided tour of the real site, then Musicity. */
export default function Consulting() {
  const optimolds = workExperience.find((e) => e.company === "Optimolds");
  const musicity = workExperience.find((e) => e.company === "Musicity");
  const optiStudy = getCaseStudy("optimolds");
  const musiStudy = getCaseStudy("musicity");

  return (
    <Section id="consulting" tone="stage" innerClassName="!pt-16 md:!pt-20">
      <SectionHeading
        id="consulting"
        numeral="02"
        eyebrow="Consulting"
        title={
          <>
            Consumer psychology <span className="text-ivory-faint">&amp; growth.</span>
          </>
        }
        lede="I help businesses understand why customers hesitate, choose or leave, then change the website, offer or funnel around it. Here is one, lever by lever."
        className="!mb-8 md:!mb-12"
      />

      {optimolds && optiStudy && (
        <Scrolly
          stage={
            <TourStage
              src="/images/work/optimolds-tour.webp"
              alt="The Optimolds homepage: the headline, the Free Feasibility Check button and the trust bar"
              host="optimolds.com"
              shots={tour}
            />
          }
        >
          <div
            data-scrolly-step
            className="scrolly-step flex min-h-[60svh] flex-col justify-start pt-10 pb-6 lg:min-h-[80svh] lg:justify-center lg:py-0"
          >
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.75rem] tracking-[0.16em] uppercase">
              <span className="flex items-center gap-2.5 text-ember">
                <span aria-hidden="true" className="live-dot !h-1.5 !w-1.5" />
                {optimolds.period}
              </span>
              <span className="text-ivory-faint">Ongoing · {optimolds.location}</span>
            </p>
            <h3 className="display mt-5 text-[clamp(2.8rem,5vw,4.8rem)]">{optimolds.company}</h3>
            <p className="mt-3 font-medium text-ivory-dim">{optimolds.position}</p>
            <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ivory-dim">
              A composite engineering and mold-making firm. I designed and built its trilingual website and
              lead-generation funnel around how B2B buyers decide.
            </p>
            <p className="mt-6 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-faint uppercase">
              ↓ Scroll the tour — four levers
            </p>
          </div>
          {levers.map((l, i) => (
            <div
              key={l.title}
              data-scrolly-step
              className="scrolly-step flex min-h-[60svh] flex-col justify-start pt-10 pb-6 lg:min-h-[80svh] lg:justify-center lg:py-0"
            >
              <p className="flex flex-wrap items-center gap-3 font-mono text-[0.75rem] tracking-[0.18em] text-ivory-faint uppercase">
                <span>
                  <span className="text-ember">{String(i + 1).padStart(2, "0")}</span> /{" "}
                  {String(levers.length).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px w-6 bg-ivory/25" />
                {l.kicker}
              </p>
              <h3 className="display mt-5 max-w-[15ch] text-[clamp(2.1rem,3.7vw,3.6rem)]">{l.title}</h3>
              <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ivory-dim">{l.body}</p>
              {i === levers.length - 1 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={caseStudyPath(optiStudy.slug)}
                    data-magnetic="0.25"
                    className="btn btn-ember !px-5 !py-3.5 text-sm"
                  >
                    Read the case study <span aria-hidden="true">→</span>
                  </a>
                  {optiStudy.url && (
                    <a
                      href={optiStudy.url}
                      target="_blank"
                      rel="noopener"
                      data-magnetic="0.25"
                      className="btn btn-ghost !px-5 !py-3.5 text-sm"
                    >
                      Visit optimolds.com ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </Scrolly>
      )}

      {musicity && (
        <article className="reveal spotlight group mt-20 grid overflow-hidden rounded-[6px] md:mt-28 md:grid-cols-12">
          <a
            href={musiStudy ? caseStudyPath(musiStudy.slug) : undefined}
            data-cursor="View"
            aria-label={`${musicity.company} case study`}
            className="relative block aspect-[16/10] overflow-hidden border-b border-ivory/10 md:col-span-5 md:aspect-auto md:min-h-[24rem] md:border-r md:border-b-0"
          >
            <SegmentMap />
          </a>
          <div className="flex flex-col p-7 md:col-span-7 md:p-10">
            <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.75rem] tracking-[0.16em] uppercase">
              <span className="text-ember">{musicity.period}</span>
              <span className="text-ivory-faint">Completed · {musicity.location}</span>
            </p>
            <h3 className="display mt-5 text-[clamp(2.6rem,4.6vw,4.2rem)]">{musicity.company}</h3>
            <p className="mt-3 font-medium text-ivory-dim">{musicity.position}</p>
            <ul className="mt-6 space-y-3 text-[0.9375rem] text-ivory-dim">
              {musicity.achievements.map((a) => (
                <li key={a} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.72em] h-px w-4 shrink-0 bg-ember" />
                  {a}
                </li>
              ))}
            </ul>
            {musiStudy && (
              <a href={caseStudyPath(musiStudy.slug)} className="link-arrow mt-auto pt-8 text-ivory">
                Case study <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </article>
      )}

      <a href="/consumer-psychology" className="link-arrow reveal mt-12 text-ember">
        Consumer psychology consulting services <span aria-hidden="true">→</span>
      </a>
    </Section>
  );
}
