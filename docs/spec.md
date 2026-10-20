# Build specification — acceptance checklist

The canonical list of what this portfolio must do. `spec-verifier` audits the
codebase against it; keep this file in sync when the brief changes.

## A. Aesthetic & hero sequence

1. Headline reads `Sina Dehesh | Engineering Behavior, Building Systems.`
2. Chiaroscuro palette — deep charcoal, oil-canvas ivory, muted gold accents —
   with high-contrast serif headings against ultra-clean sans-serif body text.
3. **Stage 1 (WebGL).** Page loads on a cinematic 3D monochromatic chessboard.
   A tactical knight move triggers the board to dissolve into a physics-based
   particle system.
4. **Stage 2 (GSAP morph).** On scroll, particles morph into the pages of a
   textured notebook. Faint typography reveals the drafted manuscript of an
   introspective literary fiction novel *and* notes on complexity theory.
5. **Stage 3 (Matrix).** The ink snaps into a high-speed cascading code matrix;
   the camera pulls back rapidly to reveal the portfolio interface.
6. Stack is Next.js, Tailwind CSS, GSAP (ScrollTrigger), Three.js (WebGPU with
   WebGL fallback), D3.js.

## B. Business strategy & consultancy

7. Musicity gets a dedicated premium glassmorphism card covering end-to-end
   consulting: user interviews, complex financial structuring, and comprehensive
   business modeling aimed at aggressive product-market fit.

## C. The App Laboratory — interactive cards, D3 + GSAP scroll triggers

8. **Workflow Automation Engine.** Animated node-flow of the custom n8n
   pipelines, showing CRM capture from calls and emails landing in Pipedrive,
   with the manual-review safeguards that protect data integrity.
9. **Costly (Android).** Real-time, high-contrast monetary burn-rate ticker;
   the UI must carry the behavioural truth that stakes are never completely
   zero, anchoring distraction time to a personal savings goal.
10. **OopsCupid.** Solo-built relationship assessment platform with an animated
    D3 psychometric radar simulating LLM-generated profiling against a live
    database.
11. **Passway.** Two-source data model, with an interactive D3 heatmap of the
    canonical curriculum matrix against observed university coverage.

## D. Media, research & content ventures

12. **YouTube.** The channel introduced seriously, the character featured
    seriously, and the exact string `subscribe, I'm serious!` displayed
    prominently.
13. **The Daily Sublime.** 30-issue digital art magazine with an animated HTML
    email wireframe showing the one-click reply buttons.
14. **Academic thesis.** Interactive plot of the repeated-measures ANOVA from
    the automated interview simulation (N = 96), highlighting *p* = .009 —
    greater candidate expressiveness under self-referential visual feedback.
15. **Literature.** *TAO: The Art of Observation* (non-fiction, upcoming)
    alongside the introspective literary fiction novel in progress.

## E. CV terminal

16. At the bottom of the page, a stylized boot-up terminal that rapidly prints
    the raw credentials on scroll:
    - MSc in Applied Experimental Psychological Sciences (University of
      Milano-Bicocca, 91/110)
    - Certifications: HubSpot Data Integrations, Google Data Analytics,
      Google UX Design, IBM Generative AI for Data Scientists
    - Core stack: SQL, Python, Git, Vercel, Microsoft Power BI, SAP Activate,
      Agile/PRINCE2

## Standing quality bars

- No console errors or unhandled rejections on load or through a full scroll.
- No horizontal page overflow at 390px or 1440px.
- `prefers-reduced-motion: reduce` resolves the page to its final state with no
  rAF loops running.
- Every chart exposes its numbers to assistive tech, not only to the animation.
- Any generated or simulated number is labelled as such on screen.
