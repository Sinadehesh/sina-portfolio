import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { pillars } from "@/lib/content";

const hues = ["#c8a45c", "#6a86b0", "#7f9a68"];

export default function Pillars() {
  return (
    <Section id="services" tone="paper">
      <SectionHeading
        id="services"
        eyebrow="What I do"
        title="Three problems I'm hired to solve"
        lede="Each one starts with how people actually behave — and ends with something shipped and measured."
      />
      <div className="grid gap-6 md:grid-cols-3" data-stagger>
        {pillars.map((p, i) => (
          <article
            key={p.id}
            className="reveal group flex flex-col overflow-hidden rounded-2xl bg-white/45 ring-1 ring-ink/10"
          >
            <MediaSlot video={p.video} hue={hues[i]} className="aspect-[4/3]">
              <span className="absolute top-5 left-5 z-10 font-serif text-5xl font-semibold text-ivory/90">
                0{i + 1}
              </span>
            </MediaSlot>
            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-serif text-[1.85rem] leading-tight font-semibold">{p.title}</h3>
              <p className="mt-3 text-ink-dim">{p.line}</p>
              <ul className="mt-5 space-y-2 text-[0.9375rem]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-gold-ink" />
                    {pt}
                  </li>
                ))}
              </ul>
              <a href={p.href} className="link-arrow mt-auto pt-7 text-gold-ink">
                {p.cta} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
