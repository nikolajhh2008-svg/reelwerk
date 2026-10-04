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
| Ideas | `viral-short-form-ideas`, `ig-viral` |
| Hooks | `viral-hooks`, `hook-writing`, `hook-tactics`, `ig-reel` |
| Hook audit | `artem-viral-hooks` |
| Script | `viral-short-form`, `short-form-video`, `ig-reel` (`beats.py`), `ig-carousel`, `countdown-video` |
| Render | `remotion-best-practices`, `remotion-render`, `remotion-markup`, `remotion-multimedia`, `caption-animation` + the Onda docs in [`docs/onda/`](docs/onda/) |
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
- **Real visuals only.** Only assets listed in `brand/assets.md` and real product UI. Never invent a screen, never show real user data, no realistic AI people.
- **Faceless and voiceless by default:** the "spoken hook" is the character's first speech bubble or the first line of text; music is chosen in the app when posting; the video file carries sound effects only.
- **Never a text-only slideshow.** Every video has at least two layers beyond text.
- **Never post, upload or send anything.** Never open Remotion Studio in an unattended run; render with `node studio/render.mjs`.
- `ig-reel`'s `hookscore.py` and `beats.py` are calibrated on English (word lists, no umlauts) – for other languages treat their scores as a weak signal only.
- Craft rules: [`docs/craft.md`](docs/craft.md). They apply to every script.
- `brand/rules.md` beats everything in this file.

## Files

```
blueprint/   the workflow, step by step
brand/       the project – filled by you in step 0, confirmed by the human
docs/        craft rules + Onda composing docs (the script format)
studio/      Remotion project: Onda components (MIT), Character, render.mjs
sfx/         CC0 sound effects with a brightness/risk analysis
work/        ideas, scripts, renders, taste, results (not committed)
```
