# reelwerk – auf Deutsch

**Gib dieses Repo deiner KI. Sie liest dein Projekt und macht daraus organische Kurzvideos für TikTok, Reels und Shorts – gerendert aus Code.** Manche informieren, manche unterhalten, manche zeigen das Produkt. Den Mix bestimmt dein Projekt. Du wählst aus und postest selbst.

## So startest du

Du brauchst [Node.js](https://nodejs.org) ab Version 20, [ffmpeg](https://ffmpeg.org) und einen KI-Coding-Agenten, gebaut für [Claude Code](https://claude.com/claude-code).

```bash
git clone https://github.com/nikolajhh2008-svg/reelwerk.git
cd reelwerk
./setup.sh
claude
```

Dann:

> Analysiere mein Projekt: ~/code/meine-app

Die KI liest Code, Doku und Website, findet, was sich ehrlich zeigen lässt, und entscheidet, **welche Video-Arten für genau dieses Projekt Sinn ergeben**: Eine Lern-App informiert eher, ein Spiel unterhält eher, ein Entwickler-Werkzeug zeigt eher. Danach stellt sie ein paar Fragen. Ab dann reicht:

> mach Videos

Du bekommst zehn Ideen mit je drei Hooks, wählst aus (`2b, 5a, 7c`), und die fertigen Videos liegen samt Kontaktbogen und Prüfbericht in `work/videos/`. **Gepostet wird nie automatisch.**

## Was drin ist

- **`blueprint/`:** der Ablauf in neun Schritten, von der Projekt-Analyse bis zum Lernen aus echten Zahlen
- **`.claude/skills/`:** 35 übernommene Skills für Ideen, Trend-Transfer, Hooks, Bildideen, Bewegung, Ton und Kritik – **kein einziger selbst geschrieben**
- **`studio/`:** Remotion-Projekt, in dem **jedes Video von null gebaut** wird (eigene Bildidee, Bewegung, Übergänge) – geschnitten auf eine eigens erzeugte Musikspur (ACE-Step, gratis und lokal), Soundeffekte im Code gebaut; dazu ein Render-Skript, das Ton misst, einen Kontaktbogen erstellt, Stillstand prüft und jede Fassung aufhebt
- **`docs/craft.md`:** 20 gemessene Handwerksregeln zu Takt, Figur, Sound und Übergängen
- **`sfx/`:** 177 CC0-Geräusche (optional – Effekte entstehen normalerweise im Code)

Herkunft und Lizenzen aller fremden Teile: [CREDITS.md](CREDITS.md).
