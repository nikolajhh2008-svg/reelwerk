# 6 · Review – code measures, AI reads, human decides

Language models judge fine motion badly ([MotionBench](https://arxiv.org/abs/2501.02955)), so each layer checks what it is good at.

## 6.1 Code (from `check.json`)

| Check | Pass |
|---|---|
| Sound peak | ≤ −1 dBTP (target −3) |
| Dead time | no stretch ≥ 2 s without motion; ≥ 3 s is an error |
| Length | as planned, usually 15–35 s |

The dead-time check counts hops, text, camera and footage – not breathing or small icons. A scene that repeats the same sentence for 6+ seconds can pass the check and still feel long: judge pacing on the contact sheet too.

If dead time is flagged: add a moving layer to that scene (pose change, highlight, counter, camera move) or shorten it, render again.

## 6.2 AI (looks at `contact.jpg` and single frames)

Answer each with yes/no and the frame time:
- Hook frame (0–1 s): is the title text readable at phone size, inside the safe zone, and does the picture match it?
- Can the story be followed on mute from the contact sheet alone?
- Any placeholder text, cut-off text, overlapping elements, empty frames?
- Brand: colours and fonts from `brand/theme.json` only; nothing from `brand/rules.md` broken.
- Promise kept: does the end deliver what the hook promised?

Fix and re-render at most twice; if it still fails, mark it "needs human" and say why.

## 6.3 Human

The finished file goes where the human can watch it on the phone (a synced folder such as iCloud Drive or Google Drive – set the path in `brand/strategy.md`). They watch it once with sound and once muted and reply: **ok**, or **back** with one sentence. Every reply goes to `work/taste/`.

Then [07-publish.md](07-publish.md).
