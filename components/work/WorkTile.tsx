import { MediaSlot } from "@/components/ui/MediaSlot";
import type { CaseStudy } from "@/lib/content";
import { hueFor, workVideo } from "@/lib/media";
import { caseStudyPath } from "@/lib/schema";

/** Project tile: video (or tinted canvas) with the headline figure, then the name. */
export function WorkTile({
  study: c,
  wide = false,
  headingLevel: H = "h3",
}: {
  study: CaseStudy;
  wide?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article className={`reveal group ${wide ? "md:col-span-2" : ""}`}>
      <a href={caseStudyPath(c.slug)} className="block">
        <MediaSlot
          video={workVideo(c.slug)}
          hue={hueFor(c.slug)}
          className={`rounded-2xl ${wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[2] bg-gradient-to-t from-void/85 via-void/10 to-transparent transition-opacity duration-700 group-hover:opacity-70"
          />
          <span className="absolute top-4 left-4 z-10 rounded-full bg-void/55 px-3 py-1.5 text-xs font-medium text-ivory backdrop-blur-sm">
            {c.category} · {c.status}
          </span>
          {c.investment && (
            <span className="absolute top-4 right-4 z-10 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-void">
              Raising pre-seed
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
            <p className="font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-none font-semibold text-ivory">
              {c.cover.metric}
            </p>
            <p className="mt-2 max-w-[34ch] text-sm text-ivory-dim md:text-base">{c.cover.caption}</p>
          </div>
        </MediaSlot>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <H className="font-serif text-[1.9rem] leading-tight font-semibold transition-colors group-hover:text-gold-bright">
              {c.name}
            </H>
            <p className="mt-1 text-ivory-dim">{c.tagline}</p>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-void"
          >
            →
          </span>
        </div>
      </a>
    </article>
  );
}

/** Compact row for projects that don't get a large tile. */
export function WorkRow({ study: c }: { study: CaseStudy }) {
  return (
    <li className="reveal">
      <a
        href={caseStudyPath(c.slug)}
        className="group grid items-baseline gap-2 border-t border-ivory/12 py-6 md:grid-cols-12 md:gap-6"
      >
        <span className="font-serif text-2xl font-semibold transition-colors group-hover:text-gold-bright md:col-span-3">
          {c.name}
        </span>
        <span className="text-ivory-dim md:col-span-6">{c.tagline}</span>
        <span className="flex items-center justify-between text-sm text-ivory-faint md:col-span-3">
          {c.category}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </a>
    </li>
  );
}
