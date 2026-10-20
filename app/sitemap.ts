import type { MetadataRoute } from "next";
import { publishedCaseStudies } from "@/lib/content";
import { absoluteUrl, caseStudyPath } from "@/lib/schema";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: absoluteUrl("/"), lastModified, priority: 1 },
    { url: absoluteUrl("/consumer-psychology"), lastModified, priority: 1 },
    { url: absoluteUrl("/work"), lastModified, priority: 0.9 },
    ...publishedCaseStudies.map((c) => ({ url: absoluteUrl(caseStudyPath(c.slug)), lastModified, priority: 0.8 })),
    { url: absoluteUrl("/llms.txt"), lastModified, priority: 0.5 },
    { url: absoluteUrl("/llms-full.txt"), lastModified, priority: 0.5 },
  ];
}
