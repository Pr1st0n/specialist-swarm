---
name: building-evals
description: Use when you need to prove an agent works with numbers before shipping — moving from "try it and see" to a repeatable feedback loop. Covers defining eval tasks, writing graders (exact/numeric/tool-use/LLM-judge), running the harness multiple times to read a rate, and using results to make targeted fixes.
---

# Building Evals

## Overview
An eval turns "it seems to work" into a number you can point at (Basecamp day2/01, the
`boutique` shopping agent). The loop: define tasks → grade them → run the harness N times →
read the *rate* → fix the weakest thing → re-run. Build the eval *early* — it's how you
know whether a change helped.

## Anatomy of a task
```python
{
  "id": "price_tshirt",
  "description": "Price lookup for a t-shirt (hyphenated catalog key)",
  "query": "Price of a t-shirt?",              # what gets sent to the agent
  "category": "product_lookup",
  "graders": [
    {"type": "response_numeric", "checks": [{"value": 24.99, "tolerance": 0.01}]},
    {"type": "tool_use", "checks": [{"tool_name": "get_product", "arguments": {"product": "t-shirt"}}]},
  ],
}
```
Pick tasks that probe *boundaries* (hyphenated keys, ambiguous phrasing, multi-step), not
just the happy path. A handful of sharp tasks beats dozens of easy ones.

## Grader types (from cheapest to smartest)
| Grader | Use for | How it decides |
|---|---|---|
| `response_contains` | a required string appears | substring match (case-insensitive) |
| `response_numeric` | a computed value is right | regex-extract numbers, compare within tolerance |
| `tool_use` | the agent called the right tool with the right args | inspect the transcript's tool calls |
| `llm_judge` | open-ended quality against a criterion | Claude returns a schema-validated `PASS`/`FAIL` |

The LLM-judge returns a **schema-constrained verdict** (`enum: [PASS, FAIL]` + one-sentence
reason) via structured outputs — never string-parse a free-text verdict, and don't rely on
a temperature dial; determinism comes from the schema. Code shapes in
`references/grader-patterns.md`.

## Run it N times and read the rate
```python
baseline = run_eval(run_agent, tasks, num_runs=5)   # same tasks, 5 times
print_summary(baseline); save_results(baseline)
```
Agents are nondeterministic — a single pass is noise. Run each task ≥5× and read the pass
*rate*. Save results so you can compare before/after a change (this is the same discipline
as `diagnostic-loop`).

## The feedback loop
1. Write 5–10 boundary tasks with graders.
2. Run the baseline (`num_runs=5`), save it.
3. Read which checks fail and *why* (graders return a reason string — use it).
4. Fix the single weakest thing (often a prompt fix — see `prompt-rescue`).
5. Re-run; confirm the rate rose and nothing regressed.

## Common mistakes
- **Grading one run.** Nondeterminism makes a single pass meaningless.
- **Only happy-path tasks.** They won't catch the failures that matter; probe boundaries.
- **String-parsing judge verdicts.** Use a schema-validated enum.
- **Graders with no reason string.** You need *why* it failed to fix it.
- **Building the eval last.** Build it early; it's your steering wheel, not a final report.
- **Moving the goalposts.** Don't edit graders/tasks to make the number go up — fix the agent.
