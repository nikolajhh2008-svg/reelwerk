# 4 · Build the video – from scratch

Every video is **its own piece of code**, written for this one idea: `work/videos/<id>/Video.tsx`. No component library, no recycled scenes, no screens copied from the product. What the brand gives you is all you start with: colours, fonts, the character poses and the logo in `brand/theme.json`. Everything else – layout, typography, objects, motion, transitions, music brief, sound effects – you design and build.

What separates the strong code-made videos from the forgettable ones is not the renderer and not a longer rulebook. It is four things: **an idea that escalates, a named medium or reference, real material, and a loop that looks at its own frames** ([research notes in CREDITS.md](../CREDITS.md#research-behind-the-blueprint)). This step is built around exactly those four.

Use the highest reasoning effort your agent offers for this step; ideas and hooks do not need it (medium is enough there).

Skills, in the order you need them: `anidoodle-storytelling` (the visual idea) · `storytelling-hooks` (six levers, three hook layers), `short-form-video` and `viral-short-form` (retention: open loop, pattern interrupts, no flat middle, payoff), `visual-formats` (format library) · `remotion-director` (two directions, blind pick, critic loop) · `motion-grammar` and `animation-guide` (transitions, holds, character timing) · `procedural-sfx` (sound effects and mix) · `remotion-best-practices`, `remotion-markup`, `remotion-multimedia` (Remotion APIs). Hook-writing, caption and idea skills are **not** loaded here.

## 4.0 A real scene, not a concept

Every video plays **somewhere a viewer recognises, with someone doing something**: a bedroom at 2 a.m., a classroom, a group chat, a kitchen table, a bus, a phone screen. The character acts in that scene. **Never an abstract void** where a word, a diagram or a metaphor is the whole world – a viewer who does not already know the concept sees nonsense (first full test run, human verdict: "Wie kann ein Wort der Hintergrund sein? … Das hat nichts mit irgendwas zu tun."). A visual trick (a morph, a zoom, a transformation) is allowed only *inside* such a scene, never instead of it.

**Every video is a story that starts somewhere.** Before anything else, write it as one plain sentence a 12-year-old understands: **who · where · wants what · what goes wrong · how it ends** – e.g. "The mascot sits in class, wants to secretly eat its sandwich, the wrapper rustles louder with every bite, the whole class turns round." If that sentence needs a concept explained, or the first seconds do not show *where we are and who it is about*, the idea is not a story yet – go back to 02. (Human verdict on an abstract test video: "Es ist keine Story dahinter … du musst die Grundregel machen, dass es irgendwo anfängt.")

**Text carries the story.** A faceless, voiceless short is told in on-screen text: a big **hook line** in the first second that states the situation or the joke's setup (e.g. "POV: …", "Ich, wenn …", "Niemand: … / Ich: …"), then **one short caption per beat** that says what is happening or what the character thinks, speech bubbles for the character, and the **punchline as text**. A viewer who only reads the text must get the story; the picture makes it funny. Silent scenes without text are the exception, not the rule. (Human verdict on a test video with almost no text: "Es gibt keinen Hook. Es soll schon was passieren. Es soll Text da sein.")

**Big and busy from frame 0.** The first second shows a **large, readable event** – not a small detail in a wide shot (dozens of tiny figures turning their heads cannot be seen on a phone). The main subject fills at least a third of the frame. Something visibly happens at least every second; no standing still to "build atmosphere" at the start.

## 4.1 Premise, not topic

Write one sentence: **"the character wants X – obstacle Y – it escalates Z – payoff."** Then the transformation in two words with an arrow (`empty → overflowing`, `chaos → one line`). A topic ("why sources matter") is not a premise. A video without a premise does not get built – send it back to 02.

## 4.1b The shape of this video – never the same twice

Fixed in every video: **a hook** (03-hooks.md), **ups and downs** (4.3), **understood on mute in two seconds**. Everything else is chosen fresh for each video, so no two videos are built the same way. Read `work/videos/shapes.jsonl` (one line per earlier video) and choose a shape that **differs from the previous video in at least three of these** and does not repeat the same length + format + story shape of any of the last five:

| Variable | Choose from |
|---|---|
| Length | a short loop (under ~12 s) · a standard short (~20–35 s) · a longer story (~40–60 s) – whatever the idea needs, not habit |
| Format | `visual-formats` and `viral-short-form` (`references/formats.md`): skit, POV, before/after, listicle, text message, split screen, reaction, letter … |
| Story shape | one of the six basic emotional arcs – rise · fall · fall-rise · rise-fall · rise-fall-rise · fall-rise-fall ([Reagan et al. 2016, EPJ Data Science](https://arxiv.org/abs/1606.07772)); the tension curve in 4.3 follows it |
| Levers | 2–3 of the six levers in `storytelling-hooks` (curiosity gap, emotional mirror, conflict, relatability, pattern + surprise, three acts) |
| Pace | fast cuts · one continuous shot where one element transforms · calm with one hard break |
| Ending | loop back to the first frame · twist · bookend (the hook's phrase returns) · open question · soft call to action |
| Music | one track edited to the curve · a switch at the turn · silence and hits only, music arrives at the payoff |
| Medium | 4.2 |

Write the choice as one line into `work/videos/<id>/shape.json` and append it to `work/videos/shapes.jsonl`. This is a frame, not a recipe: pick what serves the idea, then build freely inside it.

## 4.2 Two directions

**One direction by default** – build it yourself from the premise. Only when there is time and the idea is open, start the `direction-lister` agent (from `remotion-director`) in a fresh context with the premise, the spec and N = 2: it returns **two directions that differ at the idea level** – one or two sentences of mechanism each. Use only its agents and protocols – do not scaffold remotion-director's own workspace; everything is built in `studio/`. **You** then add to each direction:

- **the visual idea** – what the viewer *sees* that makes the point without words (a counter climbing from 1 to 29 until the mailbox bursts; one element that morphs through the whole film; a tower of 40,000 characters that collapses),
- **a named medium** in two or three words (`paper cut-out`, `chalk on a blackboard`, `exercise-book doodle`, `WarioWare micro-game`, `split-flap board`) and, if `work/taste/` has one, a reference frame – borrow its grammar, never its content or characters,
- **the character's job** in each beat – react, carry, push, fail, win. A character standing next to text is wasted,
- **the sound family** that belongs to the medium (paper and wood for the exercise book, chalk and felt for the blackboard).

## 4.3 Storyboard and four frames before the full build

For each direction write `work/videos/<id>/<a|b>/storyboard.md` and build its four key frames as `work/videos/<id>/<a|b>/Keyframes.tsx` (a 4-frame composition – **frame 0 = hook, 1 = middle, 2 = peak, 3 = end, each frame a different moment** (map the frame index to a time in `timing.ts`, do not just play the first four frames) – same `meta` shape as `Video.tsx`, one folder deeper – import from `"../../../../studio/src/brand"`; it is registered as `k-<id>-<a|b>`), render them with `node studio/sheet.mjs work/videos/<id>`:

- **The tension curve first** – the viewer's psychology over time, shaped by the story shape from 4.1b, never one flat level. A typical curve: hook spike (an open loop in the first seconds) → small payoffs or surprises that re-hook every few seconds → a build → the drop right before the payoff (pause, music out) → the payoff → a short release or a twist that makes people rewatch. Draw it as a line of numbers 1–10 per beat. A video that stays on one level is not finished; different video types get different curves (a joke escalates, a reveal holds back, a calm one breathes).
- 5–8 beats on that curve and on a beat grid (time · tension 1–10 · what is on screen · what moves · how it hands over to the next beat · what the music does · sound). Then build only **four stills**: hook, middle, peak, end – and put them on one sheet. The human picks a direction from the sheets – or, in an unattended run, the `blind-selector` agent does, given only the sheets and the full-size stills under neutral labels (its protocol talks about preview videos; tell it in the spawn message that it judges stills). Only the winner is built in full.

## 4.4 The build brief – short on purpose

The builder gets only this, nothing else:

1. format and length in the first line (1080×1920, 30 fps, 15–35 s),
2. premise, the shape (4.1b) and the chosen direction,
3. brand colours **with their role** and the fonts (`brand/theme.json`), pose list (`brand/assets.md`),
4. **the ban list** `work/taste/banned.md` – named default looks this kit must not produce (if the file does not exist, create it from the start list below; the critic proposes additions, the human's rejections always go in),
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

0. **Spot the music like a film editor, then cut it like a music editor.** Music follows the tension curve; it is never one track running at one level from start to end. Make a cue sheet `audio/cues.json` first – for every stretch of the curve decide what plays and for how long:
   - **cue** – a section of a track under a scene (often 5–15 s),
   - **bumper** – a short musical intro or link between parts (about 5–10 s),
   - **sting** – a 1–5 s musical phrase that punctuates a moment: the punchline, a reveal, a fail ([sting](https://en.wikipedia.org/wiki/Sting_(musical_phrase)), [stinger/bumper](https://www.mediamusicnow.co.uk/information/glossary-of-music-production-terms/what-is-an-stinger-or-bumper.aspx)),
   - **button** – a short solid ending that closes the video,
   - **silence** – a dead stop (about 0.4 s or longer) right before the payoff.
   
   Different videos get different cue sheets: a story may use three cues and a sting, a joke one bed and a dead stop, a calm video one long cue that breathes. Then cut it the way `motion-grammar` (`references/audio.md`, "Edit it like a music editor") describes: sparse intro with the groove arriving on the hero moment, a dead stop and the track's own drop on the biggest cut, the track's own final hit spliced onto the end, equal-power crossfades on bar lines, a 5 ms fade-in. Taking only the first seconds of a track is not editing – use the part that fits each stretch.
1. **Where the music comes from:** if `music/` has tracks (human-made, licence per track in `music/QUELLEN.md` or `SOURCES.md`), **pick from there first** – by mood and by where the track builds and peaks (measure it with `studio/beatgrid.py`; its loudness curve shows the peak). Copy the chosen file to `work/videos/<id>/audio/music-1.<ext>`, edit it to the tension curve (cut, rearrange sections, fade, drop out) with ffmpeg, and if the licence needs a credit, put the credit line at the end of `caption.txt`. Only if no track fits, generate one (steps 1b–2).
1b. **Music brief** `work/videos/<id>/music.json`: `caption` (genre, instruments, mood – instrumental, no named artists, name what to avoid such as generic synth pads), `bpm` (the storyboard's grid, e.g. 120), `durationSec` (the video's length), `structure` (timestamps from the storyboard: `[0:00 - 0:02] one hard hit, then silence` · `[0:10 - 0:12] everything drops out`).
2. `node studio/music.mjs work/videos/<id> --variants 2` → `audio/music-1.wav`, `music-2.wav`. Default engine: **ACE-Step 1.5**, free and local (MIT; installed by `sh studio/setup-music.sh`) – tempo and length come out as set, `structure` is ignored (cut drops and pauses in yourself), and tracks often end with ~2 s of silence (`beatgrid.py` reports it). Optional: `--engine lyria` (Google Lyria, paid API key) also follows `structure`.
3. `.venv/bin/python studio/beatgrid.py work/videos/<id>/audio/music-1.wav` → measured beats, bars, onsets. Pick the variant whose measured grid and loudness curve fit the storyboard; write the cue times into `timing.ts` **from the measured beats** – scene changes on beats, big moments on bars, the drop before the punchline where the loudness curve dips.
4. **Sound effects:** few, one family, only on real events. **Real recordings first** – the licensed files in `sfx/` (e.g. `sfx/mixkit/`, list and licence in its `QUELLEN.md`/`SOURCES.md`; Kenney CC0) go into `events.json` as `"type": "file"` events; synthesise with `procedural-sfx` only what no file covers (synthesised hits and ticks often sound cheap). Short musical stings from `sfx/` (success, fail, joke accent, riser) count as music cues (step 0). `events.json` takes its times from the same `timing.ts` values. Whooshes start 4–6 frames before the cut; hits land on the frame or one frame later. Energy in 1–5 kHz (phone speakers have no bass), mono.
5. **The music carries the video** – it is not a quiet bed under the effects. Keep effects on the `sfx` bus – only the one or two hero hits that should push the music down go on the `vo` bus (it ducks the music by 8 dB each time). Before mixing, bring the music bed to about −16 LUFS with ffmpeg `loudnorm` so `master.sh` can reach −14 LUFS with one gain; if `mix.py` says the limiter takes more than ~3 dB, lower the gains instead. If `music/BEWERTUNG.md`, `music/RATINGS.md` or `work/taste/music.md` exists, the human's verdict on each track beats your own taste.
6. **Mix** with the skill's `mix.py events.json -o audio/sfx-mix.wav --music audio/music-N.wav` (ducking, masking report, limiter at −1 dBTP), then `master.sh … audio/mix.wav` to −14 LUFS. Fix every `CHECK` line.
7. Keep the skill's "not ear-tuned yet" table for the human (06-review.md).

If `brand/strategy.md` says "no embedded music", skip 1–3 and cut to a steady 120 BPM grid instead.

Then go to [05-render.md](05-render.md).
