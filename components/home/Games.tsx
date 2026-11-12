import Pukytoon from "@/components/home/Pukytoon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BentoTile } from "@/components/work/WorkTile";
import { gamesOrder, pick } from "@/components/home/WorkGrid";
import { playableGames } from "@/lib/play";

/** Bento placement on desktop: the lead game takes a 2×2 block, the play tile closes the grid. */
const layout = [
  "md:col-span-2 md:row-span-2",
  "md:col-start-3 md:row-start-1",
  "md:col-start-3 md:row-start-2",
  "md:col-start-1 md:row-start-3",
];

export default function Games({ numeral = "05", withPukytoon = true }: { numeral?: string; withPukytoon?: boolean }) {
  const games = pick(gamesOrder);
  const playable = playableGames().length;
  return (
    <Section id="games" tone="paper">
      <SectionHeading
        id="games"
        numeral={numeral || undefined}
        eyebrow="Games"
        title="Small worlds for testing ideas about play."
        lede="A feed of games anyone can make, which I’m still building, a story game about AI and work, and merge games built around reward, choice and attention. The story game and the merge games play right here, in your browser."
      />
      {withPukytoon && <Pukytoon />}
      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[repeat(3,minmax(17rem,auto))]" data-stagger>
        {games.map((c, i) => (
          <BentoTile key={c.slug} study={c} big={i === 0} className={layout[i] ?? ""} />
        ))}
        <a
          href="/play"
          data-cursor="Play"
          className="reveal group flex min-h-[17rem] flex-col justify-between rounded-[8px] bg-ember p-7 text-void transition-colors hover:bg-ember-bright md:col-span-2 md:col-start-2 md:row-start-3"
        >
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase">No install · always the newest version</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="stat-figure text-[clamp(3rem,5vw,4.5rem)]">
                {playable}
                <span className="text-[0.5em]"> games</span>
              </p>
              <p className="mt-2 max-w-[30ch] font-medium">
                play right here on sinadehesh.com — on a phone or a laptop.
              </p>
            </div>
            <span className="btn btn-ink !px-5 !py-3.5 text-sm">
              ▶ Open the arcade{" "}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </a>
      </div>
    </Section>
  );
}
