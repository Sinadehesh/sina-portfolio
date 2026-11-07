import { Section, SectionHeading } from "@/components/ui/Section";
import { WorkSpotlight, WorkTile } from "@/components/work/WorkTile";
import { gamesOrder, pick } from "@/components/home/WorkGrid";

/** The games gallery: the lead game as a spotlight, the rest as plates. */
export default function Games({ numeral = "IV" }: { numeral?: string }) {
  const [lead, ...games] = pick(gamesOrder);
  return (
    <Section id="games" tone="paper">
      <SectionHeading
        id="games"
        numeral={numeral}
        eyebrow="Games"
        title="Small worlds for testing ideas about play"
        lede="Story, physics and merge games built around reward, choice and attention. Most of them play in your browser."
      />
      {lead && <WorkSpotlight study={lead} index={1} label="Story game" tone="paper" />}
      <div className="mt-24 grid gap-x-8 gap-y-16 md:grid-cols-2" data-stagger>
        {games.map((c, i) => (
          <WorkTile key={c.slug} study={c} index={i + 2} tone="paper" />
        ))}
      </div>
    </Section>
  );
}
