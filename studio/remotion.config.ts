// Remotion configuration for the studio. Assets are served from ./public, which links to
// ../brand/assets, ../sfx and ../work (see setup.sh).
import { Config } from "@remotion/cli/config"

Config.setVideoImageFormat("png")
Config.setEntryPoint("src/index.ts")
