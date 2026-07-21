# Tool-Use Patterns — code shapes

Distilled from Basecamp day1/02 (TechFlow support agent, raw Claude API).

## The loop (canonical shape)

```python
import anthropic
client = anthropic.Anthropic()

def run_agent(user_input, tools, tool_impls, system, model="claude-sonnet-5", max_turns=10):
    messages = [{"role": "user", "content": user_input}]
    for _ in range(max_turns):                       # always cap the loop
        resp = client.messages.create(
            model=model, system=system, tools=tools,
            max_tokens=1024, messages=messages,
        )
        messages.append({"role": "assistant", "content": resp.content})

        if resp.stop_reason != "tool_use":
            # final answer: return the last text block
            return "".join(b.text for b in resp.content if b.type == "text")

        # execute every tool the model asked for, feed results back
        tool_results = []
        for block in resp.content:
            if block.type == "tool_use":
                out = tool_impls[block.name](**block.input)   # run your function
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": str(out),
                })
        messages.append({"role": "user", "content": tool_results})
    raise RuntimeError("hit max_turns without a final answer")
```

Key points:
- **One assistant turn can contain multiple `tool_use` blocks.** Execute all of them and
  return one `user` turn with all the matching `tool_result` blocks.
- **Match by `tool_use_id`.** The result block's `tool_use_id` must equal the call's `id`.
- **Cap the loop** (`max_turns`). A confused agent will otherwise spin.

## Tool schema

```python
tools = [
    {
        "name": "get_ticket",
        "description": "Retrieve full details for a support ticket by its ID, "
                       "including customer, priority, product area, and description.",
        "input_schema": {
            "type": "object",
            "properties": {
                "ticket_id": {"type": "string", "description": "The ticket ID, e.g. TKT-1042"}
            },
            "required": ["ticket_id"],
        },
    },
    # ... more tools
]
```

The `description` (both tool-level and per-property) is how the model decides *when* and
*how* to call. Treat it as control logic. Include an example value in the property
description when the format matters (`e.g. TKT-1042`).

## System-prompt skeleton (reliable tool ordering)

```
You are a <role> for <company/domain>.

## Your Role
<one paragraph>

## Process
1. ALWAYS <first tool call> first to understand context
2. <second step> before <third step>
3. <resolve / produce output> with <specifics required>

## Guidelines
- Be thorough / be specific / cite exact values
- Escalate when: <criteria>

## Domain context
<tiers, limits, product facts the model needs>
```

Numbered, imperative processes ("ALWAYS look up the ticket first") make multi-tool
ordering reliable far more than prose.

## Structured output (schema, not string-parsing)

```python
RESOLUTION_SCHEMA = {
    "type": "json_schema",
    "schema": {
        "type": "object",
        "properties": {
            "category": {"type": "string", "enum": ["billing", "technical", "account", "feature_request"]},
            "resolution": {"type": "string"},
            "escalate": {"type": "boolean"},
        },
        "required": ["category", "resolution", "escalate"],
        "additionalProperties": False,
    },
}
# Pass via the request's output/format config so the model MUST return valid JSON.
```

Determinism comes from the schema + enums, **not** from temperature (removed on the newest
models). Never regex a free-text "PASS"/"FAIL" or category out of prose when you can
constrain it with a schema.

## Extended thinking
For multi-step triage (classify → look up → decide → respond), let Sonnet/Opus use
extended thinking so it reasons before the first tool call instead of guessing. Reserve it
for genuinely multi-step decisions; simple lookups don't need it.
