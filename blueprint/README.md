# The blueprint

How this kit turns one sentence – "make videos" – into organic short-form videos for TikTok, Instagram Reels and YouTube Shorts. Some inform, some entertain, some show the product – the mix comes from analysing the project. All of them are rendered from code.

Read the files in order the first time. After that, each step links the next.

| # | File | What happens | Who |
|---|---|---|---|
| 0 | [00-analyze.md](00-analyze.md) | **read the project** (code, docs, site, assets): what can honestly be shown, and which kinds of video – inform, entertain, show – fit this project | AI, before anything else |
| 1 | [01-strategy.md](01-strategy.md) | human confirms the analysis; audience, goal, weekly mix | AI asks, human answers – once, then every 30 days |
| 2 | [02-ideas.md](02-ideas.md) | ~100 raw ideas per week, forced to be different, then filtered | AI |
| 3 | [03-hooks.md](03-hooks.md) | several hook packages per idea, audited, ranked | AI proposes, **human picks** |
| 4 | [04-script.md](04-script.md) | scene-by-scene script as a JSON file | AI |
| 5 | [05-render.md](05-render.md) | Remotion renders the script with the templates in `studio/` | code |
| 6 | [06-review.md](06-review.md) | automatic checks, AI looks at contact sheets, **human watches** | code + AI + human |
| 7 | [07-publish.md](07-publish.md) | posting by hand, platform rules, labels | human |
| 8 | [08-learn.md](08-learn.md) | real numbers decide what comes next | AI + human |

## The loop in one picture

```
 analyze ──▶ strategy ──▶ ideas ──▶ hooks ──▶ [human picks] ──▶ script ──▶ render ──▶ checks ──▶ [human watches] ──▶ post by hand
    ▲                                                                                                         │
    └──────────────────────────────── numbers, taste, winners ◀───────────────────────────────────────────────┘
```

## Six principles

1. **The project decides, not the kit.** Which kinds of video make sense – informative, entertaining, product demos – and in what ratio follows from analysing the project, not from a template. A product with nothing to teach should not make lectures.
2. **Data finds the topic, taste makes the angle.** Without real input (trends, outliers, your own audience's words, your own results) every model produces the same average ideas. Kallaway calls the alternative "data enabled creativity".
3. **Wide funnel, hard filter.** Many raw ideas, few survive. One hook is a guess; a batch across several types is a strategy.
4. **The generator is not the judge.** Ideas and hooks are judged in a separate pass, compared in pairs, both orders. LLM judges overrate AI humour badly (see 03-hooks.md), so the human makes the final pick.
5. **Fixed templates, AI fills content.** The AI does not invent animation curves. It writes a script; hand-designed templates with motion tokens render it. That is where automation is reliable.
6. **A human approves every video, and nothing posts itself.** Platforms penalise mass-produced, repetitive content, and TikTok does not let you build your own auto-poster for your own account (see 07-publish.md).

## What the human does each week

| When | What | Time |
|---|---|---|
| once a week | dictate 5–10 minutes: what happened, what annoyed you, what people asked | 10 min |
| once a week | pick 5–7 of 10 ideas with their hook | 10 min |
| per video | watch it on the phone, once with sound, once muted; approve or send back | 1 min |
| per video | post by hand, pick music in the app | 3 min |
| once a week | screenshot the analytics | 5 min |

Everything else is the AI's job.
