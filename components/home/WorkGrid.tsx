import { Section, SectionHeading } from "@/components/ui/Section";
import { DeckCard, WorkRow } from "@/components/work/WorkTile";
import { publishedCaseStudies, type CaseStudy } from "@/lib/content";

/** Apps in deck order, then the games (their own section). */
const appsOrder = ["costly", "app-lockers", "oopscupid", "debubble", "virtue-ledger", "daily-sublime"];
export const gamesOrder = ["the-loop", "gem-jar", "zombie-bomber", "merge-farmstead"];

/** Shown in their own homepage sections (consulting, experience, games, books, about). */
const elsewhereOnHome = ["optimolds", "musicity", "recallmate", "interview-simulation-study", "tao-app", "pukytoon"];

export const pick = (slugs: string[]) =>
  slugs.map((slug) => publishedCaseStudies.find((c) => c.slug === slug)).filter((c): c is CaseStudy => c !== undefined);

export default function WorkGrid({ asPage = false }: { asPage?: boolean }) {
  const apps = pick(appsOrder);
  const shown = new Set([...appsOrder, ...gamesOrder]);
  const more = publishedCaseStudies.filter((c) => !shown.has(c.slug) && (asPage || !elsewhereOnHome.includes(c.slug)));

  return (
    <Section id="work" tone="stage" innerClassName={asPage ? "pt-36 md:pt-44" : ""}>
      <SectionHeading
        id="work"
        as={asPage ? "h1" : "h2"}
        numeral={asPage ? undefined : "04"}
        eyebrow={asPage ? "All work" : "Apps & websites"}
        title={asPage ? "Every product, engagement and study." : "Products I designed, built and shipped."}
        lede="Real screenshots from the products. Each case study covers the problem, the psychology used, and the decisions behind the build."
      />

      <div data-deck className="space-y-5 md:space-y-8 lg:space-y-[16vh]">
        {apps.map((c, i) => (
          <DeckCard key={c.slug} study={c} index={i + 1} total={apps.length} />
        ))}
      </div>

      {more.length > 0 && (
        <div className="mt-28 md:mt-36">
          <h3 className="font-mono text-[0.75rem] tracking-[0.2em] text-ivory-faint uppercase">
            <span className="text-ember">+</span> {asPage ? "More work" : "More apps & tools"}
          </h3>
          <ul className="mt-6 border-b border-ivory/12" data-stagger>
            {more.map((c) => (
              <WorkRow key={c.slug} study={c} />
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
