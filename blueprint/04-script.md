# 4 · Script – one JSON file per video

Skills: `viral-short-form` and `short-form-video` (retention structure), `ig-reel` (`beats.py` checks the pacing), `ig-carousel` (carousels), `countdown-video` (series). The script format itself is **Onda's timeline payload** – read [`docs/onda/composing-with-onda.md`](../docs/onda/composing-with-onda.md), [`composing-placement.md`](../docs/onda/composing-placement.md) and [`composing-timeline.md`](../docs/onda/composing-timeline.md) before writing the first one. Every installed component has a `README.md` and a `schema.ts` in `studio/src/components/onda/<name>/` – the schema is the API.

## 4.1 The file

`work/videos/<id>/props.json`:

```json
{
  "brand":  { "...": "copied from brand/theme.json" },
  "fonts":  [ { "family": "Inter", "file": "brand/fonts/Inter-Bold.woff2", "weight": "700" } ],
  "scenes": [ { "for": 3, "layers": [ { "component": "WordStagger", "props": {} } ] },
              { "for": 3, "transition": { "name": "push", "options": { "direction": "up" }, "for": 0.4 }, "layers": [] } ],
  "composition": { "fps": 30, "width": 1080, "height": 1920,
                   "tracks": [ { "id": "sfx", "entries": [ { "at": 0.5, "for": 0.5, "component": "AudioClip", "props": { "src": "sfx/ui/click2.ogg" } } ] } ] }
}
```

- **`scenes`** – the picture, scene by scene. Each scene has a length (`for`), the components shown together (`layers`, times relative to the scene) and the **transition into it** (a key of `ondaTransitions`: `push`, `slide`, `morph`, `crossFade`, `depthPush`, `zoom`, `iris`, `wipe`, `blur`, `dipToColor`, `expandMorph`).
- **`composition.tracks`** – things that run across scenes: sound effects (`AudioClip`), atmosphere (`Vignette`, `GrainOverlay`), a persistent character.
- Paths that start with `brand/`, `sfx/` or `work/` are resolved automatically.
- Components available: everything in `studio/src/registry.ts` – Onda's catalog plus `Character` (poses from `brand/assets/`).

## 4.2 Structure of a short

| Part | Time | Job |
|---|---|---|
| Hook | 0–3 s | the picked hook package from 03-hooks.md, all three layers |
| Lock-in | 3–10 s | confirm the promise, show the proof |
| Body | beats of 1.5–3 s | **one sentence raises one question, the next answers it** |
| Two dopamine moments | early + late | two "I didn't know that" moments keep people watching |
| End | 2–3 s | payoff, soft call to action, loop back to the start if possible |

Length: 15–35 s for most videos. Carousels: 5–8 slides (`ig-carousel`).

## 4.3 Craft rules the script must follow

From [`docs/craft.md`](../docs/craft.md) (measured values with sources):

- **A visible event every 0.5–1.5 s, never 2 s without motion** – without a voice only the picture carries the video. Give each scene a second layer that moves (character pose change, highlight, counter, camera move) if its text is static.
- One real pause (≥ 1 s) right before the key line.
- Text: title text ≥ 52 px and roughly a third from the top; reading speed ≤ 13 characters per second; nothing readable shorter than 0.8 s. Use Onda size roles (`hero`, `heading`, `subheading`) – never `body` or `caption` for anything the viewer must read.
- Keep important content inside the safe zone: x 80–900, y 270–1250 on 1080×1920.
- Character: pose changes as hops (swap at the apex), never cross-fades; one reaction held ≥ 0.5 s.
- Transitions: `push`/`slide` between places, `morph`/`crossFade` for calm, `zoom` only as punctuation. No more than one transition type per video plus one accent.
- Sound: fewer sounds than events, one hero sound per video, clicks and hits **on** the frame of the event (never earlier), whooshes 4–6 frames before a transition. Pick by effect from `sfx/sfx-analysis.md` (prefer warm, low-risk files).
- **Never a text-only slideshow.** Every video has at least two layers beyond text (character, product visual, motion, sound).
- Known component limits: `QuoteCard` has a fixed `maxWidth: 40vw` (built for landscape) – on 9:16 use `WordStagger` + `Underline` instead. There is no speech-bubble component; use `Callout` (its pointer is a thin line). `VideoClip` only crops centred – to show part of a recording, cut it first with ffmpeg into `work/videos/<id>/media/` (crop and trim only, content unchanged).
- Every Onda component has defaults – always set the visible text props yourself, so no placeholder text from the library ends up in a video.

## 4.4 Check the script before rendering

- Every component name exists in the registry; every prop validates against its schema.
- Every asset path exists.
- `brand/rules.md` respected; no number without a source; the video keeps the hook's promise.
- Sum of scene lengths matches the plan; no scene longer than ~3.5 s without a moving layer.

Then go to [05-render.md](05-render.md).
