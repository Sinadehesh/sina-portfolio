import type { Metadata } from "next";
import Contact from "@/components/home/Contact";
import JsonLd from "@/components/seo/JsonLd";
import { personalInfo, publishedCaseStudies } from "@/lib/content";
import { playableGames, playPath } from "@/lib/play";
import { absoluteUrl, breadcrumbNode, caseStudyPath, videoGameNode } from "@/lib/schema";

const title = `Play free browser games by ${personalInfo.name}: The Loop, Gem Jar and more`;
const description = `Play ${personalInfo.name}'s games free in your browser, no install: The Loop, a story game about AI and work, and the merge games Gem Jar, Zombie Bomber and Merge Farmstead.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/play" },
  openGraph: { title, description, url: "/play" },
};

export default function PlayIndex() {
  const games = playableGames();
  /** Games that aren't open yet: shown last, with an invitation to email instead of a play button. */
  const upcoming = publishedCaseStudies.filter((c) => c.category === "Game" && c.inDevelopment);
  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/play"),
            url: absoluteUrl("/play"),
            name: title,
            description,
            hasPart: games.map((g) => ({ "@id": `${absoluteUrl(playPath(g.slug))}#game` })),
          },
          ...games.map(videoGameNode),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Play", path: "/play" },
          ]),
        ]}
      />

      <header className="stage relative overflow-hidden">
        <div aria-hidden="true" className="article-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1440px] px-5 pt-32 pb-14 sm:px-10 md:pt-44 md:pb-20">
          <p className="flex items-center gap-4 border-t border-ivory/15 pt-4 font-mono text-[0.75rem] tracking-[0.2em] uppercase">
            <span className="text-ember">(Play)</span>
            <span className="opacity-70">{games.length} games · free · no install</span>
          </p>
          <h1 className="display mt-8 max-w-[16ch] text-[clamp(2.6rem,6.4vw,6rem)]">
            Play my games, <span className="text-ember">right here.</span>
          </h1>
          <p className="lede mt-8 max-w-[58ch] text-ivory-dim">
            Every game below runs in your browser, on a phone or a laptop, and always in its newest version — except
            Pukytoon, which is still in development. I make them to test ideas about play, reward and attention with
            real people.
          </p>
        </div>
      </header>

      <div className="paper grain relative">
        <ul className="relative mx-auto grid max-w-[1440px] gap-5 px-5 py-16 sm:px-10 md:grid-cols-2 md:py-24">
          {games.map((g, i) => (
            <li key={g.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <article className="group grid h-full overflow-hidden rounded-[10px] bg-charcoal-900 text-ivory md:grid-cols-2">
                <a
                  href={playPath(g.slug)}
                  data-cursor="Play"
                  aria-label={`Play ${g.name}`}
                  className={`relative block aspect-[16/10] overflow-hidden md:aspect-auto ${i === 0 ? "md:min-h-[26rem]" : "md:min-h-[19rem]"}`}
                >
                  {g.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
                    <img
                      src={g.image}
                      alt={`${g.name} — ${g.tagline}`}
                      loading={i < 2 ? "eager" : "lazy"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                    />
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-void/75 px-3 py-1.5 font-mono text-[0.75rem] tracking-[0.14em] uppercase backdrop-blur-sm">
                    {g.play.device === "computer" ? "Computer" : "Phone & computer"}
                  </span>
                </a>
                <div className="flex flex-col p-7 md:p-9">
                  <p className="font-mono text-[0.75rem] tracking-[0.16em] text-ember uppercase">
                    {g.status} · {g.cover.metric} {g.cover.caption}
                  </p>
                  <h2
                    className={`display mt-4 ${i === 0 ? "text-[clamp(2.4rem,4.4vw,4.2rem)]" : "text-[clamp(2rem,3.2vw,3rem)]"}`}
                  >
                    {g.name}
                  </h2>
                  <p className="mt-3 text-ivory-dim">{g.tagline}</p>
                  {i === 0 && <p className="mt-4 max-w-[56ch] text-[0.9375rem] text-ivory-faint">{g.summary}</p>}
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <a href={playPath(g.slug)} data-magnetic="0.25" className="btn btn-ember !px-5 !py-3.5 text-sm">
                      ▶ Play {g.name}
                    </a>
                    <a href={caseStudyPath(g.slug)} className="btn btn-ghost !px-5 !py-3.5 text-sm">
                      Case study
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
          {upcoming.map((c) => (
            <li key={c.slug}>
              <article className="group grid h-full overflow-hidden rounded-[10px] bg-charcoal-900 text-ivory md:grid-cols-2">
                <a
                  href={caseStudyPath(c.slug)}
                  aria-label={`${c.name} case study`}
                  className="relative block aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[19rem]"
                >
                  {c.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset
                    <img
                      src={c.image}
                      alt={`${c.name} — ${c.tagline}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                    />
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-void/75 px-3 py-1.5 font-mono text-[0.75rem] tracking-[0.14em] uppercase backdrop-blur-sm">
                    In development
                  </span>
                </a>
                <div className="flex flex-col p-7 md:p-9">
                  <p className="font-mono text-[0.75rem] tracking-[0.16em] text-ember uppercase">Not open to play yet</p>
                  <h2 className="display mt-4 text-[clamp(2rem,3.2vw,3rem)]">{c.name}</h2>
                  <p className="mt-3 text-ivory-dim">{c.tagline}</p>
                  <p className="mt-4 text-[0.9375rem] text-ivory-faint">{c.inDevelopment?.note}</p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <a
                      href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`About ${c.name}`)}`}
                      data-magnetic="0.25"
                      data-cursor="Email"
                      className="btn btn-ember !px-5 !py-3.5 text-sm"
                    >
                      Email me about {c.name}
                    </a>
                    <a href={caseStudyPath(c.slug)} className="btn btn-ghost !px-5 !py-3.5 text-sm">
                      Case study
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      <Contact title="Want a game or an engagement loop like these for your product? Let’s talk." />
    </>
  );
}
