#!/usr/bin/env node
// Render one video from its script and check it.
//   node render.mjs ../work/videos/<id>/props.json
// Writes next to the script: <id>.mp4, contact.jpg (one frame every 0.5 s), check.json.
// Steps: render with Remotion → set the sound peak to -3 dBTP (craft rule: SFX file
// is not normalised to a loudness target) → contact sheet → measurements.
import { execFileSync } from "node:child_process"
import { existsSync, writeFileSync, renameSync, rmSync } from "node:fs"
import path from "node:path"

const propsPath = path.resolve(process.argv[2] ?? "")
if (!existsSync(propsPath)) {
  console.error("usage: node render.mjs <path/to/props.json>")
  process.exit(1)
}
const dir = path.dirname(propsPath)
const id = path.basename(dir)
const out = path.join(dir, `${id}.mp4`)
const raw = path.join(dir, `.${id}-raw.mp4`)
const TARGET_TP = -3 // dBTP peak for embedded sound effects

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts })
const parse = (txt) => {
  const pick = (re) => { const m = [...txt.matchAll(re)].pop(); return m ? Number(m[1]) : null }
  return { lufs: pick(/I:\s+(-?[\d.]+) LUFS/g), truePeak: pick(/Peak:\s+(-?[\d.]+) dBFS/g) }
}
// ebur128 prints its summary to stderr; read it through a shell so the exit code does not matter
const statsTxt = (file) => parse(execFileSync("sh", ["-c", `ffmpeg -hide_banner -nostats -i "${file}" -af ebur128=peak=true -f null - 2>&1 || true`], { encoding: "utf8" }))

// 1) Render
console.log(`render ${id} …`)
run("npx", ["remotion", "render", "Video", raw, `--props=${propsPath}`, "--log=error"], { cwd: path.dirname(new URL(import.meta.url).pathname), stdio: "inherit" })

// 2) Sound peak to -3 dBTP (video stream copied untouched)
const before = statsTxt(raw)
if (before.truePeak !== null && Number.isFinite(before.truePeak) && before.truePeak > -70) {
  const gain = (TARGET_TP - before.truePeak).toFixed(2)
  execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", raw, "-c:v", "copy", "-af", `volume=${gain}dB`, "-c:a", "aac", "-b:a", "192k", out])
  rmSync(raw)
} else {
  renameSync(raw, out) // silent video
}
const after = statsTxt(out)

// 3) Contact sheet: one frame every 0.5 s
const duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], { encoding: "utf8" }).trim())
const tiles = Math.ceil(duration / 0.5)
const cols = 6
execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", out, "-vf", `fps=2,scale=270:-1,tile=${cols}x${Math.ceil(tiles / cols)}:padding=6:color=white`, "-frames:v", "1", path.join(dir, "contact.jpg")])

// 4) Dead time: stretches of ≥ 2 s where nothing visibly moves (craft rule: ≤ 2 s, error from 3 s)
const freezeTxt = execFileSync("sh", ["-c", `ffmpeg -hide_banner -nostats -i "${out}" -vf freezedetect=n=0.002:d=2 -map 0:v -f null - 2>&1 || true`], { encoding: "utf8" })
const starts = [...freezeTxt.matchAll(/freeze_start: ([\d.]+)/g)].map((m) => Number(m[1]))
const durs = [...freezeTxt.matchAll(/freeze_duration: ([\d.]+)/g)].map((m) => Number(m[1]))
const deadTime = starts.map((st, i) => ({ fromSec: Number(st.toFixed(2)), lengthSec: Number((durs[i] ?? duration - st).toFixed(2)) }))

// 5) Measurements
const check = {
  id,
  file: path.basename(out),
  durationSec: Number(duration.toFixed(2)),
  sound: { truePeakDbtp: after.truePeak, integratedLufs: after.lufs, target: `${TARGET_TP} dBTP peak`, ok: after.truePeak === null || after.truePeak <= -1 },
  deadTime: { stretches: deadTime, ok: deadTime.every((d) => d.lengthSec < 3), rule: "nothing static for 2 s or more; 3 s or more is an error" },
  contactSheet: "contact.jpg",
}
writeFileSync(path.join(dir, "check.json"), JSON.stringify(check, null, 2))
console.log(JSON.stringify(check, null, 2))
