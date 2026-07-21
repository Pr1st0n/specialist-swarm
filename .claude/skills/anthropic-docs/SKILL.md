---
name: anthropic-docs
description: Use when you need current, authoritative Anthropic facts rather than a guess — model IDs, pricing, rate limits, Claude API syntax (tool use, structured outputs, prompt caching, batch, streaming), Agent SDK, or Claude Code features. Pull live docs via context7 / the claude-api skill / WebFetch instead of trusting memory, because these change.
---

# Anthropic Docs (pull, don't guess)

## Overview
Model IDs, pricing, and API surfaces change faster than any training cutoff or distilled
note. When a fact needs to be *right* — a model ID you'll hard-code, a pricing number in a
COGS estimate, the exact shape of a caching or batch call — pull it from a live source.
This skill says which source to use.

## Where to pull from (in order of preference)
1. **The `claude-api` skill** (if available in this environment) — the fastest path for
   model IDs, pricing, params, streaming, tool use, MCP, caching, token counting, and
   migration. Prefer it for anything LLM/Anthropic-shaped.
2. **`context7` MCP** — live library/SDK docs. Two-step:
   `resolve-library-id` → `query-docs` (e.g. resolve `@anthropic-ai/sdk` or `anthropic`,
   then query "prompt caching cache_control" / "messages batches"). Use for SDK syntax and
   version-specific behavior.
3. **`WebFetch`** — `docs.anthropic.com` and `docs.claude.com` for prose docs, guides, and
   anything the above don't cover. Also for Claude Code feature docs.

## When to reach for this (triggers)
- You're about to write a model ID into code or config.
- You need a price, rate limit, or context-window number.
- You're using an API surface you're not 100% current on: tool use, structured/JSON output,
  prompt caching (`cache_control`), the Batch API, streaming, extended thinking.
- Building on the Agent SDK or wiring Claude Code features (hooks, MCP, slash-commands).
- A refusal/cutoff/streaming/tool-call bug where the docs' exact contract matters.

## Model IDs (starting point — verify before hard-coding)
From the Basecamp-era materials: `claude-fable-5`, `claude-opus-4-8`, `claude-sonnet-5`,
`claude-haiku-4-5-20251001`. Treat these as a starting point and confirm via source 1 or 2
before relying on them — especially the exact dated Haiku ID and any pricing.

## Quick reference
| Need | Source |
|---|---|
| Model IDs / pricing / limits | `claude-api` skill → else context7 → else docs site |
| SDK syntax (caching, batch, streaming, tools) | context7 (`resolve-library-id` → `query-docs`) |
| Prose guides / Claude Code features | WebFetch `docs.anthropic.com` / `docs.claude.com` |

## Common mistakes
- **Guessing a model ID or price from memory.** They change; verify.
- **Skipping `resolve-library-id`.** context7 needs the resolved ID before `query-docs`.
- **Using web search for library docs when context7 is available.** context7 is more current
  and precise for SDK/API specifics.
