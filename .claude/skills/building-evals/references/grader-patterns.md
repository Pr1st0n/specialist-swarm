# Grader Patterns — code shapes

From Basecamp day2/01. A grader takes `(result, check, context)` and returns
`{"score": 0.0..1.0, "reason": "..."}`. The `reason` is what lets you fix failures.

## Exact / substring
```python
def grade_response_contains(result, check, context=None):
    text, target = result["final_text"].lower(), check.lower()
    if target in text:
        return {"score": 1.0, "reason": f"Found '{check}'"}
    return {"score": 0.0, "reason": f"'{check}' not found in: {result['final_text'][:200]}"}
```

## Numeric (tolerant)
```python
import re
def grade_response_numeric(result, check, context=None):
    value = float(check["value"]); tol = float(check.get("tolerance", 0.01))
    for s in re.findall(r"-?[\d,]+\.?\d*", result["final_text"]):
        try:
            if abs(float(s.replace(",", "")) - value) <= tol:
                return {"score": 1.0, "reason": f"Found {s} (expected {value}±{tol})"}
        except ValueError:
            continue
    return {"score": 0.0, "reason": f"Expected {value}±{tol}"}
```
Use numeric (not contains) when formatting varies — `$24.99`, `24.99.`, `24,99` all match.

## Tool use (did it call the right tool with the right args)
```python
def grade_tool_use(result, check, context=None):
    want_name, want_args = check["tool_name"], check.get("arguments", {})
    for call in result["tool_calls"]:
        if call["name"] == want_name and all(call["arguments"].get(k) == v for k, v in want_args.items()):
            return {"score": 1.0, "reason": f"Called {want_name}({want_args})"}
    return {"score": 0.0, "reason": f"No {want_name} call with {want_args}; calls={[c['name'] for c in result['tool_calls']]}"}
```
Requires a transcript parser that extracts `final_text` + `tool_calls` (name, arguments, id)
and matches `tool_result` blocks back to calls by `tool_use_id`.

## LLM-as-judge (schema-validated verdict)
```python
JUDGE_SCHEMA = {
  "type": "json_schema",
  "schema": {
    "type": "object",
    "properties": {
      "verdict": {"type": "string", "enum": ["PASS", "FAIL"]},
      "reason":  {"type": "string", "description": "One sentence."},
    },
    "required": ["verdict", "reason"], "additionalProperties": False,
  },
}

def grade_llm_judge(result, check, context=None):
    # check is a natural-language criterion; ask Claude, constrained to the schema.
    # verdict is an enum, so no string-parsing and no temperature dial needed.
    ...
    return {"score": 1.0 if verdict == "PASS" else 0.0, "reason": reason}
```
Determinism comes from the enum + schema, not from sampling params (temperature is removed
on the newest models). Use the judge only for genuinely open-ended quality; prefer the
cheap deterministic graders whenever a check can be made exact.

## Harness
```python
def run_eval(run_agent, tasks, num_runs=1):
    # for each task, run the agent num_runs times, grade every run, aggregate to a rate.
    # parallelize with ThreadPoolExecutor; save per-run detail for before/after diffs.
    ...
```
- `num_runs=5` (or more) is the point — read the pass rate, not one run.
- `print_summary` shows per-task and per-check rates so you can see *where* it breaks.
- `save_results` writes JSON so you can compare a change against the saved baseline.
