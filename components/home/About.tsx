import { Section, SectionHeading } from "@/components/ui/Section";
import { about, certifications, education, skillGroups } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";
import { publicFileExists } from "@/lib/media";

const photo = "/images/hero-working.jpg";

export default function About() {
  const hasPhoto = publicFileExists(photo);
  return (
    <Section id="about" tone="paper">
      <SectionHeading
        id="about"
        numeral="07"
        eyebrow="About"
        title={
          <>
            Trained in experimental psychology. <span className="text-ink-faint">Tested with real people.</span>
          </>
        }
      />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {hasPhoto && (
            <figure className="lg:sticky lg:top-28">
              <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
                <img
                  src={photo}
                  alt="Sina Dehesh working at a laptop, seen from above"
                  width={512}
                  height={640}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.18em] text-ink-faint uppercase">
                <span className="text-ember-ink">Fig. 02</span>
                <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
                At the desk
              </figcaption>
            </figure>
          )}
        </div>

        <div className="space-y-14 lg:col-span-7">
          <div className="reveal space-y-5 text-[1.125rem] leading-relaxed text-ink-dim">
            {about.map((p, i) => (
              <p key={p} className={i === 0 ? "text-[1.3rem] leading-snug font-medium text-ink" : ""}>
                {p}
              </p>
            ))}
          </div>

          <div className="reveal grid gap-10 border-t border-ink/15 pt-10 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">Education</h3>
              {education.map((e) => (
                <div key={e.degree} className="mt-4">
                  <p className="font-serif text-[1.35rem] leading-tight font-bold tracking-[-0.02em]">{e.degree}</p>
                  <p className="mt-1 text-[0.9375rem] text-ink-dim">
                    {e.institution}
                    {e.period ? ` · ${e.period}` : ""}
                  </p>
                  <p className="mt-3 text-[0.9375rem] text-ink-dim">
                    Thesis: a controlled experiment with 96 participants — seeing yourself in an automated interview
                    makes you more expressive (p = .009).
                  </p>
                  <a href={caseStudyPath("interview-simulation-study")} className="link-arrow mt-3 text-sm text-ink">
                    The study <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">Certifications</h3>
              <ul className="mt-4 divide-y divide-ink/10 text-[0.9375rem]">
                {certifications.map((c) => (
                  <li key={c.name} className="flex justify-between gap-4 py-2.5">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-ink-faint">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal border-t border-ink/15 pt-10">
            <h3 className="font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">Toolkit</h3>
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <p className="font-serif text-[1.05rem] font-bold tracking-[-0.01em]">{g.title}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink/12 px-3 py-1 text-[0.8125rem] text-ink-dim"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
