import Image from "next/image";
import { youtube } from "@/lib/data";
import { portraitBlur } from "@/lib/portrait";
import { FactList } from "@/components/ui/Section";

/**
 * The channel card. The character is the format, so the character is the
 * image — and the call to action is quoted exactly as it is delivered.
 */
export default function YouTubeCard() {
  /* Same note as the identity section: swap public/images/portrait.jpg for the
     real on-camera still and update the alt text below. */
  return (
    <article className="glass grain relative overflow-hidden rounded-md">
      <div className="grid md:grid-cols-12">
        <div className="relative md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[26rem]">
            <Image
              src="/images/portrait.jpg"
              alt="Plate standing in for the channel's on-camera character"
              fill
              sizes="(max-width: 768px) 100vw, 34vw"
              placeholder="blur"
              blurDataURL={portraitBlur}
              className="portrait-treatment object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal-900/90"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent md:from-transparent"
            />
            {/* Play sigil — restrained, gold-leaf, not a platform logo. */}
            <span
              aria-hidden
              className="absolute bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 backdrop-blur-sm"
            >
              <svg
                viewBox="0 0 12 14"
                className="ml-1 h-3.5 w-3"
                fill="currentColor"
                style={{ color: "var(--color-gold)" }}
              >
                <path d="M0 0v14l12-7z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="reveal p-7 sm:p-9 md:col-span-7 md:p-11">
          <span className="eyebrow">{youtube.kicker}</span>
          <h3 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)] text-gradient-ivory">
            {youtube.name}
          </h3>
          <p className="mt-5 max-w-[54ch] text-[0.95rem] leading-relaxed text-ivory-dim">
            {youtube.summary}
          </p>

          {/* The call to action, verbatim. */}
          <div className="mt-9 rounded-sm border border-gold/35 bg-void/50 px-6 py-7 text-center">
            <p className="font-serif text-[clamp(1.6rem,4vw,2.6rem)] leading-none text-gold italic">
              {"subscribe, I'm serious!"}
            </p>
            <p className="mt-4 font-mono text-[0.625rem] tracking-[0.3em] text-ivory-faint uppercase">
              Not a joke. Not a bit. The call to action.
            </p>
          </div>

          <FactList facts={youtube.facts} className="mt-8" />
        </div>
      </div>
    </article>
  );
}
