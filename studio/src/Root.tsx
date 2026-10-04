// Every video is its own file, written from scratch: work/videos/<id>/Video.tsx
//   export const meta = { durationInFrames: 600, fps: 30, width: 1080, height: 1920 }
//   export default function Video() { … }
// This file only finds those files and registers them as compositions "v-<id>".
import React from "react"
import { Composition } from "remotion"
import { BrandFonts } from "./brand-fonts"
import { Banner, BANNER_FRAMES } from "./banner/Banner"

type Meta = { durationInFrames: number; fps?: number; width?: number; height?: number }
type VideoModule = { default: React.FC; meta: Meta }

declare const require: { context: (dir: string, deep: boolean, re: RegExp) => { keys: () => string[]; (k: string): VideoModule } }
const videos = require.context("../../work/videos", true, /^\.\/[^/]+\/Video\.tsx$/)
// Key frames of a direction before the full build (blueprint 04, 4.3): work/videos/<id>/<a|b>/Keyframes.tsx → "k-<id>-<a|b>"
const keyframes = require.context("../../work/videos", true, /^\.\/[^/]+\/[^/]+\/Keyframes\.tsx$/)

const withFonts = (C: React.FC): React.FC => () => (
  <>
    <BrandFonts />
    <C />
  </>
)

export const Root: React.FC = () => (
  <>
    {videos.keys().map((k) => {
      const id = k.split("/")[1]
      const mod = videos(k)
      const m = mod.meta
      return (
        <Composition key={id} id={`v-${id}`.replace(/[^a-zA-Z0-9-]/g, "-")} component={withFonts(mod.default)}
          durationInFrames={m.durationInFrames} fps={m.fps ?? 30} width={m.width ?? 1080} height={m.height ?? 1920} />
      )
    })}
    {keyframes.keys().map((k) => {
      const [, id, dir] = k.split("/")
      const mod = keyframes(k)
      const m = mod.meta
      return (
        <Composition key={`${id}-${dir}`} id={`k-${id}-${dir}`.replace(/[^a-zA-Z0-9-]/g, "-")} component={withFonts(mod.default)}
          durationInFrames={m.durationInFrames} fps={m.fps ?? 30} width={m.width ?? 1080} height={m.height ?? 1920} />
      )
    })}
    {/* README banner and GitHub social preview */}
    <Composition id="BannerLight" component={Banner} width={1280} height={440} fps={30} durationInFrames={BANNER_FRAMES} defaultProps={{ theme: "light" as const }} />
    <Composition id="BannerDark" component={Banner} width={1280} height={440} fps={30} durationInFrames={BANNER_FRAMES} defaultProps={{ theme: "dark" as const }} />
    <Composition id="SocialPreview" component={Banner} width={1280} height={640} fps={30} durationInFrames={BANNER_FRAMES} defaultProps={{ theme: "light" as const }} />
  </>
)
