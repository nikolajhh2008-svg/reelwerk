# 0 · Analyze the project first

**Nothing else starts before this step is done.** The kit does not know what it is making videos for. The project does. This step reads the project – its code, its docs, its website – to **understand** it: what it really does, who it is for, and **which kinds of video make sense for this project at all**. Nothing visual is taken from the project: no components, no animations, no screenshots, no recordings. Every video is built from scratch (04-script.md); the only given visuals are the brand files (colours, fonts, character, logo).

Output: `brand/project.md` (the analysis), plus first drafts of `brand/voice.md`, `brand/rules.md`, `brand/assets.md` and `brand/theme.json`. The human confirms or corrects them in one short round (see 01-strategy.md). From then on every later step reads these files instead of guessing.

## 0.1 Where the project lives

Ask once, in one message, and accept any combination:
- a path to the codebase on this machine,
- a URL (website, app store page, docs),
- a short description in the human's own words (voice dictation is fine).

If there is a codebase, it is the most valuable source: it shows what the product *actually does*, not what the marketing says.

## 0.2 What to read, in this order

| Source | What to extract | How |
|---|---|---|
| `README`, docs, landing page copy | promise, audience, vocabulary the project already uses | read |
| **Product code** (routes, pages, feature folders, API names) | the **real features** and what a user can do in the first minute – so videos only claim what exists | list routes/pages, read the main feature components; do not read everything |
| Theme files (CSS variables, Tailwind config, design tokens), logo, character/mascot images | colours, fonts, logo, character poses – **the only visuals the videos may use** | read theme/token files; list character and logo files |
| Existing social accounts or content (if the human names them) | what has already been tried, what worked | ask for 3 examples or analytics screenshots |
| Pricing, onboarding, legal pages | what may and may not be claimed, mandatory disclosures | read |

Rules while reading:
- **Code beats copy.** If the website claims a feature that the code does not have, the feature does not exist for the videos.
- **Never take visuals from the project, never fake a real screen.** Features are shown as illustrations built from scratch in the video – clearly drawn, never pretending to be a real screenshot.
- **Read, don't change.** The analysis never edits the project.
- Note anything sensitive you must never show (real user data, internal tools, unreleased features, personal data, secrets).

## 0.3 Find the "two-second moments"

A two-second moment is something the product does that a stranger understands **on mute, in two seconds**: a result appears, a mess becomes tidy, a number jumps, a before turns into an after. These carry the product videos – drawn and animated from scratch as a visual idea, not recorded.

For each candidate write: what happens · where in the product it lives (so the claim is true) · how it could be shown as a drawn, animated idea. Rank them. Two or three strong ones are enough.

## 0.5 Derive the content mix from the project – do not assume it

The kit knows three families of video. **Which ones fit, and in what ratio, depends on the project.** Decide with the questions below and write the answer, with reasons, into `brand/project.md`.

| Family | What it is | Fits when … | Does not fit when … |
|---|---|---|---|
| **Inform** | the viewer learns something useful in under a minute (myth vs fact, mistake + fix, how-to, numbers with a source) | the audience has a real problem they search for; the project has expertise or facts with sources | there is nothing to teach that people care about; facts cannot be sourced |
| **Entertain** | the viewer laughs or recognises themselves (POV, relatable pain, character sketch, escalation, comparison) | the audience shares a situation full of everyday pain or rituals; there is a character or a voice | the topic is sensitive or the audience expects pure seriousness |
| **Show** | what the product does, as an animated idea (before/after, transformation, reveal) | there are strong two-second moments (0.3) | the product's value cannot be shown as a picture |

Every video still needs a strong hook, whatever the family – informative does not mean dry (see 03-hooks.md).

Questions to settle the ratio:
1. **What does the audience already scroll for?** Look at what ranks in the niche (outliers, see 02-ideas.md). If the niche is all memes, pure lectures will die; if it is all how-tos, a few sketches stand out.
2. **What can this project say that others can't?** Expertise → inform. A character or a founder story → entertain. A product with a clear before/after → show.
3. **What converts?** Show and inform usually bring the right people; entertain brings reach. Weight toward what the goal needs (01-strategy.md).
4. **What is the risk?** Health, money, law, children, education with grades: informative claims need sources; jokes must not mock the audience.

Then propose **content buckets** – 3 to 5 named series or themes – each tagged with a family, e.g. "Mistakes everyone makes (inform)", "POV: your first week (entertain)", "Watch this (show)". Buckets come from the project, never from a fixed list. Give each a share of the weekly output.

**Write it as a proposal with reasons, not as a fact.** The human confirms the mix in 01-strategy.md, and 08-learn.md moves the shares every few weeks based on real numbers.

## 0.6 Draft the brand files

| File | Content |
|---|---|
| `brand/project.md` | what the product is, for whom, two-second moments, content families and buckets with shares and reasons, things never to show or claim |
| `brand/voice.md` | the template from `ig-*` skills (who we are, how we sound, positions, off-limits, proof, the ask). Fill only what the sources support; leave gaps marked `TODO (ask)` |
| `brand/rules.md` | hard rules: words never to use, claims never to make, legal disclosures, sensitive topics, data that must never appear |
| `brand/assets.md` | the brand visuals only – character poses and logo – with path and what each is good for (e.g. "character, shocked → strong hook") |
| `brand/theme.json` | colours, fonts, logo path, safe dark/light backgrounds – read from the project's theme files |

## 0.7 Done when

- `brand/project.md` exists and names the content mix with reasons,
- every asset listed in `brand/assets.md` really exists at its path and is a brand visual (character, logo),
- no claim in `brand/voice.md` lacks a source in the project,
- the open questions are collected for the human – then go to [01-strategy.md](01-strategy.md).

Re-run this step when the product changes in a way the videos should show (new feature, new design), or every few months.
