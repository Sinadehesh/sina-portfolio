#!/usr/bin/env node
// Quality gate for content/articles/*.md. Run: npm run check:articles [-- slug ...]
// Errors fail the run; warnings are things a person should look at.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dir = join(root, "content", "articles");
const only = process.argv.slice(2);

const topics = new Set(["consumer-psychology", "fintech", "insurance", "automation", "ai-products", "ai-education", "research", "games-creativity", "engagement-addiction"]);
const content = readFileSync(join(root, "lib", "content.ts"), "utf8");
const caseStudies = new Set([...content.matchAll(/\n    slug: "([a-z0-9-]+)"/g)].map((m) => m[1]));
const files = readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const slugs = new Set(files.map((f) => f.replace(/\.md$/, "")));
// While a batch is being written, ARTICLE_PLAN=<plan.json> counts planned slugs as existing.
if (process.env.ARTICLE_PLAN) {
  for (const p of JSON.parse(readFileSync(process.env.ARTICLE_PLAN, "utf8"))) slugs.add(p.slug);
}

// Phrases that read as filler or machine-written.
const banned = [
  /\bdelve\b/i, /in today['’]s (fast-paced|digital|ever)/i, /\btapestry\b/i, /\bgame[- ]changer\b/i,
  /unlock the (power|potential)/i, /\brevolutioni[sz]e\b/i, /ever[- ]evolving/i, /it['’]s (important|worth) to note/i,
  /\bin conclusion\b/i, /\bembark\b/i, /\bnavigat(e|ing) the (complex|world)/i, /\bseamless(ly)?\b/i,
  /\bholistic\b/i, /\bsynerg/i, /\bparadigm shift\b/i, /\btestament to\b/i,
];
const soft = [/\blandscape\b/i, /\bleverag(e|ing)\b/i, /\bharness\b/i, /\brobust\b/i, /\butili[sz]e\b/i, /\bcrucial\b/i];

let errors = 0;
let warnings = 0;
const report = [];

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  if (only.length && !only.includes(slug)) continue;
  const E = [];
  const W = [];
  const raw = readFileSync(join(dir, file), "utf8").replace(/\r\n/g, "\n");
  let fm = {};
  let body = "";
  if (!raw.startsWith("---\n")) E.push("missing frontmatter");
  else {
    const end = raw.indexOf("\n---\n", 4);
    if (end < 0) E.push("frontmatter not closed");
    else {
      try {
        fm = JSON.parse(raw.slice(4, end));
      } catch (e) {
        E.push(`frontmatter JSON: ${e.message}`);
      }
      body = raw.slice(end + 5);
    }
  }
  const s = (k) => (typeof fm[k] === "string" ? fm[k] : "");
  if (!s("title")) E.push("title missing");
  else if (s("title").length > 72) W.push(`title is ${s("title").length} chars (aim ≤ 70)`);
  if (!s("description")) E.push("description missing");
  else if (s("description").length < 110 || s("description").length > 170)
    W.push(`description is ${s("description").length} chars (aim 120–160)`);
  if (!topics.has(s("topic"))) E.push(`topic "${s("topic")}" invalid`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s("date"))) E.push("date must be yyyy-mm-dd");
  if (typeof fm.order !== "number") W.push("order missing");
  if (!Array.isArray(fm.keywords) || fm.keywords.length < 3) E.push("keywords: need ≥ 3");
  if (!Array.isArray(fm.takeaways) || fm.takeaways.length < 3 || fm.takeaways.length > 5) E.push("takeaways: need 3–5");
  if (!Array.isArray(fm.faq) || fm.faq.length < 3 || fm.faq.length > 6) E.push("faq: need 3–6");
  else fm.faq.forEach((f, i) => (typeof f.q !== "string" || typeof f.a !== "string") && E.push(`faq[${i}] needs q and a`));
  for (const r of fm.related ?? []) if (!slugs.has(r)) E.push(`related "${r}" not found`);
  for (const c of fm.caseStudies ?? []) if (!caseStudies.has(c)) E.push(`caseStudy "${c}" not found`);

  const words = body.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").split(/\s+/).filter(Boolean).length;
  if (words < 850) E.push(`body is ${words} words (need ≥ 900)`);
  else if (words > 2000) W.push(`body is ${words} words (long)`);
  const h2 = (body.match(/^## /gm) ?? []).length;
  if (h2 < 4) E.push(`only ${h2} H2 sections (need ≥ 4)`);
  if (/^# /m.test(body)) E.push("body must not contain an H1 (# ) — the title is the H1");

  for (const m of body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const href = m[1];
    const a = href.match(/^\/insights\/([a-z0-9-]+)\/?$/);
    const w = href.match(/^\/work\/([a-z0-9-]+)\/?$/);
    if (a && !slugs.has(a[1]) && !href.startsWith("/insights/topic/")) E.push(`link to missing article ${href}`);
    if (w && !caseStudies.has(w[1])) E.push(`link to missing case study ${href}`);
  }
  if (!/\]\(\/insights\/[a-z0-9-]+\)/.test(body)) W.push("no link to another article");
  if (!/\]\(\/(work\/[a-z0-9-]+|consumer-psychology)\)/.test(body)) W.push("no link to a case study or /consumer-psychology");

  const text = `${JSON.stringify(fm)}\n${body}`;
  for (const re of banned) if (re.test(text)) E.push(`filler phrase: ${re}`);
  for (const re of soft) if (re.test(text)) W.push(`soft filler: ${re}`);
  // Sina presents as an applied psychologist and consumer psychology consultant, never as licensed or clinical.
  if (/\b(i am|i['’]m|as)\s+an?\s+(licensed|registered|clinical|certified|chartered)\s+psychologist\b/i.test(text))
    E.push("claims a licensed or clinical psychologist title");
  // Facts corrected on 12 Nov 2026: the thesis result, no programming claims, removed games.
  const guards = [
    [/\b4\.18\b|\b3\.41\b|\b0\.77\b/, "uses the old, wrong thesis means (no means are published)"],
    [/more expressive (when|if|once) (they|candidates|people|participants) (saw|see|could see|can see) themselves/i, "states the old thesis direction (the finding: more expressive with the AI avatar than with self-view)"],
    [/self-referential (visual )?feedback (made|makes|increased|raised)/i, "states the old thesis direction"],
    [/\bAPI routes?\b/i, "programming claim (API routes)"],
    [/\bbuilt (it |them )?(solo|alone)\b|\bsolo[- ](engineer|builder|developer|full[- ]stack)/i, "programming claim (built solo)"],
    [/\bfull[- ]stack\b/i, "programming claim (full-stack)"],
    [/\bI (wrote|write|coded|code|program(med)?) (the |its |my )?(code|backend|app|routes|scripts?)\b/i, "programming claim (writing code)"],
    [/\bcoded backends?\b/i, "programming claim (coded backend)"],
    [/thermite/i, "mentions Thermite Dominoes, which was removed"],
    [/\bthriller\b/i, 'mentions a "thriller"'],
  ];
  for (const [re, msg] of guards) if (re.test(text)) E.push(msg);
  if (/Sina[^.!?]{0,140}\b(he|him|his|she|her|hers)\b/i.test(text)) E.push("third-person pronoun about Sina (use first person or the name)");
  const pct = [...body.matchAll(/\b\d+(\.\d+)?\s?%/g)].map((m) => m[0]);
  if (pct.length) W.push(`percentages to verify: ${[...new Set(pct)].join(", ")}`);

  errors += E.length;
  warnings += W.length;
  if (E.length || W.length) report.push({ slug, words, E, W });
}

for (const r of report) {
  console.log(`\n${r.slug} (${r.words} words)`);
  r.E.forEach((e) => console.log(`  ERROR  ${e}`));
  r.W.forEach((w) => console.log(`  warn   ${w}`));
}
console.log(`\n${files.length} articles · ${errors} errors · ${warnings} warnings`);
process.exit(errors ? 1 : 0);
