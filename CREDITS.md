# Credits

reelwerk is mostly other people's work, assembled. **No skill in this repository was written by us.** The few lines of glue we did write are listed at the end. Thank you to everyone who publishes their work openly.

Snapshot: October 2026.

## Skills (`.claude/skills/`)

Each folder contains its original licence file. Unchanged unless noted.

| Skills | Origin | Commit | Licence | Changes |
|---|---|---|---|---|
| `viral-hooks`, `viral-short-form-ideas`, `viral-short-form`, `viral-tiktok-content`, `viral-instagram-reels`, `viral-captions-and-ctas` | [vyralcontent/content-skills](https://github.com/vyralcontent/content-skills) | `349e495` | MIT © 2026 Vyral | removed the section that instructs the model to promote a paid product, and the promotional header image |
| `ig-reel`, `ig-carousel`, `ig-caption`, `ig-viral`, `ig-plan` | [Jakeschincariol/instagram-agent-skill](https://github.com/Jakeschincariol/instagram-agent-skill) | `d03c56b` | MIT © 2026 Jake Schincariol | none (file paths remapped in `CLAUDE.md`); `brand/voice.md` is its `templates/voice.md` |
| `artem-viral-hooks` | [artemnovitckii/content-skills](https://github.com/artemnovitckii/content-skills) (`viral-hooks`) | `1c6e909` | MIT | folder and `name:` renamed to avoid a clash with Vyral's skill |
| `hook-writing`, `hook-tactics`, `hook-voice-patterns`, `visual-formats` | [motion-team/creative-strategy-skills](https://github.com/motion-team/creative-strategy-skills) | `8e467a3` | MIT © 2026 Motion Creative Strategy Team | none |
| `short-form-video`, `countdown-video`, `caption-animation` | [iart-ai/tiktok-video-skills](https://github.com/iart-ai/tiktok-video-skills) | `2a77533` | MIT | none |
| `social` | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | `dda3841` | MIT | none |
| `humanizer-de` | [marmbiz/humanizer-de](https://github.com/marmbiz/humanizer-de) (Martin Moeller) | `a856fa4` | MIT © 2026 Martin Moeller | none |
| `trend-jacking`, `meme-and-culture` | [social-media-skills/skills](https://github.com/social-media-skills/skills) | `6e30eeb` | MIT © 2026 Frank Heijdenrijk | removed the references to the scheduling product "WoopSocial"; removed statistics without a primary source ("~60% higher engagement / ~10× reach (Forbes)", "91% prefer funny brands", "1M+ memes/day", "~13ms"); replaced the US-specific legal claims (fair use, right of publicity, ELVIS Act, NO FAKES Act, with the EU/UK notes in the same sentence) by "Check the platform rules and law for your country."; evals adjusted to match |
| `tt-trend-mapper` | [sergebulaev/tiktok-skills](https://github.com/sergebulaev/tiktok-skills) | `0fe89aa` | MIT © 2026 Sergey Bulaev | references to `tt-humanizer` replaced by `humanizer-de` |
| `trend-jacker` | [moses607/socialforge](https://github.com/moses607/socialforge) | `a8b75c8` | MIT © 2026 Cherry Francois | none |
| `creative-director-methods` | [smixs/creative-director-skill](https://github.com/smixs/creative-director-skill) (`creative-director`) | `ac06eb2` | CC BY 4.0 © 2026 Serge Shima | excerpt: only the method cards Bisociation, Random Entry, Reverse Brainstorming, Worst Possible Idea, the "first 3 ideas are warm-up" step and the anti-pitfall rules, copied word for word; scoring/refinement loop (and anti-pitfall rule 2), calibration and case library left out; new frontmatter |
| `verbalized-sampling` | [CHATS-lab/verbalized-sampling](https://github.com/CHATS-lab/verbalized-sampling) | `d042a7b` | Apache-2.0 © 2025 CHATS-Lab | the repository ships no skill or prompt-template file, so `SKILL.md` is the README's "Quickstart" section verbatim, with frontmatter and a "Modified" note |
| `remotion-director` | [Zane-0x5a/remotion-director](https://github.com/Zane-0x5a/remotion-director) | `2ec0daa` | MIT © 2026 Zane | the Claude plugin's files (skills, agents, tools, CC0 sound pack); `SKILL.md` is its `create` skill with `name:` changed; default number of drafts N changed from 3 to 2; the Chinese agent prompts (`direction-lister`, `builder`, `blind-selector`) and the two Chinese protocol files in `skills/critic-loop/` translated into English; header note in each `tools/` file that the author tested them only on Windows |
| `anidoodle-storytelling` | [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle) | `94c171c` | Apache-2.0 © 2026 Alex Greenshpun | excerpt: `references/storytelling.md` plus the "research ledger" and "storyboard" sections of `references/workflows/explainer.md`, combined into `SKILL.md` with a "Modified" note; engine left out |
| `motion-grammar` | [echris6/motion-video-kit](https://github.com/echris6/motion-video-kit) (`business-motion-film`) | `255562b` | MIT © 2026 echris6 | excerpt: only `motion-grammar.md`, `gauntlet.md`, `critic-prompts.md`, `quality-bar.md`, `audio.md`; removed the review round for AI-generated stills/clips and the passages specific to 3D/Three.js scenes; business-offer, Three.js and product-hero files, case studies, scripts and templates left out; new `SKILL.md` with the upstream reading table reduced to these files |
| `animation-guide` | [JohnHeibel/ClaudeAnimationBase](https://github.com/JohnHeibel/ClaudeAnimationBase) (`ANIMATION_GUIDE.md`) | `0ac8bf2` | MIT © 2026 John Heibel | excerpt: "The three goals" through "Workflow 3" and "Common failures"; removed everything about the Clawd character (mentions in general rules replaced by "the character"), the p5.brush medium and boil rule, "No text", "Nothing is ever still", and the checks belonging to them; new frontmatter |
| `storytelling-hooks`, `retention-audit` | [yaxeen/storytelling-skills](https://github.com/yaxeen/storytelling-skills) | `24ef3c1` | MIT © 2026 Muhammad Yasin | none |
| `procedural-sfx` | [bianbianzhu/procedural-sfx](https://github.com/bianbianzhu/procedural-sfx) | `5eff10f` | MIT © 2026 bianbianzhu | none |
| `remotion-best-practices`, `remotion-render`, `remotion-markup`, `remotion-multimedia`, `remotion-captions` | [remotion-dev/skills](https://github.com/remotion-dev/skills) | see `skills-lock.json` | no licence file (Remotion License) | **not included** – installed by `setup.sh` through the official installer |

## Agents (`.claude/agents/`)

`direction-lister`, `blind-selector`, `aesthetic-critic` are copies of the agents in `.claude/skills/remotion-director/agents/` (same origin, licence and changes as above), placed where Claude Code finds them by name.

## Video tooling (`studio/`)

| What | Origin | Licence | How |
|---|---|---|---|
| [Remotion](https://www.remotion.dev) and its packages | Remotion AG | Remotion License – free for individuals and companies with up to 3 people | npm dependencies, not included |

Videos are written from scratch per idea – no component library is included. (Earlier versions shipped [Onda](https://github.com/degueba/onda) components, MIT; removed in favour of building every video from scratch.)

## Music

Music beds are generated per video, by default locally with [ACE-Step 1.5](https://github.com/ace-step/ACE-Step-1.5) (MIT © 2026 ACEStep; installed by `studio/setup-music.sh`, not included). Its model card states that generated music may be used commercially and that it was trained on licensed, royalty-free and synthetic music ([Hugging Face](https://huggingface.co/ACE-Step/Ace-Step1.5)) – a claim of the authors, not independently verified. Optional: [Google Lyria](https://ai.google.dev/gemini-api/docs/music-generation) through the Gemini API with your own key; Google does not claim ownership of generated content ([Gemini API terms](https://ai.google.dev/gemini-api/terms)), every track carries a SynthID watermark. Beat measurement uses [librosa](https://librosa.org) (ISC), installed by `setup.sh`.

## Sound effect files (`sfx/`, optional)

| What | Origin | Licence |
|---|---|---|
| `impact/`, `interface/`, `ui/` | [Kenney](https://kenney.nl), via [brag](https://github.com/latent-spaces/brag) | CC0 1.0 |
| `keyboard/` | "Keyboard Soundpack #1", unicae_games (opengameart.org), via brag | CC0 1.0 |
| `sfx-analysis.md`, `sfx-analysis.json` | brag by Shunit Haviv Hakimi | MIT |

## Research behind the blueprint

Kallaway's public videos on hooks and content strategy (methods restated in our own words), and the studies linked in `blueprint/` and `docs/craft.md`. Step 4 follows what the strongest code-made videos of autumn 2026 had in common – an escalating idea, a named medium or reference, real material and a review loop on rendered frames – and Anthropic's prompting guidance for Claude Opus 5.5 to name unwanted default looks instead of asking to "avoid an AI look" ([Prompting Claude Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5)).

## What we wrote

- `blueprint/` – the workflow, including the project analysis in step 0 (nothing comparable existed)
- `CLAUDE.md`, `brand/` templates, `docs/craft.md`
- `studio/`: `Root.tsx` (finds every `work/videos/<id>/Video.tsx`), `brand.ts`, `brand-fonts.tsx`, `render.mjs` (render, sound measurement, contact sheet, dead-time check, version history), `music.mjs`, `music_ace.py`, `setup-music.sh` (call ACE-Step as in its `docs/en/INFERENCE.md`, or the Gemini API as in Google's docs), `beatgrid.py` (librosa beat and onset detection to JSON), `sheet.mjs` (key frames of two directions on one sheet), `review.mjs` (the critic's material per round), the README banner
- `examples/hello/Video.tsx`
