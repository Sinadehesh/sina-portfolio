import { Section, SectionHeading } from "@/components/ui/Section";
import { WorkRow, WorkTile } from "@/components/work/WorkTile";
import { publishedCaseStudies } from "@/lib/content";

const featuredOrder = [
  "costly",
  "app-lockers",
  "oopscupid",
  "debubble",
  "virtue-ledger",
  "merge-farmstead",
  "daily-sublime",
  "daily-hustle",
];

/** Shown in their own homepage sections (consulting, experience, books, about). */
const elsewhereOnHome = ["optimolds", "musicity", "recallmate", "interview-simulation-study", "tao-app"];

export default function WorkGrid({ asPage = false }: { asPage?: boolean }) {
  const featured = featuredOrder
    .map((slug) => publishedCaseStudies.find((c) => c.slug === slug))
    .filter((c) => c !== undefined);
  const more = publishedCaseStudies.filter(
    (c) => !featuredOrder.includes(c.slug) && (asPage || !elsewhereOnHome.includes(c.slug)),
  );

  return (
    <Section id="work" tone="stage" innerClassName={asPage ? "pt-36 md:pt-44" : ""}>
      <SectionHeading
        id="work"
        as={asPage ? "h1" : "h2"}
        eyebrow={asPage ? "All work" : "Apps & websites"}
        title={asPage ? "Every product, engagement and study" : "Apps and websites I designed and built"}
        lede="Real screenshots from the products. Each case study covers the problem, the psychology used, and the decisions behind the build."
      />
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2" data-stagger>
        {featured.map((c) => (
          <WorkTile key={c.slug} study={c} />
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
