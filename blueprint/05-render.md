# 5 · Render

```bash
node studio/render.mjs work/videos/<id>
```

This renders `work/videos/<id>/Video.tsx` (composition `v-<id>`), **measures** the sound (integrated loudness, true peak – it never changes your mix), writes a contact sheet (one frame every 0.5 s) and measures dead time. Output next to the script: `<id>.mp4`, `contact.jpg`, `check.json`. Every earlier render is kept in `renders/` (`<id>-v1.mp4`, `-v2` …) so the human can compare before and after.

Single frames while working: `cd studio && npx remotion still v-<id> out/x.png --frame=45`.

Skills for anything Remotion-specific: `remotion-best-practices`, `remotion-render`, `remotion-markup`, `remotion-multimedia` (installed by `setup.sh`). Never open Remotion Studio in an unattended run.

## Carousels

Render each slide as a still at 1080×1350 (Instagram) and 1080×1920 (TikTok photo mode): set the composition size in the script and render with `npx remotion still … --image-format=jpeg --jpeg-quality=90`, one frame per slide at the moment every element has arrived. Instagram crops a carousel to the first slide's ratio; TikTok photo mode accepts JPEG/WebP only.

Then go to [06-review.md](06-review.md).
