# 3 · Hooks – the first three seconds decide

Skills: `viral-hooks` (batch across types, three layers), `hook-writing` and `hook-tactics` (layers written separately), `ig-reel` (26 formulas, `hookscore.py`), `artem-viral-hooks` (audit: the four hook killers, every flag with a quote). This file adds what those skills do not know about faceless, coded videos.

**Every** video needs a strong hook – informative ones too. Informative means useful, not dry.

## 3.1 What a hook must do

A hook has two jobs: **topic clarity** (the viewer knows at once what this is about) and **on-target curiosity** (they believe it is for them and want the next sentence). Kallaway's four S: **subject**, **stakes** (what do I get), **speed** (compression, not fast talking), **super clear** (one reading only).

Order in the viewer's head: **stop** (picture, motion, contrast to the feed) → **context** (title text: what is this?) → **contrast** (what they expect vs what you say – state the common belief, then flip it; stated contrast beats implied).

## 3.2 The three layers – for videos without a face or voice

| Layer | Here | Weight |
|---|---|---|
| **Title text** | big text roughly a third from the top, inside the safe zone – not the captions | **most important**: eyes hunt for text and spot keywords faster than they parse an image (Kallaway, "The Psychology of Killer Hooks", 2026) |
| **First line** | the character's first speech bubble, the first caption line or slide 2 | second |
| **Picture** | first frame in motion: character pose, product moment, zoom | supports; a small move is enough, don't overdo it |

All three must say the same thing. "Confusion leads to churn."

**Title text rules:** subject word (the term the audience uses – for entertainment: the situation, e.g. the moment from the viewer's life, not the product) + exactly one pull element (pain reminder, desired outcome, "something changed" – or, for entertainment, the absurd turn) · concrete where true · max ~7 words, max 2 lines, break where you would pause · no punctuation except quotes and parentheses · no "and/or/but/because" · stays on screen ≥ 3 s.

## 3.3 The lock-in zone (seconds 3–10)

Right after the hook the viewer checks: **is the hook's promise confirmed?** For *inform* and *show* videos also **can I trust this sender?** – there the lever is **proof** (the real product as an illustration, a source visible, a real comment). For **entertainment** the lock-in is the **premise confirmed and escalating** – the situation gets worse, weirder or funnier within seconds; no proof, no product needed.

## 3.4 Make a batch

Per idea: title lines across at least 6 different hook types (`ig-reel` formulas, Kallaway's six archetypes via `viral-hooks`, the six levers and first-frame patterns of `storytelling-hooks`, the hook pattern library of `short-form-video` – for entertainment lead with visual first-frame hooks: mid-action, an odd object, a broken expectation), about 3 per type, plus one verbalized-sampling round (only candidates below 0.10). Then build **3 full packages** per idea from the best lines – not more. A full package is: title text · first line · picture (which asset, which motion) · sound (one SFX on the first frame or silence) · **the one question the viewer now has** · lock-in line · proof (inform/show) or escalation (entertainment). If no clean hook comes out after two tries, send the idea back to 02-ideas.md.

## 3.5 Audit, then rank

1. `artem-viral-hooks` audit on every candidate: delay · confusion · irrelevance · disinterest – each **pass** or **flag with the exact words quoted**.
2. Hard checks: three layers agree · title text rules met · picture uses a real asset · the video keeps the promise · `brand/rules.md` respected · not a near-copy of a recent hook · no banned opener ("hey guys", logo first, "you won't believe", empty "POV:", CTA first).
3. Rank in a separate pass, pairs in both orders, scores with confidence.

Output: 3 packages from 3 different types per idea, into `work/ideas/<week>/<idea-key>-hooks.json`. A video ID (`work/videos/<id>/`) is only given when an idea is actually built.

## 3.6 The human picks – this is not optional

LLM judges overrate AI humour badly: in the New Yorker caption contest a GPT-4 judge let AI captions win 54 % against the best human ones; a former New Yorker cartoon editor preferred them 1.6 % of the time ([Zhang et al. 2024](https://arxiv.org/abs/2406.10522)). Ranking is a proposal. The human answers with numbers and letters, e.g. `2b, 5a, 7c`, and every pick or rejection (with a short reason) goes to `work/taste/`. The next run reads it.
