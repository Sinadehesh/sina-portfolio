# Video slots

No section needs a video: the hero is a live particle field around the
portrait, and Contact is a solid ember section. Project tiles and case-study
pages use **real screenshots** from the products
(`public/images/work/<slug>.webp`).

Optional: a `work-<slug>.mp4` file here (with an optional `work-<slug>.jpg`
poster and a lighter `work-<slug>-mobile.mp4` for phones) replaces that
project's screenshot on its tiles — the games bento, the `/play` arcade and the
"More games to play" cards — and plays behind its case-study header, unless
the project has gameplay clips (`demo`), which then get their own section
instead. A game tile with a preview opens the game itself. Drop it in with the
exact name and rebuild (`npm run build`).

Gameplay clips for a case page's "See it in action" section are listed in the
project's `demo` entry in `lib/content.ts` (vertical 9:16, with a `.jpg`
poster each).

Every clip: MP4 (H.264), no audio track (strip it with `-an`), seamless loop,
≤ 4 MB. A VP9 `.webm` copy next to an MP4 is used only where the browser can't
play H.264 (some Chromium builds). Videos never play sound, download only when they come near the screen,
pause off screen and stay on their poster under reduced motion
(`components/ui/AutoVideo.tsx`).

Current files:

- Homepage previews, 8 seconds each, 1600 × 1000 (+ `-mobile` at 960 × 600,
  a `.jpg` poster and `.webm` copies): `work-gem-jar` (two phones, Cosmic
  Gems and the gem sets), `work-zombie-bomber` (gameplay in a phone, next to
  the zombie) and `work-debubble` (the ad playing in the middle card).
- Case-study clips, 540 × 960, full length with end cards cut (+ `.jpg` and
  `.webm`): `gem-jar-cosmic`, `gem-jar-sets`, `zombie-bomber-gameplay` and
  `debubble-tour`.
