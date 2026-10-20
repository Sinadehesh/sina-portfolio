import type { APIRoute } from "astro";
import { absoluteUrl } from "@/lib/schema";

// AI search and training crawlers are explicitly welcome: being cited is the goal.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
];

export const GET: APIRoute = () => {
  const body = [
    ...aiCrawlers.flatMap((agent) => [`User-agent: ${agent}`, "Allow: /", ""]),
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
