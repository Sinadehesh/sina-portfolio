import type { APIRoute } from "astro";
import { publishedCaseStudies } from "@/lib/data";
import { absoluteUrl, caseStudyPath } from "@/lib/schema";

const routes = [
  { path: "/", priority: "1.0" },
  { path: "/consumer-psychology/", priority: "1.0" },
  { path: "/work/", priority: "0.9" },
  { path: "/capabilities/", priority: "0.9" },
  ...publishedCaseStudies.map((c) => ({ path: caseStudyPath(c.slug), priority: "0.8" })),
  { path: "/llms.txt", priority: "0.5" },
  { path: "/llms-full.txt", priority: "0.5" },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (r) =>
        `  <url><loc>${absoluteUrl(r.path)}</loc><lastmod>${lastmod}</lastmod><priority>${r.priority}</priority></url>`,
    )
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
