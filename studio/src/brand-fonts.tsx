// Loads the brand fonts listed in brand/theme.json from local files (deterministic, no network at render).
import React from "react"
import { staticFile, continueRender, delayRender } from "remotion"
import { loadFont } from "@remotion/fonts"

export const BrandFonts: React.FC<{ fonts: { family: string; file: string; weight?: string }[] }> = ({ fonts }) => {
  const [handle] = React.useState(() => (fonts.length ? delayRender("brand fonts") : null))
  React.useEffect(() => {
    if (handle === null) return
    Promise.all(fonts.map((f) => loadFont({ family: f.family, url: staticFile(f.file), weight: f.weight ?? "400" })))
      .then(() => continueRender(handle))
      .catch((e) => { console.error(e); continueRender(handle) })
  }, [fonts, handle])
  return null
}
