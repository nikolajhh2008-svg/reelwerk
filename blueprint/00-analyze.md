# 0 · Analyze the project first

**Nothing else starts before this step is done.** The kit does not know what it is making videos for. The project does. This step reads the project – its code, its docs, its website, its assets – and writes down what the videos can honestly show, who they are for, and **which kinds of video make sense for this project at all**.

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
| **Product code** (routes, pages, feature folders, API names) | the **real features**, what a user can do in the first minute, which moments are visible on screen | list routes/pages, read the main feature components; do not read everything |
| UI system (theme files, CSS variables, Tailwind config, design tokens, fonts, logo files) | colours, fonts, radius, logo, illustration or mascot files | read theme/token files and `public/` or `assets/` folders |
| Existing visuals | screenshots, screen recordings, mascot/character images, icons, product photos | list files with sizes; open the important ones |
| Existing social accounts or content (if the human names them) | what has already been tried, what worked | ask for 3 examples or analytics screenshots |
| Pricing, onboarding, legal pages | what may and may not be claimed, mandatory disclosures | read |

Rules while reading:
- **Code beats copy.** If the website claims a feature that the code does not have, the feature does not exist for the videos.
- **Never invent a screen.** Only real UI, real recordings, real assets go into videos. If nothing visual exists, say so – that changes which formats are possible.
- **Read, don't change.** The analysis never edits the project.
- Note anything sensitive you must never show (real user data, internal tools, unreleased features, personal data, secrets).

## 0.3 Find the "two-second moments"

A two-second moment is something the product does that a stranger understands **on mute, in two seconds**: a result appears, a mess becomes tidy, a number jumps, a before turns into an after. These carry the product videos.

For each candidate write: what happens on screen · where in the code/app it lives · whether a recording, a screenshot or a renderable component exists · how long it takes in real time. Rank them. Two or three strong ones are enough.

If there is no such moment, the product is hard to show – the content mix shifts toward people, story and entertainment (see 0.5).

## 0.4 Decide how the product can appear on screen

Pick the strongest option the project allows:

| Option | When | How |
|---|---|---|
| **A · Real components** | the project is a React/web app and its components can render without a backend | import them into `studio/` through a path alias (see 05-render.md, "Using the project's own UI"); fill them with example data |
| **B · Screen recordings** | the app runs locally or online | record with Playwright at phone size (e.g. 390×844 @3x) or a desktop size and crop; never record real user data |
| **C · Screenshots and images** | only static images exist | animate with camera moves and highlights |
| **D · No product visuals** | service, idea, B2B backend | character, text and story formats only |

Write the choice and the reason into `brand/project.md`.

## 0.5 Derive the content mix from the project – do not assume it

The kit knows three families of video. **Which ones fit, and in what ratio, depends on the project.** Decide with the questions below and write the answer, with reasons, into `brand/project.md`.

| Family | What it is | Fits when … | Does not fit when … |
|---|---|---|---|
| **Inform** | the viewer learns something useful in under a minute (myth vs fact, mistake + fix, how-to, numbers with a source) | the audience has a real problem they search for; the project has expertise or facts with sources | there is nothing to teach that people care about; facts cannot be sourced |
| **Entertain** | the viewer laughs or recognises themselves (POV, relatable pain, character sketch, escalation, comparison) | the audience shares a situation full of everyday pain or rituals; there is a character or a voice | the topic is sensitive or the audience expects pure seriousness |
| **Show** | the product does something visible (demo, before/after, reveal) | there are strong two-second moments (0.3) | nothing is visible (option D) |

Every video still needs a strong hook, whatever the family – informative does not mean dry (see 03-hooks.md).

Questions to settle the ratio:
1. **What does the audience already scroll for?** Look at what ranks in the niche (outliers, see 02-ideas.md). If the niche is all memes, pure lectures will die; if it is all how-tos, a few sketches stand out.
2. **What can this project say that others can't?** Expertise → inform. A character or a founder story → entertain. A visible product → show.
3. **What converts?** Show and inform usually bring the right people; entertain brings reach. Weight toward what the goal needs (01-strategy.md).
4. **What is the risk?** Health, money, law, children, education with grades: informative claims need sources; jokes must not mock the audience.

Then propose **content buckets** – 3 to 5 named series or themes – each tagged with a family, e.g. "Mistakes everyone makes (inform)", "POV: your first week (entertain)", "Watch this (show)". Buckets come from the project, never from a fixed list. Give each a share of the weekly output.

**Write it as a proposal with reasons, not as a fact.** The human confirms the mix in 01-strategy.md, and 08-learn.md moves the shares every few weeks based on real numbers.

## 0.6 Draft the brand files

| File | Content |
|---|---|
| `brand/project.md` | what the product is, for whom, two-second moments, how the product appears (A–D), content families and buckets with shares and reasons, things never to show |
| `brand/voice.md` | the template from `ig-*` skills (who we are, how we sound, positions, off-limits, proof, the ask). Fill only what the sources support; leave gaps marked `TODO (ask)` |
| `brand/rules.md` | hard rules: words never to use, claims never to make, legal disclosures, sensitive topics, data that must never appear |
| `brand/assets.md` | every usable visual with path, what it shows and what it is good for (e.g. "character, shocked → strong hook") |
| `brand/theme.json` | colours, fonts, logo path, safe dark/light backgrounds – read from the project's theme files |

## 0.7 Done when

- `brand/project.md` exists and names the content mix with reasons,
- every asset listed in `brand/assets.md` really exists at its path,
- no claim in `brand/voice.md` lacks a source in the project,
- the open questions are collected for the human – then go to [01-strategy.md](01-strategy.md).

Re-run this step when the product changes in a way the videos should show (new feature, new design), or every few months.
