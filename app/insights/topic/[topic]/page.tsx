import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/home/Contact";
import ArticleCard from "@/components/insights/ArticleCard";
import JsonLd from "@/components/seo/JsonLd";
import { articlesIn, getTopic, topicPath, topics } from "@/lib/articles";
import { getCaseStudy, personalInfo } from "@/lib/content";
import { articleCollectionNode, breadcrumbNode, caseStudyPath } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.filter((t) => articlesIn(t.slug).length > 0).map((t) => ({ topic: t.slug }));
}

const pageTitle = (label: string) => `${label}: articles by ${personalInfo.name}`;

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const t = getTopic(topic);
  if (!t) return {};
  const title = `${pageTitle(t.title)} | ${personalInfo.name}`;
  return {
    title,
    description: t.intro,
    alternates: { canonical: topicPath(t.slug), types: { "application/rss+xml": "/insights/feed.xml" } },
    openGraph: { title, description: t.intro, url: topicPath(t.slug) },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = getTopic(topic);
  if (!t) notFound();
  const list = articlesIn(t.slug);
  // Case studies the topic's articles draw on, most cited first.
  const counts = new Map<string, number>();
  list.forEach((a) => a.caseStudies.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)));
  const studies = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([s]) => getCaseStudy(s))
    .filter((c) => c !== undefined)
    .slice(0, 4);

  return (
    <>
      <JsonLd
        nodes={[
          articleCollectionNode(topicPath(t.slug), pageTitle(t.title), t.intro, list),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: t.title, path: topicPath(t.slug) },
          ]),
        ]}
      />
      <header className="stage relative overflow-hidden">
        <div aria-hidden="true" className="article-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1440px] px-5 pt-32 pb-16 sm:px-10 md:pt-44 md:pb-20">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap gap-x-2 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-faint uppercase"
          >
            <a href="/" className="hover:text-ivory">
              Home
            </a>
            <span aria-hidden="true">/</span>
            <a href="/insights" className="hover:text-ivory">
              Insights
            </a>
          </nav>
          <h1 className="display mt-8 max-w-[20ch] text-[clamp(2.6rem,6vw,5.6rem)]">{t.title}</h1>
          <p className="lede mt-8 max-w-[62ch] text-ivory-dim">{t.intro}</p>
          <p className="mt-8 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-faint uppercase">
            {list.length} articles by {personalInfo.name}
          </p>
        </div>
      </header>

      <div className="paper grain relative">
        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-10 md:py-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <ArticleCard key={a.slug} article={a} showTopic={false} headingLevel="h2" />
            ))}
          </div>

          {studies.length > 0 && (
            <section aria-label="Related work" className="mt-20 border-t border-ink/15 pt-8">
              <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">
                The work behind these articles
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {studies.map((c) => (
                  <li key={c.slug}>
                    <a
                      href={caseStudyPath(c.slug)}
                      className="flex h-full flex-col rounded-[8px] bg-white/45 p-5 ring-1 ring-ink/10 transition-colors hover:bg-white/80"
                    >
                      <span className="font-serif text-[1.1rem] font-bold tracking-[-0.02em]">{c.name}</span>
                      <span className="mt-1 text-sm text-ink-dim">{c.tagline}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="Other topics" className="mt-16 flex flex-wrap gap-2">
            {topics
              .filter((x) => x.slug !== t.slug)
              .map((x) => (
                <a
                  key={x.slug}
                  href={topicPath(x.slug)}
                  className="rounded-full border border-ink/20 px-4 py-2 font-mono text-[0.75rem] tracking-[0.14em] text-ink-dim uppercase transition-colors hover:border-ink hover:text-ink"
                >
                  {x.label}
                </a>
              ))}
          </nav>
        </div>
      </div>

      <Contact />
    </>
  );
}
