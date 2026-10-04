# 4 · Build the video – from scratch

Every video is **its own piece of code**, written for this one idea: `work/videos/<id>/Video.tsx`. No component library, no recycled scenes, no screens copied from the product. What the brand gives you is all you start with: colours, fonts, the character poses and the logo in `brand/theme.json`. Everything else – layout, typography, objects, motion, transitions, music brief, sound effects – you design and build.

What separates the strong code-made videos from the forgettable ones is not the renderer and not a longer rulebook. It is four things: **an idea that escalates, a named medium or reference, real material, and a loop that looks at its own frames** ([research notes in CREDITS.md](../CREDITS.md#research-behind-the-blueprint)). This step is built around exactly those four.

Use the highest reasoning effort your agent offers for this step; ideas and hooks do not need it.

Skills, in the order you need them: `anidoodle-storytelling` (the visual idea) · `remotion-director` (two directions, blind pick, critic loop) · `motion-grammar` and `animation-guide` (transitions, holds, character timing) · `procedural-sfx` (sound effects and mix) · `remotion-best-practices`, `remotion-markup`, `remotion-multimedia` (Remotion APIs). Hook, caption and idea skills are **not** loaded here.

## 4.1 Premise, not topic

Write one sentence: **"the character wants X – obstacle Y – it escalates Z – payoff."** Then the transformation in two words with an arrow (`empty → overflowing`, `chaos → one line`). A topic ("why sources matter") is not a premise. A video without a premise does not get built – send it back to 02.

## 4.2 Two directions

Start the `direction-lister` agent (from `remotion-director`) in a fresh context with the premise, the spec and N = 2: it returns **two directions that differ at the idea level**. Use only its agents and protocols – do not scaffold remotion-director's own workspace; everything is built in `studio/`. Each direction names:

- **the visual idea** – what the viewer *sees* that makes the point without words (a counter climbing from 1 to 29 until the mailbox bursts; one element that morphs through the whole film; a tower of 40,000 characters that collapses),
- **a named medium** in two or three words (`paper cut-out`, `chalk on a blackboard`, `exercise-book doodle`, `WarioWare micro-game`, `split-flap board`) and, if `work/taste/` has one, a reference frame – borrow its grammar, never its content or characters,
- **the character's job** in each beat – react, carry, push, fail, win. A character standing next to text is wasted,
- **the sound family** that belongs to the medium (paper and wood for the exercise book, chalk and felt for the blackboard).

## 4.3 Storyboard and four frames before the full build

For each direction write `work/videos/<id>/<a|b>/storyboard.md`: 5–8 beats on a beat grid (time · what is on screen · what moves · how it hands over to the next beat · sound). Then build only **four stills**: hook, middle, peak, end – and put them on one sheet. The human picks a direction from the sheets – or, in an unattended run, the `blind-selector` agent does, given only the sheets. Only the winner is built in full.

## 4.4 The build brief – short on purpose

The builder gets only this, nothing else:

1. format and length in the first line (1080×1920, 30 fps, 15–35 s),
2. premise and the chosen direction,
3. brand colours **with their role** and the fonts (`brand/theme.json`), pose list (`brand/assets.md`),
4. **the ban list** `work/taste/banned.md` – named default looks this kit must not produce (start list below; add every new default you catch in review),
5. the technical contract (4.5).

Craft numbers (frame counts, px sizes, safe zones) are **not** part of the brief – they are checks in 06-review.md. Naming what to avoid works; "avoid an AI look" only swaps one default for another.

Start list for `work/taste/banned.md`:
- centred text over a gradient
- every element fades in
- the character standing at the bottom next to the text
- text top / character bottom in every scene
- an end card with only logo and URL
- small labels in the corners
- generic synth pads in the music

## 4.5 Technical contract

```tsx
// work/videos/<id>/Video.tsx
import { AbsoluteFill, Sequence, spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import { Audio } from "@remotion/media"
import { brand, pose, asset } from "../../../studio/src/brand"
import { T } from "./timing"          // every cue time lives here – picture and sound read the same numbers
export const meta = { durationInFrames: 600, fps: 30, width: 1080, height: 1920 }
export default function Video() { /* … */ <Audio src={asset("work/videos/<id>/audio/mix.wav")} /> }
```

- Colours and fonts only from `brand`. Character images via `pose("<key>")`, other files via `asset("brand/…" | "work/videos/<id>/…")`.
- Every motion is a function of `useCurrentFrame()`; no CSS transitions or animations; no `Math.random()` (use `random(seed)` from remotion); images with `<Img>`.
- You may split a video into several files in its folder.

## 4.6 Sound – music bed first, effects on top

Every strong example cuts its picture to a real music track. So the music comes **before** the final timing:

1. **Music brief** `work/videos/<id>/music.json`: `caption` (genre, instruments, mood – instrumental, no named artists, name what to avoid such as generic synth pads), `bpm` (the storyboard's grid, e.g. 120), `durationSec` (the video's length), `structure` (timestamps from the storyboard: `[0:00 - 0:02] one hard hit, then silence` · `[0:10 - 0:12] everything drops out`).
2. `node studio/music.mjs work/videos/<id> --variants 2` → `audio/music-1.wav`, `music-2.wav`. Default engine: **ACE-Step 1.5**, free and local (MIT; installed by `sh studio/setup-music.sh`) – tempo and length come out exactly as set, `structure` is ignored. Optional: `--engine lyria` (Google Lyria, paid API key) also follows `structure`.
3. `.venv/bin/python studio/beats.py work/videos/<id>/audio/music-1.wav` → measured beats, bars, onsets. Pick the variant whose measured grid and loudness curve fit the storyboard; write the cue times into `timing.ts` **from the measured beats** – scene changes on beats, big moments on bars, the drop before the punchline where the loudness curve dips.
4. **Sound effects** with `procedural-sfx`: few, one family, only on real events. `events.json` takes its times from the same `timing.ts` values. Whooshes start 4–6 frames before the cut; hits land on the frame or one frame later. Energy in 1–5 kHz (phone speakers have no bass), mono.
5. **Mix** with the skill's `mix.py events.json -o audio/sfx-mix.wav --music audio/music-N.wav` (ducking, masking report, limiter at −1 dBTP), then `master.sh … audio/mix.wav` to −14 LUFS. Fix every `CHECK` line.
6. Keep the skill's "not ear-tuned yet" table for the human (06-review.md).

If `brand/strategy.md` says "no embedded music", skip 1–3 and cut to a steady 120 BPM grid instead.

Then go to [05-render.md](05-render.md).
