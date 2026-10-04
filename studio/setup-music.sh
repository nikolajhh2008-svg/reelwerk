#!/bin/sh
# Install the free local music engine ACE-Step 1.5 (MIT, https://github.com/ace-step/ACE-Step-1.5).
# Needs uv (https://docs.astral.sh/uv/). The models (~7 GB) download on the first generation.
# Location: $ACESTEP_DIR, default <repo>/tools/ACE-Step-1.5. Point ACESTEP_DIR at an existing install to reuse it.
set -e
HERE="$(cd "$(dirname "$0")/.." && pwd)"
DIR="${ACESTEP_DIR:-$HERE/tools/ACE-Step-1.5}"
command -v uv >/dev/null || { echo "uv is required: curl -LsSf https://astral.sh/uv/install.sh | sh"; exit 1; }
if [ ! -d "$DIR/.git" ]; then
  mkdir -p "$(dirname "$DIR")"
  git clone --depth 1 https://github.com/ace-step/ACE-Step-1.5 "$DIR"
fi
cd "$DIR" && uv sync
echo "ACE-Step ready in $DIR – try: node studio/music.mjs examples/hello"
