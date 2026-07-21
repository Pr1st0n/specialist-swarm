<!--
Specialist Swarm — PR template.
Fill in what applies; delete sections that don't. The checklists reflect the
Basecamp guardrails (eval-driven, accuracy is the gate, scope tools tightly,
never over-claim). Keep it honest — an unchecked box is fine.
-->

## Summary

<!-- What changed and why, in 1–3 sentences. Link the scenario card (A/B/C) or
     stretch goal (S1–S10) if relevant. -->

## Type of change

- [ ] Coordinator agent (routing / synthesis / system prompt)
- [ ] Specialist sub-agent (new or modified)
- [ ] Product skill (`skills/…`, uploaded via the Skills API)
- [ ] Prompt change (system/user wording)
- [ ] Eval / grader / harness
- [ ] Tooling & scripts (`create_*.py`, `run_deal_desk.py`, setup)
- [ ] Synthetic data
- [ ] Claude Code build tooling (`.claude/` skills, commands, hooks)
- [ ] Docs
- [ ] Infra / setup (deps, env, config)

## Agents / skills / tools touched

<!-- Which coordinator, specialists, skills, or MCP servers does this affect?
     Call out any change to a subagent's tool scope explicitly. -->

## How it was verified

- [ ] Ran `python run_deal_desk.py` end to end and produced `outputs/proposal-response.docx`
- [ ] Watched the events stream fan out to the specialists in parallel
- [ ] Other (describe below)
- [ ] N/A — this change does not touch runtime behavior

<!-- Paste the command(s) run and what you actually observed. -->

## Quality evidence (eval-driven, not vibe-driven)

<!-- Agents wobble run to run. Run the same task ≥5× and report the RATE, not a
     single lucky pass. If no eval applies (tooling/docs only), say so. -->

- Runs passed: `__ / __`  (rate: `__%`)
- Accuracy gate: [ ] held  [ ] n/a — a faster/cheaper config that drops accuracy is **not** an improvement.

## Guardrails checklist

- [ ] Tools scoped tightly — one clear tool per job, one clear job per subagent
- [ ] No over-claiming — "resolved" means actually actioned, not acknowledged (in prompts and graders)
- [ ] Measured before optimizing (TTFT / TTC / cost) — if this is a perf/cost change
- [ ] No secrets / API keys committed

## Demo / notes

<!-- Screenshots of the events stream or the generated doc; breaking changes; follow-ups. -->
