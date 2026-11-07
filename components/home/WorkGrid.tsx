import { Section, SectionHeading } from "@/components/ui/Section";
import { WorkRow, WorkSpotlight, WorkTile } from "@/components/work/WorkTile";
import { publishedCaseStudies, type CaseStudy } from "@/lib/content";

/** Lead project first (shown as a spotlight), then the tiles in order. */
const appsOrder = ["costly", "app-lockers", "oopscupid", "debubble", "pukytoon", "virtue-ledger", "daily-sublime"];
export const gamesOrder = ["the-loop", "gem-jar", "zombie-bomber", "merge-farmstead", "thermite-dominoes"];

/** Shown in their own homepage sections (consulting, experience, books, about). */
const elsewhereOnHome = ["optimolds", "musicity", "recallmate", "interview-simulation-study", "tao-app"];

export const pick = (slugs: string[]) =>
  slugs.map((slug) => publishedCaseStudies.find((c) => c.slug === slug)).filter((c): c is CaseStudy => c !== undefined);

export default function WorkGrid({ asPage = false }: { asPage?: boolean }) {
  const [lead, ...apps] = pick(appsOrder);
  const shown = new Set([...appsOrder, ...gamesOrder]);
  const more = publishedCaseStudies.filter(
    (c) => !shown.has(c.slug) && (asPage || !elsewhereOnHome.includes(c.slug)),
  );

  return (
    <Section id="work" tone="stage" innerClassName={asPage ? "pt-36 md:pt-44" : ""}>
      <SectionHeading
        id="work"
        as={asPage ? "h1" : "h2"}
        numeral={asPage ? undefined : "III"}
        eyebrow={asPage ? "All work" : "Apps & websites"}
        title={asPage ? "Every product, engagement and study" : "Apps and websites I designed and built"}
        lede="Real screenshots from the products. Each case study covers the problem, the psychology used, and the decisions behind the build."
      />

      {lead && <WorkSpotlight study={lead} index={1} />}

      <div className="mt-24 grid gap-x-8 gap-y-16 md:grid-cols-2" data-stagger>
        {apps.map((c, i) => (
          <WorkTile key={c.slug} study={c} index={i + 2} />
        ))}
      </div>

      {more.length > 0 && (
        <div className="mt-24">
          <h3 className="eyebrow">{asPage ? "More work" : "More apps & tools"}</h3>
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
