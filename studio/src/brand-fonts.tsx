// Loads the brand fonts from brand/theme.json (local files – deterministic, no network at render).
import React from "react"
import { staticFile, continueRender, delayRender } from "remotion"
import { loadFont } from "@remotion/fonts"
import { brand } from "./brand"

type Font = { family: string; file: string; weight?: string }

export const BrandFonts: React.FC = () => {
  const fonts = ((brand as { fonts?: Font[] }).fonts ?? []) as Font[]
  const [handle] = React.useState(() => (fonts.length ? delayRender("brand fonts") : null))
  React.useEffect(() => {
    if (handle === null) return
    Promise.all(fonts.map((f) => loadFont({ family: f.family, url: staticFile(f.file), weight: f.weight ?? "400" })))
      .then(() => continueRender(handle))
      .catch((e) => { console.error(e); continueRender(handle) })
  }, [fonts, handle])
  return null
}
