import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/home/Contact";
import ArticleCard from "@/components/insights/ArticleCard";
import AuthorBox from "@/components/insights/AuthorBox";
import JsonLd from "@/components/seo/JsonLd";
import { articlePath, formatDate, getArticle, getArticles, getTopic, relatedTo, topicPath } from "@/lib/articles";
import { getCaseStudy, personalInfo, site } from "@/lib/content";
import { articleFaqNode, articleNode, breadcrumbNode, caseStudyPath } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const title = `${a.title} | ${personalInfo.name}`;
  return {
    title,
    description: a.description,
    keywords: a.keywords,
    authors: [{ name: personalInfo.name, url: site.url }],
    alternates: { canonical: articlePath(a.slug), types: { "application/rss+xml": "/insights/feed.xml" } },
    openGraph: {
      type: "article",
      title,
      description: a.description,
      url: articlePath(a.slug),
      publishedTime: a.date,
      modifiedTime: a.updated ?? a.date,
      authors: [site.url],
      section: getTopic(a.topic)?.title,
      tags: a.keywords,
    },
    twitter: { card: "summary_large_image", title, description: a.description },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const topic = getTopic(a.topic)!;
  const related = relatedTo(a, 3);
  const studies = a.caseStudies.map((s) => getCaseStudy(s)).filter((c) => c !== undefined);

  return (
    <article>
      <JsonLd
        nodes={[
          articleNode(a),
          articleFaqNode(a),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: topic.title, path: topicPath(topic.slug) },
            { name: a.title, path: articlePath(a.slug) },
          ]),
        ]}
      />

      <header className="stage relative overflow-hidden">
        <div aria-hidden="true" className="article-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1440px] px-5 pt-32 pb-14 sm:px-10 md:pt-40 md:pb-20">
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
            <span aria-hidden="true">/</span>
            <a href={topicPath(topic.slug)} className="text-ember hover:text-ember-bright">
              {topic.label}
            </a>
          </nav>
          <h1 className="display mt-8 max-w-[22ch] text-[clamp(2.4rem,5.2vw,4.75rem)]">{a.title}</h1>
          <p className="lede mt-7 max-w-[62ch] text-ivory-dim">{a.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-ivory/12 pt-6">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
            <img
              src="/images/portrait.jpg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover object-[50%_24%] ring-1 ring-ivory/25"
            />
            <div className="leading-tight">
              <p className="font-semibold">
                <a href="/#about" rel="author" className="hover:text-ember-bright">
                  {personalInfo.name}
                </a>
              </p>
              <p className="mt-1 text-sm text-ivory-faint">Consumer psychology consultant · Milan</p>
            </div>
            <p className="font-mono text-[0.75rem] tracking-[0.16em] text-ivory-faint uppercase sm:ml-auto">
              <time dateTime={a.date}>{formatDate(a.date)}</time> · {a.minutes} min read
            </p>
          </div>
        </div>
      </header>

      <div className="paper grain relative">
        <div className="relative mx-auto grid max-w-[1440px] gap-x-12 px-5 py-14 sm:px-10 md:py-20 lg:grid-cols-12">
          <aside className="mb-10 lg:col-span-3 lg:mb-0">
            {/* Phones: a collapsed list. Desktop: a sticky outline beside the text. */}
            <details className="toc rounded-[8px] ring-1 ring-ink/12 lg:hidden">
              <summary className="flex items-center justify-between p-4 font-mono text-[0.75rem] tracking-[0.2em] text-ink-faint uppercase">
                On this page
                <span aria-hidden="true" className="faq-plus text-lg text-ember-ink transition-transform">
                  +
                </span>
              </summary>
              <ol className="space-y-2.5 px-4 pb-4 text-[0.9375rem]">
                {a.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block text-ink-dim hover:text-ink">
                      {t.text}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="block text-ink-dim hover:text-ink">
                    Questions people ask
                  </a>
                </li>
              </ol>
            </details>
            <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block">
              <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ink-faint uppercase">On this page</p>
              <ol className="mt-5 space-y-2.5 border-l border-ink/12 text-[0.9375rem]">
                {a.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block pl-4 text-ink-dim transition-colors hover:text-ink">
                      {t.text}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="block pl-4 text-ink-dim transition-colors hover:text-ink">
                    Questions people ask
                  </a>
                </li>
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <section
              aria-labelledby="takeaways"
              className="mb-14 rounded-[8px] border-l-4 border-ember-ink bg-white/55 p-6 ring-1 ring-ink/10 md:p-8"
            >
              <h2 id="takeaways" className="font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">
                Key takeaways
              </h2>
              <ul className="mt-5 space-y-3.5 text-[1.0625rem] leading-relaxed text-ink">
                {a.takeaways.map((t) => (
                  <li key={t} className="flex gap-3.5">
                    <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-ember-ink" />
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            <div className="prose-article" dangerouslySetInnerHTML={{ __html: a.html }} />

            <section aria-labelledby="faq" className="mt-20">
              <h2
                id="faq"
                className="font-serif text-[clamp(1.7rem,2.6vw,2.3rem)] leading-tight font-bold tracking-[-0.035em] text-ink"
              >
                Questions people ask
              </h2>
              <div className="mt-6 divide-y divide-ink/12 border-y border-ink/12">
                {a.faq.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex items-start justify-between gap-6">
                      <h3 className="font-serif text-[1.2rem] leading-snug font-bold tracking-[-0.015em] text-ink">
                        {f.q}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="faq-plus mt-0.5 text-2xl leading-none text-ember-ink transition-transform duration-300"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-[64ch] text-ink-dim">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {studies.length > 0 && (
              <section aria-label="Work this draws on" className="mt-16">
                <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ink-faint uppercase">Work this draws on</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {studies.map((c) => (
                    <li key={c.slug}>
                      <a
                        href={caseStudyPath(c.slug)}
                        className="group flex h-full flex-col rounded-[8px] bg-white/45 p-5 ring-1 ring-ink/10 transition-colors hover:bg-white/80"
                      >
                        <span className="font-serif text-[1.15rem] font-bold tracking-[-0.02em] text-ink">
                          {c.name}
                        </span>
                        <span className="mt-1 text-sm text-ink-dim">{c.tagline}</span>
                        <span className="mt-3 font-mono text-[0.75rem] tracking-[0.14em] text-ember-ink uppercase">
                          Case study →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <AuthorBox />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="stage">
          <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-10 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="related-heading" className="display text-[clamp(2rem,4vw,3.4rem)]">
                Keep reading
              </h2>
              <a href="/insights" className="link-arrow text-ember">
                All articles <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} tone="stage" />
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact title="Want this applied to your product? Let’s talk." />
    </article>
  );
}
