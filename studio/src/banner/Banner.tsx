// README banner and social preview – rendered with the studio's own Onda components.
import React from "react"
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion"
import { loadFont as loadInter } from "@remotion/google-fonts/Inter"
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono"
import { WordStagger, wordStaggerSchema } from "../components/onda/word-stagger/WordStagger"
import { Highlight, highlightSchema } from "../components/onda/highlight/Highlight"
import { CountUp, countUpSchema } from "../components/onda/count-up/CountUp"
import { brandToCssVars } from "../lib/onda/theme"

const { fontFamily: INTER } = loadInter("normal", { weights: ["400", "500", "800"], subsets: ["latin"] })
const { fontFamily: MONO } = loadMono("normal", { weights: ["400"], subsets: ["latin"] })

export const BANNER_FRAMES = 210 // 7 s loop

type Theme = "light" | "dark"
const C = {
  light: { bg: "#F7F7F8", dot: "rgba(15,15,18,0.10)", text: "#0F0F12", dim: "#5C5F66", accent: "#4F7DF3", pill: "#FFFFFF", line: "rgba(15,15,18,0.10)", phone: "#DCDDE1" },
  dark: { bg: "#0B0B0D", dot: "rgba(255,255,255,0.07)", text: "#F4F4F5", dim: "#A1A1AA", accent: "#7A9CF6", pill: "#18181B", line: "rgba(255,255,255,0.10)", phone: "#26262B" },
} as const
const STEPS = ["Analyze", "Ideas", "Hooks", "Script", "Render", "Review"]
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const
const ein = (f: number, a: number, d: number) => interpolate(f, [a, a + d], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) })
const aus = (f: number, a: number, d: number) => interpolate(f, [a, a + d], [1, 0], { ...clamp, easing: Easing.bezier(0.3, 0, 0.8, 0.15) })

const Tick: React.FC<{ on: number; color: string; bg: string }> = ({ on, color, bg }) => (
  <svg width={20} height={20} viewBox="0 0 22 22">
    <circle cx={11} cy={11} r={10} fill={color} opacity={0.18 + 0.82 * on} />
    <path d="M6.5 11.3l3 3 6-6.3" fill="none" stroke={bg} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - on} />
  </svg>
)

// The phone screen is a small 1080×1920 canvas scaled down, so the Onda components render exactly as in a real video.
const PhoneVideo: React.FC = () => {
  const f = useCurrentFrame()
  const fade = aus(f, 190, 16)
  const brand = { bg: "#0B0B0D", text: "#F4F4F5", dim: "#A1A1AA", accent: "#4F7DF3", accentSoft: "#7A9CF6", fontDisplay: INTER, fontBody: INTER }
  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0B0D", opacity: fade, ...brandToCssVars(brand) }}>
      <Sequence from={6} durationInFrames={70}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 420, paddingLeft: 90, paddingRight: 90 }}>
          <WordStagger {...wordStaggerSchema.parse({ text: "Everyone says you need more followers", justify: "center", fontWeight: 800, fontSize: 104, color: "#F4F4F5", fontFamily: INTER, lineHeight: 1.08 })} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={76} durationInFrames={60}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 520 }}>
          <Highlight {...highlightSchema.parse({ text: "You need better hooks", fontSize: 80, fontWeight: 800, fontFamily: INTER })} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={136} durationInFrames={74}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <CountUp {...countUpSchema.parse({ from: 0, to: 70, suffix: "%", fontSize: 300, fontFamily: INTER })} />
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 640 }}>
          <div style={{ fontFamily: INTER, color: "#A1A1AA", fontSize: 54, fontWeight: 500 }}>goal: still watching after 3 s</div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}

export const Banner: React.FC<{ theme: Theme }> = ({ theme }) => {
  const f = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const c = C[theme]
  const tall = height > 500
  const phoneH = tall ? 540 : 396
  const phoneW = Math.round((phoneH * 9) / 16)
  const s = (phoneW - 14) / 1080
  return (
    <AbsoluteFill style={{ backgroundColor: c.bg, fontFamily: INTER }}>
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs><pattern id="p" width={24} height={24} patternUnits="userSpaceOnUse"><circle cx={2} cy={2} r={1.2} fill={c.dot} /></pattern></defs>
        <rect width={width} height={height} fill="url(#p)" />
      </svg>
      <div style={{ position: "absolute", left: 84, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: tall ? 22 : 15 }}>
        <div style={{ fontSize: tall ? 104 : 92, fontWeight: 800, color: c.text, letterSpacing: -3.5, lineHeight: 1 }}>reelwerk<span style={{ color: c.accent }}>.</span></div>
        <div style={{ fontSize: tall ? 30 : 27, color: c.dim, letterSpacing: -0.3 }}>Organic short-form videos from code – made by your AI.</div>
        <div style={{ fontFamily: MONO, fontSize: tall ? 17 : 15, color: c.dim }}>Claude Code · Remotion · Onda · TikTok · Reels · Shorts</div>
        <div style={{ display: "flex", gap: 9, marginTop: tall ? 18 : 10 }}>
          {STEPS.map((name, i) => {
            const on = ein(f, 30 + i * 22, 10) * aus(f, 190, 16)
            return (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 13px 8px 9px", borderRadius: 999, background: c.pill, border: `1.5px solid ${c.line}`, fontSize: 17, fontWeight: 500, color: c.text }}>
                <Tick on={on} color={c.accent} bg={c.pill} />
                {name}
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ position: "absolute", right: tall ? 150 : 140, top: (height - phoneH) / 2, width: phoneW, height: phoneH, borderRadius: 30, background: c.phone, padding: 7, boxShadow: theme === "light" ? "0 18px 40px rgba(15,15,18,0.12)" : "0 18px 40px rgba(0,0,0,0.5)" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", background: "#0B0B0D" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, transform: `scale(${s})`, transformOrigin: "0 0" }}>
            <PhoneVideo />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  )
}
