# Scaffold Agent

Stand up a new tool-using agent fast, following the Basecamp method. Work in order and use
the named skills.

1. **Confirm the surface.** Use the `anthropic-docs` skill to confirm the current model IDs
   and any API surface (tool use, structured output) you'll rely on. Don't hard-code a model
   ID from memory.
2. **Define the agent.** Use the `agentic-loop` skill:
   - Write the system prompt (Role → numbered Process → Guidelines → Escalation → domain context).
   - Define tool schemas — one clear tool per job, with descriptions specific enough that the
     model knows *when* to call each. No duplicate or catch-all tools.
   - Implement the tool-use loop with a `max_turns` cap and a `tool_result` turn per call.
   - If output is consumed downstream, force a JSON schema rather than parsing prose.
3. **Decide single vs multi-agent.** If one agent's tool-set or job is getting broad, switch
   to the `multi-agent-orchestration` skill: a coordinator that classifies and delegates to
   scoped specialists, each with domain-only tools.
4. **Add an eval immediately.** Use the `building-evals` skill: write 5–10 boundary tasks
   with graders, run `num_runs=5`, and save the baseline. Do this *before* polishing.
5. **Report** the resulting file layout, the tool list, and the baseline eval rate.

Keep tools tight, never over-claim resolution, and prove it works with a rate — not a single
run.
