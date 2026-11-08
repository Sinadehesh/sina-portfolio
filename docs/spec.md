# Build specification — acceptance checklist

The canonical list of what this portfolio must do. `spec-verifier` audits the
codebase against it; keep this file in sync when the brief changes.

## A. Positioning & first screen

1. The first screen (no scrolling) states who (Sina Dehesh), what (consumer
   psychology consultant & behavioral product builder, Milan), a one-sentence
   value proposition, two calls to action, and a proof strip
   (N = 96 / p = .009 experiment, 200+ interviews, 20+ apps, games & websites,
   M.Sc.).
2. No decorative intro sequence delays that message.
3. The site never calls Sina a "psychologist" (a protected title in Italy);
   "consumer psychology consultant" is the term used.

## B. Readability & design

4. Graphite "stage" and bone "paper" sections alternate, with ember as the
   only accent colour; long reading content sits on paper or on graphite with
   ivory text.
5. Display headings use Archivo (variable width) at weight ≥ 600, with no
   italics; body text is at least 15px; no label text below 12px.
6. The fixed navigation never overlaps section content: transparent only
   over the hero's top margin, a solid ground once the page scrolls.
7. Project tiles and case-study pages show real screenshots of the products
   (`public/images/work/`). The hero shows the colour portrait first; the
   black-and-white desk photo appears in About. No section depends on video.

## C. Homepage structure

8. Hero → disciplines tape → (01) How I work, a scroll story over a live
   diagram (visitors → drop-offs → the doubt behind each → diagnosis →
   fixes → the shipped, measured product) → (02) Consulting (consumer
   psychology & growth: Optimolds as a guided scroll tour of the live site,
   then Musicity) → (03) Experience from the CV (Research Intern, University
   of Milano-Bicocca; Co-Founder, Guardbar; Volunteer Researcher, Salami
   Rehabilitation Center) → principle → (04) Apps & websites (a stacked deck
   of cards) → (05) Games (The Loop, Gem Jar, Zombie Bomber, Merge Farmstead,
   Thermite Dominoes) → (06) Books → (07) About & education → (08) FAQ →
   Contact. Sections carry two-digit indices on an index rule.
8a. Scroll stories keep every step's text in the page in reading order; the
    stage only illustrates it. Under reduced motion the stage shows its final
    state and every step is fully visible.
9. Titles and dates match the CV; no invented studio or tenure.
9a. The books are *TAO: The Art of Observation* (non-fiction) and *Man in the
    Moment* (novel), both finished and awaiting editorial work. No invented
    synopsis, and no thriller, which is not Sina's work.

## D. Case studies

10. Every published project has `/work/<slug>` with: an answer-first summary,
   an executive impact summary (problem, psychology used, stack, outcome), key
   numbers, trade-offs, a decision-log table
   (Challenge | Hypothesis | Method | Outcome) and features.
11. The interactive charts live on their case pages: workflow graph
    (Workflow Automation Engine), burn-rate ticker (Costly), psychometric radar
    (OopsCupid), curriculum heatmap (Passway), ANOVA plot (thesis), email
    wireframe (The Daily Sublime).
12. Optimolds is presented as a consumer-psychology-driven B2B website and
    lead-generation engagement; Musicity only as market-fit and go-to-market
    strategy consulting.
13. Costly's case page carries an Investment section (stage, honest status,
    12-week plan, use of funds, sourced market figures, the ask, deck CTA),
    and its tile shows a "Raising pre-seed" badge.
14. Recent apps are listed with accurate status: FloraLock / ShroomLock /
    CloudLock (closed testing, linked to their live pages), DeBubble, Virtue
    Ledger, Merge Farmstead, the TAO reader app and Dopamine Box (a mock-token
    loot-box simulator).

## E. Search & AI visibility

15. `/consumer-psychology` service page with `Service` and `FAQPage` JSON-LD.
16. Every page carries `Person` + `WebSite` JSON-LD; case pages add
    `SoftwareApplication`/`CreativeWork` and `BreadcrumbList`.
17. `/llms.txt`, `/llms-full.txt`, `/sitemap.xml` and `/robots.txt` (AI
    crawlers explicitly allowed) are generated from `lib/content.ts`.
18. Each page has one `<h1>`, a canonical URL and OpenGraph metadata.
18a. Insights: `/insights`, topic pages and one page per article in
     `content/articles/`, each written in the first person by Sina Dehesh with an
     answer-first opening, key takeaways, an FAQ, an author box and links to related
     articles and case studies; `BlogPosting` + `FAQPage` + `BreadcrumbList` JSON-LD;
     listed in the sitemap, `llms.txt`, `llms-full.txt` and the RSS feed. Articles
     cite only real work and verifiable research, and pass `npm run check:articles`.

## Standing quality bars

- No console errors or unhandled rejections on load or through a full scroll.
- No horizontal page overflow at 390px or 1440px.
- `prefers-reduced-motion: reduce` resolves the page to its final state.
- Every chart exposes its numbers to assistive tech, not only to the animation.
- Any generated or simulated number is labelled as such on screen.
