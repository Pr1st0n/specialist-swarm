---
name: multi-agent-orchestration
description: Use when one agent can't hold the whole job — you need a coordinator that gathers context, classifies the request, and delegates to scoped specialist subagents (e.g. billing / technical / account), then synthesizes their findings into one answer. Covers routing, per-specialist tool scoping, escalation, and the over-claiming failure mode.
---

# Multi-Agent Orchestration

## Overview
A coordinator-plus-specialists pattern (from Basecamp day1/04, the Meridian support
system). One **coordinator** owns the flow; several **specialists** each own one domain
with a **scoped tool-set**. The coordinator never does specialist work itself — it routes,
then composes. Use this when a single agent's tool-set or responsibilities get too broad.

## The coordinator flow
1. **Read** the request (pull the full record).
2. **Identify** the actor/account and gather only the context you need.
3. **Classify** into domains. A single request can span several — an SSO failure *and* a
   refund are different domains handled by different specialists.
4. **Delegate**: spawn one specialist per domain that has a real issue. Never spawn the
   same domain twice; skip a domain only if the request raises nothing in it.
5. **Synthesize**: combine specialist findings into one clean answer that addresses
   *every* issue raised, then write the response.

## The three rules that make it work
- **Scope each specialist's tools to its domain.** The billing specialist gets
  `get_billing_history`, `issue_refund`, `adjust_invoice` — and *nothing* technical. A
  specialist that can only act in its lane can't take conflicting action. (See
  `references/coordinator-and-specialists.md`.)
- **One clear tool per job; no duplicates or vague catch-alls.** The Meridian coordinator
  failed largely because its tool-set was polluted with five overlapping customer-lookup
  tools and vague `helper`/`process`/`get_data`/`tool_3_v2` tools. The model wasted turns
  and mis-selected. Give the coordinator a *small, unambiguous* tool-set.
- **Never over-claim resolution.** Mark "resolved" only when every issue was actually
  actioned (refund issued, SSO fixed) — not merely acknowledged. If an issue needs a human,
  escalate it rather than closing it. This is the single most common multi-agent failure.

## Specialist contract
Each specialist: looks up what it needs itself, acts within its domain, and returns a
**writeup with specifics** (transaction IDs, invoice numbers, exact settings) for the
coordinator to cite. Specialists don't write the customer-facing response — the
coordinator does, so voice and completeness stay consistent.

## Escalation
Give the coordinator an explicit `escalate_to_human` path with a reason enum
(`needs_code_change`, `security`, `customer_escalation`, `agent_stuck`) and a
summary-for-human. An agent with no escalation path will fake-resolve instead.

## Quick reference
| Concern | Rule |
|---|---|
| Routing | Classify into domains; one specialist per domain with a real issue |
| Multi-domain request | Spawn multiple specialists; address every issue on synthesis |
| Tool scoping | Specialist tools ⊆ its domain; coordinator tools small + unambiguous |
| Resolution status | `resolved` only if actioned; else `escalated` / `needs_info` |
| Who writes the reply | The coordinator, from specialist writeups — not the specialists |

## Common mistakes
- **Polluted coordinator tool-set** — duplicate/overlapping/vague tools wreck routing and
  selection. Prune ruthlessly. (This is exactly what `diagnostic-loop` hunts for.)
- **Specialists with cross-domain tools** — invites conflicting actions and blurred
  ownership.
- **Over-claiming resolution** — closing a ticket that was only acknowledged. Bake the
  "actually actioned" bar into the coordinator prompt *and* your evals.
- **Dropping issues on multi-domain requests** — synthesis must cover every issue, not
  just the first one classified.
- **No escalation path** — forces the agent to fake success.
