import type { Metadata } from "next";
import Contact from "@/components/home/Contact";
import ArticleCard from "@/components/insights/ArticleCard";
import JsonLd from "@/components/seo/JsonLd";
import { articlePath, articlesIn, getArticles, topicPath, topics } from "@/lib/articles";
import { personalInfo } from "@/lib/content";
import { articleCollectionNode, breadcrumbNode } from "@/lib/schema";

const title = `Insights: consumer psychology, behavioral fintech, insurance, automation and AI in education | ${personalInfo.name}`;
const description = `Articles by ${personalInfo.name}, consumer psychology consultant in Milan, on why customers hesitate, behavioral fintech, insurance design, human-in-the-loop automation, the psychology of AI products and AI in education.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/insights", types: { "application/rss+xml": "/insights/feed.xml" } },
  openGraph: { title, description, url: "/insights" },
};

export default function InsightsPage() {
  const all = getArticles();
  const featured = all.find((a) => a.featured) ?? all[0];
  return (
    <>
      <JsonLd
        nodes={[
          articleCollectionNode("/insights", title, description, all),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
        ]}
      />

      <header className="stage relative overflow-hidden">
        <div aria-hidden="true" className="article-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1440px] px-5 pt-32 pb-16 sm:px-10 md:pt-44 md:pb-24">
          <p className="flex items-center gap-4 border-t border-ivory/15 pt-4 font-mono text-[0.75rem] tracking-[0.2em] uppercase">
            <span className="text-ember">(Insights)</span>
            <span className="opacity-70">
              {all.length} articles · {topics.length} topics
            </span>
          </p>
          <h1 className="display mt-8 max-w-[18ch] text-[clamp(2.6rem,6.4vw,6rem)]">
            Notes on why people choose — <span className="text-ember">and how to build for it.</span>
          </h1>
          <p className="lede mt-8 max-w-[60ch] text-ivory-dim">
            I’m {personalInfo.name}, a consumer psychology consultant in Milan. I write about the behavioral science
            behind conversion, fintech, insurance, automation with humans in the loop, AI products and AI in education —
            from research I ran and products I built.
          </p>
          <nav aria-label="Topics" className="mt-10 flex flex-wrap gap-2">
            {topics.map((t) => (
              <a
                key={t.slug}
                href={topicPath(t.slug)}
                className="rounded-full border border-ivory/20 px-4 py-2 font-mono text-[0.75rem] tracking-[0.14em] text-ivory-dim uppercase transition-colors hover:border-ember hover:text-ivory"
              >
                {t.label} <span className="text-ember">{articlesIn(t.slug).length}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="paper grain relative">
        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-10 md:py-24">
          {featured && (
            <a
              href={articlePath(featured.slug)}
              className="group grid gap-8 rounded-[10px] bg-charcoal-900 p-8 text-ivory md:grid-cols-12 md:p-12"
            >
              <div className="md:col-span-8">
                <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember uppercase">Start here</p>
                <h2 className="display mt-5 text-[clamp(2.2rem,4.4vw,4rem)] transition-colors group-hover:text-ember-bright">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-[60ch] text-ivory-dim">{featured.description}</p>
              </div>
              <div className="flex flex-col justify-end md:col-span-4 md:items-end">
                <span className="btn btn-ember">
                  Read the article <span aria-hidden="true">→</span>
                </span>
                <p className="mt-4 font-mono text-[0.75rem] tracking-[0.14em] text-ivory-faint uppercase">
                  {featured.minutes} min read
                </p>
              </div>
            </a>
          )}

          {topics.map((t, i) => {
            const list = articlesIn(t.slug);
            if (!list.length) return null;
            return (
              <section key={t.slug} aria-labelledby={`topic-${t.slug}`} className="mt-24">
                <div className="grid gap-6 border-t border-ink/15 pt-6 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">
                      ({String(i + 1).padStart(2, "0")}) {t.label}
                    </p>
                    <h2
                      id={`topic-${t.slug}`}
                      className="mt-4 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.035em]"
                    >
                      <a href={topicPath(t.slug)} className="hover:text-ember-ink">
                        {t.title}
                      </a>
                    </h2>
                    <p className="mt-4 max-w-[48ch] text-[0.9375rem] text-ink-dim">{t.intro}</p>
                    <a href={topicPath(t.slug)} className="link-arrow mt-5 text-sm text-ink">
                      All {t.label.toLowerCase()} articles <span aria-hidden="true">→</span>
                    </a>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                    {list.map((a) => (
                      <ArticleCard key={a.slug} article={a} showTopic={false} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Contact title="Have a decision your customers keep getting stuck on? Let’s find out why." />
    </>
  );
}
