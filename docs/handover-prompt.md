# HANDOVER — Deal Desk Specialist Swarm + Interactive Prototype (Anthropic Partner Basecamp hackathon)

You are picking up an in-progress hackathon build in a fresh session. Work in
`/Users/philipp.shestakov/acn/anthropic/basecamp/hackathon/specialist-swarm`. Read this whole prompt,
then read the spec, before taking any action.

## 0. First actions
1. Read the spec — it is your entry point: `docs/specs/2026-07-21-deal-desk-swarm-prototype-design.md`
2. Skim `README.md`, `scenario-cards.md` (Card A — Deal Desk), and the project `CLAUDE.md` (../CLAUDE.md).
3. Scoping/brainstorming is already done. Go straight to executing: use `superpowers:writing-plans` then
   `superpowers:subagent-driven-development` (or `planning:make` + `planning:exec`). Only re-brainstorm if
   something in the design is genuinely unsettled.

## 1. Mission
Card A "Deal Desk": a **Managed Agents multi-agent swarm** (coordinator + 4 specialists + skills) turns an
RFP into a branded proposal **docx**. We are extending it with an **interactive, branded web prototype**.
Demo (keep it short) = show the **input RFP → the generated docx → the interactive prototype**. The pitch
deck was explicitly dropped. Keep everything **simple and fast**; the prototype is the priority.

## 2. DONE — P1, README core build ✅
- The swarm was built and run for the Acme RFP and produced a real **7-page branded Word doc**:
  `outputs/BTS-Synthetic_Proposal_Acme-Corp_Enterprise-Data-Platform.docx` (valid OOXML — verified).
- All 4 specialists (Pricing, Legal, Technical Fit, Competitive) ran **in parallel**, each using its skill;
  the coordinator synthesized and built the docx via `bash`+`python-docx` in the sandbox (no docx skill needed).
- Model IDs were bumped from retired ones to current: specialists `claude-sonnet-5`
  (competitive `claude-haiku-4-5-20251001`), coordinator `claude-opus-4-8`.
- State files exist and are reusable: `.environment_id`, `.specialist_ids.json`, `.coordinator_id`,
  `.last_session_id`. Raw run log at `outputs/run-acme.log`, coordinator synthesis at
  `outputs/coordinator-transcript.txt`.

## 3. NEXT — P2, the prototype (our real focus)
Build NEW build-team agents (scope each tightly; use the `agent-building-blocks` + `frontend-design` skills;
you may define them as `.claude/agents/*.md` for reuse — "same approach as the existing swarm agents"):

- **`ui-ux-designer`** (uses `frontend-design`) — invent a **DISTINCT design system PER PROJECT/DEAL**,
  themed to each RFP's imaginary company, **creatively, on its own best judgment** (tokens: palette,
  typography, spacing, radius, shadow; a few components; a motif). NOT one fixed template. This variety is
  the demo's "wow."
- **`prototype-dev`** — architecture + build the **interactive web app** that consumes the design
  system(s) + deal data. Proposed stack: **Vite + React + TS + Tailwind**, static (reads committed JSON,
  no backend), `npm run dev` for the demo. Views: deal list (portfolio) → deal detail (RFP requirements
  matrix · the 4 specialists with their outputs + a fan-out visualization · synthesized proposal
  (commercial/contract/risk) · **download docx**). Extensible: drop a new RFP → re-run swarm → new deal appears.
- **`qa`** — fit-gap validation: proposal/app vs the RFP requirements; per-deal design consistency; docx
  renders; app builds & runs. Finish with the `/ship-checklist` command.

**Shared interfaces to freeze first** (so the agents parallelize cleanly):
- Deal **bundle schema** (`web/public/data/deals/<slug>/bundle.json`): `{ slug, customer,
  rfp:{title, summary, requirements[]}, specialists:{pricing, legal, technical, competitive},
  proposal:{sections[]}, docx_filename, meta:{model, generated_at, status} }`.
- Design **tokens** contract (per-deal `tokens.css` / Tailwind theme).

## 4. OPEN DECISION — resume this WITH THE USER before spending
How many deals to generate (each is a **billable, parallel swarm run**; 1 = Acme is the minimum).
Per-project design needs >1 project. I proposed **+3 diverse** for max design contrast — Arcanum Wizards'
Guild (fantasy), Cosmic Concord (cosmic/surreal), Byte & Barrel Coffee (warm/artisanal) — plus Acme
(corporate) = 4. The user paused to clarify; **ask them** how many, and whether they want a cheaper way to
get multiple "projects" (e.g., lighter models, or not re-running the full opus coordinator each time)
before running. There are **11 RFPs** in `synthetic-data/` (`rfp-acme-corp.md` + `rfp-01..10-*.md`).

## 5. KEY FACTS / GOTCHAS
- **API key:** use **`$ANTHROPIC_API_KEY_NEW`** (NOT `$ANTHROPIC_API_KEY`). Run scripts as:
  `ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY_NEW" ./.venv/bin/python <script>.py`. Managed Agents access is
  enabled on this key's workspace.
- **Env:** `.venv` (Python 3.14, `anthropic` 0.117, `python-dotenv`). Node 24 / npm 11 available.
- **Managed Agents = Claude-based orchestration via the Anthropic API** (not a separate cloud to avoid): the
  coordinator is Claude delegating to specialist threads in parallel; the primary event stream is the fan-out
  visual. Ref: https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration
- **`run_deal_desk.py` is hardcoded to Acme and only downloads produced files.** For multi-deal: generalize
  it (accept an RFP path, run N sessions in parallel), and for richer app data capture **per-specialist
  outputs via the threads API** (`client.beta.sessions.threads.list(...)` + `.threads.events.list/stream`),
  not just the coordinator transcript.
- **Script order matters:** setup_environment → create_specialists → upload_skills → create_coordinator →
  run_deal_desk. Skills must attach to specialists BEFORE the coordinator is created (the coordinator pins
  specialist versions at creation time).
- **Git:** email verified `philipp.shestakov@accenture.com`. Global rules: `gh repo create --private`,
  default branch `main`, and NEVER add a `Co-Authored-By` trailer. Verify `git config user.email` before any commit.
- The docx self-branded "BTS-Synthetic" (from `synthetic-data/product-overview.md`). Rebranding to an
  invented firm is optional polish, not a blocker.

## 6. Definition of done
- `outputs/` has ≥1 real branded docx from the swarm ✅ (Acme done — keep it).
- Web app runs, per-deal design systems applied, shows RFP → specialists → proposal → docx for ≥1 deal.
- QA fit-gap pass + `/ship-checklist` green.

## 7. Working principles (from the prep-pack CLAUDE.md)
Eval/verify-driven, not vibe-driven (run things and read the result). Scope each agent's job/tools tightly.
Never over-claim "done" — verify with evidence. Use the skills in `.claude/skills/` (multi-agent-orchestration,
agent-building-blocks, building-evals, diagnostic-loop) and `frontend-design`. Simple and fast wins.
