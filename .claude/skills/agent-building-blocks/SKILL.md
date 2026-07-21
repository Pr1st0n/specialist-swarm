---
name: agent-building-blocks
description: Use when wiring up the Claude Code project itself — creating subagents, hooks, slash-commands, MCP server configs, or a good CLAUDE.md. Reusable patterns mined from the inventory-management workshop project. Reach for this to harden the harness around your agent, not to design the agent's own logic (that's agentic-loop / multi-agent-orchestration).
---

# Agent Building Blocks (Claude Code setup)

## Overview
The reusable `.claude/` machinery that makes a Claude Code project productive, distilled
from the `inventory-management` workshop project. These are the pieces that surround your
agent's own logic: subagents, hooks, slash-commands, MCP servers, and the `CLAUDE.md` that
ties them together. Copy the shapes in `references/` and adapt.

## The pieces
| Piece | Path | What it's for |
|---|---|---|
| Subagents | `.claude/agents/<name>.md` | Delegate a bounded job to a scoped agent (frontmatter + system prompt) |
| Hooks | `.claude/hooks/<event>.sh` | Run a script on a lifecycle event (logging, gating, formatting) |
| Slash-commands | `.claude/commands/<name>.md` | A reusable prompt template invoked as `/name` |
| MCP servers | `.claude/mcp-config.json` | Wire external tools (GitHub, Playwright, a RAG server) |
| Project memory | `CLAUDE.md` | Delegation rules, stack, conventions the agent must follow |

## Subagents (`references/subagents.md`)
Frontmatter (`name`, `description`, `tools`, `model`, `color`) + a focused system prompt.
Two rules that make them work: **scope the responsibility** ("✅ you handle / ❌ you don't
touch") and **scope the tools** (only the tools that job needs). Then make delegation
*mandatory* in `CLAUDE.md` (e.g. "ANY change to a `.vue` file MUST go to `vue-expert`") so
the main agent actually routes to them.

## Hooks (`references/hooks.md`)
A hook reads a JSON event on stdin and exits 0 to allow. Common use: a `post-tool-use` hook
that logs every tool call for debugging. Keep hooks fast and non-blocking.

## Slash-commands (`references/slash-commands.md`)
A markdown file whose body is a prompt template. Good for repeatable multi-step chores
(optimize the codebase, start/stop servers, run tests). This pack ships two:
`/scaffold-agent` and `/ship-checklist`.

## MCP servers (`references/mcp.md`)
`mcpServers` map of `command` + `args` + `env`. Reference secrets via `${ENV_VAR}`, never
inline. This environment already has `context7` (live docs) and `playwright` available; the
workshop project also wired GitHub.

## CLAUDE.md
The spine. State: what subagents exist and *when delegation is mandatory*; which MCP tools
to prefer for which operations; the stack and quick-start; and any hard "never" rules
(don't commit secrets, don't touch the other layer). Rules the agent must not violate go
here, phrased as imperatives.

## Common mistakes
- **Unscoped subagents.** A subagent that can touch anything is just the main agent. Bound
  its responsibility and its tools.
- **Optional delegation.** If `CLAUDE.md` doesn't say "MUST," the main agent won't route.
- **Secrets in MCP config.** Use `${ENV_VAR}`.
- **Slow/blocking hooks.** They run on every event; keep them cheap and exit 0.
- **A CLAUDE.md of prose.** Make it imperative rules and tables the agent can act on.
