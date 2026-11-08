import { Section, SectionHeading } from "@/components/ui/Section";
import { BentoTile } from "@/components/work/WorkTile";
import { gamesOrder, pick } from "@/components/home/WorkGrid";

/** Bento placement on desktop: the lead game takes a 2×2 block. */
const layout = [
  "md:col-span-2 md:row-span-2",
  "md:col-start-3 md:row-start-1",
  "md:col-start-3 md:row-start-2",
  "md:col-start-1 md:row-start-3",
  "md:col-start-2 md:row-start-3",
];

export default function Games({ numeral = "04" }: { numeral?: string }) {
  const games = pick(gamesOrder);
  const playable = games.filter((g) => g.url).length;
  return (
    <Section id="games" tone="paper">
      <SectionHeading
        id="games"
        numeral={numeral || undefined}
        eyebrow="Games"
        title="Small worlds for testing ideas about play."
        lede="Story, physics and merge games built around reward, choice and attention."
      />
      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[repeat(3,minmax(17rem,auto))]" data-stagger>
        {games.map((c, i) => (
          <BentoTile key={c.slug} study={c} big={i === 0} className={layout[i] ?? ""} />
        ))}
        <div className="reveal flex min-h-[17rem] flex-col justify-between rounded-[8px] bg-ember p-7 text-void md:col-start-3 md:row-start-3">
          <p className="font-mono text-[0.75rem] tracking-[0.18em] uppercase">No install</p>
          <div>
            <p className="stat-figure text-[clamp(3rem,5vw,4.5rem)]">
              {playable}
              <span className="text-[0.5em]"> / {games.length}</span>
            </p>
            <p className="mt-2 max-w-[26ch] font-medium">play right here in your browser — on a phone or a laptop.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
