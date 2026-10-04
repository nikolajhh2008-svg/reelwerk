# 5 · Render

```bash
cd studio
node render.mjs ../work/videos/<id>/props.json
```

This renders the video with Remotion, sets the embedded sound to a **−3 dBTP** peak (the SFX file is not normalised to a loudness target – music is added later in the app), writes a contact sheet (one frame every 0.5 s) and measures dead time. Output next to the script: `<id>.mp4`, `contact.jpg`, `check.json`.

Single frames while working: `npx remotion still Video out/x.png --props=../work/videos/<id>/props.json --frame=45`.

Skills for anything Remotion-specific: `remotion-best-practices`, `remotion-render`, `remotion-markup`, `remotion-multimedia` (installed by `setup.sh`). Never open Remotion Studio in an unattended run.

## Carousels

Render each slide as a still at 1080×1350 (Instagram) and 1080×1920 (TikTok photo mode): set the composition size in the script and render with `npx remotion still … --image-format=jpeg --jpeg-quality=90`, one frame per slide at the moment every element has arrived. Instagram crops a carousel to the first slide's ratio; TikTok photo mode accepts JPEG/WebP only.

## Using the project's own UI

If 00-analyze.md chose option A (real components), add a path alias to the project in `studio/remotion.config.ts` (Webpack `resolve.alias`) and stub what the components need from their framework (router, image, server actions). Fill them with example data only. Option B: record the running app with Playwright at phone size and use `VideoClip` with a camera move (`KenBurns`, `Spotlight`, `Callout`, `BoundingBox`, `Cursor`). Never show real user data.

Then go to [06-review.md](06-review.md).
