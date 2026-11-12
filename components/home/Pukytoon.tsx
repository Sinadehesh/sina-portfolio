import Scrolly from "@/components/scrolly/Scrolly";
import PhoneStage, { type PhoneShot } from "@/components/scrolly/PhoneStage";
import { VisionBody } from "@/components/work/Vision";
import { getCaseStudy, personalInfo } from "@/lib/content";
import { caseStudyPath } from "@/lib/schema";

/** Real screens of the app in development, taken at 390 × 844; rings are in the same pixels. */
const shots: PhoneShot[] = [
  {
    src: "/images/pukytoon/feed.webp",
    alt: "Pukytoon's feed showing Zombie Bomber, one game per screen, with a Play button",
    ring: [124, 412, 142, 70],
    label: "Swipe · tap Play",
    chips: ["One game per screen", "Swipe for the next one"],
  },
  {
    src: "/images/pukytoon/studio.webp",
    alt: "The Creator Studio: a live preview above, game types and looks to choose below",
    ring: [12, 440, 366, 345],
    label: "Creator Studio",
    chips: ["4 game types", "6 looks", "74 pictures", "No code"],
  },
  {
    src: "/images/pukytoon/rules.webp",
    alt: "The Creator Studio's rules: how to win and how to lose, with presets and custom rules",
    ring: [12, 560, 366, 262],
    label: "Your rules",
    chips: ["Score 2,000", "Make the top item", "Your own rule"],
  },
  {
    src: "/images/pukytoon/link.webp",
    alt: "Adding a game by pasting a Claude artifact link, recognized as a Claude link",
    ring: [12, 498, 366, 180],
    label: "Paste a link",
    chips: ["Claude", "Gemini", "Kimi", "or the game's code"],
  },
  {
    src: "/images/pukytoon/share.webp",
    alt: "A match-3 game made in the Studio, with the sign-in sheet to share it with everyone",
    ring: [12, 600, 366, 228],
    label: "Share it",
    chips: ["Likes", "One link per game", "Make your own version"],
  },
];

const steps = [
  {
    kicker: "Swipe",
    title: "Games in a feed, like short videos.",
    body: "One game per screen, snapping like a video feed. Tap Play and it takes the whole screen; swipe up and the next game is already waiting. Trying a game costs one swipe.",
  },
  {
    kicker: "Make",
    title: "Make a game without writing code.",
    body: "The Creator Studio: pick a game type — drop and merge, endless runner, match-3 or whack-a-mole — choose one of six looks, swap in any of 74 pictures and tune it while a live preview plays. That's hundreds of different games, from anyone.",
  },
  {
    kicker: "Rules",
    title: "Decide how it’s won and lost.",
    body: "Take a preset — make the top item, score 2,000, 25 moves — or write your own rule, like score ≥ 1000 or time ≥ 90, checked as you type. Publish, and the whole game is a few hundred bytes of data.",
  },
  {
    kicker: "Paste a link",
    title: "Made a game with Claude? Copy its link.",
    body: "Built a game as a Claude artifact, or with Gemini or Kimi? Copy its share link and paste it in: Pukytoon recognizes it and it becomes a card in the feed. Paste the code instead and it plays right inside the feed.",
  },
  {
    kicker: "Share",
    title: "Share it, like it, make your own version.",
    body: "Sign in with just your email to share your games with everyone, like other people's and send any game to a friend with one link. Every shared game carries its maker's name and @handle, and anyone can make their own version of it. Following your favorite makers is coming next.",
  },
];

/**
 * Pukytoon, told as a scroll story over real screens of the app, then why it matters (the democratization of
 * game-making and its social side). It is still in development, so it ends with an invitation to email (to
 * hear more, or to fund it) instead of a way to play it.
 */
export default function Pukytoon() {
  const study = getCaseStudy("pukytoon");
  if (!study) return null;
  const email = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`About ${study.name}`)}`;
  return (
    <div className="pukytoon-story mb-24 md:mb-32">
      <div className="grid gap-6 border-t border-ink/15 pt-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.2em] text-ember-ink uppercase">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full border border-ember-ink" />
            Pukytoon · in development
          </p>
          <h3 className="display mt-5 text-[clamp(2.4rem,5.2vw,5rem)]">
            A feed of games <span className="text-ember-ink">anyone can make.</span>
          </h3>
        </div>
        <p className="lede max-w-[46ch] text-ink-dim lg:col-span-5">
          Making videos became something everyone can do. I believe making games will go the same way — so I’m
          building the place where people make them, share them and play each other’s.
        </p>
      </div>

      <Scrolly stage={<PhoneStage shots={shots} />}>
        {steps.map((s, i) => (
          <div
            key={s.title}
            data-scrolly-step
            className="scrolly-step flex min-h-[60svh] flex-col justify-start pt-10 pb-6 lg:min-h-[80svh] lg:justify-center lg:py-0"
          >
            <p className="flex flex-wrap items-center gap-3 font-mono text-[0.75rem] tracking-[0.18em] text-ink-faint uppercase">
              <span>
                <span className="text-ember-ink">{String(i + 1).padStart(2, "0")}</span> /{" "}
                {String(steps.length).padStart(2, "0")}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-ink/25" />
              {s.kicker}
            </p>
            <h4 className="display mt-5 max-w-[15ch] text-[clamp(2rem,3.5vw,3.4rem)]">{s.title}</h4>
            <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-ink-dim">{s.body}</p>
          </div>
        ))}
      </Scrolly>

      {/* Why it matters: the democratization of game-making and its social side. */}
      {study.vision && (
        <div className="mt-16 border-t border-ink/15 pt-12 md:mt-24 md:pt-16">
          <VisionBody study={study} tone="paper" headingLevel="h4" />
        </div>
      )}

      {study.inDevelopment && (
        <div className="mt-16 rounded-[10px] bg-charcoal-900 p-7 text-ivory sm:p-10 md:mt-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[0.75rem] tracking-[0.18em] text-ember uppercase">
                Still in development · not open to play yet
              </p>
              <p className="display mt-4 max-w-[22ch] text-[clamp(1.9rem,3.4vw,3rem)]">
                Want to know more about {study.name}, or to fund it? Email me.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <a href={email} data-magnetic="0.25" data-cursor="Email" className="btn btn-ember !px-5 !py-3.5 text-sm">
                Email me about {study.name} →
              </a>
              <a href={caseStudyPath(study.slug)} className="btn btn-ghost !px-5 !py-3.5 text-sm">
                Case study
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
