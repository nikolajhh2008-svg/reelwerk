#!/usr/bin/env python3
"""Measure the beat grid of a music file so picture and sound share one timeline.

  .venv/bin/python studio/beatgrid.py work/videos/<id>/audio/music-1.wav [--bpm 120] [--fps 30]

Writes <music>.beats.json next to the file: tempo, beats, bar starts (every 4th beat),
onsets, a loudness curve and leading/trailing silence (seconds and frames).
--bpm is the tempo you asked for (default: "bpm" from the video's music.json, if any); the grid is
locked to it, because a free beat tracker often locks onto half or double tempo. Without --bpm
(e.g. a track from the music pool) the tempo is tracked freely.
Uses librosa (https://librosa.org). Claude cannot hear the music: cut on these numbers.
(Not to be confused with ig-reel's beats.py, which times a spoken script.)
"""
import argparse
import json
import pathlib

import librosa
import numpy as np

p = argparse.ArgumentParser()
p.add_argument("music")
p.add_argument("--bpm", type=float, default=None)
p.add_argument("--fps", type=int, default=30)
a = p.parse_args()

music = pathlib.Path(a.music).resolve()
asked = a.bpm
if asked is None:
    for brief in (music.parent / "music.json", music.parent.parent / "music.json"):
        if brief.exists():
            asked = json.loads(brief.read_text()).get("bpm")
            break

y, sr = librosa.load(str(music), sr=None, mono=True)
if asked:
    free, _ = librosa.beat.beat_track(y=y, sr=sr)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr, bpm=float(asked), tightness=400)
    free = float(np.atleast_1d(free)[0])
else:
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
tempo = float(np.atleast_1d(tempo)[0])
beats = librosa.frames_to_time(beat_frames, sr=sr)
onsets = librosa.onset.onset_detect(y=y, sr=sr, units="time", backtrack=True)
rms = librosa.feature.rms(y=y)[0]
rms_t = librosa.times_like(rms, sr=sr)
db = 20 * np.log10(rms + 1e-9)
step = max(1, int(len(rms) / (len(y) / sr * 2)))  # ~2 values per second
loud = [[round(float(t), 2), round(float(v), 1)] for t, v in zip(rms_t[::step], db[::step])]
audible = rms_t[db > db.max() - 40]
lead = float(audible[0]) if len(audible) else 0.0
trail = float(len(y) / sr - audible[-1]) if len(audible) else 0.0

f = lambda ts: [{"sec": round(float(t), 3), "frame": int(round(t * a.fps))} for t in ts]
warnings = []
if asked and abs(free - asked) / asked > 0.03:
    warnings.append(f"free tracking found {free:.1f} BPM, the grid is locked to the asked {asked} BPM – check the first beats against the music")
if lead > 1.0:
    warnings.append(f"near-silent intro: {lead:.1f} s")
if trail > 0.5:
    warnings.append(f"trailing silence: {trail:.1f} s – the usable track ends earlier")
out = {
    "file": music.name,
    "durationSec": round(len(y) / sr, 2),
    "tempoBpm": round(tempo, 1),
    "askedBpm": asked,
    "fps": a.fps,
    "leadingSilenceSec": round(lead, 2),
    "trailingSilenceSec": round(trail, 2),
    "beats": f(beats),
    "bars": f(beats[::4]),
    "onsets": f(onsets),
    "loudnessDb": loud,
    "warnings": warnings,
    "note": "bars assume 4/4 starting on the first detected beat; the loudest stretch of loudnessDb is the track's peak",
}
dst = music.with_suffix(".beats.json")
dst.write_text(json.dumps(out, indent=1))
print(f"{dst}  {out['tempoBpm']} BPM (asked {asked})  {len(out['beats'])} beats  {len(out['onsets'])} onsets")
for w in warnings:
    print("WARNING:", w)
