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
| Motion | GSAP 3 (ScrollTrigger, SplitText) + Lenis smooth scroll, one layer in `components/Motion.tsx` |
| Data viz | D3 7 |
| Type | Archivo, variable width (display) · Inter (body) · JetBrains Mono (labels), bundled in `app/fonts` |
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
| `/` | `app/page.tsx` → `components/home/*` | Hero → tapes → Consulting → Experience → Principle → Apps & websites → Games → Books → About → FAQ → Contact |
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

Graphite **stage** sections and bone **paper** sections, with one signal
colour: ember (`#ff5b1f`; `ember-ink` on bone for AA text). Headings are
Archivo, heavy and slightly wide; labels are JetBrains Mono. Component classes
(`.stage`, `.paper`, `.display`, `.btn`, `.spotlight`, `.beam`, `.tape`, …)
live in the `components` layer of `app/globals.css`, so Tailwind utilities
always win.

Signature pieces:

- **Hero** — the colour portrait framed with focus brackets and floating
  discipline chips (tilts towards the pointer), over a live particle
  "decision field" (`components/home/DecisionField.tsx`) that swirls around
  the pointer like attention.
- **Tapes** — two crossing marquee bands of disciplines under the hero.
- **Experience** — a timeline whose line fills as you read.
- **Principle** — the manifesto lights up word by word on scroll.
- **Apps** — a sticky stacked deck of cards (desktop), each with the real
  screenshot.
- **Games** — a bento grid; **Contact** — an ember section with a magnetic
  orb; **Footer** — the name set across the full width.

`components/Motion.tsx` drives all of it from data attributes (`data-split`,
`data-scrub-words`, `data-beam`, `data-deck`, `data-magnetic`, `data-tilt`,
`data-cursor`, …). Under `prefers-reduced-motion` nothing moves and every
section renders in its final state.

## Images and videos

Project tiles and case-study pages use real screenshots of each product in
`public/images/work/<slug>.webp` (1600 × 1000), set via `image` in
`lib/content.ts`. The hero shows `public/images/portrait.jpg` (colour) and
About shows `public/images/hero-working.jpg` (black and white). No section
needs a video any more; an optional `public/videos/work-<slug>.mp4` still
replaces that project's screenshot (see
[`public/videos/README.md`](public/videos/README.md)).

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

**Builds come from GitHub.** The `sina-portfolio` Pages project is connected
to this repository through the **Cloudflare Workers and Pages** GitHub app, and
production builds from the branch set in Cloudflare (Settings → Builds → Branch
control; it has been `claude/sina-dehesh-portfolio-i5mzi1`, and `main` is the
intended one).

Two things silently stop deploys, so check them first when a push doesn't go
live:

- **App access.** The app must list this repository under GitHub → Settings →
  Applications → Cloudflare Workers and Pages → Repository access. Connecting
  another repository to Cloudflare can drop this one from the list; pushes are
  then ignored with no failed build anywhere.
- **Production branch.** Only pushes to the production branch update
  sinadehesh.com.

Cloudflare doesn't build commits it missed: after fixing either, push a new
commit or start a deployment from the Cloudflare dashboard.

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
