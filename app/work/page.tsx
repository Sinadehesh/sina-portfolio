import type { Metadata } from "next";
import Contact from "@/components/home/Contact";
import WorkGrid from "@/components/home/WorkGrid";
import JsonLd from "@/components/seo/JsonLd";
import { personalInfo, publishedCaseStudies } from "@/lib/content";
import { absoluteUrl, allCaseStudyNodes, breadcrumbNode, caseStudyPath } from "@/lib/schema";

const title = `Case studies: consumer psychology & behavioral products by ${personalInfo.name}`;
const description = `${publishedCaseStudies.length} case studies — ${publishedCaseStudies
  .slice(0, 5)
  .map((c) => c.name)
  .join(", ")} and more — each with the problem, the psychology used, trade-offs and a decision log.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  openGraph: { title, description, url: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/work"),
            url: absoluteUrl("/work"),
            name: title,
            description,
            hasPart: publishedCaseStudies.map((c) => ({ "@id": absoluteUrl(`${caseStudyPath(c.slug)}#work`) })),
          },
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          ...allCaseStudyNodes(),
        ]}
      />
      <WorkGrid asPage />
      <Contact />
    </>
  );
}
