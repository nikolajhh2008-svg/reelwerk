// The brand, read from brand/theme.json – colours, fonts, character poses, logo.
// Every video imports this instead of hard-coding colours or paths.
import { staticFile } from "remotion"
import theme from "../../brand/theme.json"

export type Theme = typeof theme
export const brand = theme
/** Shortcut for the colours and fonts: colors.bg, colors.accent, colors.fontDisplay … (same as brand.brand). */
export const colors = theme.brand

/** Served URL for a file in the repo: asset("brand/assets/…"), asset("sfx/…"), asset("work/videos/<id>/…"). */
export const asset = (path: string) => staticFile(path)

/** Served URL for a character pose by its key in brand/theme.json → character.poses. */
export const pose = (key: string) => {
  const poses = (theme.character?.poses ?? {}) as Record<string, string>
  const p = poses[key]
  if (!p) throw new Error(`Unknown pose "${key}" – see brand/theme.json character.poses`)
  return staticFile(p)
}
