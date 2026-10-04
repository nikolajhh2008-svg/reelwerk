# 2 · Ideas – many, different, then few

Skills: `viral-short-form-ideas` (pillars, matrix, mining), `ig-viral` (outlier swipe file), `trend-jacking` and `meme-and-culture` (is a trend fit and safe?), `tt-trend-mapper` and `trend-jacker` (format transfer), `creative-director-methods` (bisociation), `verbalized-sampling`. This file says how to use them for this project.

## 2.1 Load material first

Every idea run reads: `brand/project.md`, `brand/strategy.md`, `brand/voice.md`, `brand/rules.md`, `brand/assets.md`, the newest file in `work/radar/` and `work/raw/`, everything in `work/taste/`, and `work/ideas/memory.jsonl` (every idea ever made, with status). **Without real material every model produces the same average ideas** – in one study, answers from different model families were 71–82 % similar ([Jiang et al., "Artificial Hivemind", NeurIPS 2025](https://arxiv.org/abs/2510.22954)). A second model or a higher temperature does not fix this; material and constraints do.

## 2.2 The formula

Every idea names four parts, or it is not an idea:

> **Signal × Mechanism × Project truth × Viewer**

- **Signal** – why now: a date, a trend, a common question, an outlier, something the human experienced this week. **A trend can come from anywhere in culture** – a meme, a format, a sound, a series everyone watches – and need not have anything to do with the niche. The content is the project's; the trend only lends its structure (2.4).
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
| Culture-wide trend radar, weekly | automatic and allowed: imgflip `get_memes` (new entries vs last week), Google Trends RSS for the country, YouTube Data API `mostPopular` (music, gaming), trend round-ups such as Later's TikTok/Reels trends read by web search; by hand (≈ 20 min): TikTok and Instagram apps, YouTube "Top songs in Shorts", Spotify Viral 50 | everything into `work/radar/<week>.md`; never scrape TikTok, Instagram, Reddit, Spotify or X |
| Calendar | deadlines, seasons, events of the audience | write once into `brand/strategy.md` |
| Own results | `work/results/` (08-learn.md) | the best long-term signal |

Take the **mechanism** from outliers, never their words, pictures or sound.

## 2.4 Trend transfer – borrow the structure, fill in our truth

1. **Trend card** per radar find (format of `trend-jacker`, fields of `tt-trend-mapper` and `meme-and-culture`): type (sound / format / meme / story pattern / culture moment) · source and date · **native structure** (beat, joke, expected cut) · origin and meaning · life stage (rising, peak, saturated) · rights (is the sound usable on a business account? can we rebuild the picture ourselves?).
2. **Gate** (`trend-jacking`): safe? (its absolute no-gos plus `brand/rules.md`) · fit? (a bridge to the viewer's world, explainable in under 30 s). Fails → out. Sitting a trend out is a feature.
3. **Transfer:** cross each card with 2–3 random cells of the grid (2.5) using the three bridges of `trend-jacker` (translate / against the grain / insider) and one bisociation from `creative-director-methods`. Every idea names **mechanism, not surface**: which structure is kept, what is replaced.
4. **Score** with `tt-trend-mapper` (0–8): long-lived format or rising moment = 2, at its peak = 1, saturated = 0. Below 6 → out.
5. **Cringe check** on the shortlist: would someone send it to a friend without embarrassment? Is there already a meme about the trend being dead? "One week later it flopped – why?"

Two lanes: the **weekly lane** uses long-lived formats and story patterns; an optional **fast lane** takes at most one rising moment per week and needs the human's go within 48 h – otherwise it expires.

Humour on its own does not travel; in the strongest study it worked only together with timeliness or surprise ([Borah et al. 2020, "Improvised Marketing Interventions", Journal of Marketing 84(2)](https://eprints.whiterose.ac.uk/id/eprint/154774/)).

## 2.5 Force variety

1. **Grid:** draw 10 cells from format × bucket × emotion × hook type × family, so that every allowed format and every bucket appears.
2. **Lenses:** attack each cell from several angles – the viewer late at night, the character, against the common advice, the comment someone would write, the human's own week.
3. **Verbalized sampling** (`verbalized-sampling`, [Zhang et al. 2025](https://arxiv.org/abs/2510.01171)): ask for 3 ideas *with their probability* of being suggested by a language model, then 3 more *each below 0.10*. Reported diversity gain: 1.6–2.1× at similar quality.
4. **Ask for something different:** keep all earlier ideas and `memory.jsonl` in context and ask explicitly for an idea that is unlike all of them and goes beyond the usual categories.

Named creativity frameworks (SCAMPER, Six Hats, personas) showed little effect over plain prompting in the studies we found – generate many, then select in a separate pass.

That yields roughly 100 raw ideas per week. One line each: cell · lens · idea · four formula parts · probability.

## 2.6 Humour is assembled, not invented

Language models are better at making jokes unfunny than at inventing funny ones. A humour idea must name: a **real pain** (from dictation, comments, audience wording) + a **mechanism** (recognition, POV, escalation, broken expectation, personification, comparison, ranking, running gag) + the **character's role**. "Funny because funny" is out.

## 2.7 Filter

1. **Duplicates:** an idea that only rewords another raw idea or one in `memory.jsonl` is out – same thought counts, not same words.
2. **Hard yes/no:** all four formula parts present · doable with `brand/assets.md` · `brand/rules.md` respected · no number without a source · no bait.
3. **Hook probe:** write one quick hook sentence. If there is no clean hook, the idea is weak – out.

## 2.8 Rank in a separate pass

Re-read the survivors as a judge, not as the author. Same shape for all (hook line + 3 beats + 1 picture) so length does not win. Score with one decimal **plus a confidence** (0–100 %): understood muted in 2 s? · does the viewer recognise themselves? · contrast? · would they send it to a friend? · shows the project without feeling like an ad? Then compare the top 20 in pairs, each pair in **both orders** (judges have position bias – [Shi et al.](https://arxiv.org/abs/2406.07791)); disagreement = tie.

Output: `work/ideas/<week>-shortlist.md` – 10 ideas, at least one per bucket, formats spread as evenly as the allowed formats permit (at most 2 per format when 5 or more formats are possible; with fewer formats, at most 3) – then run [03-hooks.md](03-hooks.md) on each. Append every raw idea to `work/ideas/memory.jsonl`.
