import { Section, SectionHeading } from "@/components/ui/Section";
import { WorkRow, WorkTile } from "@/components/work/WorkTile";
import { publishedCaseStudies } from "@/lib/content";

const featuredOrder = [
  "optimolds",
  "app-lockers",
  "costly",
  "oopscupid",
  "debubble",
  "interview-simulation-study",
  "workflow-automation-engine",
  "daily-sublime",
];

export default function WorkGrid({ asPage = false }: { asPage?: boolean }) {
  const featured = featuredOrder
    .map((slug) => publishedCaseStudies.find((c) => c.slug === slug))
    .filter((c) => c !== undefined);
  const more = publishedCaseStudies.filter((c) => !featuredOrder.includes(c.slug));

  return (
    <Section id="work" tone="stage" innerClassName={asPage ? "pt-36 md:pt-44" : ""}>
      <SectionHeading
        id="work"
        as={asPage ? "h1" : "h2"}
        eyebrow="Selected work"
        title="Products, funnels and research — each built on a behavioral claim"
        lede="Every case study opens with the problem, the psychology used and the outcome, then the trade-offs and decisions behind it."
      />
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2" data-stagger>
        {featured.map((c, i) => (
          <WorkTile key={c.slug} study={c} wide={i === 0 || i === featured.length - 1} />
        ))}
      </div>

      {more.length > 0 && (
        <div className="mt-24">
          <h3 className="eyebrow">More work</h3>
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
