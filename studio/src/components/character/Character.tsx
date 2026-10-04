// Character from PNG poses – the one building block no library had (see CREDITS.md).
// Motion values from the craft research: hop with the pose swap at the apex, squash on
// landing with volume kept (sx = 1/sy), spring {15, 180, 0.8} (~8 % overshoot),
// breathing 2 s in / 3 s out at ±1.2 %. Pattern after stefanwittwer/remotion-animated (MIT).
import React from "react"
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion"
import { z } from "zod"

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const
const LAND = { damping: 15, stiffness: 180, mass: 0.8 }

export const characterSchema = z.object({
  kind: z.literal("character").default("character"),
  /** Pose name → image path under public/ (e.g. "brand/assets/character/shocked.png"). */
  poses: z.record(z.string(), z.string()),
  /** Pose changes over time (seconds from the beat start). The first entry is the entrance. */
  timeline: z.array(z.object({ at: z.number().min(0), pose: z.string() })).min(1),
  /** Where the character's feet stand, as canvas fractions. */
  x: z.number().default(0.5),
  y: z.number().default(0.86),
  /** Height in pixels. */
  height: z.number().default(820),
  /** How the character arrives: hop from below, pop (scale), or none. */
  entrance: z.enum(["hop", "pop", "none"]).default("hop"),
  /** Subtle idle breathing. */
  breathe: z.boolean().default(true),
  /** Mirror horizontally. */
  flip: z.boolean().default(false),
})
export type CharacterProps = z.infer<typeof characterSchema>

export const Character: React.FC<CharacterProps> = ({ poses, timeline, x, y, height, entrance, breathe, flip }) => {
  const f = useCurrentFrame()
  const { fps, width, height: H } = useVideoConfig()
  const keys = timeline.map((k) => ({ frame: Math.round(k.at * fps), pose: k.pose }))

  // Entrance
  const start = keys[0].frame
  const inSpring = spring({ frame: f - start, fps, config: LAND })
  const enterY = entrance === "hop" ? (1 - inSpring) * 260 : 0
  const enterScale = entrance === "pop" ? 0.6 + 0.4 * inSpring : 1
  const visible = f >= start

  // Pose changes after the entrance: a hop, swap at the apex (4 frames after take-off)
  let pose = keys[0].pose
  let hopY = 0
  let sy = 1
  for (let i = 1; i < keys.length; i++) {
    const t = f - keys[i].frame
    if (t >= 4) pose = keys[i].pose
    if (t >= -4 && t <= 30) {
      const duck = interpolate(t, [-4, 0, 2], [0, 1, 0], { ...clamp, easing: Easing.out(Easing.quad) })
      const arc = interpolate(t, [0, 4, 8], [0, -1, 0], { ...clamp, easing: Easing.inOut(Easing.quad) })
      const flight = interpolate(t, [0, 2, 6, 8], [0, 1, 1, 0], clamp)
      const land = t >= 8 ? 1 - spring({ frame: t - 8, fps, config: LAND }) : 0
      hopY = arc * height * 0.045
      sy = 1 - 0.1 * duck + 0.08 * flight - 0.12 * land
    }
  }

  // Breathing: 2 s in, 3 s out
  const p = (((f - start) / fps) % 5 + 5) % 5
  const breath = p < 2 ? Easing.inOut(Easing.sin)(p / 2) : 1 - Easing.inOut(Easing.sin)((p - 2) / 3)
  const breathY = breathe ? 1 + 0.012 * breath : 1

  // Entrance squash on landing
  const enterSquash = entrance === "hop" && f - start < 20 ? 1 - 0.1 * Math.max(0, inSpring - 0.9) : 1

  const scaleY = sy * breathY * enterSquash
  const scaleX = 1 / scaleY
  const src = poses[pose] ?? Object.values(poses)[0]
  if (!visible || !src) return null

  return (
    <Img
      src={/^(\/|https?:)/.test(src) ? src : staticFile(src)}
      style={{
        position: "absolute",
        height,
        left: x * width,
        top: y * H - height,
        transform: `translateX(-50%) translateY(${enterY + hopY}px) scale(${(flip ? -1 : 1) * scaleX * enterScale}, ${scaleY * enterScale})`,
        transformOrigin: "50% 100%",
      }}
    />
  )
}
