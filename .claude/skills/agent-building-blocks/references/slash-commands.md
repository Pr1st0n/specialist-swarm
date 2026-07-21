# Slash-commands — shape

From `inventory-management/.claude/commands/`. A slash-command is a markdown file whose body
is a prompt template. Invoking `/name` injects that prompt. Good for repeatable multi-step
chores you don't want to re-type.

## Shape
`.claude/commands/optimize.md`:
```markdown
# Optimize Codebase
Perform a comprehensive codebase optimization:
1. Scan for unused functions/imports, dead code, unused deps, duplicate code.
2. Analyze quality: perf bottlenecks, missing error handling, hardcoded values.
3. Remove unused code (conservatively — only what you're confident is unused).
4. Optimize existing code (simplify logic, extract repeats).
5. Provide a summary: what was removed, what changed, what to test.
```

## Notes
- Write the body as an instruction to the agent — numbered steps make it reliable.
- Keep each command to one clear job (start servers, stop servers, run tests, reset a demo
  branch, optimize). The workshop project had: `start`, `stop`, `test`, `optimize`,
  `demo-branch`, `reset-branch`.
- This pack ships two of its own: `/scaffold-agent` (stand up a new agentic-loop agent) and
  `/ship-checklist` (the eval + optimization gate before demoing).
- Commands can reference skills ("use the `building-evals` skill…") so a command becomes a
  short entry point into a longer skill workflow.
