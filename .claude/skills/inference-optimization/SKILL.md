---
name: inference-optimization
description: Use when an agent works but is too slow or too expensive — take it from "works in the demo" to "defensible in production." Measure first (TTFT/TTC/OTPS/cost), then apply six levers (prompt caching, model routing, output discipline, streaming, parallelism+cache warming, two-speed Batch API) against an accuracy gate that zeroes any fast-but-wrong config.
---

# Inference Optimization

## Overview
A method for cutting latency and cost without breaking correctness (Basecamp day2/02, the
ClauseScan contract-review lab). The rule that governs everything: **accuracy is the gate.**
An optimization that drops accuracy below the bar isn't an optimization — it scores zero.
Measure first, optimize the number you can see, re-check accuracy after every change.

## Step 1 — Instrument before you optimize
Measure these on real calls before changing anything:
- **TTFT** — Time To First Token (how long the user stares at a spinner).
- **TTC** — Time To Completion (total request duration).
- **OTPS** — Output Tokens Per Second (throughput once streaming starts).
- **$/unit** — fully loaded cost per item, *including cache reads and writes*.

Latency is dominated by output: `TTC ≈ TTFT + output_tokens / OTPS`. That's why output
discipline (lever 3) is often the biggest win.

## Step 2 — The six levers (apply one at a time, re-measure)
1. **Prompt caching** — mark the frozen prompt prefix (system/playbook) with
   `cache_control: {type: "ephemeral"}`. Cached tokens are far cheaper on reuse. The
   breakpoint invalidates everything *after* it, so cache the stable prefix and keep
   volatile content later.
2. **Model routing** — a portfolio, not a model. Cheap triage pass (Haiku) classifies
   difficulty; route routine work to Haiku/Sonnet and reserve Opus for the hard calls.
3. **Output discipline** — schemas, not essays. Ask for structured output, not step-by-step
   prose plus JSON. Fewer output tokens → lower TTC and cost. Use a low reasoning `effort`
   where the task allows.
4. **Streaming** — TTFT is the UX number. Stream so the user sees tokens immediately, and
   long responses don't hit HTTP timeouts. Default posture for anything user-facing.
5. **Parallelism + cache warming** — a cache entry only becomes readable once the first
   response *begins streaming*. So warm it with one call, then fan out the rest in parallel
   (e.g. `ThreadPoolExecutor`) so they all hit the warm cache instead of each writing it.
6. **Two-speed architecture (Batch API)** — split lanes: an interactive lane (streamed,
   p50 ≤ target) and a batch lane (~50% off token charges, most batches finish within an
   hour, results persist ~29 days) for bulk/offline volume.

Details and code shapes in `references/six-levers.md`.

## Step 3 — Optimize against the gate, verify on a holdout
Score fast *and* correct together, e.g.
`SCORE = 50·(baseline $ / your $) + 50·(baseline p50 / your p50)`, **zeroed if accuracy < the SLA**.
Verify the winning config on a holdout set so you didn't overfit the tuning set.

## Translate tokens → economics (the conversation that matters)
Turn token counts into unit COGS, SLA compliance (p50 latency, accuracy), and margin. A
steering committee cares about "$/contract vs the fee" and "p50 vs the SLA," not tokens.
See `references/engagement-economics.md`.

## Quick reference
| Lever | Wins | Watch out for |
|---|---|---|
| Prompt caching | cost on repeated prefixes | breakpoint placement; volatile content after it |
| Model routing | cost + latency | triage accuracy; don't route hard cases to a weak model |
| Output discipline | latency + cost (biggest lever) | don't starve output so much accuracy drops |
| Streaming | perceived latency (TTFT) | doesn't reduce TTC or cost by itself |
| Parallelism + warming | wall-clock | warm the cache first; watch rate limits |
| Two-speed / Batch | cost at scale | batch isn't interactive; ~1h latency |

## Common mistakes
- **Optimizing before measuring.** Instrument first; optimize the visible number.
- **Ignoring the accuracy gate.** Fast-but-wrong scores zero. Re-check accuracy every change.
- **Confusing streaming with speedup.** Streaming improves TTFT, not TTC or cost.
- **Parallelizing before warming the cache.** N cold calls each pay the cache-write cost.
- **Overfitting the tuning set.** Verify the final config on a holdout.
