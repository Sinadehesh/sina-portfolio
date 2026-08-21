# Sina Dehesh — Portfolio

**Engineering Behavior, Building Systems.**

A cinematic single-page portfolio: a scroll-driven WebGL opening sequence, a
glassmorphism consulting case study, four instrumented project cards, a media
and research section, and a boot-up terminal that prints the CV.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) |
| Motion | GSAP 3 + ScrollTrigger |
| 3D | three.js r185 — `WebGPURenderer` with automatic WebGL2 fallback, materials written in TSL |
| Data viz | D3 7 |
| Type | Cormorant Garamond (display) · Inter (body) · JetBrains Mono (code) |

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run typecheck
```

## The page, section by section

| Section | Component | Notes |
| --- | --- | --- |
| Hero | `components/sections/HeroSection.tsx` → `components/hero/MindToMatrix.tsx` | 420vh scrubbed sequence: chessboard → particle dissolve → manuscript → code matrix → camera pull-back |
| Identity | `components/sections/IdentitySection.tsx` | Portrait plate, role, manifesto |
| Musicity | `components/sections/MusicitySection.tsx` | Premium glass card, three engagement phases |
| App Laboratory | `components/sections/LabSection.tsx` | Workflow graph, Costly burn ticker, OopsCupid radar, Passway heatmap |
| Media & research | `components/sections/MediaSection.tsx` | Channel card, animated email wireframe, ANOVA plot, literature |
| CV terminal | `components/sections/CvTerminal.tsx` | Scroll-triggered boot print-out |

All copy lives in **`lib/data.ts`** — edit there, not in the components.

## The hero sequence

`components/hero/` is split three ways:

- `sequence.ts` — board layout, piece profiles, particle target buffers, and the
  opacity/size envelopes that drive every stage transition.
- `textures.ts` — canvas-generated textures: the particle sprite, the glyph
  atlas for the matrix stage, and the manuscript page (prose on the recto,
  complexity-theory notes on the verso, drawn from `manuscriptFragments`).
- `MindToMatrix.tsx` — the renderer, the TSL node materials, the knight-move
  timeline, and the ScrollTrigger wiring.

One particle system carries all four stages: per-particle board / notebook /
matrix targets live in static instanced attributes and are blended inside
`positionNode`, so nothing is rebuilt per frame.

**Degradation.** No WebGPU → three's WebGL2 backend. No working WebGL context →
the component renders nothing and the CSS poster (`.hero-poster`) holds the
frame. `prefers-reduced-motion: reduce` → one static composed frame, no rAF
loop, and every scroll animation on the page resolves to its final state.

## Swapping in the real portrait

`public/images/portrait.jpg` currently ships a **designed placeholder plate**,
not a photograph. To use a real photo:

```bash
node scripts/generate-portrait-placeholder.mjs --from path/to/photo.jpg
```

That resizes the photo to 1100×1467, writes `public/images/portrait.jpg`, and
regenerates the inline blur placeholder in `lib/portrait.ts`. Run it with no
arguments to rebuild the placeholder plate instead.

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
table of its underlying numbers. The CV terminal duplicates its credentials in
an `sr-only` block so nothing depends on the typing animation. Interactive
chart elements are keyboard reachable, and the whole page respects
`prefers-reduced-motion`.

## Deploying to Cloudflare

Every route is prerendered, so `npm run build` emits a plain static site to
`out/` (`output: "export"` in `next.config.ts`) — no server, no cold starts.

**Connect the repo once (recommended).** Cloudflare dashboard → Workers & Pages
→ Create → Pages → Connect to Git → pick this repository and the `main` branch,
then:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | 20 or newer |

After that, every push to `main` rebuilds and redeploys automatically.

**Or deploy from your machine**, using the committed `wrangler.jsonc`:

```bash
npx wrangler login   # one-time, opens a browser
npm run deploy       # builds, then wrangler deploy
```

Because `next/image` optimisation needs a server, it is turned off
(`images.unoptimized`). The portrait is already sized at 1100×1467 by
`scripts/generate-portrait-placeholder.mjs` and carries an inline LQIP, so
there is nothing left to optimise at request time.

## Verifying against the brief

`docs/spec.md` holds the acceptance checklist. `.claude/agents/spec-verifier.md`
defines a read-only, fresh-context auditor that walks the codebase against it
and reports `MET / PARTIAL / NOT MET` per requirement; `/verify-spec` runs it.
Re-run it after any substantial change to the hero sequence, the charts, or the
section content.
