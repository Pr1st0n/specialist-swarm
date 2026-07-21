# Prompt Failure Root-Cause Taxonomy

From Basecamp day1/03 (Prompt Rescue). A support-ticket prompt classified priority,
extracted entities, and drafted a reply. Baseline 5/21; the failures clustered into three
root causes.

## RC1 — "Fill every field" manufactures hallucination
**Where it came from:** the baseline said *"always include all fields even if empty."*
**What it produced (14 of 16 baseline fails):**
- paraphrased product names — `"CRM Platform"` when the ticket said something else
- annotated numbers — `"200+ (export); 3 (billing)"` instead of a bare number
- invented codes — `"FEATURE_LOCKED_..."` that never appeared in the ticket
- descriptive placeholders — `"Unknown - not specified"` instead of `null`

**Why it matters for scoring:** the grader checked entities for **precision, not recall** —
it only flagged values *not derivable from the ticket*; null/empty auto-passed and gold
entities were never required. So the instruction to always fill fields directly caused the
failures. The fix ("copy verbatim or emit null") is a *free* win — it cannot be penalized.

**Fix:** constraint sharpening → verbatim-or-null contract with per-field rules.

## RC2 — Tone drives classification
**Symptom:** an angry-but-minor ticket rated `critical`; a calm-but-severe one rated low.
The model read *severity from the customer's tone* instead of the facts.

**Fix:** a decision procedure — "determine severity from the facts stated (system down?
data loss? how many users?), not from how upset the customer sounds." Add boundary few-shot
examples scoped to the CLASSIFY sub-task only.

## RC3 — Format / task interference
**Symptom:** broken JSON, fields bleeding between sections, the draft-reply task corrupting
the extraction task — because one monolithic prompt did extract + classify + draft at once.

**Fix:** output-format discipline — separate the tasks (or the output regions), specify the
exact output shape, and use a JSON schema for the structured parts so malformed output is
impossible. Few-shot examples for one sub-task must not perturb the others.

## The meta-lesson
Read what the grader actually measures *before* touching the prompt. The largest single
jump (24% → 95%) came not from clever wording but from realizing the scoring was
precision-only and reframing the extraction contract to match. Diagnose the scoring, then
the prompt.
