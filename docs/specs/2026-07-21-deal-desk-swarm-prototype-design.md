# Deal Desk Specialist Swarm + Interactive Prototype — Design & Scope

**Date:** 2026-07-21
**Scenario:** Card A — Deal Desk (Option 3, Specialist Swarm)
**Owner:** filipp.shestakov (Accenture) · Anthropic Partner Basecamp hackathon
**Status:** approved, in execution

## 1. Goal (one sentence)

Run the real **Managed Agents multi-agent orchestration** (coordinator + 4 specialists + skills)
to produce a branded proposal **docx** from an RFP, and wrap it in a fast, branded **interactive
web prototype** that tells the demo story: *input RFP → specialists fan out → proposal + docx.*

## 2. Priorities

1. **P1 — Core build (README):** produce `outputs/proposal-response*.docx` from the swarm for **≥1 RFP** (Acme = bare minimum).
2. **P2 — Interactive prototype (our stretch, the thing we care most about):** branded web app over the swarm's outputs.
3. **P2b — Multi-deal (optional but wanted):** run the swarm for **several RFPs in parallel** so the app shows a deal portfolio.
4. **Design system:** lightweight — just enough Altiora branding (tokens + a few components) to make the prototype look like a real firm.

**Explicitly dropped:** pitch deck (was S7). **Demo must stay short:** show the RFP, the docx, the prototype.

## 3. What already exists (starter)

- Managed Agents scripts: `setup_environment.py`, `create_specialists.py`, `upload_skills.py`,
  `create_coordinator.py`, `run_deal_desk.py`, `download_deliverable.py`, `stretch_critic_subagent.py`.
- 4 specialists: Pricing (skill `pricing-playbook`), Legal (`legal-checklist`),
  Technical Fit (uses `product-overview.md` inline), Competitive (`competitive-intel`).
- Coordinator: "Senior Partner", model `claude-opus-4-7`, `multiagent: coordinator`.
- Data: **11 RFPs** (`rfp-acme-corp.md` + `rfp-01..10-*.md`), `past-wins.json`, `product-overview.md`.

## 4. Corrected model of the tech (was wrong earlier)

Managed Agents = **Claude-based orchestration via the Anthropic API** (not a separate risky cloud):
`client.beta.agents.create(...)` per agent → coordinator with `multiagent:{type:"coordinator",agents:[...]}`
and `agent_toolset_20260401` → a **session** against an **environment** (sandbox + shared FS) → the
coordinator (Claude) delegates to each specialist in its own **thread**, in parallel, and synthesizes.
The primary **event stream** (`session.thread_created` / `agent.thread_message_received`) is the fan-out visual.
SDK sets the `managed-agents-2026-04-01` beta header automatically.

## 5. Deliverables

| # | Artifact | Path | Produced by |
|---|---|---|---|
| D1 | Branded proposal **docx** (≥1 RFP) | `outputs/` | the swarm (core build) |
| D2 | Captured per-deal outputs (proposal text + each specialist's output + events) | `web/public/data/deals/<slug>/` | orchestration → export |
| D3 | **Interactive web app** (RFP → fan-out → proposal + docx download) | `web/` | prototype-dev + ui-ux |
| D4 | **Lightweight design system** (Altiora tokens, type, a few components, styleguide) | `web/` / `design-system/` | ui-ux-designer |

## 6. Brand & design systems — PER PROJECT (updated)

**Bespoke per project/deal.** Each deal gets its OWN distinct design system, themed to that RFP's
imaginary company — the `ui-ux-designer` agent invents each one **creatively, on its best judgment**
(a wizards' guild, a cosmic reality office, and a coffee roaster should feel like different worlds).
This is the demo's "wow" and **supersedes** any earlier "single Altiora brand applied everywhere"
references in this doc. An invented consultancy (working name **Altiora**) may still serve as the
neutral console shell / bidder identity, but the visual variety lives per deal.

## 7. Architecture

```
RFP file(s)  ──►  Managed Agents swarm (Claude orchestration)
                    coordinator (Senior Partner, opus)
                      ├─ Pricing        (pricing-playbook skill)
                      ├─ Legal          (legal-checklist skill)
                      ├─ Technical Fit  (product-overview context)
                      └─ Competitive    (competitive-intel skill)
                    → synthesize → docx (docx skill) + proposal text
                          │
                          ▼
                 export per-deal bundle (JSON + docx) ──►  web/public/data/deals/<slug>/
                          │
                          ▼
                 Interactive web app (static, Altiora-branded)
                   deal list → deal detail: RFP requirements · specialist fan-out & outputs
                             · synthesized proposal · download docx
```

**Two shared interfaces (frozen early so the build team parallelizes):**
- **Deal bundle schema** (`bundle.json`): `{ slug, customer, rfp:{title, summary, requirements[]}, specialists:{pricing,legal,technical,competitive}, proposal:{sections[]}, docx_filename, meta:{model, generated_at, status} }`.
- **Design tokens** (`tokens.css` / Tailwind config): palette, typography, spacing, radius, shadow.

## 8. Build team (Claude Code subagents; I coordinate)

Mirrors the Deal Desk pattern itself (meta-story for the demo).

| Subagent | Lane | Delivers |
|---|---|---|
| `ui-ux-designer` | frontend-design skill | Altiora brand + design tokens + components + styleguide + screen design |
| `prototype-dev` | architecture + build | the web app consuming tokens + deal bundles |
| `qa` | fit-gap validation | proposal/app vs RFP requirements; docx renders; app builds/runs; ship-checklist |

I (coordinator) run the core build (Managed Agents scripts), freeze the two interfaces, export bundles, synthesize.

## 9. Web app scope (keep simple/fast)

- **Stack:** Vite + React + TS + Tailwind (fast scaffold, high design quality, `npm run dev` for demo). Static — reads committed JSON; no backend.
- **Views:** (1) Deals list (portfolio of RFPs). (2) Deal detail: RFP requirements matrix · the 4 specialists with their outputs and a fan-out animation · synthesized proposal (commercial / contract / risk) · **download docx**.
- **Extensible:** new RFP → run swarm → export bundle → app shows it. No code change to add a deal.

## 10. Execution sequence

- **Phase 0 (me):** deps ✓ → `setup_environment.py` (also de-risks API access) → `create_specialists` → `upload_skills` → `create_coordinator` → **attach a docx skill to the coordinator** (starter gap: it's told to use docx but none is attached) → `run_deal_desk` for **Acme** → confirm docx. Freeze bundle schema + tokens.
- **Phase 1:** generalize run to **N RFPs in parallel**; export per-deal bundles. (≥1 required; a handful for the portfolio.)
- **Phase 2 (parallel subagents):** `ui-ux-designer` (design system) ‖ `prototype-dev` (web app).
- **Phase 3:** `qa` fit-gap + `ship-checklist`; I synthesize + demo dry-run.

## 11. Risks / watch-items

- **Managed Agents access:** workspace may need research-preview grant. De-risk at Phase 0 step 1; if blocked, escalate to user (fallback = local Messages-API orchestration to still produce the docx).
- **docx skill gap:** coordinator has no docx skill attached in starter code — must fix or the "docx" is just text.
- **Cost/time:** 11 RFPs × 4 specialists is a lot of tokens; default to Acme + a small curated set, not all 11.
- **Demo brittleness:** app reads committed static bundles → demo never depends on a live run.

## 12. Definition of done

- [ ] `outputs/` has a real branded `.docx` for ≥1 RFP, generated by the swarm.
- [ ] Web app runs, is Altiora-branded, and shows RFP → specialists → proposal → docx for ≥1 deal.
- [ ] Design tokens exist and are applied consistently.
- [ ] QA fit-gap pass + ship-checklist green.

## 13. Current state — end of session 1 (2026-07-21)

**P1 DONE ✅** — real branded docx produced by the swarm:
`outputs/BTS-Synthetic_Proposal_Acme-Corp_Enterprise-Data-Platform.docx` (valid OOXML, 7 pages).
All 4 specialists ran in parallel using their skills; coordinator synthesized + built the docx via
`bash`+`python-docx` in the sandbox (no docx skill required). Model IDs bumped to current
(specialists `claude-sonnet-5` / competitive `claude-haiku-4-5-20251001`; coordinator `claude-opus-4-8`).
State files written: `.environment_id`, `.specialist_ids.json`, `.coordinator_id`, `.last_session_id`.

**Key operational facts:** use API key **`$ANTHROPIC_API_KEY_NEW`** (not `$ANTHROPIC_API_KEY`) —
`ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY_NEW" ./.venv/bin/python <script>.py`. Managed Agents access is
enabled on that workspace. Correct script order = setup_environment → create_specialists →
upload_skills → create_coordinator → run_deal_desk (skills MUST attach before the coordinator is
created, which pins specialist versions).

**P2 NEXT** — build `ui-ux-designer` + `prototype-dev` + `qa` (see §8) to implement per-project design
systems (§6) and the interactive web app (§9).

**OPEN DECISION (resume with user):** how many deals to generate (billable parallel swarm runs; 1=Acme
is the min). Per-project design needs >1 project. Proposed +3 diverse (Arcanum Wizards' Guild, Cosmic
Concord, Byte & Barrel Coffee); user paused to clarify — ask before spending. Also: `run_deal_desk.py`
is hardcoded to Acme + downloads files only; for multi-deal, generalize it (RFP path arg, parallel
sessions) and capture per-specialist outputs via the threads API for richer app data.
