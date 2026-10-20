import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { about, certifications, education, skillGroups, workExperience } from "@/lib/content";
import { publicFileExists } from "@/lib/media";

const portrait = "/images/portrait.jpg";

export default function About() {
  const hasPortrait = publicFileExists(portrait);
  return (
    <Section id="about" tone="paper">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading
            id="about"
            eyebrow="About"
            title="Trained in experimental psychology. Fluent in code."
            className="!mb-10"
          />
          {hasPortrait && (
            <figure className="reveal relative mb-10 aspect-[4/5] max-w-sm overflow-hidden rounded-2xl">
              <Image src={portrait} alt="Sina Dehesh" fill sizes="(max-width: 1024px) 90vw, 24rem" className="object-cover" />
            </figure>
          )}
          <div className="reveal space-y-5 text-[1.0625rem] text-ink-dim">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="space-y-12 lg:col-span-6 lg:pt-4">
          <div className="reveal">
            <h3 className="eyebrow">Experience</h3>
            <ul className="mt-4">
              {workExperience.map((job) => (
                <li key={job.company + job.position} className="border-t border-ink/12 py-4">
                  <p className="font-semibold">{job.position}</p>
                  <p className="text-[0.9375rem] text-ink-dim">
                    {job.company}
                    {job.period ? ` · ${job.period}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow">Education</h3>
              {education.map((e) => (
                <p key={e.degree} className="mt-4">
                  <span className="font-semibold">{e.degree}</span>
                  <br />
                  <span className="text-[0.9375rem] text-ink-dim">{e.institution}</span>
                </p>
              ))}
            </div>
            <div>
              <h3 className="eyebrow">Certifications</h3>
              <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
                {certifications.map((c) => (
                  <li key={c.name}>
                    {c.name} <span className="text-ink-faint">— {c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal">
            <h3 className="eyebrow">Toolkit</h3>
            <div className="mt-4 space-y-5">
              {skillGroups.map((g) => (
                <div key={g.title}>
                  <p className="text-sm font-semibold">{g.title}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <li key={item} className="rounded-full bg-ink/[0.06] px-3 py-1 text-[0.8125rem] text-ink-dim">
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
