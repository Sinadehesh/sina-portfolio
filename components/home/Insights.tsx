import ArticleCard from "@/components/insights/ArticleCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { articlePath, articlesIn, getArticles, topicPath, topics } from "@/lib/articles";

/** Homepage: the flagship article, one article per topic, and the way into the archive. */
export default function Insights() {
  const all = getArticles();
  if (!all.length) return null;
  const featured = all.find((a) => a.featured) ?? all[0];
  const picks = topics
    .map((t) => articlesIn(t.slug).find((a) => a.slug !== featured.slug))
    .filter((a) => a !== undefined)
    .slice(0, 6);

  return (
    <Section id="insights" tone="paper-deep">
      <SectionHeading
        id="insights"
        numeral="08"
        eyebrow="Insights"
        title={
          <>
            Writing on why people choose. <span className="text-ink-faint">And what to build for it.</span>
          </>
        }
        lede={`${all.length} articles on consumer psychology, behavioral fintech, insurance, automation, AI products, AI in education, and games and creativity — from research I ran and products I designed and tested.`}
      />

      <a
        href={articlePath(featured.slug)}
        className="reveal group grid gap-8 rounded-[10px] bg-charcoal-900 p-8 text-ivory md:grid-cols-12 md:p-12"
      >
        <div className="md:col-span-8">
          <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember uppercase">Start here</p>
          <h3 className="display mt-5 text-[clamp(2rem,4vw,3.6rem)] transition-colors group-hover:text-ember-bright">
            {featured.title}
          </h3>
          <p className="mt-5 max-w-[60ch] text-ivory-dim">{featured.description}</p>
        </div>
        <div className="flex flex-col justify-end md:col-span-4 md:items-end">
          <span className="btn btn-ember">
            Read the article <span aria-hidden="true">→</span>
          </span>
        </div>
      </a>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
        {picks.map((a) => (
          <div key={a.slug} className="reveal">
            <ArticleCard article={a} />
          </div>
        ))}
      </div>

      <div className="reveal mt-10 flex flex-wrap items-center gap-2">
        <a href="/insights" className="btn btn-ink mr-3">
          All {all.length} articles <span aria-hidden="true">→</span>
        </a>
        {topics.map((t) => (
          <a
            key={t.slug}
            href={topicPath(t.slug)}
            className="rounded-full border border-ink/20 px-4 py-2 font-mono text-[0.75rem] tracking-[0.14em] text-ink-dim uppercase transition-colors hover:border-ink hover:text-ink"
          >
            {t.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
