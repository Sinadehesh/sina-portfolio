# Video prompts

Ready-to-paste prompts for every video slot on the site. They work in any
text-to-video tool (Veo, Sora, Runway, Kling, Luma, Pika). Generate, export
with the settings below, save under the exact file name into `public/videos/`,
and rebuild. The site picks each file up automatically (see
[`public/videos/README.md`](../public/videos/README.md)).

## How to use these prompts

1. Paste the **scene prompt** for the slot.
2. Add the **style block** below to the end of it, every time. It keeps all
   clips looking like one film.
3. Put the **negative prompt** in the tool's negative-prompt field. If the tool
   has none, append it as "Avoid: …".
4. Set the aspect ratio and length from the slot's header.
5. Generate 3–4 takes and keep the calmest one. Slow and quiet beats
   spectacular here, because text sits on top of every clip.

### Style block (append to every prompt)

> Cinematic chiaroscuro in the manner of Caravaggio and Vermeer: one warm key
> light from a single side, deep charcoal-black shadows, warm ivory highlights,
> muted antique-gold accents, subtle oil-painting texture and fine film grain.
> Restrained palette — charcoal, ivory and muted gold, plus at most the one
> accent colour named in the scene. Photorealistic materials, shallow depth of
> field, slow and deliberate camera, 24 fps. Seamless loop: the final frame
> matches the first, and all motion is cyclical (breathing light, drifting
> dust, slow push-in and return) rather than a one-way action.

### Negative prompt (every slot)

> text, letters, numbers, captions, subtitles, logos, watermarks, brand names,
> readable phone or computer screens, user-interface elements, faces in sharp
> focus, people looking at the camera, cartoon, anime, neon, oversaturated
> colour, fast cuts, camera shake, lens flares, glitch effects, stock-footage
> look

### Export settings

| Aspect | Export size | Used for |
| --- | --- | --- |
| 16:9 | 1920 × 1080 | `hero.mp4`, `contact.mp4` |
| 9:16 | 1080 × 1920 | `hero-mobile.mp4` |
| 4:3 | 1440 × 1080 | `pillar-*.mp4` |
| 16:10 | 1920 × 1200 | `work-*.mp4` |

Muted, H.264, at most about 4 MB. With [ffmpeg](https://ffmpeg.org):

```bash
# Compress, strip audio, web-optimise (raise -crf if the file is over 4 MB)
ffmpeg -i take.mp4 -an -vf "scale=1920:-2,fps=24" -c:v libx264 -preset slow \
  -crf 26 -pix_fmt yuv420p -movflags +faststart hero.mp4

# Poster still shown while the video loads (same name, .jpg)
ffmpeg -ss 1 -i hero.mp4 -frames:v 1 -q:v 3 hero.jpg
```

**If a take doesn't loop cleanly**, crossfade its end into its start. For a
clip `L` seconds long, set `offset` to `L − 2` (for example 8 for a 10 s clip):

```bash
ffmpeg -i take.mp4 -an -filter_complex \
 "[0]split[a][b];[a]trim=start=1,setpts=PTS-STARTPTS[main];\
  [b]trim=end=1,setpts=PTS-STARTPTS[head];\
  [main][head]xfade=transition=fade:duration=1:offset=8,format=yuv420p" \
 -c:v libx264 -crf 26 -movflags +faststart looped.mp4
```

---

## Homepage

### `hero.mp4` — 16:9 · 8–12 s

**Framing:** the headline covers the **left 45%** of the frame. Keep that area
almost black and still, with all of the subject and light on the right.

> A dark Dutch Golden Age still-life interior, seen at table height. On the
> right side of the frame, a heavy oak table holds two nearly identical
> objects — two small glass jars of honey — one catching slightly more light
> than the other. A single shaft of warm window light enters from the upper
> right and slowly breathes brighter and dimmer, so attention drifts from one
> jar to the other and back: the moment before a choice. Fine dust motes float
> through the beam. The camera pushes in by a few percent and eases back. The
> left 45% of the frame is deep shadow with only faint canvas texture.

### `hero-mobile.mp4` — 9:16 · 8–12 s

**Framing:** on phones, text fills the **lower two-thirds**. Put the subject in
the top third and keep everything below it dark.

> The same scene as the hero: two nearly identical honey jars on an oak table,
> one catching more light, a warm shaft of window light breathing between
> them, dust drifting in the beam. Vertical composition: the jars and light
> sit in the top third of the frame, and the lower two-thirds falls away into
> deep, almost black shadow.

### `pillar-consumer-psychology.mp4` — 4:3 · 5–6 s

**Framing:** a large "01" sits in the **top-left corner**, so keep that corner
calm.

> Close-up of a hand hovering between two nearly identical amber perfume
> bottles on a dark wooden shop shelf. The fingers pause, drift slightly
> towards one bottle, then back; the bottles are never touched. Warm side light
> favours one bottle a little more each moment, then evens out again. Accent
> colour: amber.

### `pillar-research.mp4` — 4:3 · 5–6 s

**Framing:** keep the top-left corner calm.

> A wooden desk at night under the warm cone of a brass desk lamp: an open
> notebook of handwritten notes (blurred and illegible), a fountain pen, a
> brass stopwatch and a fan of index cards. The notebook pages lift slightly in
> a draught and settle. The camera orbits a few degrees around the desk and
> returns. Accent colour: steel blue in the deepest shadows.

### `pillar-build.mp4` — 4:3 · 5–6 s

**Framing:** keep the top-left corner calm.

> Abstract macro: fine threads of warm gold light trace a network of small
> nodes across a black lacquered surface, like gold-leaf circuitry. Soft
> pulses of light travel along the lines from node to node and loop back to
> where they began. Shallow depth of field and a slow lateral drift. Accent
> colour: muted green-gold.

### `contact.mp4` — 16:9 · 8–12 s

**Framing:** the headline covers the **left two-thirds**. Keep it dark.

> A dark, quiet room with a tall door ajar on the far right. Warm late-
> afternoon light spills through the gap in a long golden wedge across worn
> wooden floorboards, with dust drifting in it. The camera inches towards the
> light and eases back. The left two-thirds of the frame stays in deep shadow.

---

## Work tiles and case-study headers (`work-<slug>.mp4`)

Each clip plays behind a project's homepage tile and at the top of its case
study page. All are **16:10, 6–8 s**.

**Framing for all:** a large number and caption sit in the **lower third**,
and a small label sits in the **top-left corner**. Keep both areas dark. Put
the subject in the upper-middle or right of the frame.

### `work-optimolds.mp4` — Optimolds (composite engineering)

> Macro of a glossy black carbon-fibre mould on a workshop bench next to a
> precision-machined aluminium jig. A single warm raking light slides slowly
> across the woven carbon, revealing the twill pattern like silk, then slides
> back. A few metal shavings glint. Accent colour: deep verdigris teal in the
> shadows.

### `work-app-lockers.mp4` — FloraLock, ShroomLock & CloudLock

> A quiet still life on dark slate: a young fern frond, a small wild mushroom
> on a tuft of moss, and a polished glass sphere that reflects a slowly
> drifting cloudy sky. A smartphone lies face-down beside them, with no screen
> visible. Soft green-tinted window light breathes across the arrangement.
> Accent colour: botanical green.

### `work-costly.mp4` — Costly

> An antique brass hourglass on a dark table, where the falling "sand" is a
> fine stream of tiny gold coins and gold dust. Beside it, in shadow, stands a
> pair of worn leather walking shoes. The key light drifts slowly from the
> hourglass to the shoes and back — time spent, money lost, walked back.
> Accent colour: antique gold.

### `work-oopscupid.mp4` — OopsCupid

> Two porcelain teacups facing each other on a dark wooden table. Thin threads
> of steam rise from both, curl towards each other and intertwine, then drift
> apart and meet again. Soft, flickering candlelight from the side. Accent
> colour: dusty rose.

### `work-debubble.mp4` — DeBubble

> A single large soap bubble floats in a dark room. Its iridescent skin
> reflects a window and a wide city street beyond it. The bubble slowly swells
> and the reflected world inside it widens, then gently settles back. Accent
> colour: cobalt blue.

### `work-interview-simulation-study.mp4` — Automated interview study

> A vintage oval mirror stands on a desk in a dark room. In it, a softly
> out-of-focus silhouette of a seated person (no recognisable face) is lit by
> the cold glow of a small camera light beside the mirror. The camera pushes
> slowly towards the reflection and eases back: being seen changes how we
> show ourselves. Accent colour: cool steel blue.

### `work-workflow-automation-engine.mp4` — Workflow Automation Engine

> A precise antique brass mechanism on dark green velvet: small brass tokens
> roll one by one along a grooved track into a tiny balance scale. Each token
> is weighed; most roll on through a gate, and an occasional one is held aside
> in a small tray. Steady, rhythmic, calm. Accent colour: muted green-gold.

### `work-daily-sublime.mp4` — The Daily Sublime

> An extremely slow push across the surface of an old oil painting in a dark
> gallery: cracked varnish, visible brushwork, a figure in low light. A single
> museum spotlight warms the canvas and breathes slightly. Accent colour: warm
> terracotta.

### `work-recallmate.mp4` — RecallMate

> White index cards lie in neat rows on a dark desk. A gentle draught turns
> them over one at a time in a slow, cascading wave, then they settle. Desk
> lamp light from the left. All cards are blank. Accent colour: soft violet.

### `work-daily-hustle.mp4` — Daily Hustle

> Early sunrise light creeps across a wooden desk: a blank paper desk calendar
> with pages lifting slightly, a steaming mug of coffee and a pencil. The warm
> light moves across the desk and recedes. Accent colour: warm amber.

### `work-passway.mp4` — Passway

> A large blank drafting grid on an old architect's table. A narrow beam of
> light slowly scans across the grid, and some squares glow faintly brighter
> than others, like a map of what is covered and what is missing. The beam
> returns to its start. Accent colour: steel blue.

### `work-dopamine-box.mp4` — Dopamine Box

> A handmade wooden box with three small reels of coloured glass beads behind
> a brass window. The reels spin and slow down, stopping one notch short of
> alignment again and again — the near-miss — with a soft glow pulsing each
> time. Accent colour: magenta.

### `work-musicity.mp4` — Musicity

> A vinyl record turns slowly under a tone arm in a dark room, with dust
> drifting through a single beam of light that grazes the grooves. Accent
> colour: deep violet.

### `work-virtue-ledger.mp4` — Virtue Ledger

> An open leather-bound ledger with a ruled grid (no legible writing) under
> candlelight. A brass wax-seal stamp presses gently into one cell, lifts, and
> leaves a small dark-gold mark, then hovers ready for the next. Accent
> colour: antique gold.

### `work-tao-app.mp4` — The Art of Observation (app)

> An old book lies open on a dark table. A magnifying glass drifts slowly
> across the page and concentrates the warm light into a bright, soft circle
> on the paper. The text is blurred and illegible. Accent colour: ivory.

### `work-merge-farmstead.mp4` — Merge Farmstead

> A handcrafted miniature diorama of a farm valley at dusk: a tiny red barn,
> patchwork fields and a small bell tower whose bell frame is empty. Warm
> lantern light glows from the barn. The camera orbits slowly around the
> diorama and returns. Storybook charm, still in chiaroscuro. Accent colour:
> warm honey-gold.

---

## Portrait

Use a **real photo** for `public/images/portrait.jpg` (4:5, about
1000 × 1250), not a generated one: a recruiter or client who later meets
someone who doesn't match the picture is a lost lead. For the site's look,
shoot near a single window with a dark background, or grade an existing
photo warm and low-key.
