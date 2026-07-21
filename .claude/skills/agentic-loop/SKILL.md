---
name: agentic-loop
description: Use when building an agent that uses tools with the Claude API directly (no framework) — defining tool schemas, running the multi-step tool-use loop, handling tool results, using extended thinking, or forcing structured JSON output. The starting point for most single-agent builds.
---

# Agentic Loop (Tool Use)

## Overview
An agent is a loop: the model decides to call a tool, you execute it, feed the result
back, and repeat until the model stops calling tools and produces a final answer. This
skill is the raw-API pattern (from Basecamp day1/02, the TechFlow support agent) — no
framework, so you control every step.

## The loop
1. Send `messages` + `tools` + `system` to `client.messages.create(...)`.
2. If `response.stop_reason == "tool_use"`: for each `tool_use` block, run the matching
   function, then append a `user` message containing a `tool_result` block per call
   (match by `tool_use_id`).
3. Append the assistant turn and the tool-result turn to `messages`, call again.
4. When `stop_reason != "tool_use"`, the final text block is the answer.

See `references/tool-use-patterns.md` for the exact code shape, the structured-output
schema, and the system-prompt skeleton.

## Tool schema (the description is the API)
```python
{
  "name": "search_kb",
  "description": "Search the knowledge base for articles relevant to the query.",
  "input_schema": {
    "type": "object",
    "properties": {"query": {"type": "string", "description": "What to search for."}},
    "required": ["query"]
  }
}
```
The **`description` is how Claude decides *when* to call the tool** — it is not
documentation, it is control logic. Vague descriptions cause the model to skip the tool,
call the wrong one, or loop. Be specific about what it does and when to use it.

## System prompt skeleton (what worked at Basecamp)
Role → Process (numbered steps, e.g. "1. ALWAYS get the ticket first") → Guidelines →
Escalation criteria → domain context. Numbered processes make tool ordering reliable.

## Structured output
When you need machine-parseable output, don't parse free text — force a schema with
`output_config` / `output_format` (`type: json_schema`). Determinism comes from the
schema, not from a temperature dial (temperature is removed on the newest models).

## Quick reference
| Thing | Value |
|---|---|
| Stop condition | `stop_reason != "tool_use"` |
| Tool result turn | `role: "user"`, content = list of `{type:"tool_result", tool_use_id, content}` |
| When to add a tool | Only if the model genuinely needs an external action/lookup |
| Tool description | Specific enough that the model knows *when* to reach for it |
| Structured output | `output_config` with `json_schema` — not string parsing |
| Extended thinking | Let Sonnet/Opus reason through multi-step triage before acting |

## Common mistakes
- **Vague tool descriptions** — the top cause of wrong/missing tool calls. Write them like
  control logic, not docs.
- **Too many tools** — a bloated tool-set degrades selection. Add tools only as needed;
  see `multi-agent-orchestration` for scoping when the set grows.
- **Forgetting to append the tool-result turn** — the loop stalls or the model re-calls.
- **Parsing free-text output** — use a JSON schema instead.
- **No stop guard** — cap loop iterations so a confused agent can't spin forever.
