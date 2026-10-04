// Thin glue: scenes with transitions between them.
// Onda's <CompositionRenderer> renders parallel tracks of beats but no transitions
// (see Onda docs "Timeline & transitions"). This follows the pattern documented there:
// <TransitionSeries> from @remotion/transitions with Onda's own transition factories.
import React from "react"
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion"
import { TransitionSeries, linearTiming } from "@remotion/transitions"
import { z } from "zod"
import { toFrames } from "./lib/onda/timing"
import { entrySchema } from "./lib/onda/composition"
import type { ComponentRegistry } from "./lib/onda/composition-renderer"
import { ondaTransitions } from "./components/onda"

const layerSchema = entrySchema.extend({ at: entrySchema.shape.at.default(0), for: entrySchema.shape.for.optional() })

export const sceneSchema = z.object({
  /** Scene length (time spec like Onda: "0:02.5", "2.5s" or seconds). */
  for: z.union([z.string(), z.number()]),
  /** Components shown together in this scene; `at`/`for` are relative to the scene start. */
  layers: z.array(layerSchema).min(1),
  /** Transition INTO this scene (ignored on the first scene). Name = key of ondaTransitions. */
  transition: z
    .object({
      name: z.string(),
      options: z.record(z.string(), z.unknown()).default({}),
      for: z.union([z.string(), z.number()]).default(0.5),
    })
    .optional(),
})
export type Scene = z.infer<typeof sceneSchema>

/** Total length of a scene list in frames (transitions overlap neighbouring scenes). */
export function parseScenes(raw: unknown[]): Scene[] {
  return raw.map((s) => sceneSchema.parse(s))
}

export function scenesLength(rawScenes: unknown[], fps: number): number {
  const scenes = parseScenes(rawScenes)
  return scenes.reduce((sum, s, i) => sum + toFrames(s.for, fps) - (i > 0 && s.transition ? toFrames(s.transition.for, fps) : 0), 0)
}

const Layer: React.FC<{ layer: z.infer<typeof layerSchema>; registry: ComponentRegistry; sceneFrames: number }> = ({ layer, registry, sceneFrames }) => {
  const { fps } = useVideoConfig()
  const reg = registry[layer.component]
  if (!reg) return <Fehler text={`Unknown component '${layer.component}'`} />
  const parsed = reg.schema.safeParse(layer.props)
  if (!parsed.success) return <Fehler text={`Invalid props for '${layer.component}': ${parsed.error.message}`} />
  const from = toFrames(layer.at, fps)
  const dur = layer.for !== undefined ? toFrames(layer.for, fps) : sceneFrames - from
  const Component = reg.component
  return (
    <Sequence from={from} durationInFrames={Math.max(1, dur)} layout="absolute-fill">
      <Component {...(parsed.data as Record<string, unknown>)} />
    </Sequence>
  )
}

const Fehler: React.FC<{ text: string }> = ({ text }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", color: "#ff6b6b", fontSize: 28, padding: 60, textAlign: "center" }}>{text}</AbsoluteFill>
)

export const SceneSeries: React.FC<{ scenes: unknown[]; registry: ComponentRegistry }> = ({ scenes: raw, registry }) => {
  const { fps } = useVideoConfig()
  const scenes = parseScenes(raw)
  return (
    <TransitionSeries>
      {scenes.map((scene, i) => {
        const frames = toFrames(scene.for, fps)
        const t = i > 0 ? scene.transition : undefined
        const factory = t ? (ondaTransitions as unknown as Record<string, { factory: (o: never) => never }>)[t.name]?.factory : undefined
        return (
          <React.Fragment key={i}>
            {t && factory ? (
              <TransitionSeries.Transition presentation={factory(t.options as never)} timing={linearTiming({ durationInFrames: toFrames(t.for, fps) })} />
            ) : null}
            <TransitionSeries.Sequence durationInFrames={frames}>
              <AbsoluteFill>
                {scene.layers.map((layer, j) => (
                  <Layer key={j} layer={layer} registry={registry} sceneFrames={frames} />
                ))}
              </AbsoluteFill>
            </TransitionSeries.Sequence>
          </React.Fragment>
        )
      })}
    </TransitionSeries>
  )
}
