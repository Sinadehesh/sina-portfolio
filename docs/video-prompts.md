# Video prompts

Only three videos are needed; project tiles use real screenshots. All three
share one abstract motif — ivory and gold ink unfolding in dark water — so
there are no objects for the generator to redraw differently from clip to
clip. Each prompt is complete: paste it as-is.

## `hero.mp4`

```
16:9 widescreen, 10-second seamless looping video, 24 fps. Extreme slow-motion macro of ivory-white and antique-gold ink unfolding in still, deep black water. Soft plumes curl, branch and slowly bloom outward like smoke, lit by a single warm light from the right, with fine suspended particles drifting through the light. All the movement and light sit in the right half of the frame; the left 45% stays almost pure black and completely calm. Chiaroscuro look: charcoal-black ground, warm ivory highlights, muted antique gold, fine film grain, shallow depth of field, locked-off camera with only a very slow drift. The motion is continuous and cyclical so the last frame flows into the first. No text, letters, numbers, logos or watermarks. No objects, no people, no glass, no containers visible, no colour other than ivory, gold and black, no neon, no fast motion, no camera shake, no lens flares.
```

## `hero-mobile.mp4`

```
9:16 vertical, 10-second seamless looping video, 24 fps. Extreme slow-motion macro of ivory-white and antique-gold ink unfolding in still, deep black water, soft plumes curling and blooming like smoke, lit by a single warm light from above, fine particles drifting through it. All the movement sits in the top third of the frame; the lower two-thirds stay almost pure black and calm. Chiaroscuro look: charcoal-black ground, warm ivory highlights, muted antique gold, fine film grain, locked-off camera. The motion is continuous and cyclical so the last frame flows into the first. No text, letters, numbers, logos or watermarks. No objects, no people, no glass, no containers visible, no colour other than ivory, gold and black, no neon, no fast motion, no camera shake, no lens flares.
```

## `contact.mp4`

```
16:9 widescreen, 10-second seamless looping video, 24 fps. Extreme slow-motion macro of a single thin ribbon of antique-gold ink drifting and slowly curling in still, deep black water, gently thinning into a soft haze, lit by a warm light from the right. The ink sits in the right third of the frame; the left two-thirds stay almost pure black and calm. Chiaroscuro look: charcoal-black ground, warm ivory and muted gold highlights, fine film grain, locked-off camera. The motion is continuous and cyclical so the last frame flows into the first. No text, letters, numbers, logos or watermarks. No objects, no people, no glass, no containers visible, no colour other than ivory, gold and black, no neon, no fast motion, no camera shake, no lens flares.
```

## Export

Muted MP4 (H.264), 1920 × 1080 for 16:9 and 1080 × 1920 for 9:16, at most
about 4 MB. With [ffmpeg](https://ffmpeg.org):

```bash
ffmpeg -i take.mp4 -an -vf "scale=1920:-2,fps=24" -c:v libx264 -preset slow \
  -crf 26 -pix_fmt yuv420p -movflags +faststart hero.mp4
```
