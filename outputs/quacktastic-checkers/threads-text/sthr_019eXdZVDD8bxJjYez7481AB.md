You are assessing product/technical fit for an inbound RFP. ENGAGEMENT FRAMING (critical): this is an INTERACTIVE WEB APPLICATION / BROWSER GAME (a marketing campaign asset) — NOT an enterprise data platform. Assess fit ONLY against the BTS-Synthetic Interactive Experiences Studio capability map below. The data-platform product-overview.md does NOT apply.

You may also read these files if present on disk: /workspace/context/studio-capabilities.md and /workspace/context/rfp-11-quacktastic-checkers.md. But everything you need is embedded below.

=== STUDIO CAPABILITY MAP (authoritative for this RFP) ===
Core delivery: React/TypeScript SPA builds, server-authoritative game logic, embeddable widgets (9 yrs shipping interactive marketing experiences/browser games). Rules engines for turn-based & real-time (board/card/puzzle) with SERVER-SIDE move validation as standard. Single-player AI opponents with tunable difficulty tiers (heuristic + minimax/alpha-beta); routinely ship 3-tier easy/medium/hard. Art rigging: we rig CLIENT-SUPPLIED art into a functioning animated board (we do not originate brand art).
Real-time multiplayer: WebSocket real-time sync via managed realtime tier; median move round-trip 120–180ms, p95 under 400ms on typical broadband (inside a 500ms requirement). Authoritative game server (all state server-side; clients render + send intents). Reconnection & state resilience: per-match persisted state; a player who drops/refreshes rejoins the SAME match in the SAME state. Shareable-link matchmaking (create game → share URL → opponent joins, no account).
Scale & performance: production-tested to 50,000 concurrent sessions single-region with horizontal autoscaling; 5,000 routine, 40,000 peak (launch livestream) within tested envelope WITH PRE-WARMED capacity. Cross-browser (Chrome/Firefox/Safari/Edge, no plugin). Mobile-responsive: touch (drag-and-drop AND tap-to-select) and pointer, one codebase. Embed model: sandboxed iframe widget that embeds cleanly without colliding with host header/footer or global CSS.
Accessibility: WCAG 2.2 AA target; full keyboard navigation of game boards as standard; real tested colorblind-safe alternate palettes as first-class fallback; screen-reader move announcements; reduced-motion support.
Media & polish: per-event SFX (move/capture/win) with mute + autoplay-policy handling; animation for piece movement, promotion, win/lose; respects prefers-reduced-motion; per-turn timers with visible countdown and low-time animation states.
Analytics: out of the box — games started, games completed, average game length, funnel/abandonment by segment (e.g. by difficulty level), exportable. Privacy-first: only signup email is PII.
WEAK spots (honest): no native iOS/Android store apps (web/PWA only); no in-house original brand/character art (we rig client art); NOT sub-50ms twitch/rollback e-sports netcode (fine for board games); no on-prem/air-gapped hosting (cloud-managed only).
Hosting/security: cloud-managed multi-region capable, SOC 2 Type II, ISO 27001, GDPR-aligned (DPA available), annual third-party security review supported, named subprocessors with client consent flows.
Typical timeline working back from a hard launch: 6 wks = single-player + local play, art rigged, embeddable, analytics ("playable on homepage"); 10 wks = adds real-time multiplayer (shareable link), reconnection, difficulty AI, full accessibility pass, load-tested to launch concurrency; 12 wks = adds hardening + livestream-readiness window (pre-warm, game-day runbook, 100% uptime rehearsal).

=== RFP: Quacktastic Checkers Arena (browser game for QuacktasticIndustries.com homepage, post-IPO relaunch) ===
Functional 2.1: 8x8 checkers board, 12 duck pieces/side (Classic Yellow vs Bath-Time Blue); standard movement + capture incl. MANDATORY jumps + multi-jump chains; king promotion on back row (rendered rubber crown); LEGAL-MOVE VALIDATION SERVER-SIDE; two modes — single-player vs computer with 3 difficulties (Easy, Medium, "Ruthless Duck") AND real-time 2-player multiplayer via shareable game link; visible turn indicator + 30s move timer with ducks visibly fidgeting when time low; SFX (quack on legal move, louder quack on capture); win/lose/draw detection + "winning ducks take a bow" animation; move history panel (last 10+ moves); mobile-responsive drag-and-drop AND tap-to-select-then-tap-to-move; accessibility — FULL KEYBOARD NAV of board + colorblind-safe alternate duck skin pairing as a REAL fallback (default yellow/blue is not CVD-safe).
Scale 2.2: 5,000 concurrent games at launch; peak ~40,000 concurrent visitors during IPO relaunch livestream; game state resilient to dropped connection (refresh mid-game → rejoin same game same state).
Capabilities 2.3: all evergreen browsers, no plugin/download; real-time moves sync <500ms round-trip on broadband; embed cleanly in an iframe on QuacktasticIndustries.com without breaking existing header/footer; analytics — games started, games completed, average game length, and which difficulty level gets abandoned most.
Note: Quacktastic SUPPLIES the duck artwork; vendor rigs it into a functioning board. SLA: 99.9% monthly, 100% uptime during a pre-announced 4-hour IPO livestream window. Award 2026-03-10; livestream date TBD at kickoff.

YOUR DELIVERABLE (answer in ONE message, ~300 words):
1) A requirement-by-requirement fit verdict (Covered / Covered-with-note / Gap) for Section 2.1, 2.2, 2.3 — be specific where our capability map directly matches (e.g. server-side validation, reconnection, 3-tier AI, keyboard nav, CVD-safe palettes, iframe embed, analytics-by-difficulty).
2) A PROPOSED REAL-TIME ARCHITECTURE for the game: client (React/TS SPA in sandboxed iframe), authoritative game server + rules engine (server-side move validation, mandatory-jump enforcement), WebSocket realtime tier, per-match persisted state store enabling reconnection, minimax/alpha-beta AI service for the 3 difficulty tiers, autoscaling + pre-warm for the 40K livestream spike, analytics pipeline. Give the data flow for a single move and for reconnect. Quote our latency numbers vs the 500ms bar.
3) Honest gaps/notes: art is client-supplied (we rig it — no gap, just confirm dependency); confirm this is casual turn-based (well within our realtime tier, NOT twitch netcode); anything else worth flagging.
This feeds a partner-level proposal, so be concrete and confident but honest.

interactive-rate-card.md
interactive-references.json
rfp-11-quacktastic-checkers.md
studio-capabilities.md
---
# BTS-Synthetic Interactive Experiences Studio — Capability Map

Authoritative capability list for the Technical Fit Specialist when the RFP is for an
**interactive web application, browser game, or real-time multiplayer experience** (not a data
platform). Use this to answer "do we cover this requirement?"

BTS-Synthetic runs two delivery practices: the Enterprise Data Platform (see product-overview.md)
and the **Interactive Experiences Studio** below. For a browser-game / interactive-web RFP, THIS is
the authoritative capability map — the data-platform overview does not apply.

## Core delivery

- **Custom web application builds**: React/TypeScript SPAs, server-authoritative game logic, and
  embeddable widgets. 9 years shipping interactive marketing experiences and browser games.
- **Rules engines**: turn-based and real-time game logic (board games, card games, puzzle games),
  with **server-side move validation** as standard — the client never adjudicates legality.
- **Single-player AI opponents**: tunable difficulty tiers (heuristic + minimax/alpha-beta for
  board games); we routinely ship 3-tier easy/medium/hard opponents.
- **Art rigging**: we take client-supplied artwork (sprites, skins) and rig it into a functioning,
  animated board/scene. We do not originate brand art unless asked.

## Real-time multiplayer

- **WebSocket real-time sync** via our managed realtime tier. Median move round-trip **120–180ms**,
  p95 under **400ms** on typical broadband — comfortably inside a 500ms requirement.
- **Authoritative game server**: all state lives server-side; clients render and send intents.
- **Reconnection & state resilience**: game state is persisted per-match; a player who drops or
  refreshes **rejoins the same match in the same state**. Shareable game-link join model built in.
- **Shareable-link matchmaking**: create-a-game → share URL → opponent joins, no account required.

## Scale & performance

- **Concurrency**: production-tested to **50,000 concurrent sessions** on a single region with
  horizontal autoscaling; 5,000 concurrent is routine, 40,000 peak (e.g. a launch livestream) is
  within tested envelope with pre-warmed capacity.
- **Cross-browser**: all evergreen browsers (Chrome, Firefox, Safari, Edge), no plugin/download.
- **Mobile-responsive**: touch (drag-and-drop AND tap-to-select) and pointer input, one codebase.
- **Embed model**: ships as a **sandboxed iframe** widget that embeds cleanly on a host site without
  colliding with the host header/footer or global CSS.

## Accessibility

- **WCAG 2.2 AA** target on interactive builds.
- **Full keyboard navigation** of interactive surfaces (including game boards) as standard.
- **Colorblind-safe alternate palettes**: we ship real, tested colorblind-safe skin pairings as a
  first-class fallback, not a toggle afterthought.
- Screen-reader move announcements and reduced-motion support.

## Media & polish



Content matches what's embedded. I have everything needed to produce the assessment now.

# Request for Proposal — Quacktastic Checkers Arena Web Application

**From:** Quacktastic Industries, Marketing Technology Office (procurement@quacktastic-synthetic.example)
**To:** Vendor — BTS-Synthetic
**Issued:** 2026-02-04
**Response due:** 2026-02-18 (14 days)
**Award expected:** 2026-03-10 (in time for our post-IPO brand relaunch campaign)

## 1. About Quacktastic Industries

Quacktastic Industries is the world's largest manufacturer of rubber ducks, novelty bath toys, and duck-adjacent merchandise (see our companion RFP for our Global Duck Intelligence Platform, issued separately by our Data & Analytics team — this request comes from Marketing, a different budget entirely, and yes, we know how that looks).

Following our IPO roadshow, our brand team wants a flagship browser game for QuacktasticIndustries.com: a checkers game played entirely with rubber ducks. This is not a joke request. This is going on the homepage. Legal has already cleared "duck-on-duck capture" as an acceptable phrase for the release notes.

## 2. Scope

### 2.1 Functional requirements
The application must implement standard checkers rules, reskinned entirely with rubber ducks, and must support:

- An 8x8 checkers board; each side starts with 12 rubber duck pieces (Classic Yellow vs. a challenger colorway, e.g. Bath-Time Blue)


Good, this confirms the RFP content matches. I have all I need to deliver the assessment.

FIT ASSESSMENT — Quacktastic Checkers Arena RFP (Interactive Experiences Studio scope, NOT data platform)

**1) Requirement-by-requirement verdict**

Section 2.1 (Functional):
- 8x8 board, 12 ducks/side, 2 colorways — Covered (art rigging onto client-supplied assets)
- Standard movement/capture, mandatory jumps, multi-jump chains — Covered (rules engine, turn-based board games standard)
- King promotion, rendered crown — Covered (art rigging + animation)
- Server-side legal-move validation — Covered, direct match ("client never adjudicates legality" is our default)
- Single-player vs computer, 3 difficulties (Easy/Medium/"Ruthless Duck") — Covered, direct match (we routinely ship 3-tier minimax/alpha-beta AI)
- Real-time 2-player via shareable link — Covered, direct match (shareable-link matchmaking is built-in, no account)
- Turn indicator + 30s timer w/ low-time animation — Covered (per-turn timers w/ countdown + low-time states is standard)
- SFX (quack on move/capture) — Covered (per-event SFX w/ mute + autoplay handling)
- Win/lose/draw + bow animation — Covered (win/lose animation standard)
- Move history (last 10+) — Covered-with-note: general capability, not explicitly itemized in our capability map but trivial given server-authoritative state log
- Mobile drag-and-drop + tap-to-select — Covered, direct match (both input modes, one codebase)
- Full keyboard nav — Covered, direct match
- CVD-safe alternate skin (real fallback, not a toggle) — Covered, direct match — this is explicitly first-class in our map

Section 2.2 (Scale):
- 5,000 concurrent games routine — Covered (routine tier)
- 40,000 peak concurrent (livestream) — Covered-with-note: within tested envelope but REQUIRES pre-warmed capacity — must be scheduled once livestream date is confirmed (currently TBD)
- Reconnect mid-game, same match/state — Covered, direct match

Section 2.3 (Capabilities):
- Evergreen browsers, no plugin — Covered
- <500ms round-trip — Covered with margin (p95 <400ms, median 120–180ms vs 500ms bar)
- Clean iframe embed, no header/footer collision — Covered, direct match (sandboxed iframe embed model)
- Analytics: started/completed/avg length/abandonment-by-difficulty — Covered, direct match (funnel/abandonment by segment e.g. difficulty level is out-of-box)

No outright Gaps identified in 2.1–2.3.

**2) Proposed architecture**
Client: React/TS SPA in sandboxed iframe, renders board + sends move intents only.
Server: Authoritative game server owns board state + rules engine (mandatory-jump/multi-jump enforcement, legality checks); AI service (minimax/alpha-beta, 3 difficulty configs) called synchronously on computer's turn.
Realtime: managed WebSocket tier relays intents/state deltas between server and both clients.
Persistence: per-match state store (Redis-class) keyed by match ID from the shareable link — enables reconnect: client refresh → rejoins via match ID → server pushes current authoritative state → client re-renders, no data loss.
Move flow: client sends move intent → server validates (legal + mandatory-jump rule) → server mutates authoritative state → broadcasts new state via WebSocket to both clients (or AI service) → SFX/animation triggers client-side → analytics event emitted (move, capture, game-end).
Scale: horizontal autoscaling behind load balancer; pre-warm pool sized to 40K concurrent ahead of the announced livestream window, matching our tested 50K single-region envelope.
Latency: median 120–180ms, p95 <400ms — comfortably inside the 500ms bar with margin for jitter.

**3) Honest gaps/notes**
- No gap on art — client supplies duck art, we rig it; this is a firm dependency, needs asset delivery milestone in the SOW.
- This is casual turn-based (30s/move) — well within our realtime tier; explicitly NOT the sub-50ms twitch/rollback netcode we're weak on, so no risk there.
- Move-history panel isn't a named line item in our capability map but is a trivial derivative of server-authoritative state — flag as a minor scope add, not a technical risk.

**Overall fit: HIGH.**

**Single most important risk to flag:** The 40,000-peak / 100%-uptime-during-livestream requirement is achievable but ONLY with pre-warmed capacity scheduled in advance — and the livestream date is explicitly "TBD at kickoff" while award is fixed at 2026-03-10. If the client doesn't lock the livestream date early enough to fit our 12-week hardening/pre-warm/game-day-runbook timeline before that date, we risk launching without the rehearsed pre-warm buffer that makes the 40K/100%-uptime SLA safe. Recommend the proposal make firm livestream-date commitment (with lead time ≥ our 12-wk track) a contractual dependency, not just a scheduling footnote.

Delivered the full technical fit assessment to the coordinator: high overall fit, no outright gaps across Sections 2.1–2.3, a concrete real-time architecture (client/server/WebSocket/persistence/AI/analytics with move and reconnect data flows, latency numbers vs. the 500ms bar), and flagged the key risk — the 40K-concurrent/100%-uptime livestream requirement depends on locking the livestream date early enough to fit our pre-warm/hardening timeline, since the date is currently TBD while the award date is fixed.