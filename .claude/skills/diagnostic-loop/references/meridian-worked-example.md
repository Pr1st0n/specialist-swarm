# Diagnostic Loop — worked example (Meridian)

From Basecamp day1/04. A client's AI support agent gives confidently wrong answers and
closes tickets that aren't resolved. The client thinks it's the model. It isn't.

## The scoreboard (how the number is read)
The eval runs the *same* ticket 5 times and reports how often the agent actually resolved
it, plus cost. A run counts as resolved only when **every** issue the customer raised was
actioned. Per-ticket it prints the sub-checks and the routing the coordinator chose each
time:

```
  Ticket T-4471   routing: account (x4); account, billing (x1)
    sso_addressed          5/5  #####
    billing_resolved       1/5  #....
    no_false_resolution    1/5  #....
    no_overclaim           3/5  ###..
    --> RESOLVED in 1/5 trials
  RESOLVED  1/5 trials     COST  $0.55 total · $0.11/trial
```

The routing line wobbling across five runs (`account x4; account,billing x1`) is itself the
evidence: the same ticket is classified differently run to run, so one run tells you nothing.

## Step 1 — Symptom (customer's words)
"The agent sounds confident but gets things wrong and closes tickets that aren't fixed."

## Step 2 — Hypotheses (before opening files)
1. Routing failure — multi-domain tickets get only one specialist, so the other issue is dropped.
2. Tool-set pollution — the coordinator has many overlapping/vague tools and mis-selects.
3. Over-claiming — a specialist acknowledges without actioning; the coordinator marks resolved.

## Step 3 — Evidence (quote the line)
- **Routing:** the scoreboard shows `billing_resolved 1/5` while `sso_addressed 5/5` — on a
  ticket raising both SSO *and* a refund. The routing line confirms it usually spawns only
  the account specialist → the billing issue is dropped. Root cause tied to the classify/
  delegate step, not the model.
- **Tool-set pollution:** the coordinator tool list contains five overlapping customer-lookup
  tools (`get_customer`, `fetch_customer_details`, `fetch_customer_v2_databricks`,
  `lookup_customer_info`, `customer_data_retrieval`) and vague catch-alls (`helper`,
  `process`, `get_data`, `tool_3_v2`, `validate`). The trace shows turns burned choosing
  among them. Confirmed.
- **Over-claiming:** `no_overclaim 3/5` — twice in five runs it reported resolution without
  actioning. Confirmed against the coordinator prompt's weak "resolved" definition.

## Step 4 — Recommendation (scoped fixes)
- Prune the coordinator tool-set to one unambiguous tool per job; delete duplicates and
  `helper`/`process`/`tool_3_v2`.
- Tighten the classification/delegation step so every distinct issue gets its owning
  specialist (spawn one per domain that has an issue).
- Sharpen the "resolved" bar in the coordinator prompt: resolved only when every issue is
  actually actioned; otherwise escalate.
- Re-run the 5-trial scoreboard after *each single* change and watch the rate + cost move.

## The takeaways
- The model was never the problem — every fix was in the scaffolding.
- Every conclusion was tied to a quoted line or a scoreboard number, not a hunch.
- The rate (over 5 trials), not any single run, was the unit of truth.
