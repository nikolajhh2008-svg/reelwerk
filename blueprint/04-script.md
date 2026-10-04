# 4 · Build the video – from scratch

Every video is **its own piece of code**, written for this one idea: `work/videos/<id>/Video.tsx`. No component library, no recycled scenes, no screens copied from the product. What the brand gives you is all you start with: colours, fonts, the character poses and the logo in `brand/theme.json`. Nothing is taken from the project's code, UI, recordings or screenshots. Everything else – layout, typography, objects, motion, transitions, sound – you design and build.

Skills: `viral-short-form`, `short-form-video` (retention structure), the motion-design skills listed in `CLAUDE.md`, `remotion-best-practices` and `remotion-markup` (Remotion APIs). Craft values: [`docs/craft.md`](../docs/craft.md).

## 4.1 Before any code: the visual idea

A video is boring when the picture only repeats the text. So first, in `work/videos/<id>/storyboard.md`:

1. **The one visual idea.** What does the viewer *see* that makes the point without words? A metaphor, an object, a transformation: a 40,000-character tower that collapses, a vague sentence that sharpens word by word into a question, a clock that eats the days. Write three candidates, pick the strongest, say why.
2. **Beats.** 5–8 beats, each 1.5–4 s: time · what is on screen · what moves and how · transition into the next beat · sound. Every beat has a visible event every 0.5–1.5 s.
3. **The character's role.** What does the character *do* in each beat – react, point, carry, push, get surprised? Pick poses by their purpose in `brand/assets.md`. A character that only stands next to text is wasted.
4. **Transitions as part of the idea.** Prefer transitions that carry meaning: an element survives the cut and becomes the next scene, a match cut on shape or position, a camera move through the scene. One accent transition per video at most.

## 4.2 Code

```tsx
// work/videos/<id>/Video.tsx
import { AbsoluteFill, Sequence, spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import { brand, pose, asset } from "../../../studio/src/brand"
export const meta = { durationInFrames: 600, fps: 30, width: 1080, height: 1920 }
export default function Video() { /* … */ }
```

- Colours and fonts only from `brand` (`brand.brand.accent`, `brand.brand.fontDisplay` …). Character images via `pose("<key>")`, other files via `asset("brand/…" | "sfx/…" | "work/videos/<id>/…")`.
- Remotion rules: every motion is a function of `useCurrentFrame()`; no CSS transitions or animations; no `Math.random()` (use `random(seed)` from remotion); images with `<Img>`; sound with `<Audio>` from `@remotion/media` inside `<Sequence>`.
- You may split a video into several files in its folder. You may reuse ideas from earlier videos in `work/videos/` – but each video must have its own visual idea.
- Example of the shape (not of the quality bar): [`examples/hello/Video.tsx`](../examples/hello/Video.tsx).

## 4.3 Sound – designed with the picture

- Sound follows the motion: what moves gets the sound that fits its weight and speed. Fewer sounds than events; silence is part of the design.
- Allowed sources: `sfx/` (CC0, see `sfx/sfx-analysis.md`), sounds you synthesise yourself (e.g. with ffmpeg filters into `work/videos/<id>/audio/`), or no sound at all – music is usually added in the app when posting.
- **Avoid cheap UI-click sprinkles** and never boost isolated clicks to full level. If the human chose "no embedded sound" in `brand/strategy.md`, leave the audio empty.
- Mix it yourself: no clipping (true peak ≤ −1 dBTP), sound effects sit under where music will go. `render.mjs` measures, it does not fix.

## 4.4 Craft rules the code must follow

From [`docs/craft.md`](../docs/craft.md): a visible event every 0.5–1.5 s, never 2 s without motion · one real pause before the key line · title text ≥ 52 px, roughly a third from the top, ≤ 13 characters per second · safe zone x 80–900, y 270–1250 · pose changes as hops, never cross-fades · springs by role (character ~8 % overshoot, text and camera none) · never a text-only slideshow.

Then go to [05-render.md](05-render.md).
