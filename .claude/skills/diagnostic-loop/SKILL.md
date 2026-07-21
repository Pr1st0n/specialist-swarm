---
name: diagnostic-loop
description: Use when any AI system is misbehaving (confidently wrong answers, wrong routing, fake resolutions, high cost) and you need to find the real root cause before changing anything. A repeatable Symptom → Hypothesis → Evidence → Recommendation loop that works from a single broken prompt to a many-agent pipeline. Start here before touching code.
---

# The Diagnostic Loop

## Overview
A repeatable framework for diagnosing any AI system failure (Basecamp day1/04, the Meridian
pilot). The discipline is to form hypotheses *before* looking at internals, then tie every
conclusion to a specific line of evidence — and to prove the fix with a rate, not a single
run. "It's the model" is almost never the answer; the fix is usually in what surrounds the
model.

## The four steps
1. **Symptom** — what the user reports, in *their* words. Don't reframe or interpret yet.
   Write it as one plain sentence.
2. **Hypothesis** — force *at least three* hypotheses from the symptom alone, before opening
   any file. Naming them first exposes where your reflexes are weak. (Common structural
   hypotheses below.)
3. **Evidence** — read the artifacts against each hypothesis and quote the exact line that
   confirms or kills it. "The prompt seems off" is not evidence; "line 12 tells it to retry
   forever with no timeout" is. For any agentic system, ask for these first:
   1. **System prompts** — what is each agent trying to do?
   2. **Tool descriptions** — what can the model see, and when would it pick each tool?
   3. **Execution traces** — what actually happened, step by step?
4. **Recommendation** — a fix scoped to the *actual* root cause, then re-measured.

## Common structural hypotheses (start here)
- Routing / classification failure
- Tool description too vague to use reliably
- **Tool-set pollution** — duplicate/overlapping/vague tools wrecking selection
- Missing or wrong escalation path
- Subagent over-claiming resolution (acknowledged ≠ actioned)
- Context not reaching the model that needs it
- Cache placement breaking a shared prompt region

## Measure with a rate, not a run
Agents wobble: the same input routes differently across runs. Run the same case **≥5×** and
read the *resolution rate* and *cost*, not any single attempt. Change **one thing**, re-run,
watch the rate move. Keep a run history so your baseline stays on screen. (This is the same
harness discipline as `building-evals`.)

## Quick reference
| Step | Output | Discipline |
|---|---|---|
| Symptom | one sentence, user's words | don't interpret yet |
| Hypothesis | ≥3, before looking | commit before evidence |
| Evidence | quoted lines from prompts / tools / traces | one line per hypothesis |
| Recommendation | fix scoped to root cause | change one thing, re-measure |

## Common mistakes
- **Blaming the model.** You usually can't change it and usually don't need to. Exhaust the
  scaffolding (prompts, tools, routing, context) first.
- **Skipping hypotheses.** Jumping to artifacts means you only see what confirms your first
  hunch.
- **Vague evidence.** If you can't quote the line, the hypothesis isn't confirmed.
- **Reading one run.** One clean pass proves nothing; read the rate over ≥5.
- **Changing several things.** You won't know which one moved the number.

See `references/meridian-worked-example.md` for the loop applied end to end.
