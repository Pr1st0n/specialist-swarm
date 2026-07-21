# Subagents — shape & rules

From `inventory-management/.claude/agents/`. A subagent is a markdown file: YAML frontmatter
+ a focused system prompt.

## Frontmatter
```yaml
---
name: vue-expert
description: Vue 3 frontend specialist for features, UI components, styling, and client-side functionality
tools: Read, Write, Edit, Glob, Grep, Bash, mcp__playwright__*
model: sonnet
color: orange
---
```
- `description` is how the main agent decides when to delegate — make it specific.
- `tools` scopes what the subagent can do. Give it only what the job needs (the
  `code-reviewer` gets just `Read, Grep, Glob` — it reviews, it can't edit).
- `model` picks the tier (route heavy work to a capable model; simple review to a cheaper one).

## System prompt: scope the responsibility explicitly
```markdown
## Scope: Client Directory Only
✅ You Handle:
- client/src/views/*.vue, client/src/components/*.vue, composables, api.js
❌ You DON'T Touch:
- server/ (backend), mock data, API contracts (state requirements instead), build config
```
An explicit ✅/❌ boundary is what keeps a subagent from wandering out of its lane and taking
conflicting action — the same principle as scoped specialists in `multi-agent-orchestration`.

## Give it recipes, not just rules
The strong subagents include concrete "quick task recipes" (a template for a new component,
the exact file to edit for a route) and must-know patterns (`✅ ALWAYS use unique keys in
v-for`, `❌ NEVER mutate props`). Recipes make the subagent fast and consistent.

## Make delegation mandatory (in CLAUDE.md)
A subagent only helps if the main agent routes to it. State it as a hard rule:
> **MANDATORY: ANY time you create or significantly modify a `.vue` file, you MUST delegate
> to `vue-expert`.**

## Good default roster for a build
- A **domain specialist** for the bulk of the code (e.g. `vue-expert`) — full edit tools.
- A **code-reviewer** — read-only (`Read, Grep, Glob`), run after significant changes.
- A **security-auditor** — read-only, for auth/secret-sensitive changes.
Route to Explore/general-purpose for search and multi-step research.
