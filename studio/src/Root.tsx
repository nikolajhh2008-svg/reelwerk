// Thin glue: one composition renders a script = Onda timeline (tracks) + optional scenes with transitions.
// Everything that moves comes from Onda components in ./components/onda (MIT) and ./components/character.
import React from "react"
import { AbsoluteFill, Composition, staticFile, type CalculateMetadataFunction } from "remotion"
import { CompositionRenderer } from "./lib/onda/composition-renderer"
import type { Composition as Payload } from "./lib/onda/composition"
import { brandToCssVars, type Brand } from "./lib/onda/theme"
import { toFrames } from "./lib/onda/timing"
import { registry } from "./registry"
import { SceneSeries, scenesLength, type Scene } from "./scenes"
import { BrandFonts } from "./brand-fonts"
import { Banner, BANNER_FRAMES } from "./banner/Banner"

export type VideoProps = {
  composition: Payload
  scenes?: Scene[]
  brand?: Brand | null
  fonts?: { family: string; file: string; weight?: string }[]
}

// Scripts use plain paths like "sfx/ui/click2.ogg", "brand/assets/…" or "work/…";
// media components need served URLs, so every such string becomes staticFile(path).
const ASSET = /^(sfx|brand|work)\//
function resolveAssets<T>(v: T): T {
  if (typeof v === "string") return (ASSET.test(v) ? staticFile(v) : v) as T
  if (Array.isArray(v)) return v.map(resolveAssets) as T
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, resolveAssets(x)])) as T
  return v
}

const Video: React.FC<VideoProps> = (raw) => {
  const { composition, scenes, brand, fonts } = resolveAssets(raw)
  return (
  <AbsoluteFill style={{ backgroundColor: brand?.bg ?? "#08080A", ...brandToCssVars(brand ?? null) }}>
    <BrandFonts fonts={raw.fonts ?? []} />
    {scenes?.length ? <SceneSeries scenes={scenes} registry={registry} /> : null}
    <CompositionRenderer composition={composition} registry={registry} brand={brand ?? null} />
  </AbsoluteFill>
  )
}

// Length = the later of: end of the scene series, end of the last beat on any track.
const calculateMetadata: CalculateMetadataFunction<VideoProps> = ({ props }) => {
  const c = props.composition
  const tracksEnd = Math.max(1, ...c.tracks.flatMap((t) => t.entries.map((e) => toFrames(e.at, c.fps) + toFrames(e.for, c.fps))))
  const scenesEnd = props.scenes?.length ? scenesLength(props.scenes, c.fps) : 0
  return { fps: c.fps, width: c.width, height: c.height, durationInFrames: c.durationInFrames ?? Math.max(tracksEnd, scenesEnd) }
}

const leer: Payload = { fps: 30, width: 1080, height: 1920, tracks: [{ entries: [{ at: 0, for: 2, component: "WordStagger", props: { text: "Pass a script with --props" } }] }] }

export const Root: React.FC = () => (
  <>
    <Composition id="Video" component={Video} width={1080} height={1920} fps={30} durationInFrames={60} defaultProps={{ composition: leer }} calculateMetadata={calculateMetadata} />
    {/* README banner and GitHub social preview */}
    <Composition id="BannerLight" component={Banner} width={1280} height={440} fps={30} durationInFrames={BANNER_FRAMES} defaultProps={{ theme: "light" as const }} />
    <Composition id="BannerDark" component={Banner} width={1280} height={440} fps={30} durationInFrames={BANNER_FRAMES} defaultProps={{ theme: "dark" as const }} />
    <Composition id="SocialPreview" component={Banner} width={1280} height={640} fps={30} durationInFrames={BANNER_FRAMES} defaultProps={{ theme: "light" as const }} />
  </>
)
