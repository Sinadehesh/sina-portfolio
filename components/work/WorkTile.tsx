import { MediaSlot } from "@/components/ui/MediaSlot";
import type { CaseStudy } from "@/lib/content";
import { hueFor, workVideo } from "@/lib/media";
import { caseStudyPath } from "@/lib/schema";

type Tone = "stage" | "paper";

const tones = {
  stage: {
    title: "text-ivory group-hover:text-gold-bright",
    tagline: "text-ivory-dim",
    accent: "text-gold",
    plateNo: "text-ivory-faint",
    arrow: "border-ivory/20 group-hover:border-gold group-hover:bg-gold group-hover:text-void",
    link: "text-ivory-dim hover:text-ivory",
    ring: "ring-ivory/10",
  },
  paper: {
    title: "text-ink group-hover:text-gold-ink",
    tagline: "text-ink-dim",
    accent: "text-gold-ink",
    plateNo: "text-ink-faint",
    arrow: "border-ink/20 group-hover:border-ink group-hover:bg-ink group-hover:text-paper",
    link: "text-ink-dim hover:text-ink",
    ring: "ring-ink/15",
  },
} satisfies Record<Tone, Record<string, string>>;

export const plateNumber = (n: number) => `No. ${String(n).padStart(2, "0")}`;

function liveLabel(c: CaseStudy) {
  return c.category === "Game" ? "Play in your browser ↗" : "Open the live product ↗";
}

/** The image (or video, or tinted canvas) of a project, framed as a plate. */
function Plate({ study: c, className = "" }: { study: CaseStudy; className?: string }) {
  return (
    <MediaSlot
      video={workVideo(c.slug)}
      hue={hueFor(c.slug)}
      image={c.image}
      imageAlt={`${c.name} — ${c.tagline}`}
      className={`plate rounded-2xl ${className}`}
    >
      <span className="absolute top-4 left-4 z-10 rounded-full bg-void/70 px-3 py-1.5 text-xs font-medium text-ivory backdrop-blur-sm">
        {c.category} · {c.status}
      </span>
      {c.investment && (
        <span className="absolute top-4 right-4 z-10 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-void">
          Raising pre-seed
        </span>
      )}
      {!c.image && (
        <>
          <div aria-hidden="true" className="absolute inset-0 z-[2] bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
            <p className="font-serif text-[clamp(2.75rem,6vw,5.25rem)] leading-none font-semibold text-ivory">
              {c.cover.metric}
            </p>
            <p className="mt-2 max-w-[34ch] text-sm text-ivory-dim md:text-base">{c.cover.caption}</p>
          </div>
        </>
      )}
    </MediaSlot>
  );
}

/** Project tile: framed plate, catalogue number, name, and the headline figure. */
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
      <a href={caseStudyPath(c.slug)} className="block">
        <Plate study={c} className={`aspect-[16/10] ring-1 ${t.ring}`} />
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            {index !== undefined && (
              <p className={`font-mono text-[0.6875rem] tracking-[0.18em] uppercase ${t.plateNo}`}>{plateNumber(index)}</p>
            )}
            <H className={`mt-1 font-serif text-[1.9rem] leading-tight font-semibold transition-colors ${t.title}`}>{c.name}</H>
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
      {c.url && (
        <a href={c.url} target="_blank" rel="noopener" className={`link-arrow mt-3 text-sm ${t.link}`}>
          {liveLabel(c)}
        </a>
      )}
    </article>
  );
}

/** Editorial spotlight for the lead project of a gallery: plate left, story right. */
export function WorkSpotlight({
  study: c,
  index,
  label = "Featured",
  tone = "stage",
}: {
  study: CaseStudy;
  index: number;
  label?: string;
  tone?: Tone;
}) {
  const t = tones[tone];
  const dim = tone === "stage" ? "text-ivory-dim" : "text-ink-dim";
  return (
    <article className="reveal group grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
      <a href={caseStudyPath(c.slug)} className="block lg:col-span-7" aria-label={`${c.name} case study`}>
        <Plate study={c} className={`aspect-[16/10] ring-1 ${t.ring}`} />
      </a>
      <div className="lg:col-span-5">
        <p className="eyebrow">
          {plateNumber(index)} · {label}
        </p>
        <h3 className="display mt-4 text-[clamp(2.6rem,4.4vw,3.9rem)]">
          <a href={caseStudyPath(c.slug)} className={`transition-colors ${t.title}`}>
            {c.name}
          </a>
        </h3>
        <p className={`mt-3 text-lg ${dim}`}>{c.tagline}</p>
        <p className={`mt-6 text-[0.9375rem] ${dim}`}>{c.summary}</p>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t pt-6">
          {c.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="flex flex-col">
              <dt className={`order-2 mt-1 text-xs leading-snug ${t.plateNo}`}>{m.label}</dt>
              <dd className={`order-1 font-serif text-2xl leading-none font-semibold ${tone === "stage" ? "text-gold-bright" : "text-gold-ink"}`}>
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={caseStudyPath(c.slug)} className="btn btn-gold">
            Read the case study
          </a>
          {c.url && (
            <a href={c.url} target="_blank" rel="noopener" className="btn btn-ghost">
              {liveLabel(c)}
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
