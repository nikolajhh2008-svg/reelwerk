---
name: anidoodle-storytelling
description: Storytelling rules for short animated films from anidoodle - a transformation stated as two words with an arrow, a turn on a named frame, a token that comes back changed, a flaw that heals - plus its research-ledger and storyboard rules for explainers. Use when finding the visual idea and story of a video before storyboarding or building it.
---

> **Source:** [alexgreensh/anidoodle](https://github.com/alexgreensh/anidoodle) · Copyright 2026 Alex Greenshpun · Licensed under the Apache License 2.0, see `LICENSE` and `NOTICE` in this folder.
>
> **Modified:** this file combines two upstream files: `skills/anidoodle/references/storytelling.md` (complete, unchanged) and the sections "The research ledger" and "The storyboard" from `skills/anidoodle/references/workflows/explainer.md` (unchanged). The frontmatter and this note were added; the rest of anidoodle (the engine, styles and other references, and the worked example in `example/` that the text mentions) is not included.

# The story is the point

> Doctrine earned making MECHANICAL LEPIDOPTERA, the worked example in `example/`. Every rule
> below was paid for on that film; where a mistake was the director's own it says so, because
> a rule with its scar attached is one people keep.

**The mistake.** The brief we started from was "one clockwork butterfly, drawn four ways": blueprint, risograph, watercolour, editorial cutaway. Four acts, four lovely looks. We built three of them. Each one opened on a blank sheet, made its picture, flapped five times and held. It was a style reel with a butterfly in it. Nobody was moved, because nothing happened to anybody. The client's correction was one sentence, and it is the best note in this document: *it is BUILT, then it comes ALIVE and outgrows its own blueprint.* The editorial act was cut whole. The riso act was cut a few hours later. The film got better each time something beautiful was removed.

**Why it works this way.** An audience forgives a rough drawing in a story and resents a gorgeous one without. Style is how you say it. If there is no "it", style is a screensaver.

**What a film needs, even at 60 seconds:**

- **A transformation you can state as two words with an arrow.** Ours: built → alive. If yours is a list ("then we see it in riso"), it is not a story yet.
- **A hook in the first three seconds.** Ours: a bare sheet starts drawing itself. A question is planted: what is it making? No logos, no blank holds, no "establishing" anything.
- **A turn you can point to on the timeline.** Ours is frame 545: one drop of water lands on the blueprint. Everything before is a hand making a drawing; everything after is the drawing doing what no hand did. The turn should be caused by something IN the world of the film. Water develops cyanotypes and lifts their blue, so water is an honest bridge from blueprint to watercolour. We had no honest bridge from printer's ink to watercolour, which is how we knew the riso act did not belong.
- **An escalation that is physical.** Ours is one continuous pull-back, macro to wide, and every widening is released by a take-off. The camera is not decorating the story, it IS the story: the world gets bigger because the creature does.
- **A visual token that comes back changed.** Ours: the blueprint sheet. It is the whole world in Act 1. At the end it is a small blue rectangle lying in the grass with a butterfly-shaped blank where the drawing used to be, and the winding key left on it, no longer needed. Nobody points at it. The audience finds it, and that is the payoff. Plant the token early, never explain it, bring it back small.
- **A flaw that heals.** In Act 1 one wing panel never seats. It hangs on its projection lines through the whole blueprint. When the creature wakes, that panel slides home and stays a different colour for ever: the blueprint's blue, carried into life. One imperfection, set up and paid off, does more than any amount of polish.
- **A resolve, then room.** The signature lands on the final downbeat and then there are five beats to read it. End on the beat, then let it breathe. Never end ON the last event.

**Before / after.**

| | Before | After |
|---|---|---|
| Logline | One creature drawn four ways | It is built, then it comes alive and leaves its blueprint behind |
| Structure | 4 acts x (blank, build, flap, hold) | Act 1 builds it. One unbroken shot brings it to life and opens the world |
| Medium changes | 3, because we had 4 styles | 1, because the story has 2 states |
| Ending | Hold on finished print | The sheet in the grass, the key left behind, a signature |

**Tests before you build.** Say it in three sentences. Name the frame of the turn. Name the token and the two frames where it appears. For every shot ask "what changed for the character"; a shot where the answer is "the rendering style" is a shot to cut. And: every element in frame gets a one-line reason. In our meadow each flower colour, the footpath and the sun all had one. The oval bokeh blobs had none, and they were the first thing the eye caught as fake.

**No dead air.** The first riso and watercolour acts were static for half their length and opened on three seconds of empty stock. The rule since: something visibly moves in every second, from frame 0, and a "hold" means the camera creeps while the subject keeps living. Check it with a tool (per-frame changed-pixel fraction, no identical consecutive frames, no 15-frame window under half a percent) and ALSO by eye: a creeping camera changes every pixel and satisfies the tool while the eye sees a still. We shipped a second of exactly that before I caught it on the contact sheet.

---

# From `workflows/explainer.md`

## The research ledger (before the storyboard)

For every claim the piece makes: the claim in one sentence, the source (URL or exact passage),
your confidence, and what you are simplifying. A claim you cannot source is cut or clearly shown
as a metaphor. Numbers on screen come from the ledger, and each carries its source in a comment
beside the code that draws it. Record the audience (age band, expertise) because it sets the
reading level and the pace.

## The storyboard (`STORYBOARD.md`)

One row per chapter or shot: claim id, the one-sentence takeaway, the on-screen caption, the
visual metaphor and where it stops being literal, what the recurring character or token does,
the frame range on the beat grid, the music and sound cues, the transition out. Show it for
review when the person wants that step; otherwise build from it.
