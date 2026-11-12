import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Marked } from "marked";
import { publishedCaseStudies } from "./content";
import { gates } from "./gates";

/**
 * Insights: long-form articles by Sina Dehesh, one markdown file each in
 * content/articles/<slug>.md. A file opens with a JSON frontmatter block
 * between `---` lines, then the markdown body. Everything is read and
 * rendered at build time; an invalid article fails the build with its name.
 */

export const topics = [
  {
    slug: "consumer-psychology",
    label: "Consumer psychology",
    title: "Consumer psychology & conversion",
    intro:
      "Why people choose, hesitate or leave — and what to change on the page, in the offer or in the funnel. These articles turn research on judgment and decision-making into design decisions I use with clients and in my own products, starting with the Four Gates model.",
  },
  {
    slug: "fintech",
    label: "Behavioral fintech",
    title: "Behavioral fintech",
    intro:
      "Money is where behavioral economics stops being theory: loss aversion, present bias and the pain of paying shape every savings, payments and credit product. I write from designing Costly, a commitment app with real-money stakes, and from designing funnels where trust has to be earned fast.",
  },
  {
    slug: "insurance",
    label: "Insurance",
    title: "Insurance & behavioral design",
    intro:
      "Insurance asks people to pay now for protection against something they hope never happens — one of the hardest decisions for a human mind. These articles apply consumer psychology and automation design to quote funnels, renewals, claims and the rules now shaping AI in insurance. They are analysis, not legal advice.",
  },
  {
    slug: "automation",
    label: "Automation",
    title: "Automation & human-in-the-loop AI",
    intro:
      "Automations fail in two directions: they act when they shouldn't, or people stop checking them. I design workflows — like an n8n and Pipedrive engine where no ambiguous CRM write happens without a human — so machines handle the volume and people make the calls that matter.",
  },
  {
    slug: "ai-products",
    label: "AI products",
    title: "The psychology of AI products",
    intro:
      "How people trust, distrust, over-rely on and get steered by AI — and how to design for appropriate trust instead. Drawn from my controlled experiment on self-view, an AI avatar and text in automated interviews (N = 96), psychometric products like OopsCupid, and behavioral design work.",
  },
  {
    slug: "ai-education",
    label: "AI & education",
    title: "AI & education",
    intro:
      "AI can make students learn more or think less. These articles use learning science — retrieval practice, spacing, desirable difficulty — and my work on RecallMate and Passway to show how to build AI learning tools that teach, and where the EU AI Act draws the lines.",
  },
  {
    slug: "research",
    label: "Research methods",
    title: "Research methods for product decisions",
    intro:
      "The research behind good product decisions: interviews, thematic coding, jobs to be done, within-subjects experiments and the statistics that tell you whether a change worked. Practical methods from 200+ interviews and a controlled experiment with 96 participants.",
  },
  {
    slug: "games-creativity",
    label: "Games & creativity",
    title: "Games & the democratization of creativity",
    intro:
      "Making videos became something everyone does; I believe making games is next. These articles are about what happens when anyone can make a game: the tools, the psychology of making something yourself and, above all, the social side — remixing, credit, followers and playing each other’s games. I write from designing Pukytoon, a feed of games anyone can make, which is in development.",
  },
] as const;

export type TopicSlug = (typeof topics)[number]["slug"];
export type Topic = (typeof topics)[number];

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  /** H1 and <title>. */
  title: string;
  /** Meta description and the standfirst under the title. */
  description: string;
  topic: TopicSlug;
  keywords: string[];
  /** Answer-first key takeaways shown at the top. */
  takeaways: string[];
  faq: ArticleFaq[];
  /** Slugs of related articles. */
  related: string[];
  /** Slugs of case studies the article draws on. */
  caseStudies: string[];
  /** ISO date, yyyy-mm-dd. */
  date: string;
  updated?: string;
  /** Sort order within its topic (lower first). */
  order: number;
  featured?: boolean;
  html: string;
  toc: { id: string; text: string }[];
  words: number;
  minutes: number;
}

const DIR = join(process.cwd(), "content", "articles");
const topicSlugs = new Set<string>(topics.map((t) => t.slug));

export const articlePath = (slug: string) => `/insights/${slug}`;
export const topicPath = (slug: string) => `/insights/topic/${slug}`;
export const getTopic = (slug: string) => topics.find((t) => t.slug === slug);

const slugify = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/gi, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

/** The Four Gates model as a static figure, for `[[four-gates]]` in an article. */
function fourGatesFigure() {
  const items = gates
    .map(
      (g) =>
        `<li><span class="g-head"><span class="g-n">${g.n}</span> ${g.name}</span><span class="g-doubt">${g.doubt}</span><span class="g-barrier">Barrier: ${g.barrier}</span><span class="g-fix">Fix: ${g.fix}</span></li>`,
    )
    .join("");
  return `<figure class="gates-figure"><ol>${items}</ol><figcaption>The Four Gates model (Sina Dehesh): every decision passes four doubts. Name the barrier at each gate, then design its fix.</figcaption></figure>`;
}

const decode = (s: string) =>
  s
    .replace(/&#39;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function render(markdown: string) {
  const toc: { id: string; text: string }[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        let id = slugify(text) || "section";
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        if (depth === 2) toc.push({ id, text: decode(text.replace(/<[^>]+>/g, "")) });
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.startsWith("https://sinadehesh.com");
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
      table(token) {
        const cell = (c: (typeof token.header)[number], tag: "th" | "td") =>
          `<${tag}>${this.parser.parseInline(c.tokens)}</${tag}>`;
        const head = `<tr>${token.header.map((c) => cell(c, "th")).join("")}</tr>`;
        const body = token.rows.map((r) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("");
        return `<div class="table-wrap"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>\n`;
      },
    },
  });
  const html = (marked.parse(markdown) as string).replace(/<p>\s*\[\[four-gates\]\]\s*<\/p>/g, fourGatesFigure());
  return { html, toc };
}

const wordCount = (markdown: string) =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[\[[^\]]+\]\]/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

function fail(file: string, msg: string): never {
  throw new Error(`content/articles/${file}: ${msg}`);
}

function parse(file: string): Article {
  const raw = readFileSync(join(DIR, file), "utf8").replace(/\r\n/g, "\n");
  if (!raw.startsWith("---\n")) fail(file, "must start with a `---` frontmatter block");
  const end = raw.indexOf("\n---\n", 4);
  if (end < 0) fail(file, "frontmatter block is not closed with `---`");
  let fm: Record<string, unknown>;
  try {
    fm = JSON.parse(raw.slice(4, end));
  } catch (e) {
    fail(file, `frontmatter is not valid JSON (${(e as Error).message})`);
  }
  const body = raw.slice(end + 5).trim();
  const slug = file.replace(/\.md$/, "");
  const str = (k: string) => {
    const v = fm[k];
    if (typeof v !== "string" || !v.trim()) fail(file, `"${k}" must be a non-empty string`);
    return v.trim();
  };
  const strs = (k: string, min: number) => {
    const v = fm[k];
    if (!Array.isArray(v) || v.length < min || v.some((x) => typeof x !== "string" || !x.trim()))
      fail(file, `"${k}" must be an array of at least ${min} strings`);
    return (v as string[]).map((x) => x.trim());
  };
  const topic = str("topic");
  if (!topicSlugs.has(topic)) fail(file, `unknown topic "${topic}"`);
  const date = str("date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(file, `"date" must be yyyy-mm-dd`);
  const faqRaw = fm.faq;
  if (!Array.isArray(faqRaw) || faqRaw.length < 2) fail(file, `"faq" needs at least 2 items`);
  const faq = (faqRaw as { q?: unknown; a?: unknown }[]).map((f, i) => {
    if (typeof f?.q !== "string" || typeof f?.a !== "string") fail(file, `faq[${i}] needs "q" and "a" strings`);
    return { q: f.q.trim(), a: f.a.trim() };
  });
  const caseStudies = Array.isArray(fm.caseStudies) ? (fm.caseStudies as string[]) : [];
  for (const c of caseStudies) {
    if (!publishedCaseStudies.some((s) => s.slug === c)) fail(file, `unknown case study "${c}"`);
  }
  if (!body) fail(file, "has no body");
  const { html, toc } = render(body);
  const words = wordCount(body);
  return {
    slug,
    title: str("title"),
    description: str("description"),
    topic: topic as TopicSlug,
    keywords: strs("keywords", 3),
    takeaways: strs("takeaways", 3),
    faq,
    related: Array.isArray(fm.related) ? (fm.related as string[]) : [],
    caseStudies,
    date,
    updated: typeof fm.updated === "string" ? fm.updated : undefined,
    order: typeof fm.order === "number" ? fm.order : 100,
    featured: fm.featured === true,
    html,
    toc,
    words,
    minutes: Math.max(1, Math.round(words / 230)),
  };
}

let cache: Article[] | null = null;

/** Every article, in reading order: by topic (as listed above), then `order`. */
export function getArticles(): Article[] {
  if (cache) return cache;
  const files = readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  const list = files.map(parse);
  const slugs = new Set(list.map((a) => a.slug));
  // A missing related article fails the build; ARTICLES_DRAFT=1 skips the check for local previews.
  if (!process.env.ARTICLES_DRAFT) {
    for (const a of list) {
      for (const r of a.related) if (!slugs.has(r)) fail(`${a.slug}.md`, `related article "${r}" does not exist`);
    }
  }
  const rank = (t: string) => topics.findIndex((x) => x.slug === t);
  cache = list.sort((a, b) => rank(a.topic) - rank(b.topic) || a.order - b.order || a.title.localeCompare(b.title));
  return cache;
}

export const getArticle = (slug: string) => getArticles().find((a) => a.slug === slug);
export const articlesIn = (topic: string) => getArticles().filter((a) => a.topic === topic);

/** Related articles: the ones listed, then others from the same topic. */
export function relatedTo(a: Article, n = 3): Article[] {
  const all = getArticles();
  const listed = a.related.map((s) => all.find((x) => x.slug === s)).filter((x): x is Article => Boolean(x));
  const more = all.filter((x) => x.topic === a.topic && x.slug !== a.slug && !a.related.includes(x.slug));
  return [...listed, ...more].slice(0, n);
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
