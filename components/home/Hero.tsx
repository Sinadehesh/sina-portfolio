import { MediaSlot } from "@/components/ui/MediaSlot";
import { personalInfo, proofStats } from "@/lib/content";

const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent("Working together")}`;

export default function Hero() {
  return (
    <section id="top" className="stage relative flex min-h-[100svh] items-end overflow-hidden">
      <MediaSlot video="/videos/hero.mp4" priority canvasClassName="hero-light" className="vignette absolute inset-0" />
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[2]" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pt-32 pb-12 sm:px-10 md:pb-16">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1>
              <span className="eyebrow block">
                {personalInfo.name} — Consumer Psychology Consultant, Milan
              </span>
              <span className="display mt-6 block max-w-[15ch] text-[clamp(2.9rem,6.4vw,5.6rem)]">
                Consumer psychology, engineered into products people choose.
              </span>
            </h1>
            <p className="lede mt-8 max-w-[54ch] text-ivory-dim">
              I find out why customers hesitate, choose or leave — then design and ship the website,
              funnel or app that changes it. Research and engineering, done by the same person.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={mailto} className="btn btn-gold">
                Work with me
              </a>
              <a href="#work" className="btn btn-ghost">
                See the work
              </a>
            </div>
          </div>
          <figure className="relative hidden lg:col-span-5 lg:block">
            <div className="relative ml-auto aspect-[4/5] max-w-[26rem] overflow-hidden rounded-2xl ring-1 ring-ivory/15">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
              <img
                src="/images/hero-working.jpg"
                alt="Sina Dehesh working at a laptop, seen from above"
                width={512}
                height={640}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div aria-hidden="true" className="grain pointer-events-none absolute inset-0" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
            </div>
          </figure>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ivory/15 pt-8 md:grid-cols-4">
          {proofStats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-sm leading-snug text-ivory-faint">{s.label}</dt>
              <dd className="order-1 font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] leading-none font-semibold text-gold-bright">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
