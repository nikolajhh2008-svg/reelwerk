---
name: verbalized-sampling
description: Verbalized Sampling prompt format from CHATS-lab - ask for several responses with probabilities and sample from the tails, to get more diverse ideas than the model's first, most typical answer. Use when brainstorming hooks, ideas or angles and the outputs keep converging on the same safe idea.
---

> **Modified:** this file contains only the "Quickstart" section of the `README.md` of [CHATS-lab/verbalized-sampling](https://github.com/CHATS-lab/verbalized-sampling), copied verbatim; the frontmatter and this note were added, the rest of the README was left out.
> Copyright 2025 CHATS-Lab · Licensed under the Apache License 2.0, see `LICENSE` in this folder · Paper: Zhang et al., "Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity", [arXiv:2510.01171](https://arxiv.org/abs/2510.01171)

## Quickstart

To try Verbalized Sampling, just copy and paste this into any chatbot (ChatGPT, Claude, Gemini, etc.). For best results, we recommend starting with models like GPT-5, Claude 4 Opus, and Gemini 2.5 Pro:

```
<instructions>
Generate 5 responses to the user query, each within a separate <response> tag. Each <response> must include a <text> and a numeric <probability>.
Please sample at random from the tails of the distribution, such that the probability of each response is less than 0.10.
</instructions>

Tell me a short story about a bear.
```

If you want more stories, just respond and ask `Tell me 5 more stories` in the same conversation. For even better results, paste this into a `system prompt` instead:

```
You are a helpful assistant. For each query, please generate a set of five possible responses, each within a separate <response> tag. Each <response> must include a <text> and a numeric <probability>.
Please sample at random from the tails of the distribution, such that the probability of each response is less than 0.10.
```
For practical tips on getting the most out of this technique and general troubleshooting, please refer to this [X/Twitter thread](https://x.com/dch/status/1978471395173740900)!
