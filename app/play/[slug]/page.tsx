import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Contact from "@/components/home/Contact";
import GamePlayer from "@/components/play/GamePlayer";
import JsonLd from "@/components/seo/JsonLd";
import AutoVideo from "@/components/ui/AutoVideo";
import { personalInfo } from "@/lib/content";
import { previewFor } from "@/lib/media";
import { getPlayable, playableGames, playPath } from "@/lib/play";
import { breadcrumbNode, caseStudyPath, videoGameNode } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return playableGames().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getPlayable(slug);
  if (!g) return {};
  const title = `Play ${g.name} online, free — ${g.tagline} | ${personalInfo.name}`;
  const description = `Play ${g.name} free in your browser, no install: ${g.summary}`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: playPath(g.slug) },
    openGraph: { title, description, url: playPath(g.slug), images: g.image ? [g.image] : undefined },
  };
}

export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getPlayable(slug);
  if (!g) notFound();
  const others = playableGames().filter((x) => x.slug !== g.slug);
  const phone = g.play.device === "phone";

  return (
    <>
      <JsonLd
        nodes={[
          videoGameNode(g),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Play", path: "/play" },
            { name: g.name, path: playPath(g.slug) },
          ]),
        ]}
      />

      <section aria-labelledby="play-title" className="stage play-stage relative isolate overflow-hidden">
        <div aria-hidden="true" className="article-glow pointer-events-none absolute inset-0 -z-10" />
        <div
          className={`mx-auto max-w-[1440px] pt-16 lg:px-10 lg:pb-16 ${phone ? "lg:pt-24" : "lg:pt-20"} ${
            phone ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-12" : ""
          }`}
        >
          <header className={`px-5 py-4 sm:px-10 lg:px-0 lg:py-0 ${phone ? "lg:col-span-5" : "lg:mb-6"}`}>
            <nav
              aria-label="Breadcrumb"
              className="hidden flex-wrap gap-x-2 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-faint uppercase lg:flex"
            >
              <a href="/" className="hover:text-ivory">
                Home
              </a>
              <span aria-hidden="true">/</span>
              <a href="/play" className="hover:text-ivory">
                Play
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-ember">{g.name}</span>
            </nav>
            <div className={phone ? "" : "lg:flex lg:items-end lg:justify-between lg:gap-10"}>
              <div>
                <h1
                  id="play-title"
                  className={`display lg:mt-5 ${phone ? "text-[clamp(1.9rem,4.6vw,4.4rem)]" : "text-[clamp(1.9rem,3.6vw,3.4rem)]"}`}
                >
                  Play {g.name}
                </h1>
                <p className="mt-2 max-w-[48ch] text-ivory-dim lg:mt-5 lg:text-[1.0625rem]">{g.tagline}</p>
                {g.play.note && (
                  <p className="mt-3 flex max-w-[52ch] items-start gap-2 font-mono text-[0.75rem] leading-relaxed tracking-[0.06em] text-ember-bright">
                    <span aria-hidden="true">●</span>
                    {g.play.note}
                  </p>
                )}
              </div>
              <div className="mt-5 hidden flex-wrap gap-3 lg:flex">
                <a href={caseStudyPath(g.slug)} className="btn btn-ghost !px-5 !py-3 text-sm">
                  How I designed it →
                </a>
              </div>
            </div>
            {phone && (
              <dl className="mt-10 hidden gap-4 border-t border-ivory/12 pt-6 lg:grid lg:grid-cols-3">
                {g.metrics.slice(0, 3).map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <dt className="order-2 mt-1 text-[0.8125rem] leading-snug text-ivory-faint">{m.label}</dt>
                    <dd className="stat-figure order-1 !text-[clamp(1.6rem,2.4vw,2.2rem)] text-ivory">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </header>

          <div className={phone ? "lg:col-span-7 lg:flex lg:justify-center" : ""}>
            <GamePlayer src={g.play.src} title={g.name} device={g.play.device} />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-game" className="paper grain relative">
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-10 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">
              {g.category} · {g.status}
            </p>
            <h2
              id="about-game"
              className="mt-4 font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05] font-bold tracking-[-0.035em]"
            >
              About {g.name}
            </h2>
            <p className="mt-5 max-w-[64ch] text-[1.0625rem] leading-relaxed text-ink-dim">{g.summary}</p>
            <p className="mt-5 max-w-[64ch] text-[0.9375rem] leading-relaxed text-ink-dim">
              <span className="font-semibold text-ink">The psychology behind it: </span>
              {g.impact.mechanism}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={caseStudyPath(g.slug)} className="btn btn-ink !px-5 !py-3 text-sm">
                Read the case study →
              </a>
              <a href={g.play.src} target="_blank" rel="noopener" className="btn btn-ghost !px-5 !py-3 text-sm">
                Open {g.name} on its own ↗
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h3 className="font-mono text-[0.75rem] tracking-[0.2em] text-ink-faint uppercase">In this version</h3>
            <ul className="mt-4 space-y-2.5">
              {g.featureList.map((f) => (
                <li key={f} className="flex gap-3 text-[0.9375rem] text-ink-dim">
                  <span aria-hidden="true" className="mt-[0.72em] h-px w-4 shrink-0 bg-ember-ink" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-faint">
              This page always plays the newest version: it loads the game from where it is published.
            </p>
          </div>
        </div>

        {others.length > 0 && (
          <div className="relative mx-auto max-w-[1440px] px-5 pb-20 sm:px-10 md:pb-28">
            <h2 className="font-mono text-[0.75rem] tracking-[0.2em] text-ink-faint uppercase">More games to play</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => {
                const preview = previewFor(o.slug);
                return (
                <li key={o.slug}>
                  <a
                    href={playPath(o.slug)}
                    className="group flex h-full flex-col overflow-hidden rounded-[8px] bg-white/45 ring-1 ring-ink/10 transition-colors hover:bg-white/80"
                  >
                    {preview ? (
                      <AutoVideo
                        {...preview}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      o.image && (
                        // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
                        <img
                          src={o.image}
                          alt=""
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      )
                    )}
                    <span className="flex flex-1 flex-col p-5">
                      <span className="font-serif text-[1.2rem] font-bold tracking-[-0.02em] text-ink">{o.name}</span>
                      <span className="mt-1 text-sm text-ink-dim">{o.tagline}</span>
                      <span className="mt-auto pt-4 font-mono text-[0.75rem] tracking-[0.14em] text-ember-ink uppercase">
                        Play now →
                      </span>
                    </span>
                  </a>
                </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      <Contact title="Want a game or a feed like this for your product? Let’s talk." />
    </>
  );
}
