#!/usr/bin/env node
// Build the critic's material for one review round (blueprint 06-review.md, 6.2).
//   node studio/review.mjs work/videos/<id> r1
// → work/videos/<id>/review/r1/: video.mp4 (frozen copy), contact.jpg, overview-*.png (remotion-director's
//   time-overview, if it runs), strip-*.png (frames around each transition), key-*.png (+ -phone360.png),
//   measurements.md (numbers only – the critic may not read code, logs or the storyboard).
// Optional work/videos/<id>/review.json: { "keyFrames": { "hook": 30, "middle": 230, "peak": 318, "end": 600 },
//   "transitions": [frame, …] } – otherwise key frames are spread over the video and transitions are detected.
import { execFileSync } from "node:child_process"
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const dir = path.resolve(process.argv[2] ?? "")
const label = process.argv[3]
const id = path.basename(dir)
const video = path.join(dir, `${id}.mp4`)
if (!label || !existsSync(video)) { console.error("usage: node studio/review.mjs work/videos/<id> <round, e.g. r1>  (render first)"); process.exit(1) }
const out = path.join(dir, "review", label)
if (existsSync(out)) { console.error(`${out} exists – use a new round label`); process.exit(1) }
mkdirSync(out, { recursive: true })
const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const ff = (...a) => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...a])
const sh = (cmd) => execFileSync("sh", ["-c", `${cmd} 2>&1 || true`], { encoding: "utf8" })

copyFileSync(video, path.join(out, "video.mp4"))
if (existsSync(path.join(dir, "contact.jpg"))) copyFileSync(path.join(dir, "contact.jpg"), path.join(out, "contact.jpg"))
const fps = 30
const frames = Math.round(Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", video], { encoding: "utf8" })) * fps)
const cfg = existsSync(path.join(dir, "review.json")) ? JSON.parse(readFileSync(path.join(dir, "review.json"), "utf8")) : {}

// remotion-director's time overview (optional – needs tsx)
const tov = path.join(repo, ".claude/skills/remotion-director/tools/time-overview.ts")
if (existsSync(tov)) sh(`cd "${path.join(repo, "studio")}" && npx tsx "${tov}" --video "${path.join(out, "video.mp4")}" --out "${out}"`)

// transitions: given, or detected scene changes
let transitions = cfg.transitions
if (!transitions) {
  const log = sh(`ffmpeg -hide_banner -i "${video}" -vf "select='gt(scene,0.25)',showinfo" -f null -`)
  transitions = [...log.matchAll(/pts_time:([\d.]+)/g)].map((m) => Math.round(Number(m[1]) * fps)).slice(0, 15)
  // smooth videos have few hard cuts – then take a strip every ~3 s
  if (transitions.length < 3) transitions = Array.from({ length: Math.floor(frames / (3 * fps)) }, (_, i) => (i + 1) * 3 * fps)
}
transitions.forEach((c, i) => {
  const a = Math.max(0, c - 8), b = Math.min(frames - 1, c + 8)
  ff("-i", video, "-vf", `select='between(n\\,${a}\\,${b})*not(mod(n-${a}\\,2))',scale=270:-1,tile=9x1:padding=4:color=white`, "-frames:v", "1", "-fps_mode", "passthrough",
    path.join(out, `strip-${String(i + 1).padStart(2, "0")}_t${(c / fps).toFixed(2)}s.png`))
})

// four key frames, full size and phone size
const k = cfg.keyFrames ?? { hook: fps, middle: Math.round(frames * 0.45), peak: Math.round(frames * 0.65), end: frames - fps }
Object.entries(k).forEach(([name, f], i) => {
  const base = path.join(out, `key-${i + 1}-${name}_t${(f / fps).toFixed(2)}s`)
  ff("-i", video, "-vf", `select='eq(n\\,${f})'`, "-frames:v", "1", "-fps_mode", "passthrough", `${base}.png`)
  ff("-i", `${base}.png`, "-vf", "scale=360:-1", `${base}-phone360.png`)
})

// numbers only
let md = `# Measurements (numbers only)\n\n- length ${(frames / fps).toFixed(2)} s\n`
const check = path.join(dir, "check.json")
if (existsSync(check)) {
  const c = JSON.parse(readFileSync(check, "utf8"))
  md += `- integrated loudness ${c.sound?.integratedLufs ?? "–"} LUFS, true peak ${c.sound?.truePeakDbtp ?? "–"} dBTP\n- static stretches ≥ 2 s: ${c.deadTime?.stretches?.length ? JSON.stringify(c.deadTime.stretches) : "none"}\n`
}
const mixReport = path.join(dir, "audio", "mix-report.txt")
if (existsSync(mixReport)) md += "\n## Mix report\n\n```\n" + readFileSync(mixReport, "utf8").split("\n").slice(0, 8).join("\n") + "\n```\n"
const events = path.join(dir, "audio", "events.json")
if (existsSync(events)) {
  const ev = JSON.parse(readFileSync(events, "utf8")).events ?? []
  md += "\n## Sound events\n\n| t (s) | sound |\n|---|---|\n" + ev.map((e) => `| ${Number(e.t).toFixed(2)} | ${e.name ?? e.type} |`).join("\n") + "\n"
}
writeFileSync(path.join(out, "measurements.md"), md)
console.log(out)
