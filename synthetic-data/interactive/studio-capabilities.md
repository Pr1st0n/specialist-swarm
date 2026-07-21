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

- **Audio**: per-event sound effects (move / capture / win) with a mute control and autoplay-policy
  handling.
- **Animation**: piece movement, promotion, win/lose sequences; respects `prefers-reduced-motion`.
- **Low-time affordances**: per-turn timers with visible countdown and low-time animation states.

## Analytics

- **Product analytics** out of the box: sessions/games started, games completed, average game
  length, funnel/abandonment by segment (e.g. by difficulty level), exportable to the client's
  analytics stack. Privacy-first: only signup email is PII; everything else is anonymous.

## Where we're WEAK (honest list — use this when assessing fit)

- **Native mobile apps** (iOS/Android store builds): we do web/PWA, not native. Flag as out-of-scope
  if the RFP demands App Store presence.
- **Original brand/character art**: we rig client art; we don't run a full art studio in-house.
- **Sub-50ms competitive e-sports netcode**: our realtime tier targets casual/turn-based real-time,
  not twitch/rollback netcode. Fine for board games; flag for fast-action games.
- **On-prem / air-gapped hosting**: our realtime tier is cloud-managed only.

## Hosting, security & compliance

- Cloud-managed hosting (multi-region capable), SOC 2 Type II, ISO 27001, GDPR-aligned (DPA
  available). Annual third-party security review supported.
- Realtime/hosting subprocessors are named in our subprocessor list; we support client consent flows.

## Implementation timeline (typical, works backward from a hard launch date)

- **6 weeks**: single-player + local play, art rigged, embeddable, analytics — a "playable on the
  homepage" milestone.
- **10 weeks**: adds real-time multiplayer (shareable link), reconnection, difficulty AI, full
  accessibility pass, load-tested to launch concurrency.
- **12 weeks**: adds a hardening + livestream-readiness window (pre-warm, game-day runbook, 100%
  uptime rehearsal for the announced window).
