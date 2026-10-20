# Build specification — acceptance checklist

The canonical list of what this portfolio must do. `spec-verifier` audits the
codebase against it; keep this file in sync when the brief changes.

## A. Positioning & first screen

1. The first screen (no scrolling) states who (Sina Dehesh), what (consumer
   psychology consultant & behavioral product builder, Milan), a one-sentence
   value proposition, two calls to action, and a proof strip
   (N = 96 / p = .009 experiment, 200+ interviews, 6+ products, M.Sc.).
2. No decorative intro sequence delays that message.
3. The site never calls Sina a "psychologist" (a protected title in Italy);
   "consumer psychology consultant" is the term used.

## B. Readability & design

4. Charcoal "stage" and ivory "paper" sections alternate; reading-heavy content
   sits on paper.
5. Display headings use Cormorant Garamond at weight ≥ 500; body text is at
   least 15px; no label text below 12px.
6. The fixed navigation has a solid ground and never overlaps section content.
7. Every hero, service panel, project tile and case-study header is a video
   slot that falls back to a designed placeholder when no file exists
   (documented in `public/videos/README.md`).

## C. Homepage structure

8. Hero → What I do (3 services) → Selected work (tiles + "More work") → The
   psychology behind the work (8 principles, each linked to a project) →
   Research & writing (thesis, The Daily Sublime, channel with
   `subscribe, I'm serious!`, two books) → About & credentials → FAQ → Contact.

## D. Case studies

9. Every published project has `/work/<slug>` with: an answer-first summary,
   an executive impact summary (problem, psychology used, stack, outcome), key
   numbers, trade-offs, a decision-log table
   (Challenge | Hypothesis | Method | Outcome) and features.
10. The interactive charts live on their case pages: workflow graph
    (Workflow Automation Engine), burn-rate ticker (Costly), psychometric radar
    (OopsCupid), curriculum heatmap (Passway), ANOVA plot (thesis), email
    wireframe (The Daily Sublime).
11. Optimolds is presented as a consumer-psychology-driven B2B website and
    lead-generation engagement; Musicity only as market-fit and go-to-market
    strategy consulting.

## E. Search & AI visibility

12. `/consumer-psychology` service page with `Service` and `FAQPage` JSON-LD.
13. Every page carries `Person` + `WebSite` JSON-LD; case pages add
    `SoftwareApplication`/`CreativeWork` and `BreadcrumbList`.
14. `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` and `/robots.txt` (AI
    crawlers explicitly allowed) are generated from `lib/content.ts`.
15. Each page has one `<h1>`, a canonical URL and OpenGraph metadata.

## Standing quality bars

- No console errors or unhandled rejections on load or through a full scroll.
- No horizontal page overflow at 390px or 1440px.
- `prefers-reduced-motion: reduce` resolves the page to its final state.
- Every chart exposes its numbers to assistive tech, not only to the animation.
- Any generated or simulated number is labelled as such on screen.
