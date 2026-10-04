#!/usr/bin/env python3
"""Generate the music bed locally with ACE-Step 1.5 (MIT, https://github.com/ace-step/ACE-Step-1.5).

Called by studio/music.mjs with ACE-Step's own Python:
  $ACESTEP_DIR/.venv/bin/python studio/music_ace.py <video dir> <variants>
Reads <video dir>/music.json, writes <video dir>/audio/music-<n>.wav.
Calls follow ACE-Step's docs/en/INFERENCE.md (Quick Start, Text2Music).
"""
import json
import os
import pathlib
import platform
import shutil
import sys

video = pathlib.Path(sys.argv[1]).resolve()
variants = int(sys.argv[2]) if len(sys.argv) > 2 else 2
brief = json.loads((video / "music.json").read_text())
root = os.environ["ACESTEP_DIR"]
os.chdir(root)
sys.path.insert(0, root)

from acestep.handler import AceStepHandler  # noqa: E402
from acestep.inference import GenerationConfig, GenerationParams, generate_music  # noqa: E402
from acestep.llm_inference import LLMHandler  # noqa: E402

apple = sys.platform == "darwin" and platform.machine() == "arm64"
device = "mps" if apple else ("cuda" if shutil.which("nvidia-smi") else "cpu")
backend = "mlx" if apple else ("vllm" if device == "cuda" else "pt")

dit, llm = AceStepHandler(), LLMHandler()
dit.initialize_service(project_root=root, config_path="acestep-v15-turbo", device=device)
llm.initialize(checkpoint_dir=os.path.join(root, "checkpoints"), lm_model_path="acestep-5Hz-lm-0.6B", backend=backend, device=device)

params = GenerationParams(
    caption=brief["caption"],
    lyrics="[Instrumental]",
    instrumental=True,
    bpm=int(brief["bpm"]),
    duration=float(brief["durationSec"]),
)
out = video / "audio"
out.mkdir(exist_ok=True)
res = generate_music(dit, llm, params, GenerationConfig(batch_size=variants, audio_format="wav"), save_dir=str(out / "_ace"))
if not res.success:
    sys.exit(f"ACE-Step failed: {res.error}")
for n, a in enumerate(res.audios, 1):
    dst = out / f"music-{n}.wav"
    shutil.move(a["path"], dst)
    print(f"audio/{dst.name}")
shutil.rmtree(out / "_ace", ignore_errors=True)
