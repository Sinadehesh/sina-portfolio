# Sina Dehesh — Portfolio

**Consumer psychology, engineered into products people choose.**

Portfolio of a consumer psychology consultant and behavioral product builder.
The homepage says who, what and why-believe-it on the first screen, then shows
the work; every project has its own answer-first case-study page with an
interactive chart where one exists. Built to be read by people, search engines
and AI assistants alike.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), static export |
| Styling | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) |
| Motion | GSAP 3 + ScrollTrigger (section reveals, chart animation) |
| Data viz | D3 7 |
| Type | Cormorant Garamond (display) · Inter (body) · JetBrains Mono (labels) |
| Structured data | `schema-dts` typed JSON-LD |

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run typecheck
```

## Pages

| Route | Source | Notes |
| --- | --- | --- |
| `/` | `app/page.tsx` → `components/home/*` | Hero → What I do → Selected work → Psychology behind the work → Research & writing → About → FAQ → Contact |
| `/work` | `app/work/page.tsx` | All case studies |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Answer-first summary, impact, interactive chart (`components/work/CaseViz.tsx`), comparison, trade-offs, decision log |
| `/consumer-psychology` | `app/consumer-psychology/page.tsx` | Service page: services, principles, process, proof, FAQ |
| `/llms.txt`, `/llms-full.txt` | `app/llms*.txt/route.ts` → `lib/llms.ts` | [llmstxt.org](https://llmstxt.org) dossiers for AI assistants |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | AI crawlers explicitly allowed |

## Where the content lives

- **`lib/content.ts`** — positioning, case studies, services, principles,
  experience and credentials. Every page, JSON-LD node and llms.txt reads it.
- **`lib/faq.ts`** — FAQ copy (general questions on `/`, `consumer-psychology`
  questions on `/consumer-psychology`).
- **`lib/data.ts`** — numbers the interactive charts read directly.
- **`lib/schema.ts`** — JSON-LD builders (`Person`, `SoftwareApplication`,
  `FAQPage`, …), injected by `components/seo/JsonLd.tsx`.

Set `published: false` on a case study to hide it everywhere.

## Design

Two grounds alternate: charcoal **stage** sections for cinematic media and
ivory **paper** sections for anything people need to read. Muted gold is the
only accent. Component classes (`.stage`, `.paper`, `.display`, `.eyebrow`,
`.btn`, `.media-frame`, …) live in the `components` layer of
`app/globals.css`, so Tailwind utilities always win.

## Videos

Every hero, service panel, project tile and case-study header is a video slot
(`components/ui/MediaSlot.tsx`). Drop a file at the documented path in
`public/videos/` and rebuild — it replaces the designed light-canvas
placeholder automatically. File names, aspect ratios and lengths are listed in
**[`public/videos/README.md`](public/videos/README.md)**. A real portrait at
`public/images/portrait.jpg` appears in the About section the same way.

## Simulated data

Two charts render numbers that are generated, not measured, and both say so on
screen:

- **Passway heatmap** — observed-coverage values come from a seeded generator in
  `components/viz/CurriculumHeatmap.tsx`; identical on every load.
- **ANOVA plot** — the per-participant point cloud is simulated from the
  reported means and SDs. The means, CIs, N = 96 and *p* = .009 are the real
  reported values.

The OopsCupid radar labels its own readout as a demo of the platform's output
surface rather than a live model call.

## Accessibility

Every chart carries `role="img"`, a descriptive label, and a visually-hidden
table of its underlying numbers. Interactive
chart elements are keyboard reachable, and the whole page respects
`prefers-reduced-motion`.

## Deploying to Cloudflare

Every route is prerendered, so `npm run build` emits a plain static site to
`out/` (`output: "export"` in `next.config.ts`) — no server, no cold starts.

**Connect the repo once (recommended).** Cloudflare dashboard → Workers & Pages
→ Create → Pages → Connect to Git → pick this repository and the `main` branch.

The build output directory is set in `wrangler.jsonc`
(`"pages_build_output_dir": "./out"`), which takes precedence over the
dashboard field — Cloudflare's default of `dist` is wrong for a Next.js export
and will fail with `Output directory "dist" not found`. If the dashboard still
insists, set **Build output directory** to `out` there as well.

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | 20 or newer |

After that, every push to `main` rebuilds and redeploys automatically.

**Or deploy from your machine:**

```bash
npx wrangler login   # one-time, opens a browser
npm run deploy       # builds, then wrangler pages deploy out
```

Note that `wrangler.jsonc` here is a **Pages** configuration. A Workers-style
`assets` block is a different schema and Pages rejects it.

Because `next/image` optimisation needs a server, it is turned off
(`images.unoptimized`); size images and videos before adding them.

## Verifying against the brief

`docs/spec.md` holds the acceptance checklist. `.claude/agents/spec-verifier.md`
defines a read-only, fresh-context auditor that walks the codebase against it
and reports `MET / PARTIAL / NOT MET` per requirement; `/verify-spec` runs it.
Re-run it after any substantial change to the page structure, the charts, or
the content.
