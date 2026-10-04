#!/usr/bin/env python3
"""Measure the beat grid of a music file so picture and sound share one timeline.

  .venv/bin/python studio/beats.py work/videos/<id>/audio/music-1.mp3 [--fps 30]

Writes <music>.beats.json next to the file: tempo, beats, bar starts (every 4th beat),
onsets and a loudness curve (seconds and frames). Uses librosa's beat tracker and onset
detector (https://librosa.org). Claude cannot hear the music: cut on these numbers.
"""
import argparse
import json
import pathlib

import librosa
import numpy as np

p = argparse.ArgumentParser()
p.add_argument("music")
p.add_argument("--fps", type=int, default=30)
a = p.parse_args()

y, sr = librosa.load(a.music, sr=None, mono=True)
tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
beats = librosa.frames_to_time(beat_frames, sr=sr)
onsets = librosa.onset.onset_detect(y=y, sr=sr, units="time", backtrack=True)
rms = librosa.feature.rms(y=y)[0]
rms_t = librosa.times_like(rms, sr=sr)
step = max(1, int(len(rms) / (len(y) / sr * 2)))  # ~2 values per second
loud = [[round(float(t), 2), round(float(20 * np.log10(v + 1e-9)), 1)] for t, v in zip(rms_t[::step], rms[::step])]

f = lambda ts: [{"sec": round(float(t), 3), "frame": int(round(t * a.fps))} for t in ts]
out = {
    "file": pathlib.Path(a.music).name,
    "durationSec": round(len(y) / sr, 2),
    "tempoBpm": round(float(np.atleast_1d(tempo)[0]), 1),
    "fps": a.fps,
    "beats": f(beats),
    "bars": f(beats[::4]),
    "onsets": f(onsets),
    "loudnessDb": loud,
    "note": "bars assume 4/4 starting on the first detected beat – check against the brief's timestamps",
}
dst = pathlib.Path(a.music).with_suffix(".beats.json")
dst.write_text(json.dumps(out, indent=1))
print(f"{dst}  {out['tempoBpm']} BPM  {len(out['beats'])} beats  {len(out['onsets'])} onsets")
