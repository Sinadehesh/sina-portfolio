import type { CSSProperties, ReactNode } from "react";
import { personalInfo } from "@/lib/content";

const band = ["Available for consulting", "Product & research roles", "Milan · Turin · Europe · Remote"];

export default function Contact({
  title = <>Customers doing something you can&rsquo;t explain? Let&rsquo;s find out why.</>,
  subject = "Working together",
}: {
  title?: ReactNode;
  /** Subject line of the emails this section starts. */
  subject?: string;
}) {
  const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}`;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="ember-ground relative overflow-hidden">
      <div aria-hidden="true" className="marquee-wrap border-b border-void/20 py-4">
        <div className="marquee" style={{ "--marquee-speed": "36s" } as CSSProperties}>
          {[0, 1].map((copy) => (
            <span key={copy} className="flex shrink-0 items-center font-mono text-[0.75rem] tracking-[0.2em] uppercase">
              {[...band, ...band].map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
                  {item}
                  <span className="mx-6 h-1.5 w-1.5 rounded-full bg-void" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-10 md:py-36">
        <p className="font-mono text-[0.75rem] tracking-[0.2em] uppercase">(Contact)</p>
        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
          <h2 id="contact-heading" data-split className="display text-[clamp(2.6rem,6.8vw,6.75rem)] lg:col-span-9">
            {title}
          </h2>
          <div className="lg:col-span-3 lg:justify-self-end">
            <a href={mailto} data-magnetic="0.4" data-cursor="Email" className="contact-orb">
              <span>Email me</span>
              <span aria-hidden="true" className="text-2xl">
                →
              </span>
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-void/25 pt-8 md:flex-row md:items-center md:justify-between">
          <a
            href={mailto}
            className="font-serif text-[clamp(1.4rem,3vw,2.4rem)] font-bold tracking-[-0.03em] underline decoration-void/30 decoration-2 underline-offset-[0.2em] hover:decoration-void"
          >
            {personalInfo.email}
          </a>
          <p className="max-w-[48ch] text-[0.9375rem] font-medium text-void/75">
            Based in {personalInfo.location} · Available in Milan, Turin, across Europe and remotely · English, Italian,
            Persian, German
            {personalInfo.linkedin && (
              <>
                {" · "}
                <a href={personalInfo.linkedin} target="_blank" rel="noopener" className="underline underline-offset-4">
                  LinkedIn
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
