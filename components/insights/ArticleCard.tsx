import { articlePath, getTopic, type Article } from "@/lib/articles";

/** A link card for an article, on bone ("paper") or graphite ("stage"). */
export default function ArticleCard({
  article: a,
  tone = "paper",
  showTopic = true,
  headingLevel: H = "h3",
}: {
  article: Article;
  tone?: "paper" | "stage";
  showTopic?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const paper = tone === "paper";
  return (
    <a
      href={articlePath(a.slug)}
      className={`group flex h-full flex-col rounded-[8px] p-6 transition-colors duration-500 md:p-7 ${
        paper ? "bg-white/45 ring-1 ring-ink/10 hover:bg-white/80" : "spotlight"
      }`}
    >
      {showTopic && (
        <p className={`font-mono text-[0.75rem] tracking-[0.16em] uppercase ${paper ? "text-ember-ink" : "text-ember"}`}>
          {getTopic(a.topic)?.label}
        </p>
      )}
      <H
        className={`mt-3 font-serif text-[1.35rem] leading-[1.15] font-bold tracking-[-0.025em] ${paper ? "text-ink" : "text-ivory"}`}
      >
        {a.title}
      </H>
      <p className={`mt-3 line-clamp-3 text-[0.9375rem] ${paper ? "text-ink-dim" : "text-ivory-dim"}`}>{a.description}</p>
      <p
        className={`mt-auto flex items-center gap-2 pt-6 font-mono text-[0.75rem] tracking-[0.14em] uppercase ${paper ? "text-ink-faint" : "text-ivory-faint"}`}
      >
        {a.minutes} min read
        <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
          →
        </span>
      </p>
    </a>
  );
}
