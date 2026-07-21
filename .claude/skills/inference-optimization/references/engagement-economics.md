# Token economics → engagement economics

From Basecamp day2/02. The optimization only matters if you can translate it into terms a
decision-maker acts on. Every lever maps to a business number.

## The translation
| Technical number | Business number | Why it lands |
|---|---|---|
| $/unit (cache-aware) | **unit COGS** vs the per-unit fee | is each unit profitable? |
| p50 / p95 latency | **SLA compliance** (interactive ≤ target) | do analysts alt-tab away? |
| accuracy on audited fields | **quality gate** in the SOW | below it, nothing else counts |
| COGS × volume vs fee × volume | **engagement margin** | does the deal make money at scale? |

## Worked framing (ClauseScan / Project HELVETICA)
Signed SLA: accuracy ≥ 90%, interactive p50 ≤ 5s, COGS ≤ $0.02/contract, fee $0.75/contract,
estate = 248,000 contracts. So:
- A config at $0.05/contract **loses money on COGS** relative to the $0.02 ceiling even
  though it's well under the fee — the ceiling, not the fee, is the constraint at scale.
- A config that's fast and cheap but 88% accurate **scores zero** — below the gate.
- The steering-committee slide is: *before vs after* on COGS, p50, and accuracy, with the
  assumptions stated (volume, cache-hit rate, model mix). Not tokens.

## The "why not just pay for a better model?" objection
The strongest answer is your own numbers: a routed portfolio (cheap triage → right-sized
model) that holds accuracy at the gate while cutting COGS and p50 beats "put everything on
the biggest model," which blows both the latency SLA and the COGS ceiling. Show the
before/after, gated on accuracy, at the real volume.

## Deliverable checklist
- Before/after on the three SLA numbers (accuracy, p50, COGS) — accuracy shown first.
- Stated assumptions: volume, cache-hit rate, model routing mix, holdout result.
- Unit COGS vs fee, and total margin at full volume.
- One sentence on the lever mix that got you there.
