# Prompt Technique Catalog (before → after)

Fixes from Basecamp day1/03, each mapped to a root cause. Change one at a time and re-run
the regression.

## Constraint sharpening (fixes RC1: hallucination)
**Before:** "Always include all fields even if empty."
**After (verbatim-or-null contract):**
```
Extraction rules — copy verbatim from the ticket or emit null. Never infer, paraphrase,
or annotate.
- product: the product name ONLY if named verbatim in the ticket; otherwise null.
- error_codes: only literal, quoted error strings that appear in the ticket; else [].
- affected_users: a bare integer if stated; otherwise null. No ranges, no "200+".
- Do not fill a field to look complete. null is a valid, correct answer.
```
Why it works: under precision-only scoring, a null is never penalized but a guessed value
can be. Verbatim-or-null removes the entire hallucination failure class at once.

## Decision procedure (fixes RC2: tone→priority)
**Before:** "Classify the priority of the ticket."
**After:**
```
Priority is a function of impact, not tone. Judge from the facts stated:
- critical: production down, data loss, security breach, or all users blocked.
- high: major feature broken for many users; no workaround.
- medium: broken feature with a workaround, or few users affected.
- low: cosmetic, question, or feature request.
Ignore how calm or angry the customer sounds; a polite report of an outage is still critical.
```

## Output-format discipline (fixes RC3: format/task interference)
**Before:** one prompt that extracts, classifies, and drafts a reply in a single pass.
**After:** either (a) split into steps (extract → classify → draft) with the earlier
outputs fed forward, or (b) enforce a single JSON schema so the shape is guaranteed:
```
Return ONLY this JSON object, nothing else:
{ "priority": "...", "entities": {...}, "draft_reply": "..." }
```
For anything downstream-parsed, use a real json_schema output config (see `agentic-loop`)
so malformed JSON is impossible rather than merely discouraged.

## Few-shot boundary examples (sharpens RC2/RC3)
Add 2–3 examples *at the decision boundary* (the cases that are almost-but-not-quite the
other class). Scope them to the sub-task under test — CLASSIFY-only examples should not
carry extraction content that nudges the extractor. Boundary examples teach the edge;
central examples teach nothing new.

## Iteration hygiene
- One root cause per version. Record score, delta, newly-fixed IDs, and **regressions**.
- Protect the cases that already pass; a PASS→FAIL flip means revert or rethink.
- Hold the model fixed while you fix the prompt — prove the prompt was the problem.
- Snapshot each version immutably with a written hypothesis and the exact changes.
