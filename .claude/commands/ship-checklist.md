# Ship Checklist

Run this gate before demoing or calling the agent "done." Use the named skills; report a
pass/fail against each item with the numbers.

## 1. Correctness (gate — must pass first)
- Run the eval suite with `num_runs=5` (`building-evals`). Report the pass *rate* per task,
  not a single run.
- Any task below target? Diagnose with `diagnostic-loop` (Symptom → Hypothesis → Evidence →
  Fix) and, if it's a prompt issue, `prompt-rescue`. Change one thing, re-run, confirm no
  regressions.

## 2. Tool & agent hygiene
- Tool-set is tight: one clear tool per job, no duplicate/overlapping/vague tools
  (`multi-agent-orchestration` / `diagnostic-loop`).
- Every tool description says *when* to use it.
- Resolution/success is only claimed when actually actioned — never over-claimed. There's an
  escalation path for what the agent can't do.

## 3. Performance & cost (only after correctness passes)
- Instrument TTFT / TTC / cost (`inference-optimization`).
- Apply the levers that fit (caching, routing, output discipline, streaming, parallelism,
  batch) — re-checking accuracy after each. A faster/cheaper config that drops accuracy
  below the gate scores zero.
- Report before/after on latency and $/unit, with accuracy held.

## 4. Facts are current
- Any model ID, price, or API detail was verified via `anthropic-docs`, not memory.

## 5. Harness (if applicable)
- Subagents scoped (responsibility + tools); delegation rules stated in `CLAUDE.md`; MCP
  secrets via `${ENV_VAR}` (`agent-building-blocks`).

Output a short table: item → pass/fail → the number or evidence. Don't claim "done" for any
item without the evidence in hand.
