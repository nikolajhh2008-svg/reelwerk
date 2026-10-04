// Everything the AI may use in a script: the installed Onda components plus the few
// reelwerk additions. Do not edit components/onda/index.ts – `ondajs add` regenerates it.
import { ondaRegistry } from "./components/onda"
import { Character, characterSchema } from "./components/character/Character"
import type { ComponentRegistry } from "./lib/onda/composition-renderer"

export const registry = {
  ...ondaRegistry,
  Character: { component: Character, schema: characterSchema },
} as unknown as ComponentRegistry
