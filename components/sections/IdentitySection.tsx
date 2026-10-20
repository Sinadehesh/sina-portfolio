import Image from "next/image";
import { personal } from "@/lib/data";
import { portraitBlur } from "@/lib/portrait";

export default function IdentitySection() {
  return (
    <section
      id="identity"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-28 sm:px-10 md:py-40"
      data-stagger
    >
      <div className="grid gap-14 md:grid-cols-12 md:gap-16">
        <div className="reveal md:col-span-5 lg:col-span-4">
          <figure className="relative">
            {/* NOTE: public/images/portrait.jpg currently holds a generated
                chiaroscuro plate, not a photograph. Drop the real portrait in
                at the same path (3:4, ~1100x1467) and update this alt text. */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image
                src="/images/portrait.jpg"
                alt={`Portrait plate for ${personal.name} — placeholder artwork awaiting the photograph`}
                fill
                sizes="(max-width: 768px) 88vw, 34vw"
                placeholder="blur"
                blurDataURL={portraitBlur}
                className="portrait-treatment object-cover"
                priority={false}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent"
              />
              <div
                aria-hidden
                className="grain pointer-events-none absolute inset-0"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 font-mono text-[0.625rem] tracking-[0.28em] text-ivory-faint uppercase">
              <span>{personal.name}</span>
              <span>{personal.location}</span>
            </figcaption>
          </figure>
        </div>

        <div className="md:col-span-7 md:pt-6 lg:col-span-8">
          <span className="reveal eyebrow block">Who is doing the work</span>
          <div className="reveal rule-gold mt-4 h-px w-full opacity-50" />

          <p className="reveal display mt-10 max-w-[24ch] text-[clamp(1.9rem,4.2vw,3.5rem)] text-gradient-ivory">
            {personal.role}
          </p>

          <p className="reveal mt-10 max-w-[64ch] text-[1.0625rem] leading-relaxed text-ivory-dim">
            {personal.intro}
          </p>

          <ul className="mt-12 space-y-6 border-l border-gold/25 pl-6">
            {personal.manifesto.map((line) => (
              <li
                key={line}
                className="reveal max-w-[58ch] font-serif text-[clamp(1.125rem,2vw,1.5rem)] leading-snug text-ivory italic"
              >
                {line}
              </li>
            ))}
          </ul>

          <div className="reveal mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={`mailto:${personal.email}`}
              className="group inline-flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.22em] text-ivory uppercase transition-colors hover:text-gold"
            >
              <span className="h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-14 group-hover:bg-gold" />
              {personal.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
