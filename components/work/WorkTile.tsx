import type { CSSProperties } from "react";
import { MediaSlot } from "@/components/ui/MediaSlot";
import type { CaseStudy } from "@/lib/content";
import { hueFor, workVideo } from "@/lib/media";
import { playPath } from "@/lib/play";
import { caseStudyPath } from "@/lib/schema";

type Tone = "stage" | "paper";

const tones = {
  stage: {
    title: "text-ivory group-hover:text-ember-bright",
    tagline: "text-ivory-dim",
    accent: "text-ember",
    faint: "text-ivory-faint",
    arrow: "border-ivory/20 group-hover:border-ember group-hover:bg-ember group-hover:text-void",
    link: "text-ivory-dim hover:text-ivory",
    ring: "ring-ivory/10",
  },
  paper: {
    title: "text-ink group-hover:text-ember-ink",
    tagline: "text-ink-dim",
    accent: "text-ember-ink",
    faint: "text-ink-faint",
    arrow: "border-ink/20 group-hover:border-ink group-hover:bg-ink group-hover:text-paper",
    link: "text-ink-dim hover:text-ink",
    ring: "ring-ink/15",
  },
} satisfies Record<Tone, Record<string, string>>;

const pad = (n: number) => String(n).padStart(2, "0");

/** Where to anchor a screenshot when the deck crops it (the important part of the tile). */
const focus: Record<string, string> = {
  costly: "object-left",
  "app-lockers": "object-left",
};

export function liveLabel(c: CaseStudy) {
  return c.category === "Game" ? "Play in your browser ↗" : "Open the live product ↗";
}

/** Where a project's main "try it" link goes: its play page on this site, or its live product. */
export function liveLink(c: CaseStudy): { href: string; label: string; external: boolean } | null {
  if (c.play) return { href: playPath(c.slug), label: `▶ Play ${c.name}`, external: false };
  if (c.url) return { href: c.url, label: liveLabel(c), external: true };
  return null;
}

const ext = (l: { external: boolean }) => (l.external ? { target: "_blank", rel: "noopener" } : {});

/** The image (or video, or tinted canvas) of a project, framed as a plate. */
function Plate({ study: c, className = "" }: { study: CaseStudy; className?: string }) {
  return (
    <MediaSlot
      video={workVideo(c.slug)}
      hue={hueFor(c.slug)}
      image={c.image}
      imageAlt={`${c.name} — ${c.tagline}`}
      className={`plate rounded-[6px] ${className}`}
    >
      <span className="absolute top-4 left-4 z-10 rounded-full bg-void/75 px-3 py-1.5 font-mono text-[0.75rem] tracking-[0.14em] text-ivory uppercase backdrop-blur-sm">
        {c.category} · {c.status}
      </span>
      {c.investment && (
        <span className="absolute top-4 right-4 z-10 rounded-full bg-ember px-3 py-1.5 text-xs font-semibold text-void">
          Raising pre-seed
        </span>
      )}
      {!c.image && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[2] bg-gradient-to-t from-void/85 via-void/10 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
            <p className="stat-figure text-[clamp(2.75rem,6vw,5rem)] text-ivory">{c.cover.metric}</p>
            <p className="mt-2 max-w-[34ch] text-sm text-ivory-dim md:text-base">{c.cover.caption}</p>
          </div>
        </>
      )}
    </MediaSlot>
  );
}

/** Project tile: framed plate, name, and the headline figure. */
export function WorkTile({
  study: c,
  index,
  tone = "stage",
  headingLevel: H = "h3",
}: {
  study: CaseStudy;
  index?: number;
  tone?: Tone;
  headingLevel?: "h2" | "h3";
}) {
  const t = tones[tone];
  return (
    <article className="reveal group">
      <a href={caseStudyPath(c.slug)} data-cursor="View" className="block">
        <Plate study={c} className={`aspect-[16/10] ring-1 ${t.ring}`} />
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            {index !== undefined && (
              <p className={`font-mono text-[0.75rem] tracking-[0.18em] uppercase ${t.faint}`}>No. {pad(index)}</p>
            )}
            <H
              className={`mt-1 font-serif text-[1.9rem] leading-tight font-bold tracking-[-0.03em] transition-colors ${t.title}`}
            >
              {c.name}
            </H>
            <p className={`mt-1 ${t.tagline}`}>{c.tagline}</p>
            {c.image && (
              <p className={`mt-3 text-sm ${t.accent}`}>
                <span className="font-semibold">{c.cover.metric}</span> — {c.cover.caption}
              </p>
            )}
          </div>
          <span
            aria-hidden="true"
            className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${t.arrow}`}
          >
            →
          </span>
        </div>
      </a>
      {liveLink(c) && (
        <a href={liveLink(c)!.href} {...ext(liveLink(c)!)} className={`link-arrow mt-3 text-sm ${t.link}`}>
          {liveLink(c)!.label}
        </a>
      )}
    </article>
  );
}

/**
 * One card of the stacked app deck: the story on the left, the real
 * screenshot on the right. On desktop each card sticks a little lower than
 * the one before, so the deck builds up as you scroll.
 */
export function DeckCard({ study: c, index, total }: { study: CaseStudy; index: number; total: number }) {
  return (
    <article data-deck-card className="deck-card" style={{ "--i": index - 1 } as CSSProperties}>
      <div
        data-deck-inner
        className="group relative grid overflow-hidden rounded-[8px] border border-ivory/10 bg-charcoal-800 shadow-[0_-30px_80px_-40px_rgba(0,0,0,0.9)] lg:h-[min(76vh,42rem)] lg:grid-cols-12"
      >
        <div aria-hidden="true" className="deck-glow pointer-events-none absolute inset-0" />
        <div className="relative z-[1] flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10 xl:p-12">
          <p className="flex items-center justify-between gap-4 font-mono text-[0.75rem] tracking-[0.18em] text-ivory-faint uppercase">
            <span>
              <span className="text-ember">{pad(index)}</span> / {pad(total)}
            </span>
            <span className="text-right">
              {c.category} · {c.status}
            </span>
          </p>
          <h3 className="display mt-8 text-[clamp(2.3rem,4.4vw,4.5rem)] lg:mt-10">
            <a href={caseStudyPath(c.slug)} className="transition-colors hover:text-ember-bright">
              {c.name}
            </a>
          </h3>
          <p className="mt-4 max-w-[36ch] text-[1.0625rem] text-ivory-dim">{c.tagline}</p>
          <div className="mt-10 lg:mt-auto">
            <p className="stat-figure text-[clamp(2.6rem,4.2vw,4rem)] text-ember">{c.cover.metric}</p>
            <p className="mt-2 max-w-[32ch] text-sm text-ivory-faint">{c.cover.caption}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={caseStudyPath(c.slug)} data-magnetic="0.25" className="btn btn-ember !px-5 !py-3.5 text-sm">
                Case study <span aria-hidden="true">→</span>
              </a>
              {liveLink(c) && (
                <a
                  href={liveLink(c)!.href}
                  {...ext(liveLink(c)!)}
                  data-magnetic="0.25"
                  className="btn btn-ghost !px-5 !py-3.5 text-sm"
                >
                  {liveLink(c)!.label}
                </a>
              )}
            </div>
          </div>
        </div>
        <a
          href={caseStudyPath(c.slug)}
          data-cursor="View"
          aria-label={`${c.name} case study`}
          className="plate relative order-first block aspect-[16/10] overflow-hidden lg:order-none lg:col-span-7 lg:aspect-auto lg:h-full"
        >
          {c.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
            <img
              src={c.image}
              alt={`${c.name} — ${c.tagline}`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover ${focus[c.slug] ?? ""}`}
            />
          ) : (
            <div
              aria-hidden="true"
              className="light-canvas drift"
              style={{ "--hue": hueFor(c.slug) } as CSSProperties}
            />
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-charcoal-800/60 to-transparent lg:block"
          />
          {c.investment && (
            <span className="absolute top-5 left-5 z-10 rounded-full bg-ember px-3.5 py-1.5 text-xs font-semibold text-void">
              Raising pre-seed
            </span>
          )}
        </a>
        <div
          data-deck-shade
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-void opacity-0"
        />
      </div>
    </article>
  );
}

/**
 * A tile in the games bento: the screenshot fills the tile and the title sits
 * on a dark scrim. The whole tile opens the case study; "Play" opens the game.
 */
export function BentoTile({
  study: c,
  big = false,
  className = "",
}: {
  study: CaseStudy;
  big?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`reveal group relative isolate min-h-[19rem] overflow-hidden rounded-[8px] bg-charcoal-900 text-ivory ${className}`}
    >
      {c.image && (
        // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
        <img
          src={c.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1400ms] ease-[var(--ease-cinema)] group-hover:scale-[1.04]"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-void from-10% via-void/80 via-45% to-void/15"
      />
      <a
        href={caseStudyPath(c.slug)}
        data-cursor="View"
        aria-label={`${c.name} case study`}
        className="absolute inset-0 z-[1]"
      />
      <div className="pointer-events-none relative z-[2] flex h-full flex-col justify-between p-6 md:p-7">
        <p className="flex items-center justify-between gap-3 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-dim uppercase">
          <span className="rounded-full bg-void/70 px-3 py-1.5 backdrop-blur-sm">{c.status}</span>
          <span className="text-ember">{c.cover.metric}</span>
        </p>
        <div>
          <h3
            className={`font-serif leading-[0.98] font-bold tracking-[-0.035em] ${big ? "text-[clamp(2.4rem,4.6vw,4.4rem)]" : "text-[1.85rem]"}`}
          >
            {c.name}
          </h3>
          <p className={`mt-2 text-ivory-dim ${big ? "max-w-[44ch] text-[1.0625rem]" : "text-[0.9375rem]"}`}>
            {c.tagline}
          </p>
          {liveLink(c) && (
            <a
              href={liveLink(c)!.href}
              {...ext(liveLink(c)!)}
              className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-ember px-4 py-2 text-sm font-semibold text-void transition-colors hover:bg-ember-bright"
            >
              {c.play ? "▶ Play now" : liveLink(c)!.label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Compact row for projects that don't get a large tile. */
export function WorkRow({ study: c }: { study: CaseStudy }) {
  return (
    <li className="reveal">
      <a
        href={caseStudyPath(c.slug)}
        className="group grid items-baseline gap-2 border-t border-ivory/12 py-6 transition-colors hover:bg-ivory/[0.025] md:grid-cols-12 md:gap-6"
      >
        <span className="font-serif text-[1.65rem] leading-tight font-bold tracking-[-0.03em] transition-colors group-hover:text-ember-bright md:col-span-4">
          {c.name}
        </span>
        <span className="text-ivory-dim md:col-span-5">{c.tagline}</span>
        <span className="flex items-center justify-between font-mono text-[0.75rem] tracking-[0.16em] text-ivory-faint uppercase md:col-span-3">
          {c.category}
          <span aria-hidden="true" className="text-base text-ember transition-transform group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </a>
    </li>
  );
}
