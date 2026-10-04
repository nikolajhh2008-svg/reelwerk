# Craft rules for coded short-form video

Twenty rules for faceless, voiceless shorts rendered with Remotion: rhythm, character animation, sound, transitions, review. **They are the critic's checklist in 06-review.md – they are not pasted into the build brief.** Each rule is tagged: **[measured]** – measured on real shorts while building this kit (method below) · **[source]** – a primary or reputable source · **[practice]** – practitioners' rule of thumb · **[judgement]** – our inference.

## Rhythm and picture

1. **A visible event every 0.5–1.5 s, longest static stretch ≤ 2 s (error from 3 s), plus exactly one real pause ≥ 1 s before the key line.** Faceless Duolingo character clips run 1.3–2.9 events per second with a longest static stretch of 1–2 s; narrated explainers rest 6–7 s (Kurzgesagt 6.6 s, Notion 7.3 s) – without a voice, only the picture carries the video. [measured; thresholds judgement] `render.mjs` detects static stretches automatically.
2. **Camera moves inside one place; hard cuts only between places, in a burst, or as a punch on the punchline.** 4 of 7 measured motion-graphics shorts had 0–1 hard cuts. [measured]
3. **Static share 20–55 %, shot lengths varied (coefficient of variation ≥ 0.25), no metronome.** Duolingo clips measured 14–33 % static, Kurzgesagt 41 %, Fireship 58 %. [measured; [Cutting et al. 2010](https://journals.sagepub.com/doi/10.1177/0956797610361679)]
4. **Word pops 0.2–0.5 s per word; the finished line stays ≥ 0.4 s + characters ÷ 13 s.** Active word: white text on an accent-coloured pill, not accent-coloured text on a dark background (often below 4.5 : 1 contrast). [measured; WCAG contrast formula]
5. **Zoom punch 5–10 % in 3 frames, spring back ≤ 12 frames; shake 8–15 px over 6–8 frames, only on landings or punchlines, never on UI text.** [practice: [echowave](https://echowave.io/tools/zoom-video/), [School of Motion](https://schoolofmotion.com/blog/how-to-simulate-camera-shake-adobe-after-effects)]

## Character

6. **Never cross-fade poses: change pose as a hop, swap at the apex** (4 frames anticipation → swap → land with a spring). [practice: Richard Williams]
7. **Springs by role:** character `{damping 15, stiffness 180, mass 0.8}` (~8 % overshoot), UI/words `{18, 300, 0.6}`, text and camera `{damping 200}` (no overshoot). Remotion's default spring overshoots ~16 % and reads cheap. [measured with Remotion's `spring()`]
8. **Squash and stretch keeps volume (sx = 1 / sy), pivot at the feet; landing sy ≈ 0.88, flight ≈ 1.08; every readable action ≥ 5–6 frames.** [[Twelve principles of animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation); practice]
9. **Moving hold: breathe 2 s in / 3 s out at ±1.2 %; blink every 2–6 s (seeded), 3–4 frames, plus on every pose change** (blinking needs a closed-eyes pose in `brand/assets/`). [[Respiratory rate](https://en.wikipedia.org/wiki/Respiratory_rate), [Blinking](https://en.wikipedia.org/wiki/Blinking); [Animation Apprentice](https://animationapprentice.blogspot.com/2018/03/why-animators-need-to-blink.html)]
10. **Cause, then reaction – one after the other, hold the reaction ≥ 0.5 s; offset parts (face/props 1–3 frames after the body); no twins.** [practice]

## Sound

11. **Clicks, pops, hits and dings on the frame of the event or one frame after – never more than one frame early.** Leading sound becomes noticeable from about 45 ms. [[ITU-R BT.1359](https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.1359-1-199811-I!!PDF-E.pdf)]
12. **Whooshes start 4–6 frames before the cut, peak on the first frame after; risers 30–60 frames, ending on the reveal.** [practice]
13. **Fewer sounds than events, at most one hero sound per clip, one sound family, alternate variants, two sounds < 40 ms apart → drop one.** [[Material sound guidelines](https://m2.material.io/design/sound/sound-choreography.html)]
14. **Phone-proof: transient energy at 1–5 kHz, high-pass around 90 Hz, mono or ≤ ±30 % pan.** Phone speakers produce almost nothing below ~250 Hz. [[Audiokinetic](https://blog.audiokinetic.com/loudness-and-frequency-response-on-popular-smart-phones/)]
15. **Music bed plus effects, mixed and mastered as one track: −14 LUFS integrated, true peak ≤ −1 dBTP; the music ducks under hero sounds.** A sparse track of isolated clicks on silence sounds cheap and harsh – never boost single clicks. `procedural-sfx` mixes (`mix.py --music`, masking report, limiter) and masters (`master.sh`); `render.mjs` only measures. [practice; judgement]
16. **Only licence-clean sound:** effects synthesised in code (`procedural-sfx`), music generated for the video (ACE-Step locally or Google Lyria, `studio/music.mjs`), or CC0 files (Kenney in `sfx/`). Of `@remotion/sfx`, only the files marked CC0; several popular meme sounds there have unclear origins. [[Kenney](https://kenney.nl/support), [Gemini API terms](https://ai.google.dev/gemini-api/terms)]

## Transitions

17. **Allowed: push, slide, morph, cross-fade, match cut, iris from a meaningful point, zoom as punctuation, fade only at the end. Not: cube, flip, clock, page turn, star.** Every whip gets a sound and moves in the direction of the motion. [[Inside Editors](https://insideeditors.com/video-editing-transitions/); practice]

## The AI as director and reviewer

18. **These numbers are for the critic, not for the builder's brief.** The builder gets premise, medium, brand, ban list and the technical contract (04-script.md, 4.4); the critic checks the result against this page. Long rulebooks in the build brief did not beat lighter briefs in a controlled comparison ([remotion-director](https://github.com/Zane-0x5a/remotion-director)). [source; judgement]
19. **The AI reads contact sheets (every 0.5 s) and frame strips around transitions; motion flow, sync and levels are measured by code.** Multimodal models understand fine motion poorly ([MotionBench](https://arxiv.org/abs/2501.02955)); Gemini samples video at 1 frame per second by default ([Google](https://ai.google.dev/gemini-api/docs/video-understanding)).
20. **Test every automatic check once against a deliberately bad video; the final approval is a human on a phone, with sound and muted.** [judgement]

---

**Method for [measured]:** 7 public vertical shorts (Zack D. Films, Fireship, Notion, 3Blue1Brown, Kurzgesagt, Duolingo ×2) measured with ffmpeg: hard cuts by scene-change detection, static share as frames whose difference to the previous frame is < 0.3/255, events per second and longest static stretch counted on contact sheets. Spring overshoot values were computed with Remotion's own `spring()`.
