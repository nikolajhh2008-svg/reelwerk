#!/usr/bin/env node
// Render one video and measure it.
//   node render.mjs ../work/videos/<id> [--draft]  (folder with Video.tsx; --draft = half resolution, for previews)
// Writes into that folder: <id>.mp4, contact.jpg (one frame every 0.5 s), check.json.
// Earlier renders are kept in renders/ (<id>-v1.mp4 …) for before/after.
// The mix is the video's job: this script does NOT change the sound, it only measures it.
import { execFileSync } from "node:child_process"
import { existsSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, statSync } from "node:fs"
import path from "node:path"

let dir = path.resolve(process.argv[2] ?? "")
if (existsSync(dir) && statSync(dir).isFile()) dir = path.dirname(dir)
if (!existsSync(path.join(dir, "Video.tsx"))) {
  console.error("usage: node render.mjs <work/videos/<id>> (folder containing Video.tsx)")
  process.exit(1)
}
const id = path.basename(dir)
const comp = `v-${id}`.replace(/[^a-zA-Z0-9-]/g, "-")
const out = path.join(dir, `${id}.mp4`)
const studio = path.dirname(new URL(import.meta.url).pathname)

// 0) Keep the previous render for before/after
if (existsSync(out)) {
  const hist = path.join(dir, "renders")
  mkdirSync(hist, { recursive: true })
  const n = readdirSync(hist).filter((f) => f.endsWith(".mp4")).length + 1
  copyFileSync(out, path.join(hist, `${id}-v${n}.mp4`))
  if (existsSync(path.join(dir, "contact.jpg"))) copyFileSync(path.join(dir, "contact.jpg"), path.join(hist, `${id}-v${n}-contact.jpg`))
}

// 1) Render
console.log(`render ${comp} …`)
const draft = process.argv.includes("--draft") // half resolution for previews and critic rounds
execFileSync("npx", ["remotion", "render", comp, out, "--log=error", ...(draft ? ["--scale=0.5"] : [])], { cwd: studio, stdio: "inherit" })

// 2) Measure sound (EBU R128 integrated loudness + true peak) – no changes
const sh = (cmd) => execFileSync("sh", ["-c", `${cmd} 2>&1 || true`], { encoding: "utf8" })
const r128 = sh(`ffmpeg -hide_banner -nostats -i "${out}" -af ebur128=peak=true -f null -`)
const last = (re) => { const m = [...r128.matchAll(re)].pop(); return m ? Number(m[1]) : null }
const hasAudio = /Audio:/.test(sh(`ffprobe -hide_banner "${out}"`))
const lufs = hasAudio ? last(/I:\s+(-?[\d.]+) LUFS/g) : null
const truePeak = hasAudio ? last(/Peak:\s+(-?[\d.]+) dBFS/g) : null

// 3) Contact sheet
const duration = Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], { encoding: "utf8" }).trim())
const cols = 6
execFileSync("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", out, "-vf", `fps=2,scale=270:-1,tile=${cols}x${Math.ceil(Math.ceil(duration / 0.5) / cols)}:padding=6:color=white`, "-frames:v", "1", path.join(dir, "contact.jpg")])

// 4) Dead time: ≥ 2 s without visible change
const fz = sh(`ffmpeg -hide_banner -nostats -i "${out}" -vf freezedetect=n=0.002:d=2 -map 0:v -f null -`)
const starts = [...fz.matchAll(/freeze_start: ([\d.]+)/g)].map((m) => Number(m[1]))
const durs = [...fz.matchAll(/freeze_duration: ([\d.]+)/g)].map((m) => Number(m[1]))
const deadTime = starts.map((st, i) => ({ fromSec: +st.toFixed(2), lengthSec: +(durs[i] ?? duration - st).toFixed(2) }))

const check = {
  id,
  file: path.basename(out),
  durationSec: +duration.toFixed(2),
  sound: hasAudio
    ? { integratedLufs: lufs, truePeakDbtp: truePeak, clipping: truePeak !== null && truePeak > -1, note: "measured only – the mix is decided in the video" }
    : { none: true, note: "no audio track – music is added in the app" },
  deadTime: { stretches: deadTime, ok: deadTime.every((d) => d.lengthSec < 3), rule: "nothing static for 2 s or more; 3 s or more is an error" },
  contactSheet: "contact.jpg",
}
writeFileSync(path.join(dir, "check.json"), JSON.stringify(check, null, 2))
console.log(JSON.stringify(check, null, 2))
