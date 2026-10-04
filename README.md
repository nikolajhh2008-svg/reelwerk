<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.gif">
  <img alt="reelwerk: a phone plays a short video that builds itself – a hook types in word by word, a highlight lands, a number counts up to 70 % – while six steps tick off: analyze, ideas, hooks, script, render, review." src=".github/assets/banner-light.gif" width="100%">
</picture>

<div align="center">

**Give this repo to your AI. It reads your project, then makes organic short-form videos for it – rendered from code.**<br/>
Some inform, some entertain, some show the product. Your project decides the mix. You pick, you post.

[![License: MIT](https://img.shields.io/badge/License-MIT-4F7DF3.svg)](LICENSE)
[![Self-written skills: 0](https://img.shields.io/badge/Self--written%20skills-0-0F0F12.svg)](CREDITS.md)
[![Works with Claude Code](https://img.shields.io/badge/Works%20with-Claude%20Code-D97706.svg)](https://claude.com/claude-code)
[![Renders with Remotion + Onda](https://img.shields.io/badge/Renders%20with-Remotion%20%2B%20Onda-0B84F3.svg)](https://remotion.onda.video)

[Quickstart](#quickstart) · [How it works](#how-it-works) · [What's inside](#whats-inside) · [Principles](#principles) · [Credits](CREDITS.md) · [Deutsch](LIESMICH.md)

</div>

Most "AI content machines" produce the same average videos everyone else produces. reelwerk starts somewhere else: **your project.** Before a single idea is written, your AI reads your codebase, docs and site, finds what can honestly be shown, and decides which kinds of video make sense for *this* product – a study app might teach, a game might mostly entertain, a dev tool might mostly demo. Then it works through a step-by-step blueprint: ideas forced to be different, a batch of hooks per idea, a script, a render, automatic checks. You pick the ideas and approve every video.

Nothing here was invented from scratch where something good already existed: the skills come from people who do this for a living, the motion components from [Onda](https://github.com/degueba/onda), the sounds from [Kenney](https://kenney.nl). We wrote the blueprint and the glue.

---

## Quickstart

You need [Node.js](https://nodejs.org) 20+, [ffmpeg](https://ffmpeg.org), and an AI coding agent – built for [Claude Code](https://claude.com/claude-code).

```bash
git clone https://github.com/nikolajhh2008-svg/reelwerk.git
cd reelwerk
./setup.sh
claude
```

Check that rendering works:

```bash
mkdir -p work/videos/hello && cp examples/hello/props.json work/videos/hello/
node studio/render.mjs work/videos/hello/props.json
```

Then say:

> Analyse my project: ~/code/my-app

The AI reads it, drafts your `brand/` files and asks a handful of questions. After that, one sentence is enough:

> make videos

You get a shortlist of ten ideas with three hooks each, pick the ones you like (`2b, 5a, 7c`), and the finished videos land in `work/videos/` with a contact sheet and a check report. **Nothing is ever posted automatically.**

---

## How it works

| # | Step | What happens |
|---|---|---|
| 0 | [Analyze](blueprint/00-analyze.md) | read the project; find two-second moments; decide how the product can appear (real components, screen recordings, images, or none); **derive the mix of informing, entertaining and showing videos** |
| 1 | [Strategy](blueprint/01-strategy.md) | one viewer, one goal, a bullseye of topics, a weekly mix – confirmed by you |
| 2 | [Ideas](blueprint/02-ideas.md) | ~100 raw ideas from real signals, forced to differ, filtered, ranked in pairs |
| 3 | [Hooks](blueprint/03-hooks.md) | a batch of hook packages per idea, audited for the four hook killers – **you pick** |
| 4 | [Script](blueprint/04-script.md) | one JSON file: scenes, transitions, sound effects |
| 5 | [Render](blueprint/05-render.md) | Remotion + Onda; sound set to −3 dBTP; contact sheet |
| 6 | [Review](blueprint/06-review.md) | code measures dead time and levels, the AI reads the contact sheet, **you watch** |
| 7 | [Publish](blueprint/07-publish.md) | by hand, music from the app, the platform rules that matter |
| 8 | [Learn](blueprint/08-learn.md) | real numbers re-weight what comes next |

---

## What's inside

```
blueprint/        the workflow, step by step – what the AI follows
brand/            your project, filled in by the AI in step 0 (empty here)
.claude/skills/   21 third-party skills for ideas, hooks, scripts, captions
docs/craft.md     20 measured rules: rhythm, character animation, sound, transitions
docs/onda/        how scripts are composed (Onda's agent docs)
studio/           Remotion project: 33 Onda components, 11 transitions, a pose-based character,
                  render.mjs (render → sound peak → contact sheet → dead-time check)
sfx/              177 CC0 sound effects with a brightness / harshness analysis
setup.sh          installs the studio and the official Remotion skills
```

The banner above was rendered with `studio/` itself.

---

## Principles

1. **The project decides, not the kit.** Content mix, topics and formats come from analysing your project.
2. **Data finds the topic, taste makes the angle.** Without real input every model produces the same average ideas – answers from different model families are 71–82 % similar ([Jiang et al., NeurIPS 2025](https://arxiv.org/abs/2510.22954)).
3. **The generator is not the judge – and the human has the last word.** An LLM judge let AI captions win 54 % against the best human ones; a former New Yorker cartoon editor chose them 1.6 % of the time ([Zhang et al. 2024](https://arxiv.org/abs/2406.10522)).
4. **Fixed components, AI fills the script.** Motion comes from hand-made components with one motion language; the AI never invents animation curves.
5. **Real visuals only, never a text-only slideshow.** TikTok rates slideshow-only videos as low quality, Instagram shows mostly-text reels less (sources in [07-publish.md](blueprint/07-publish.md)).
6. **Nothing posts itself.** You watch every video and post it by hand.

---

## Licence

MIT for the parts written for reelwerk. Third-party skills, components and sounds keep their own licences – see [CREDITS.md](CREDITS.md). Remotion is under the [Remotion License](https://www.remotion.dev/license) (free for individuals and companies of up to 3 people).
