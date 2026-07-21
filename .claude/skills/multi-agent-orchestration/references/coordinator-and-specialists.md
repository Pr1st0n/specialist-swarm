# Coordinator + Specialists — worked structure (Meridian)

From Basecamp day1/04. A coordinator triages B2B support tickets and delegates to billing,
technical, or account specialists.

## Coordinator system prompt (structure that worked)

```
You are the <Coordinator>, an AI agent that <triages and resolves X>.
You orchestrate: gather context, classify, delegate to a specialist, write the final reply.

=== YOUR PROCESS ===
1. READ THE TICKET.  (get_ticket)
2. IDENTIFY THE CUSTOMER.
3. GATHER CONTEXT.    (plan tier, recent tickets, system status)
4. CLASSIFY.          billing / technical / account
5. DELEGATE.          identify every distinct issue and which category owns each;
                      spawn_specialist once per category with an issue. Don't double-spawn.
6. SYNTHESIZE.        combine findings, address every issue, write_response.
                      resolution_status="resolved" ONLY if every issue was actioned.

=== CLASSIFICATION GUIDE ===
BILLING: invoices, refunds, credits, plan changes, proration, overages…
TECHNICAL: API errors, webhooks, integrations, rate limits, auth (keys, not SSO)…
ACCOUNT: SSO/SAML, seats, permissions, workspace settings, security…

=== RESPONSE STYLE ===
Lead with the resolution. Cite specifics. If you fixed something, say what changed.
Sign off consistently.

=== EXAMPLES ===
<3–5 worked tickets: ticket → category → what the specialist found → the ideal reply>
```

Worked few-shot examples (ticket → reasoning → specialist finding → final reply) are what
make classification and voice reliable. Include 3–5.

## The good coordinator tool-set (small, unambiguous)

```
get_ticket, search_prior_tickets, check_system_status,
check_entitlements, spawn_specialist, write_response, escalate_to_human
```

`spawn_specialist(category ∈ {billing,technical,account}, ticket_id)` and
`write_response(ticket_id, response_body, resolution_status ∈ {resolved,escalated,needs_info})`.

### The BAD tool-set (the Meridian trap — what to avoid)
The broken version added five overlapping customer-lookup tools
(`get_customer`, `fetch_customer_details`, `fetch_customer_v2_databricks`,
`lookup_customer_info`, `customer_data_retrieval`) plus vague catch-alls
(`helper`, `process`, `get_data`, `tool_3_v2`, `validate`). Result: the model burned turns
deciding *which* lookup to use, called several, and mis-routed. **Every extra or ambiguous
tool is a tax on every turn.** One tool per job; delete duplicates; no `helper`.

## Specialist system prompt (scoped)

```
You are the <billing> specialist. You handle one ticket at a time. Your job is <money:
invoices, refunds, credits, plan changes, proration, payment failures, overages>.

The ticket ID is in the first user message. Look up the ticket and the customer yourself.

=== YOUR TOOLS ===
get_ticket, lookup_customer_by_email, get_billing_history, check_plan_entitlements,
issue_refund, adjust_invoice, check_payment_method

=== WHAT TO RETURN ===
Write up what you found and what you DID. Include transaction IDs, invoice numbers, refund
IDs — the coordinator needs specifics to cite. If you changed something, say so. If you
couldn't resolve it, say why.
```

Each specialist's tools are strictly its domain — the billing specialist has no technical
or account tools, so it physically cannot take out-of-domain action.

## Escalation tool

```
escalate_to_human(ticket_id,
                  reason ∈ {needs_code_change, security, customer_escalation, agent_stuck},
                  summary_for_human)
```

## Failure modes this pattern is prone to (verify with evals)
- **Over-claiming**: specialist acknowledges but doesn't action; coordinator marks resolved.
- **Dropped issue**: multi-domain ticket, only one domain handled.
- **Mis-route**: caused by a vague classification guide or a polluted tool-set.
- **Cache placement**: if coordinator + specialists share a big prompt prefix, put the
  `cache_control` breakpoint so the shared frozen region is cached (see `inference-optimization`).

Score all of these by running the same ticket ≥5× and reading the resolution *rate*, not a
single run (see `building-evals` and `diagnostic-loop`).
