# 6 · Review – code measures, a pixel-only critic judges, the human decides

Language models judge fine motion badly ([MotionBench](https://arxiv.org/abs/2501.02955)), and a model that reads its own design doc praises its own render point by point – the same model shown the frame alone names the flaws ([remotion-director](https://github.com/Zane-0x5a/remotion-director), `HOW-IT-WORKS.md`). So each layer checks what it is good at, and **the critic never sees the code, the storyboard or the brief – only pixels.**

## 6.1 Code (from `check.json` and the mix report)

| Check | Pass |
|---|---|
| Sound | integrated −14 LUFS ±1, true peak ≤ −1 dBTP, every `CHECK` line of `mix.py` fixed or knowingly accepted |
| Sync | every hero sound within one frame of its event (both come from `timing.ts`); scene changes on measured beats (`*.beats.json`) |
| Dead time | no stretch ≥ 2 s without motion except the one planned hold; ≥ 3 s is an error |
| Length | as planned, usually 15–35 s |

## 6.2 The critic – at least three rounds

Start the `aesthetic-critic` agent once and keep the **same instance** for every round (protocol: `.claude/skills/remotion-director/skills/critic-loop/CRITIC-PROTOCOL.md`), with the checklists from `motion-grammar` (`quality-bar.md`, `critic-prompts.md`, `gauntlet.md`) and [`docs/craft.md`](../docs/craft.md). It gets what `node studio/review.mjs work/videos/<id> <round>` puts into `review/r<round>/`: the contact sheet (2 frames/s), frame strips around every transition, the four key frames at full size and at 360 px wide (phone test), and `measurements.md` with numbers only (loudness, peaks, sync offsets – the critic may not read logs or code). Its protocol returns findings, severity and `CONVERGED`; ask for the scores and questions below in each round message.

Each round:
1. Score 1–10: hook frame · readable on a phone · motion · variety · composition · brand · sound-to-picture sync (from the mix report and `check.json`).
2. Name the **three biggest problems with timestamps** and describe the wanted effect, not the fix ("at 3.4 s the line is gone before it can be read", not "add 10 frames").
3. From round 2 on: check every problem of the previous round one by one – fixed, not fixed, made worse.
4. Any new default look you spot goes onto `work/taste/banned.md`.

Also ask, every time:
- **Is there a visual idea?** Would the video still make its point with the text removed?
- **Up and down?** Does the energy rise and fall along the storyboard's tension curve – picture *and* music? A flat stretch, a middle with nothing new, music on one level from start to end → fix it.
- **Boring check:** same layout three beats in a row, text appearing the same way every time, a character standing still beside text.
- Does the end deliver what the hook promised? Anything from `brand/rules.md` broken?

Stop when every score is ≥ 8 or after five rounds; then mark it "needs human" and say why.

## 6.3 Human

The finished file goes where the human can watch it on the phone (a synced folder – path in `brand/strategy.md`), together with the "not ear-tuned yet" table from `procedural-sfx`. They watch once with sound and once muted, listen to each new sound in the table, and reply **ok** or **back** with notes in the form *timestamp – what it does to them*. Every reply goes to `work/taste/`; approved sound recipes are marked `tuned` and reused.

Then [07-publish.md](07-publish.md).
