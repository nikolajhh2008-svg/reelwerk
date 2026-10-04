// Example video, written from scratch: one idea, three beats, motion built by hand.
// Copy this folder to work/videos/<id>/ and render: node studio/render.mjs work/videos/<id>
import React from "react"
import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion"
import { brand } from "../../../studio/src/brand"

export const meta = { durationInFrames: 270, fps: 30, width: 1080, height: 1920 }

const C = brand.brand
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const

// Words rise in one after another (spring per word, 4 frames apart)
const Rise: React.FC<{ text: string; size: number; delay?: number }> = ({ text, size, delay = 0 }) => {
  const f = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.26em", fontFamily: C.fontDisplay, fontWeight: 800, fontSize: size, color: C.text, lineHeight: 1.1, textAlign: "center", maxWidth: 900 }}>
      {text.split(" ").map((w, i) => {
        const p = spring({ frame: f - delay - i * 4, fps, config: { damping: 18, stiffness: 300, mass: 0.6 } })
        return <span key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 36}px)` }}>{w}</span>
      })}
    </div>
  )
}

// A stack of paper that grows, wobbles, then collapses – the "visual idea" of this example
const Stack: React.FC = () => {
  const f = useCurrentFrame()
  const sheets = Math.round(interpolate(f, [0, 40], [0, 14], { ...clamp, easing: Easing.out(Easing.cubic) }))
  const collapse = interpolate(f, [60, 75], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) })
  return (
    <div style={{ position: "absolute", left: 540, bottom: 420, transform: "translateX(-50%)" }}>
      {Array.from({ length: sheets }).map((_, i) => {
        const wobble = Math.sin((f + i * 7) / 6) * (i / 14) * 6 * (1 - collapse)
        const fall = collapse * (i * 38) * (i % 2 ? 1 : -1)
        return (
          <div key={i} style={{ position: "absolute", left: -170 + wobble + fall, bottom: i * 26 * (1 - collapse), width: 340, height: 22, borderRadius: 4,
            background: i === sheets - 1 ? C.accent : C.surface, border: `2px solid ${C.border}`, transform: `rotate(${collapse * (i % 3 - 1) * 25}deg)` }} />
        )
      })}
    </div>
  )
}

export default function Video() {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence durationInFrames={95}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 360 }}><Rise text="More pages are not more value" size={92} /></AbsoluteFill>
        <Stack />
      </Sequence>
      <Sequence from={95} durationInFrames={90}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><Rise text="One clear question beats fifty pages" size={96} /></AbsoluteFill>
      </Sequence>
      <Sequence from={185}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}><Rise text="Start with the question." size={110} /></AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
