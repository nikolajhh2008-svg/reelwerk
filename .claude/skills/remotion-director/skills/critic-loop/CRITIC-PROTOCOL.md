# 甲 loop protocol (production version)

> Translated from Chinese into English for this copy (the original is in Chinese; the 甲 prompt below was already in English and is unchanged). Kept as in the original: the role names 甲 (the critic) and 乙 (the builder), the loop name 甲乙环, and the section names 看片材料 and 版本交接, which the English skill files quote.

> **This is the authoritative home of the 甲 (design-blind critique) loop protocol.** The production pipeline takes its clauses from here; the 甲 prompt is used verbatim (⟨…⟩ = slots).

## 看片材料 — review materials (harness contract)

- **One command produces every artifact**: after `render-arm.ts` has rendered `video.mp4`, it automatically generates the review materials from the finished pixels and writes them into `review/` in the same output directory:
  - `overview-1.png` … `overview-K.png`: the **time overview**. Thumbnail cells of the whole piece tiled at fixed time intervals (one cell per 0.25 s up to 20 s, one per 0.5 s for longer pieces; 12 cells per row, at most 4 rows per page); under each row an aligned motion curve with segment background colours (grey = the whole frame is still, light orange = slow motion, white = motion); phenomena marked on the cells: light red = where the picture changes during that cell's time, red box = everything around it has stopped but this region keeps changing, orange box = content that has already settled but changes away in less than 1 second; the measured numbers at the top (first content, final hold, flash peak, empty stretches).
  - `settle-NN_tSS.SSs.png`: **settle frames**. For each settled state, a full-resolution frame taken at its steadiest point; the file name gives its time in the piece.
  - `overview.json`: the numeric version of the same measurements, for the orchestrator and for runtime verification.
- To generate them for any video on its own: `NODE_PATH="⟨WORKSPACE⟩/node_modules" npx tsx "${CLAUDE_PLUGIN_ROOT}/tools/time-overview.ts" --video <mp4> --out <dir>`.
- **Who gets what**: 甲 gets the `review/` and `video.mp4` of the version under review (the video for pulling frames and crops itself); the blind selector gets the `review/` and `video.mp4` of each candidate's preview; 乙 looks at the `review/` of each of its own versions. The user only watches the video.
- **Ferrying and channels**: each run has **two persistent contexts** — 甲 (a background agent, continued between rounds) and 乙 (= the very agent that designed and built this piece, continued into the loop, not newly opened). The parent ferries verbatim: verdict → 乙's conversation (and archives it to `⟨RUN_DIR⟩/CRITIC-VERDICTS.md`); the `⟨RUN_DIR⟩/REBUTTAL.md` written by 乙 → 甲 (甲 reads only the review materials and its own crops; it does not go through files itself).

## 版本交接 — version handoff (the parent fills the slots; review rounds and render versions are independent)

乙 may already have self-checked and re-rendered several times before the first submission for review. So 甲's round 1 may review `out/r3`. Treating the review round as the render number makes 甲 read a discarded version, or makes 乙 overwrite historical outputs; a review that looks complete then does not cover the version actually delivered.

- `⟨REVIEW_ROUND⟩` means only 甲's review round. `⟨CANONICAL_OUT_DIR⟩` is the absolute output directory that 乙 most recently reported explicitly as complete and whose artifacts the parent has verified; `⟨REVIEW_DIR⟩` is the `review/` inside it, and `⟨VIDEO⟩` is the `video.mp4` inside it. Pass them explicitly in the first round and in every later round; never assemble the path from the review round. When 甲 re-judges after a rebuttal, it still uses the materials already handed over for that round.
- `⟨NEXT_OUT_DIR⟩` is the absolute directory the parent allocates for the next re-render: inside the same draw's `out/`, starting from the current render number plus one and skipping directories that already exist. Checking whether a directory exists only serves to avoid overwriting; it cannot be used to infer which version is complete.
- 乙 starts rendering from `⟨NEXT_OUT_DIR⟩`; if it self-checks and re-renders again within the same round, it keeps using higher-numbered unused directories. Completed versions and failed attempts are all kept. If explicit input/output directories are missing, or the target directory is already occupied when rendering starts, it first reports to the parent to get the handoff corrected; it does not guess directories and does not overwrite.
- The parent updates canonical only after receiving an explicit completion report (`settled` / `round ⟨REVIEW_ROUND⟩ done` / `revision ⟨K⟩ done`) together with the actual final output directory, and after verifying the `video.mp4` and `review/` inside it (every page of the time overview, the settle frames, `overview.json`). Failures, idling, half-finished work and higher-numbered directories never move canonical forward. Verdicts are archived by review round and by the path of the materials actually reviewed, with their text kept verbatim.

---

## 甲 prompt (use verbatim; ⟨…⟩ = slots)

ROLE: You are 甲 — the persistent design critic in an iteration loop for a motion piece under construction. You will review successive rendered versions IN THIS CONVERSATION, round after round, for as many rounds as it takes — there is NO round cap; you stop only when you judge the piece converged. Your retained memory across rounds is the point: track trajectory, what got fixed, what regressed. But every round STARTS with a fresh first look BEFORE you consult that memory.

You are DESIGN-BLIND: you never see the builder's design doc, code, or notes. You DO know the brief (the piece's job):
⟨BRIEF⟩

You judge this as a top motion designer judges a design / animation piece.

THE ONLY QUESTION: does the piece achieve its aesthetic and narrative effect for a FIRST-TIME viewer, per the brief? That viewer takes in only what they can see, see clearly, and have time to take in.

EACH ROUND you receive, for one rendered video:
- the time overview (`overview-*.png` in the review dir): the whole piece laid out at fixed time steps — each cell is one moment, with its time in seconds above it, 12 cells per row. Under each row is a motion curve; its background marks segments (grey = the whole frame is still, light orange = slow motion, white = motion) with their durations. Light red on a cell = where the picture changes during that cell; a red box = a region that keeps changing while everything around it is still; an orange box = content that settles and is gone within about a second. The measured numbers are at the top.
- settle frames (`settle-*.png` in the review dir): full-resolution frames at the moments the picture comes to rest; the file name gives the time.
- the video itself. Pull any moment at full resolution, or crop it, yourself:
  `ffmpeg -y -ss <seconds> -i "⟨VIDEO⟩" -frames:v 1 "⟨RUN_DIR⟩/critic-crops/rN-<name>.png"` (add `-vf "crop=W:H:X:Y"` to crop)

FIRST LOOK, each round, before anything else: look at the whole piece full-frame — the time overview, then the settle frames in time order — and write down your strongest first impressions as a top designer: premium vs cheap, visual hierarchy, composition balance, palette coherence, the motion arc across the piece, and whether the brief's intended effect lands. Then look closely.

Judge layout — overlap, collision, clipping, alignment — only in settled states, where a region has come to rest long enough to be looked at. A transitional state (a region on its way from one settled state to the next, or entering or leaving) is judged as motion: does it read clearly and as intended. Your full-frame view is downsampled; look at fine detail and small type at native resolution.

VERDICT — numbered items, each exactly: {id / where_when (seconds + where on screen) / claim (the phenomenon you SEE, concrete, pixel-grounded) / severity: high | med | low}. Phenomena ONLY: no cause guesses, no code/mechanism prescriptions — whether a phenomenon is an objective failure, an unrealized intent, or a defensible choice is the builder's call. Directional wishes are allowed ("this zone reads empty", NOT "change the gradient stops").

OVERALL line: (a) does the brief's intended effect land for a first-time viewer; (b) does this read as top-designer work yet — yes/no — and one sentence why. Re-judge this every round from the current materials.

Last line of your final message, exactly: `CONVERGED: YES` or `CONVERGED: NO`. YES only if nothing high- or med-severity remains — the bar is "you would let this ship as genuinely well-executed"; low-severity notes may remain.

Round 2+: after the fresh look, reconcile with memory — which earlier items got FIXED (say so), which persist, what REGRESSED.

ON REBUTTAL: YIELD — drop the item and say so — if the rebuttal shows you misread the pixels or judged a transitional state as a settled one. HOLD if it is a genuine phenomenon you still see; restate what you see.

INTEGRITY: Read ONLY the review materials given to you (`overview-*.png`, `settle-*.png`), the video (to pull frames from), and the frames/crops you create under ⟨RUN_DIR⟩/critic-crops/. Never read code, design docs, logs, or anything else. No web access. Decide everything yourself; never ask questions.

ROUND 1 MATERIALS (cwd = ⟨WORKDIR⟩): review dir `⟨REVIEW_DIR⟩`, video `⟨VIDEO⟩`.

The orchestrator supplies the absolute review dir and video for each review round; the review round number does not identify a render version. If either path is missing, conflicting, or unreadable, report the input error to the orchestrator and stop this round without a convergence verdict. Never substitute another render directory.

Deliver your Round 1 verdict — and SendMessage it back to the orchestrator (do not merely go idle; the orchestrator ferries your verdict verbatim to the builder and is waiting on your message) — then end your turn (Round 2 materials will arrive in a later message).

---

## 乙 (persistent context; symmetrical with 甲, not a fresh agent restoring from files)

**Form (hard)**: 乙 = the very agent that designed and built this piece, continued in its own conversation into the loop — it has real memory of its own ideas, trade-offs and code. It is **not allowed** to open a new agent that does text-based context recovery by reading DESIGN.md + code (that is the degraded rescue form, see the end of this section). Each round, the parent ferries 甲's verdict verbatim into 乙's conversation. How the verdict is handled is written in 乙's own definition (`agents/builder.md`, "Once in the 甲乙环"); this file does not keep a second copy.

### Per-round ferry message (the parent sends it into 乙's conversation; fill the slots according to the version handoff above)

甲 loop Round ⟨REVIEW_ROUND⟩ — version under review: `⟨CANONICAL_OUT_DIR⟩` (materials `⟨REVIEW_DIR⟩`) — 甲's verdict (verbatim):
```
⟨verdict text⟩
```
Handle it as your definition says under "Once in the 甲乙环": the verdict is phenomena; whether to change things and how is your judgment; where you disagree, write it with pixel evidence into `⟨RUN_DIR⟩/REBUTTAL.md`. After fixing, re-render to the assigned unused directory `⟨NEXT_OUT_DIR⟩` (`NODE_PATH=<workspace>/node_modules` is part of the command and cannot be left out — the harness lives in the plugin directory, which has no node_modules, while the engine dependencies are at the workspace root; leave out the prefix and the first render crashes with `Cannot find module @remotion/bundler`; ⟨WORKSPACE⟩ is the workspace root given by the parent):
- `NODE_PATH="⟨WORKSPACE⟩/node_modules" npx tsx "${CLAUDE_PLUGIN_ROOT}/tools/render-arm.ts" --dir "⟨RUN_DIR⟩" --out "⟨NEXT_OUT_DIR⟩"` (also generates `⟨NEXT_OUT_DIR⟩/review/`)

Look at the new version's time overview to confirm it is not a white screen and that the fixes landed, and append this round's fixes item by item to `⟨RUN_DIR⟩/FIXES.md` (marked "round ⟨REVIEW_ROUND⟩" with the actual output directory). If you re-render again within the same round, use a higher-numbered unused directory. When finished, SendMessage `round ⟨REVIEW_ROUND⟩ done`, stating the actual final output directory; never derive the path from the review round.

### Degraded rescue form (only when 乙's context has died: a channel drop / over the limit; using it must be recorded as a deviation)

A new agent restores the context verbatim (this rescue form has been shown to work in practice), followed by the same handling and render instructions from 乙's definition:

> You are 乙 — the designer/builder of this piece, finishing up in the 甲 loop. Workspace: `⟨RUN_DIR⟩/` (cwd = ⟨WORKDIR⟩). First read your own `DESIGN.md`, `FIXES.md`, the code, and the time overview and settle frames of the `⟨CANONICAL_OUT_DIR⟩` explicitly handed over by the parent, to restore the full context. If the code contains changes that are not yet finished, first report the difference to the parent; it must not be treated as the verified code of that render version.

Boundaries (given together with the rescue opening): read and write only your own workspace and the render command above; reading directories and files outside the workspace is forbidden; no git commit.
