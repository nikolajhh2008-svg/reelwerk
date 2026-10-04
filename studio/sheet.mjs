#!/usr/bin/env node
// Render the four key frames of each direction and put them on one sheet (blueprint 04-script.md, 4.3).
//   node studio/sheet.mjs work/videos/<id>
// Needs work/videos/<id>/<a|b>/Keyframes.tsx (4 frames: hook, middle, peak, end) – registered as k-<id>-<a|b>.
// Writes <a|b>/key-1.png … key-4.png, <a|b>/sheet.jpg and sheet.jpg (both directions, a on top).
import { execFileSync } from "node:child_process"
import { existsSync, readdirSync } from "node:fs"
import path from "node:path"

const dir = path.resolve(process.argv[2] ?? "")
const id = path.basename(dir)
const studio = path.dirname(new URL(import.meta.url).pathname)
const dirs = existsSync(dir) ? readdirSync(dir).filter((d) => existsSync(path.join(dir, d, "Keyframes.tsx"))).sort() : []
if (!dirs.length) { console.error("usage: node studio/sheet.mjs work/videos/<id>  (needs <a|b>/Keyframes.tsx)"); process.exit(1) }
const ff = (...a) => execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...a])

for (const d of dirs) {
  const comp = `k-${id}-${d}`.replace(/[^a-zA-Z0-9-]/g, "-")
  for (let f = 0; f < 4; f++) {
    execFileSync("npx", ["remotion", "still", comp, path.join(dir, d, `key-${f + 1}.png`), `--frame=${f}`, "--log=error"], { cwd: studio, stdio: "inherit" })
  }
  ff(...[1, 2, 3, 4].flatMap((n) => ["-i", path.join(dir, d, `key-${n}.png`)]), "-filter_complex",
    "[0][1][2][3]hstack=inputs=4,scale=2160:-1", path.join(dir, d, "sheet.jpg"))
}
ff(...dirs.flatMap((d) => ["-i", path.join(dir, d, "sheet.jpg")]), "-filter_complex", dirs.length > 1 ? `vstack=inputs=${dirs.length}` : "null", path.join(dir, "sheet.jpg"))
console.log(path.join(dir, "sheet.jpg"))
