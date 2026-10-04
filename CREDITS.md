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
| `skill-creator` | [anthropics/skills](https://github.com/anthropics/skills) | `8a1541c` | Apache-2.0 (`LICENSE.txt` in the folder) | none |
| `humanizer-de` | [marmbiz/humanizer-de](https://github.com/marmbiz/humanizer-de) (Martin Moeller) | `a856fa4` | MIT © 2026 Martin Moeller | none |
| `remotion-best-practices`, `remotion-render`, `remotion-markup`, `remotion-multimedia`, `remotion-captions` | [remotion-dev/skills](https://github.com/remotion-dev/skills) | see `skills-lock.json` | no licence file (Remotion License) | **not included** – installed by `setup.sh` through the official installer |

## Video components (`studio/`)

| What | Origin | Licence | How |
|---|---|---|---|
| 33 components and 11 transitions in `studio/src/components/onda/`, helpers in `studio/src/lib/onda/` | [Onda](https://github.com/degueba/onda) by Rodrigo Botelho | MIT | installed with the official CLI `npx ondajs add …` |
| `studio/src/lib/onda/{composition.ts, composition-renderer.tsx, theme.tsx, tokens.ts}` | Onda, commit `3c81405` | MIT | copied with a source line; two small changes for zod 4, marked `// reelwerk:` |
| `docs/onda/*.md` | Onda docs, commit `3c81405` | MIT (`docs/onda/LICENSE`) | copied with a source line |
| [Remotion](https://www.remotion.dev) | Remotion AG | Remotion License – free for individuals and companies with up to 3 people; larger teams need a company licence | npm dependency, not included |

## Sound effects (`sfx/`)

| What | Origin | Licence |
|---|---|---|
| `impact/`, `interface/`, `ui/` | [Kenney](https://kenney.nl), via [brag](https://github.com/latent-spaces/brag) | CC0 1.0 |
| `keyboard/` | "Keyboard Soundpack #1", unicae_games (opengameart.org), via brag | CC0 1.0 |
| `sfx-analysis.md`, `sfx-analysis.json` | brag by Shunit Haviv Hakimi | MIT |

## Research behind the blueprint

Kallaway's public videos on hooks and content strategy (methods restated in our own words), and the studies linked in `blueprint/` and `docs/craft.md`.

## What we wrote

- `blueprint/` – the workflow, including the project analysis in step 0 (nothing comparable existed)
- `CLAUDE.md`, `brand/` templates, `docs/craft.md`
- glue in `studio/`: `Root.tsx`, `registry.ts`, `scenes.tsx` (transitions between scenes, following the pattern in Onda's docs), `brand-fonts.tsx`, `render.mjs` (render, sound peak, contact sheet, dead-time check)
- `studio/src/components/character/` – a character from PNG poses, the one building block no library had (motion pattern after [stefanwittwer/remotion-animated](https://github.com/stefanwittwer/remotion-animated), MIT)
