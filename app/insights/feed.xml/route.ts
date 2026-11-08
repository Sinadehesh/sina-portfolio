import { articlePath, getArticles, getTopic } from "@/lib/articles";
import { personalInfo, site } from "@/lib/content";
import { absoluteUrl } from "@/lib/schema";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of every Insights article. */
export function GET() {
  const items = getArticles()
    .map((a) => {
      const url = absoluteUrl(articlePath(a.slug));
      return [
        "<item>",
        `<title>${esc(a.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(`${a.date}T08:00:00Z`).toUTCString()}</pubDate>`,
        `<category>${esc(getTopic(a.topic)?.title ?? a.topic)}</category>`,
        `<author>${personalInfo.email} (${esc(personalInfo.name)})</author>`,
        `<description>${esc(a.description)}</description>`,
        "</item>",
      ].join("");
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(personalInfo.name)} — Insights</title>
<link>${absoluteUrl("/insights")}</link>
<atom:link href="${absoluteUrl("/insights/feed.xml")}" rel="self" type="application/rss+xml"/>
<description>${esc(`Articles by ${personalInfo.name} on consumer psychology, behavioral fintech, insurance, automation and AI in education.`)}</description>
<language>en</language>
<managingEditor>${personalInfo.email} (${esc(personalInfo.name)})</managingEditor>
<image><url>${absoluteUrl("/images/portrait.jpg")}</url><title>${esc(personalInfo.name)}</title><link>${site.url}</link></image>
${items}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
