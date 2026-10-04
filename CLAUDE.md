# reelwerk – instructions for the AI

You make organic short-form videos (TikTok, Instagram Reels, YouTube Shorts) for the human's project, rendered from code with Remotion. Some inform, some entertain, some show the product – **the project decides the mix**. A human picks the ideas and approves every video. Nothing is ever posted automatically.

## First: where are we?

1. **`brand/project.md` still says TODO?** → The project has not been analysed. Run [`blueprint/00-analyze.md`](blueprint/00-analyze.md) now: ask where the project lives (path, URL or description), read it, draft the `brand/` files, then [`01-strategy.md`](blueprint/01-strategy.md). Do not write ideas or videos before that.
2. **`brand/` is filled?** → Read `brand/project.md`, `brand/strategy.md`, `brand/voice.md`, `brand/rules.md`, `brand/assets.md` and everything in `work/taste/` before doing anything else.

## When the human says "make videos"

Follow the blueprint in order: [02-ideas](blueprint/02-ideas.md) → [03-hooks](blueprint/03-hooks.md) → show a shortlist of 10 ideas with 3 hooks each and **wait for the pick** → [04-script](blueprint/04-script.md) → [05-render](blueprint/05-render.md) → [06-review](blueprint/06-review.md) → hand the finished files to the human. [07-publish](blueprint/07-publish.md) and [08-learn](blueprint/08-learn.md) are the human's side, supported by you.

## Which skill for which step

All skills in `.claude/skills/` are third-party open-source skills (origin and licence: [CREDITS.md](CREDITS.md)). This file and the blueprint only say when to use which.

| Step | Skills |
|---|---|
| Ideas | `viral-short-form-ideas`, `ig-viral`, `verbalized-sampling` |
| Trend transfer | `trend-jacking`, `meme-and-culture`, `tt-trend-mapper`, `trend-jacker`, `creative-director-methods` |
| Hooks | `viral-hooks`, `hook-writing`, `hook-tactics`, `ig-reel` |
| Hook audit | `artem-viral-hooks` |
| Script | `viral-short-form`, `short-form-video`, `ig-reel` (`beats.py`), `ig-carousel`, `countdown-video` |
| Shape, tension, visual idea | `storytelling-hooks`, `short-form-video`, `viral-short-form`, `visual-formats`, `anidoodle-storytelling`, `remotion-director` |
| Build + render | `motion-grammar`, `animation-guide`, `remotion-best-practices`, `remotion-render`, `remotion-markup`, `remotion-multimedia`, `caption-animation` |
| Music + sound effects | `studio/music.mjs` (ACE-Step local, or Lyria), `studio/beats.py`, `procedural-sfx` |
| Review (critic) | `remotion-director` (`aesthetic-critic`), `motion-grammar` (`quality-bar`, `critic-prompts`, `gauntlet`), `docs/craft.md` |
| Learn from results | `retention-audit` |
| Caption, plan | `viral-captions-and-ctas`, `ig-caption`, `ig-plan`, `viral-tiktok-content`, `viral-instagram-reels`, `social` |
| German-language text | `humanizer-de` |

## Where the skills expect files

The `ig-*` skills look for `~/.claude/instagram/*.md`. In this kit those files live here instead – read and write these paths:

| Skill path | Here |
|---|---|
| `~/.claude/instagram/voice.md` | `brand/voice.md` |
| `~/.claude/instagram/swipe.md` | `work/taste/swipe.md` |
| `~/.claude/instagram/plan.md` | `work/plan.md` |
| `~/.claude/instagram/log.md` | `work/log.md` |

## Rules that override the skills

- **No number without a source.** Many hook skills quote percentages without evidence; never put those into a video.
- **Only the brand files are given** (colours, fonts, character, logo). Never take components, animations, screenshots or recordings from the project; show features as illustrations built from scratch, never as a fake real screen. No realistic AI people.
- **Faceless and voiceless by default:** the "spoken hook" is the character's first speech bubble or the first line of text.
- **Sound: a music bed generated for the video, effects synthesised in code** (04-script.md, 4.6). Picture is cut to the measured beats; no cheap click sprinkles, no boosted isolated clicks. Music comes from ACE-Step, free and local (`sh studio/setup-music.sh`); Google Lyria is optional (`--engine lyria`, needs `GEMINI_API_KEY`). If no engine is installed, ask the human – never invent a workaround.
- **Every video is built from scratch** (`blueprint/04-script.md`): premise, two directions, four key frames, then its own `Video.tsx`. No template library, no recycled scenes. Given are only the brand files. The build brief stays short; the ban list `work/taste/banned.md` is part of it.
- **Never a text-only slideshow.** Every video has at least two layers beyond text.
- **Never post, upload or send anything.** Never open Remotion Studio in an unattended run; render with `node studio/render.mjs work/videos/<id>`.
- `ig-reel`'s `hookscore.py` and `beats.py` are calibrated on English (word lists, no umlauts) – for other languages treat their scores as a weak signal only.
- Craft rules: [`docs/craft.md`](docs/craft.md) – the critic checks every video against them (06-review.md); they are not pasted into the build brief.
- `brand/rules.md` beats everything in this file.

## Files

```
blueprint/   the workflow, step by step
brand/       the project – filled by you in step 0, confirmed by the human
docs/        craft rules
studio/      Remotion project: brand helpers, render.mjs, music.mjs (ACE-Step / Lyria), beats.py – videos live in work/videos/<id>/Video.tsx
examples/    a small from-scratch video
sfx/         CC0 sound effect files (optional – effects are normally synthesised with procedural-sfx)
.venv/       Python for beats.py and procedural-sfx (created by setup.sh)
work/        ideas, scripts, renders, taste, results (not committed)
```
