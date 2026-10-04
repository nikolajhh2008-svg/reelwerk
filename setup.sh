#!/bin/sh
# reelwerk setup – run once after cloning.
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

command -v node >/dev/null || { echo "Node.js 20+ is required: https://nodejs.org"; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg is required (macOS: brew install ffmpeg)"; exit 1; }

# 1) Official Remotion skills (no licence file, so not shipped here) at the pinned versions
DISABLE_TELEMETRY=1 npx -y skills experimental_install

# 2) Studio dependencies (Remotion and friends, pinned)
cd studio
npm install --no-audit --no-fund
npm rebuild esbuild >/dev/null 2>&1 || true
cd ..

echo
echo "Done. Start your AI agent in this folder (e.g. 'claude') and say: analyse my project."
