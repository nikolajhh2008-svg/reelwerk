#!/usr/bin/env node
// Generate the music bed for one video.
//   node studio/music.mjs work/videos/<id> [--variants 2] [--engine ace-step|lyria]
// Reads  work/videos/<id>/music.json  { "caption": "...", "bpm": 120, "durationSec": 22, "structure": "[0:00 - 0:02] ..." }
// Writes work/videos/<id>/audio/music-<n>.(wav|mp3)
//
// Engines:
//   ace-step (default, free, runs locally) – ACE-Step 1.5, MIT: https://github.com/ace-step/ACE-Step-1.5
//            installed by `sh studio/setup-music.sh`; location: $ACESTEP_DIR (default <repo>/tools/ACE-Step-1.5).
//            Tempo and length are set exactly from bpm and durationSec; "structure" is ignored.
//   lyria    (optional, paid) – Google Lyria via the Gemini API: https://ai.google.dev/gemini-api/docs/music-generation
//            key: GEMINI_API_KEY, or on macOS the keychain item "gemini-api". Uses caption + bpm + structure as the prompt.
import { execFileSync, spawnSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const args = process.argv.slice(2)
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : dflt }
const dir = path.resolve(args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--")) ?? "")
const briefFile = path.join(dir, "music.json")
if (!existsSync(briefFile)) { console.error("usage: node studio/music.mjs work/videos/<id>  (needs music.json in that folder)"); process.exit(1) }
const brief = JSON.parse(readFileSync(briefFile, "utf8"))
const variants = Number(opt("variants", "2"))
const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const aceDir = process.env.ACESTEP_DIR ?? path.join(repo, "tools", "ACE-Step-1.5")
const aceReady = existsSync(path.join(aceDir, ".venv", "bin", "python"))
const engine = opt("engine", aceReady ? "ace-step" : "lyria")

if (engine === "ace-step") {
  if (!aceReady) { console.error(`ACE-Step not found in ${aceDir} – run: sh studio/setup-music.sh`); process.exit(1) }
  const r = spawnSync(path.join(aceDir, ".venv", "bin", "python"), [path.join(repo, "studio", "music_ace.py"), dir, String(variants)], {
    stdio: ["ignore", "inherit", "pipe"], env: { ...process.env, ACESTEP_DIR: aceDir }, encoding: "utf8",
  })
  if (r.status !== 0) { console.error((r.stderr ?? "").split("\n").slice(-15).join("\n")); process.exit(1) }
  process.exit(0)
}

let key = process.env.GEMINI_API_KEY
if (!key && process.platform === "darwin") {
  try { key = execFileSync("security", ["find-generic-password", "-s", "gemini-api", "-w"], { encoding: "utf8" }).trim() } catch {}
}
if (!key) { console.error("no music engine: run `sh studio/setup-music.sh` (free, local) or set GEMINI_API_KEY for Lyria"); process.exit(1) }
const input = `${brief.caption}\nInstrumental. ${brief.bpm} BPM. Length about ${brief.durationSec} seconds.\n${brief.structure ?? ""}`
const outDir = path.join(dir, "audio")
mkdirSync(outDir, { recursive: true })
for (let n = 1; n <= variants; n++) {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({ model: opt("model", "lyria-3.5"), input }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) { console.error(`variant ${n}: HTTP ${res.status} ${JSON.stringify(body.error ?? body).slice(0, 400)}`); process.exit(1) }
  const blocks = (body.steps ?? []).filter((s) => s.type === "model_output").flatMap((s) => s.content ?? [])
  const audio = blocks.filter((b) => b.type === "audio").pop()
  if (!audio) { console.error(`variant ${n}: no audio in response`); process.exit(1) }
  writeFileSync(path.join(outDir, `music-${n}.mp3`), Buffer.from(audio.data, "base64"))
  console.log(`audio/music-${n}.mp3`)
}
