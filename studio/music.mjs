#!/usr/bin/env node
// Generate the music bed for one video with Google Lyria (Gemini API).
//   node studio/music.mjs work/videos/<id> [--variants 2] [--model lyria-3.5|lyria-3-clip-preview]
// Reads  work/videos/<id>/music.md   (the music brief, timestamps allowed: "[0:00 - 0:03] …")
// Writes work/videos/<id>/audio/music-<n>.mp3 and music-<n>.txt (structure / lyrics the model returns).
// Key: GEMINI_API_KEY, or on macOS the keychain item "gemini-api" (security add-generic-password -s gemini-api -a "$USER" -w).
// Docs: https://ai.google.dev/gemini-api/docs/music-generation
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const args = process.argv.slice(2)
const opt = (name, dflt) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : dflt }
const dir = path.resolve(args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--")) ?? "")
const brief = path.join(dir, "music.md")
if (!existsSync(brief)) { console.error("usage: node studio/music.mjs work/videos/<id>  (needs music.md in that folder)"); process.exit(1) }
const variants = Number(opt("variants", "2"))
const model = opt("model", "lyria-3.5")

let key = process.env.GEMINI_API_KEY
if (!key && process.platform === "darwin") {
  try { key = execFileSync("security", ["find-generic-password", "-s", "gemini-api", "-w"], { encoding: "utf8" }).trim() } catch {}
}
if (!key) { console.error("no API key: set GEMINI_API_KEY (or keychain item 'gemini-api' on macOS)"); process.exit(1) }

const input = readFileSync(brief, "utf8")
const outDir = path.join(dir, "audio")
mkdirSync(outDir, { recursive: true })

for (let n = 1; n <= variants; n++) {
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({ model, input }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) { console.error(`variant ${n}: HTTP ${res.status} ${JSON.stringify(body.error ?? body).slice(0, 400)}`); process.exit(1) }
  const blocks = (body.steps ?? []).filter((s) => s.type === "model_output").flatMap((s) => s.content ?? [])
  const audio = blocks.filter((b) => b.type === "audio").pop()
  const text = blocks.filter((b) => b.type === "text").map((b) => b.text).join("\n")
  if (!audio) { console.error(`variant ${n}: no audio in response`); process.exit(1) }
  writeFileSync(path.join(outDir, `music-${n}.mp3`), Buffer.from(audio.data, "base64"))
  if (text) writeFileSync(path.join(outDir, `music-${n}.txt`), text)
  console.log(`audio/music-${n}.mp3`)
}
