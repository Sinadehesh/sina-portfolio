import { Section, SectionHeading } from "@/components/ui/Section";
import { getCaseStudy, workExperience } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

/** Musicity has no public product: draw the three segments its interviews covered. */
function SegmentMap() {
  const segments = [
    { cx: 150, cy: 112, label: "Artists", lx: 150, ly: 52 },
    { cx: 112, cy: 178, label: "Listeners", lx: 62, ly: 236 },
    { cx: 188, cy: 178, label: "Venues", lx: 238, ly: 236 },
  ];
  return (
    <div className="grid-paper relative flex h-full w-full items-center justify-center bg-charcoal-900">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_55%,rgba(255,91,31,0.22),transparent_70%)]"
      />
      <svg
        viewBox="0 0 300 270"
        className="relative h-[78%] w-auto"
        role="img"
        aria-label="Three segments interviewed: artists, listeners and venues"
      >
        {segments.map((s) => (
          <circle key={s.label} cx={s.cx} cy={s.cy} r="62" fill="none" stroke="rgba(243,240,234,0.4)" strokeWidth="1" />
        ))}
        <circle cx="150" cy="156" r="5" fill="#ff5b1f" />
        <circle cx="150" cy="156" r="14" fill="none" stroke="#ff5b1f" strokeWidth="1" opacity="0.6" />
        {segments.map((s) => (
          <text
            key={s.label}
            x={s.lx}
            y={s.ly}
            textAnchor="middle"
            fill="rgba(243,240,234,0.8)"
            style={{ font: "500 11px var(--font-mono)", letterSpacing: "0.18em", textTransform: "uppercase" }}
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

/** Brief consulting section: consumer psychology & growth, with client names. */
export default function Consulting() {
  const engagements = workExperience.filter((e) => e.kind === "consulting");
  return (
    <Section id="consulting" tone="stage" innerClassName="!pt-16 md:!pt-20">
      <SectionHeading
        id="consulting"
        numeral="01"
        eyebrow="Consulting"
        title={
          <>
            Consumer psychology <span className="text-ivory-faint">&amp; growth.</span>
          </>
        }
        lede="I help businesses understand why customers hesitate, choose or leave, then change the website, offer or funnel around it."
      />

      <div className="grid gap-5 md:grid-cols-2" data-stagger>
        {engagements.map((e) => {
          const study = e.caseStudy ? getCaseStudy(e.caseStudy) : undefined;
          const ongoing = e.period.includes("Present");
          return (
            <article key={e.company} className="reveal spotlight group flex flex-col rounded-[6px]">
              <a
                href={study ? caseStudyPath(study.slug) : undefined}
                data-cursor="View"
                aria-label={`${e.company} case study`}
                className="plate relative block aspect-[16/10] overflow-hidden border-b border-ivory/10"
              >
                {study?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
                  <img
                    src={study.image}
                    alt={`The ${e.company} website`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <SegmentMap />
                )}
              </a>
              <div className="flex flex-1 flex-col p-7 md:p-9">
                <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.75rem] tracking-[0.16em] uppercase">
                  <span className="flex items-center gap-2.5 text-ember">
                    {ongoing && <span aria-hidden="true" className="live-dot !h-1.5 !w-1.5" />}
                    {e.period}
                  </span>
                  <span className="text-ivory-faint">
                    {ongoing ? "Ongoing" : "Completed"} · {e.location}
                  </span>
                </p>
                <h3 className="display mt-5 text-[clamp(2.6rem,4.8vw,4.4rem)]">{e.company}</h3>
                <p className="mt-3 font-medium text-ivory-dim">{e.position}</p>
                <ul className="mt-6 space-y-3 text-[0.9375rem] text-ivory-dim">
                  {e.achievements.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.72em] h-px w-4 shrink-0 bg-ember" />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-x-7 gap-y-2 pt-8">
                  {study && (
                    <a href={caseStudyPath(study.slug)} className="link-arrow text-ivory">
                      Case study <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {study?.url && (
                    <a href={study.url} target="_blank" rel="noopener" className="link-arrow text-ivory-dim">
                      Visit {e.company} ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <a href="/consumer-psychology" className="link-arrow reveal mt-12 text-ember">
        Consumer psychology consulting services <span aria-hidden="true">→</span>
      </a>
    </Section>
  );
}
