// Remotion configuration for the studio. Assets are served from ./public, which links to
// ../brand/assets, ../sfx and ../work (see setup.sh).
import path from "node:path"
import { Config } from "@remotion/cli/config"

Config.setVideoImageFormat("png")
Config.setEntryPoint("src/index.ts")
// Videos live outside studio/ (work/videos/<id>/), so packages such as @remotion/media must be
// resolved from studio/node_modules as well, not only from folders above the video file.
Config.overrideWebpackConfig((c) => ({
  ...c,
  resolve: { ...c.resolve, modules: [path.resolve(process.cwd(), "node_modules"), "node_modules"] },
}))
