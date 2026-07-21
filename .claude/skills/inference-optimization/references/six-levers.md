# The Six Levers — detail & code shapes

From Basecamp day2/02 (ClauseScan). Apply one at a time with the meter running; re-measure
TTFT / TTC / OTPS / $ and re-check accuracy after each.

## Baseline anti-patterns to look for (what a wasteful v0 does)
- No caching — re-buys the whole playbook prefix on every call.
- Everything on the biggest model, even routine items.
- Step-by-step prose *and* JSON — pays for output tokens twice.
- No streaming — the user stares at a dead screen for the full TTC.
- Sequential batch — N items take N items' worth of wall-clock.

## Lever 1 — Prompt caching
```python
CACHED_SYSTEM = [{"type": "text", "text": PLAYBOOK, "cache_control": {"type": "ephemeral"}}]
# ...create(system=CACHED_SYSTEM, ...)
```
Cache the *frozen* prefix (system prompt, playbook, few-shot block). The `cache_control`
breakpoint invalidates everything after it, so keep volatile/per-request content later in
the message. Caching also works in batches (best-effort hits). Cost accounting must count
cache reads *and* writes — a cold first call pays the write.

## Lever 2 — Model routing (portfolio)
Run a cheap triage pass (Haiku) that labels difficulty, then route:
`ROUTINE → Haiku/Sonnet`, `HARD → Opus`. The triage output is tiny, so it's cheap; the win
is not sending easy items to an expensive model. Guard the triage accuracy — a bad router
that sends hard cases to a weak model fails the accuracy gate.

## Lever 3 — Output discipline (usually the biggest win)
Latency ≈ `output_tokens / OTPS`, so cutting output cuts both time and cost. Ask for
structured output (a schema), not "explain step by step, then give JSON."
```python
def extract_structured(contract, model="claude-sonnet-5", cached=True, effort="low"):
    # request JSON per a schema; set a LOW reasoning effort where the task allows
    ...
```
Don't over-starve output so much that accuracy drops — the gate still rules.

## Lever 4 — Streaming (TTFT is the UX number)
```python
with client.messages.stream(model=model, system=system, messages=msgs, max_tokens=1024) as stream:
    for event in stream:
        ...                       # first token → stop the TTFT clock
    resp = stream.get_final_message()
```
Streaming improves *perceived* latency (TTFT) and avoids HTTP timeouts on long outputs. It
does **not** reduce TTC or cost by itself — pair it with output discipline.

## Lever 5 — Parallelism + cache warming
A cache entry only becomes readable once the first response *begins streaming*. So:
```python
warm = extract_structured(items[0])                 # one call writes the cache
with ThreadPoolExecutor(max_workers=4) as ex:        # the rest read the warm cache
    rest = list(ex.map(extract_structured, items[1:]))
```
Fanning out N cold calls makes each pay the cache-write; warming first means N-1 cheap
reads. Watch rate limits and keep accuracy constant — "speed that costs accuracy is not
speed."

## Lever 6 — Two-speed architecture (Batch API)
```python
from anthropic.types.messages.batch_create_params import Request
def build_batch_requests(items):
    return [Request(custom_id=f"item-{i}", params={... "system": CACHED_SYSTEM ...})
            for i, item in enumerate(items)]
```
- **Interactive lane** — streamed, p50 ≤ target, for live working sessions.
- **Batch lane** — ~50% off all token charges; most batches finish within an hour; results
  persist ~29 days. For bulk/offline volume where a human isn't waiting.

## Scoring the sprint
`SCORE = 50·(baseline $ / your $) + 50·(baseline p50 / your p50)`, **zeroed if accuracy < SLA**.
Optimize against this, then verify the winning config on a holdout set to avoid overfitting.
