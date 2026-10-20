# Video slots

Project tiles and case-study pages use **real screenshots** from the products
(`public/images/work/<slug>.webp`). Only three videos are needed:

| File | Where it appears | Aspect | Length |
| --- | --- | --- | --- |
| `hero.mp4` | Homepage hero, full screen. Keep the **left 45% dark and calm** — the headline sits there. | 16:9 | 8–12 s |
| `hero-mobile.mp4` | The same hero on phones. Keep the **lower two-thirds dark**. | 9:16 | 8–12 s |
| `contact.mp4` | Closing contact section. Keep the **left two-thirds dark**. | 16:9 | 8–12 s |

Drop a file here with the exact name, rebuild (`npm run build`), and it
replaces the placeholder automatically. Prompts: [`docs/video-prompts.md`](../../docs/video-prompts.md).

Optional: `<name>.jpg` next to a video is used as its poster still. A
`work-<slug>.mp4` file, if you ever add one, takes priority over that
project's screenshot.

Every clip: MP4 (H.264), muted, seamless loop, no text burned in, ≤ 4 MB.
