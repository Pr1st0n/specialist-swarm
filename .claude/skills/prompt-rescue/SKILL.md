---
name: prompt-rescue
description: Use when a prompt works on clean inputs but fails on messy real-world ones — wrong classification, hallucinated fields, broken JSON. Provides a systematic diagnose-then-fix workflow, a root-cause taxonomy, and a technique catalog, all driven by a regression eval so you can prove each fix and catch regressions.
---

# Prompt Rescue

## Overview
A method for repairing a broken production prompt without guessing (from Basecamp day1/03,
which took a ticket-processing prompt from 24% → 100% in two iterations, model held fixed).
The core discipline: **understand what the eval actually measures, find the root cause,
change one thing, and re-run a regression to prove it — watching for regressions.**

## Workflow
1. **Read the failures, not the prompt.** Collect the specific cases that fail and *how*
   they fail (wrong priority? invented entity? malformed JSON?).
2. **Understand what the grader rewards.** The biggest wins come from grasping the scoring.
   (Example: the day1/03 eval scored entities for *precision, not recall* — null fields
   auto-passed — so "copy verbatim or emit null" was a free win that killed every
   hallucination at once.) Always read the grader before editing the prompt.
3. **Name the root cause(s)** from the taxonomy below — not the symptom.
4. **Apply the matching technique** (catalog below). Change *one* root cause at a time.
5. **Run the regression eval**, record score + delta, and check for **regressions**
   (previously-passing cases that now fail). A net gain can hide a broken passer.
6. **Snapshot** the prompt + results as an immutable version (`prompt_vN`) with a written
   hypothesis and the changes, then iterate.

## Root-cause taxonomy
| Code | Root cause | Typical symptom |
|---|---|---|
| RC1 | "Fill every field" instructions manufacture hallucination | paraphrased names, invented codes, descriptive placeholders instead of `null` |
| RC2 | Tone drives classification | angry-but-minor ticket rated critical; severity read from tone not facts |
| RC3 | Format/task interference | one prompt doing extract + classify + draft at once → broken JSON, bleed-through |

See `references/root-cause-taxonomy.md` for the full symptom → cause mapping.

## Technique catalog (cause → fix)
- **Constraint sharpening (RC1):** replace "always include all fields" with a
  *verbatim-or-null contract* + per-field rules ("product null unless named verbatim;
  error_codes only literal quoted strings; never infer/paraphrase/annotate").
- **Decision procedure (RC2):** give an explicit rule for the judgment ("severity from the
  facts stated, not the customer's tone"), not an adjective.
- **Output-format discipline (RC3):** separate the tasks or the output regions; specify the
  exact shape; if it's structured, use a JSON schema (see `agentic-loop`).
- **Few-shot boundary examples:** add examples at the decision boundary — but scope them to
  the sub-task (e.g. CLASSIFY-only) so they don't perturb extraction.

Full before/after wording in `references/technique-catalog.md`.

## Quick reference
| Thing | Value |
|---|---|
| First move | Read the failing cases + the grader, not the prompt |
| Change size | One root cause per iteration |
| Proof | Regression score + delta + regression check every iteration |
| Protect | Note which cases already pass; a PASS→FAIL flip means revert/rethink |
| Free wins | Constraints the grader literally cannot penalize (e.g. verbatim-or-null under precision-only scoring) |

## Common mistakes
- **Editing the prompt before reading the grader.** You'll optimize the wrong thing.
- **Fixing symptoms, not causes.** Patching one case's wording instead of the RC that
  generates the whole class of failures.
- **Ignoring regressions.** Always surface PASS→FAIL flips; net-positive can mask breakage.
- **Changing several things at once.** You won't know what worked.
- **Reaching for a bigger model first.** Prove it's the prompt (hold the model fixed) —
  usually it is.
