# Build specification — acceptance checklist

The canonical list of what this portfolio must do. `spec-verifier` audits the
codebase against it; keep this file in sync when the brief changes.

## A. Positioning & first screen

1. The first screen (no scrolling) states who (Sina Dehesh), what (consumer
   psychology consultant & behavioral product builder, Milan), a one-sentence
   value proposition, two calls to action, and a proof strip
   (N = 96 / p = .009 experiment, 240+ interviews and usability tests, 20+
   apps, games & websites, M.Sc.).
2. No decorative intro sequence delays that message.
3. Sina is presented as a behavioral scientist and consumer psychology
   consultant who designs and tests products with real people — never as a
   psychologist (a protected title in Italy), a licensed or clinical
   psychologist, or a UX/UI designer, and with no programming or engineering
   claims.

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
   Rehabilitation Center) → principle (a humble line: "I don't assume I know
   why people choose. I watch, I ask, I test — and let them change my mind.")
   → (04) Games, above the apps: first the bento, where Gem Jar (the lead
   tile) and Zombie Bomber play silent 8-second previews, then The Loop,
   Merge Farmstead and the arcade tile; then a scroll story of Pukytoon over
   real screens of the app — swipe, make in the Creator Studio, set the
   rules, paste a Claude/Gemini/Kimi link, share — then "Why it matters": the
   democratization of creativity and game-making and its social side, in
   eight points with links to the Games & creativity articles, ending with an
   invitation to email to hear more or to fund it → (05) Apps & websites (a
   stacked deck of cards; DeBubble's card plays its silent preview) → (06)
   Books → (07) About & education → (08) Insights → (09) FAQ → Contact.
   Sections carry two-digit indices on an index rule.
8b. Every finished game plays on the site: `/play` lists them and
    `/play/<slug>` embeds the game's live web build (a phone frame for phone
    games, a wide screen for The Loop), so the site always shows the newest
    version. Pukytoon is still in development: it is never playable or linked
    to a build from the site; its pages say it is in development and invite
    people to email to hear more or to fund it (`/play/pukytoon` redirects to
    its case study). Thermite Dominoes is not shown anywhere.
8a. Scroll stories keep every step's text in the page in reading order; the
    stage only illustrates it. Under reduced motion the stage shows its final
    state and every step is fully visible.
9. Titles and dates match the CV; no invented studio or tenure.
9a. The books are *TAO: The Art of Observation* (non-fiction) and *Man in the
    Moment* (novel), both finished and awaiting editorial work. TAO's
    description comes from the manuscript, with no quotes and no companion-app
    link; *Man in the Moment* gets no synopsis until its text is provided, and
    there is no thriller, which is not Sina's work.

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
12a. Optimolds' case page has an automation section (`#automation`, linked from
    its header): the request helper. Every form request is emailed to the team
    first; then Claude writes a brief, the open questions and a reply draft from
    the technical fields only, and a person sends the reply. It exists as an n8n
    workflow and as a Cloudflare Pages Function. It is built and tested with
    made-up requests and is not live: the page says so (also as a label next to
    the header link and over the section title), says which parts are not tested
    yet (a real Claude answer, a real email send) and says that Sina had Claude
    build it and that Claude wrote the workflow and the code. Never say the team uses it until Sina says
    it is live. Its pictures show only made-up test data, never a customer's
    data and never the site's thank-you page.
13. Costly's case page carries an Investment section (stage, honest status,
    12-week plan, use of funds, sourced market figures, the ask, deck CTA),
    and its tile shows a "Raising pre-seed" badge.
14. Recent apps are listed with accurate status: FloraLock / ShroomLock /
    CloudLock (linked to their live pages, and to Google Play once their
    listings are public), DeBubble, Merge Farmstead and Dopamine Box (a
    behavioral experiment on betting, mock tokens only). Virtue Ledger and the
    TAO companion app are not shown (their old pages redirect).
14b. Daily Sublime Automation (`/work/daily-sublime-automation`) is the case study of
    how The Daily Sublime was run: three n8n workflows with Claude (issue writer,
    link checker, creator outreach as Gmail drafts). Its facts come from the
    exported workflows, the content sheet and the sent mail. Its pictures never
    show a reader's or a creator's name, address or photo, and it gives no reader
    numbers. The Daily Sublime page links to it. The Workflow Automation Engine
    (n8n + Pipedrive) is a tested prototype: never say a team used it.
14a. Silent previews: Gem Jar, Zombie Bomber and DeBubble play muted 8-second
    loops in their tiles, and their case pages have a "See it in action"
    section with the full clips (no audio, end cards cut). See
    `public/videos/README.md`.

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
     Topics include Creativity & games (the democratization of media, from
     Gutenberg to blogging, news and entertainment, to game creators and
     Pukytoon) and Engagement & addiction (gambling's spread, engagement versus
     addiction, and how Sina's products are designed to be engaging, not
     addictive). Claims about a product's mechanics come from its code or its
     entry in `lib/content.ts`, never from assumption.

18b. Permanent documents: files in `public/docs/` are linked from Sina's CV and
     shared directly, so their URLs must keep working forever. Never delete,
     rename or move them. They are never linked from the site, never listed in
     the sitemap or the llms files, and are served with `X-Robots-Tag: noindex`
     (`public/_headers`). Current:
     - `/docs/anabin-bachelor-psychology-shiraz.pdf`: the anabin entry for Sina's
       Bachelor's in Psychology from Shiraz University (H+, equivalent to a
       German Bachelor).
     - `/docs/diploma-supplement-msc-milano-bicocca.pdf`: the English section
       (original pages 13–23) of the official Diploma Supplement of Sina's M.Sc.
       in Applied Experimental Psychological Sciences, University of
       Milano-Bicocca.

## Standing quality bars

- No console errors or unhandled rejections on load or through a full scroll.
- No horizontal page overflow at 390px or 1440px.
- `prefers-reduced-motion: reduce` resolves the page to its final state.
- Every chart exposes its numbers to assistive tech, not only to the animation.
- Any generated or simulated number is labelled as such on screen.
