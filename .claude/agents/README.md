# Agents

Copied unchanged from `.claude/skills/remotion-director/agents/` ([Zane-0x5a/remotion-director](https://github.com/Zane-0x5a/remotion-director), MIT © 2026 Zane – licence in that folder; `direction-lister` and `blind-selector` translated from Chinese, see `CREDITS.md`) so Claude Code can start them by name. How reelwerk uses them: `blueprint/04-script.md` (two directions, blind pick) and `blueprint/06-review.md` (pixel-only critic).

In Claude Code a sub-agent's final message is its result; where these definitions say "SendMessage it back", just end with the result.
