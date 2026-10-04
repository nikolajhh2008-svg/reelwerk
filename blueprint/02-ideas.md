# 2 · Ideas – many, different, then few

Skills: `viral-short-form-ideas` (pillars, matrix, mining), `ig-viral` (outlier swipe file). This file says how to use them for this project.

## 2.1 Load material first

Every idea run reads: `brand/project.md`, `brand/strategy.md`, `brand/voice.md`, `brand/rules.md`, `brand/assets.md`, the newest file in `work/radar/` and `work/raw/`, everything in `work/taste/`, and `work/ideas/memory.jsonl` (every idea ever made, with status). **Without real material every model produces the same average ideas** – in one study, answers from different model families were 71–82 % similar ([Jiang et al., "Artificial Hivemind", NeurIPS 2025](https://arxiv.org/abs/2510.22954)). A second model or a higher temperature does not fix this; material and constraints do.

## 2.2 The formula

Every idea names four parts, or it is not an idea:

> **Signal × Mechanism × Project truth × Viewer**

- **Signal** – why now: a date, a trend, a common question, an outlier, something the human experienced this week.
- **Mechanism** – why people stay: hook type, story shape, humour mechanism.
- **Project truth** – what only this project can show or say (two-second moment, expertise, story).
- **Viewer** – which concrete pain or wish of the one viewer.

## 2.3 Signals – where they legally come from

| Source | How | Note |
|---|---|---|
| The human's weekly dictation | `work/raw/<week>.md` | the strongest source against average ideas |
| Comments and DMs on own posts | copy by hand, anonymised | real wording of the audience |
| Screenshots while scrolling (TikTok Creative Center, own feed, competitors) | human drops 5–10 per week into `work/radar/` | **TikTok and Instagram forbid automated scraping in their terms** – screenshots by hand are fine |
| YouTube Data API | search for Shorts outliers: views ÷ channel median ≥ 5 | official, free quota |
| Calendar | deadlines, seasons, events of the audience | write once into `brand/strategy.md` |
| Own results | `work/results/` (08-learn.md) | the best long-term signal |

Take the **mechanism** from outliers, never their words, pictures or sound.

## 2.4 Force variety

1. **Grid:** draw 10 cells from format × bucket × emotion × hook type × family, so that every allowed format and every bucket appears.
2. **Lenses:** attack each cell from several angles – the viewer late at night, the character, against the common advice, the comment someone would write, the human's own week.
3. **Verbalized sampling** ([Zhang et al. 2025](https://arxiv.org/abs/2510.01171)): ask for 3 ideas *with their probability* of being suggested by a language model, then 3 more *each below 0.10*. Reported diversity gain: 1.6–2.1× at similar quality.

That yields roughly 100 raw ideas per week. One line each: cell · lens · idea · four formula parts · probability.

## 2.5 Humour is assembled, not invented

Language models are better at making jokes unfunny than at inventing funny ones. A humour idea must name: a **real pain** (from dictation, comments, audience wording) + a **mechanism** (recognition, POV, escalation, broken expectation, personification, comparison, ranking, running gag) + the **character's role**. "Funny because funny" is out.

## 2.6 Filter

1. **Duplicates:** an idea that only rewords another raw idea or one in `memory.jsonl` is out – same thought counts, not same words.
2. **Hard yes/no:** all four formula parts present · doable with `brand/assets.md` · `brand/rules.md` respected · no number without a source · no bait.
3. **Hook probe:** write one quick hook sentence. If there is no clean hook, the idea is weak – out.

## 2.7 Rank in a separate pass

Re-read the survivors as a judge, not as the author. Same shape for all (hook line + 3 beats + 1 picture) so length does not win. Score with one decimal **plus a confidence** (0–100 %): understood muted in 2 s? · does the viewer recognise themselves? · contrast? · would they send it to a friend? · shows the project without feeling like an ad? Then compare the top 20 in pairs, each pair in **both orders** (judges have position bias – [Shi et al.](https://arxiv.org/abs/2406.07791)); disagreement = tie.

Output: `work/ideas/<week>-shortlist.md` – 10 ideas, at least one per bucket, formats spread as evenly as the allowed formats permit (at most 2 per format when 5 or more formats are possible; with fewer formats, at most 3) – then run [03-hooks.md](03-hooks.md) on each. Append every raw idea to `work/ideas/memory.jsonl`.
