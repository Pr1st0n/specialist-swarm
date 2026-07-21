An RFP has just landed. Run the standard Deal Desk process, but note the engagement framing carefully.

# Engagement framing (important)
This RFP is for an INTERACTIVE WEB APPLICATION / BROWSER GAME — a marketing campaign asset — NOT an enterprise data platform. For this deal, the authoritative context is the BTS-Synthetic **Interactive Experiences Studio**:
- Technical fit is assessed against `studio-capabilities.md` (the interactive build capability map). The data-platform `product-overview.md` does NOT apply here.
- Pricing uses `interactive-rate-card.md` for the numbers, and the pricing-playbook skill for DISCIPLINE (discount discipline, MFN posture, payment/term rules). The data-platform tier list does not apply. Cite `interactive-references.json` as comparable prior builds.
- Legal uses the legal-checklist skill as-is against the RFP's contractual section (liability, IP, audit, termination, subprocessors, SLA) — it transfers directly.
- Competitive: the named competitors in THIS RFP are Waterfowl Analytics Inc., a boutique indie game studio, and Databricks (who declined). Reason about THESE actual competitors — ignore the data-platform battlecards (Snowflake/Fabric/BigQuery) which are irrelevant to a browser game.

# Process
1. Read the RFP yourself.
2. Delegate to all four specialists in parallel, each with the framing above.
3. Synthesise their replies.
4. Produce the final proposal response as a BRANDED Word document (.docx) using python-docx and/or pandoc in the sandbox — real branding (cover, palette, styled tables, running header/footer). Follow the RFP's requested response format: executive summary, technical proposal INCLUDING the proposed real-time architecture, a 2-year transparent commercial proposal, an implementation plan working backward from the livestream date, two interactive/game references, and a note on the board mockup. Save it under /mnt/session/outputs/.

Move fast — the RFP deadline is real. All four specialists in parallel.

=====  DOCUMENT: rfp-11-quacktastic-checkers.md  =====
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
- Standard checkers movement and capture rules, including mandatory jumps and multi-jump chains
- King promotion on reaching the back row — promoted pieces get a small rendered rubber crown on the duck
- Legal-move validation enforced server-side (no client can move a duck illegally, no matter how much the player insists their duck "can fly")
- Two play modes:
  - Single-player vs. a computer opponent, with three difficulty levels: Easy, Medium, and "Ruthless Duck" (the hard mode name is final, per Marketing, do not attempt to talk us out of it)
  - Real-time two-player multiplayer via a shareable game link
- A visible turn indicator and a 30-second move timer; when time is low, the current player's ducks should visibly fidget
- Sound effects: a quack on every legal move, and a louder, more triumphant quack on every capture
- Win/lose/draw detection, with a short "the winning ducks take a bow" animation on game end
- Move history panel, showing at minimum the last 10 moves
- Mobile-responsive layout supporting both drag-and-drop and tap-to-select-then-tap-to-move interaction patterns
- Basic accessibility: full keyboard navigation of the board, and a colorblind-safe alternate duck skin pairing (the default yellow/blue pairing is not colorblind-safe; Marketing has been informed and remains unbothered, so this alternate skin needs to be a real fallback, not a suggestion)

### 2.2 Scale
- Target concurrent games at launch: 5,000
- Expected peak: during the IPO relaunch livestream, an estimated 40,000 concurrent visitors, of which we hope at least a fraction actually play a game rather than just admiring the ducks
- Game state must be resilient to a dropped connection — a player who refreshes mid-game should rejoin the same game in the same state, not lose their ducks

### 2.3 Capabilities
- Must run in all evergreen browsers (Chrome, Firefox, Safari, Edge); no plugin or download required
- Real-time multiplayer moves must sync in under 500ms round-trip on a typical broadband connection
- Must embed cleanly in an iframe on QuacktasticIndustries.com without breaking our existing site header/footer
- Basic analytics: games started, games completed, average game length, and (Marketing's specific request) which difficulty level gets abandoned most often

## 3. Commercial requirements

### 3.1 Term
We are seeking a 1-year initial term with a 1-year renewal option — this is a marketing campaign asset, not core infrastructure, and Marketing's budget cycle is annual.

### 3.2 Payment
Fees billed in advance, due Net 60.

### 3.3 Discount
The successful vendor must offer no less than 20% off published list pricing.

### 3.4 Most Favoured Nation
Not applicable to this engagement.

### 3.5 Termination
Quacktastic reserves the right to terminate at any time, with or without cause, on 30 days' written notice. No early termination fees.

## 4. Contractual requirements

### 4.1 Liability
Vendor liability is capped at 12 months of fees paid, except for breaches involving player data (email addresses collected at signup), which remain uncapped.

### 4.2 Audit
Quacktastic reserves the right to a single annual security review of the application and its hosting environment.

### 4.3 Service Levels
Vendor must commit to 99.9% monthly uptime, with 100% uptime required during the IPO relaunch livestream window (a single, pre-announced 4-hour period — the exact date will be provided at kickoff).

### 4.4 IP
All work product, including game logic, art direction guidelines, and integrations, shall vest in Quacktastic upon creation. Quacktastic will supply the duck artwork; vendor is responsible for rigging it into a functioning game board.

### 4.5 Subprocessors
Vendor shall obtain Quacktastic's prior written consent before engaging any subprocessor for hosting or real-time messaging infrastructure.

## 5. Evaluation criteria

| Criterion | Weight |
| --- | --- |
| Functional fit (feature completeness against Section 2.1) | 35% |
| Real-time multiplayer quality and latency | 20% |
| Commercial terms (pricing + flexibility) | 15% |
| Implementation timeline and risk | 20% |
| Vendor stability + relevant references (games or interactive web experiences) | 10% |

## 6. Vendors being evaluated

We are also issuing this RFP to:
- Waterfowl Analytics Inc. (yes, the same firm from our data platform RFP — they insisted on bidding on this one too)
- A boutique indie game studio recommended by our CMO's nephew
- Databricks (declined to bid, citing "this is not really our area," which the procurement team found refreshingly honest)

## 7. Response format

Please respond by 2026-02-18 with:
- Executive summary (1 page)
- Technical proposal, including proposed real-time architecture (no page limit)
- Commercial proposal with full pricing transparency for 2 years
- Implementation plan with key milestones, working backward from the livestream date
- Two references (prior interactive web/game builds; data-platform references not required for this RFP)
- A short mockup or wireframe of the board and a single duck piece, if available at proposal stage

## 8. Contact

Direct all questions and the response to: procurement@quacktastic-synthetic.example
Procurement lead: Priyanka Osei, Marketing Technology Manager
Technical lead: Nate Callahan, Front-End Engineering Lead


=====  DOCUMENT: studio-capabilities.md  =====
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


=====  DOCUMENT: interactive-references.json  =====
{
  "_comment": "Prior interactive-web / browser-game builds for the Interactive Experiences Studio. Use these as reference proof points and comparable deals when the RFP is for a game or interactive web experience (NOT the data-platform past-wins.json).",
  "comparable_builds": [
    {
      "customer": "Fizzwick Beverages",
      "engagement": "\"Spin-to-Win\" real-time multiplayer promo game embedded on the brand homepage",
      "deal_size_usd": 240000,
      "term": "1 year + 1 year renewal",
      "discount_from_list": 0.15,
      "payment_terms": "Annual upfront, Net 60",
      "peak_concurrency": 32000,
      "launch_moment": "Super Bowl ad tie-in livestream",
      "won_on": "Hit 100% uptime through the ad window on pre-warmed capacity; sub-200ms sync",
      "closed": "2025-10-02",
      "notes": "Livestream spike playbook: pre-warm to 1.5x expected peak, game-day runbook, war-room."
    },
    {
      "customer": "Marlowe Board & Bar",
      "engagement": "Browser chess + backgammon suite with shareable-link multiplayer and 3-tier AI",
      "deal_size_usd": 180000,
      "term": "2 years",
      "discount_from_list": 0.12,
      "payment_terms": "Annual upfront, Net 30",
      "peak_concurrency": 9000,
      "launch_moment": "Rolling launch",
      "won_on": "Server-authoritative rules engine + reconnection; beat an indie studio on reliability",
      "closed": "2025-06-18",
      "notes": "Reusable turn-based rules engine + minimax AI harness — directly reusable for checkers."
    },
    {
      "customer": "Verdant Parks Authority",
      "engagement": "Accessible public-facing interactive map + mini-game, WCAG 2.2 AA",
      "deal_size_usd": 130000,
      "term": "1 year",
      "discount_from_list": 0.1,
      "payment_terms": "Annual upfront, Net 30",
      "peak_concurrency": 4000,
      "launch_moment": "Public campaign",
      "won_on": "Full keyboard nav + colorblind-safe palettes shipped as first-class, not afterthought",
      "closed": "2026-01-20",
      "notes": "Accessibility reference: keyboard-navigable interactive board, tested CVD-safe palettes."
    }
  ]
}


=====  DOCUMENT: interactive-rate-card.md  =====
# BTS-Synthetic Interactive Experiences Studio — Rate Card

Authoritative list pricing for the Pricing Specialist when the RFP is for an **interactive web
application / browser game** (a campaign asset), NOT the Enterprise Data Platform. Use THIS rate
card for these engagements — the data-platform tiers in pricing-playbook do not apply, but the
playbook's **rules** (discount discipline, MFN never, payment/term posture, concession list) still
govern.

## Packages (annual list, campaign / interactive builds)

| Package | Annual list | What's included |
| --- | --- | --- |
| Campaign Lite | $120K | Single-player + local play, art rigged, embeddable widget, basic analytics, 99.9% SLA, business-hours support |
| Campaign Pro | $220K base | Everything in Lite + real-time multiplayer (shareable link), reconnection, 3-tier AI, full accessibility pass, load test to 40K concurrent, 24/7 support during launch window |
| Flagship | $360K base | Everything in Pro + dedicated launch war-room, 100% uptime rehearsal for a pre-announced livestream window, custom art rigging, and a named delivery lead |

A homepage flagship game with real-time multiplayer at 40K livestream concurrency sits in
**Campaign Pro** (most engagements) — Flagship only if they want the full livestream war-room.

## Build vs. run split

- Fees above are the annual **run/license** (hosting, realtime tier, support, SLA).
- One-time **build fee** is quoted separately, typically **0.5×–0.9× of the annual run fee**
  depending on scope; creditable toward Year 1 on a signed multi-year, same as our PoC policy.

## Discount bands (from list) — same discipline as the playbook

| Annual deal size | Standard max discount | Strategic max discount |
| --- | --- | --- |
| < $150K | 10% | 15% |
| $150K – $300K | 15% | 20% |
| > $300K | 20% | 25% |

"Strategic" requires sign-off and one of: brand-name logo, multi-year commit, or reference-customer
agreement. A demanded 20% on a Campaign Pro deal is at the top of the standard band — grant it only
for the full 1+1 term and a public reference; otherwise open at 15%.

## Posture reminders (inherit from pricing-playbook)

- **MFN**: never (not requested here — confirm it stays out).
- **Payment**: Net 60 acceptable for a credible post-IPO counterparty; do not go past Net 60.
- **Term**: 1yr+1yr renewal is fine for a campaign asset; a 2-year commit unlocks a 3% uplift.
- **Liability**: cap at 12 months' fees; the RFP's uncapped-for-player-data carve-out needs a
  bounded counter (super-cap, not truly uncapped) — hand to Legal.


I'll start by surveying the environment — checking for the skills, the context files, and the outputs directory — before delegating to the specialists.

=== uploads ===
total 4
drwxr-xr-x 1 claude ubuntu    0 Jul 21 14:44 .
drwxr-xr-x 4 root   root   4096 Jul 21 14:44 ..
=== outputs ===
total 4
drwxr-xr-x 1 claude ubuntu    0 Jul 21 14:44 .
drwxr-xr-x 4 root   root   4096 Jul 21 14:44 ..
=== find context files ===


=== search for skills ===
/workspace/skills/competitive-intel/SKILL.md
/workspace/skills/pricing-playbook/SKILL.md
/workspace/skills/legal-checklist/SKILL.md
=== skills dirs ===
/mnt/skills
/dev/shm/rclone-vfscache/vfsMeta/sesn_015mSwTnYVmZQFJUfZ2HyPHM_mnt_skills
/dev/shm/rclone-vfscache/vfs/sesn_015mSwTnYVmZQFJUfZ2HyPHM_mnt_skills
/workspace/skills
/tmp/rclone-mounts/sesn_015mSwTnYVmZQFJUfZ2HyPHM_mnt_skills


=== /workspace ===
/workspace:
skills

/workspace/skills:
competitive-intel
legal-checklist
pricing-playbook

/workspace/skills/competitive-intel:
SKILL.md

/workspace/skills/legal-checklist:
SKILL.md

/workspace/skills/pricing-playbook:
SKILL.md

=== /mnt/skills ===
/mnt/skills:
competitive-intel.zip
legal-checklist.zip
pricing-playbook.zip


=== find docx / office / pdf skills ===
/etc/libreoffice
/etc/libreoffice/registry
/etc/libreoffice/registry/res
/etc/texmf/dvipdfmx
/mnt/skills
/dev/shm/rclone-vfscache/vfsMeta/sesn_015mSwTnYVmZQFJUfZ2HyPHM_mnt_skills
/dev/shm/rclone-vfscache/vfsMeta/sesn_015mSwTnYVmZQFJUfZ2HyPHM_mnt_skills/skills
/dev/shm/rclone-vfscache/vfs/sesn_015mSwTnYVmZQFJUfZ2HyPHM_mnt_skills
/dev/shm/rclone-vfscache/vfs/sesn_015mSwTnYVmZQFJUfZ2HyPHM_mnt_skills/skills
/workspace/skills
/workspace/skills/competitive-intel
/workspace/skills/pricing-playbook
/workspace/skills/legal-checklist
/usr/share/maven-repo/org/libreoffice
/usr/share/maven-repo/org/libreoffice/jurt
/usr/share/maven-repo/org/libreoffice/jurt/24.2.7
/usr/share/maven-repo/org/libreoffice/jurt/debian
/usr/share/maven-repo/org/libreoffice/libreoffice
/usr/share/maven-repo/org/libreoffice/libreoffice/24.2.7
/usr/share/maven-repo/org/libreoffice/libreoffice/debian
/usr/share/maven-repo/org/libreoffice/juh
/usr/share/maven-repo/org/libreoffice/juh/24.2.7
/usr/share/maven-repo/org/libreoffice/juh/debian
/usr/share/maven-repo/org/libreoffice/unoloader
/usr/share/maven-repo/org/libreoffice/unoloader/24.2.7
/usr/share/maven-repo/org/libreoffice/unoloader/debian
/usr/share/maven-repo/org/libreoffice/ridl
/usr/share/maven-repo/org/libreoffice/ridl/24.2.7
/usr/share/maven-repo/org/libreoffice/ridl/debian
/usr/share/maven-repo/org/libreoffice/unoil
/usr/share/maven-repo/org/libreoffice/unoil/24.2.7
/usr/share/maven-repo/org/libreoffice/unoil/debian
/usr/share/maven-repo/org/apache/pdfbox
/usr/share/maven-repo/org/apache/pdfbox/fontbox
/usr/share/maven-repo/org/apache/pdfbox/pdfbox-reactor
/usr/share/maven-repo/org/apache/pdfbox/pdfbox
/usr/share/pandoc/data/docx
/usr/share/pandoc/data/docx/word
/usr/share/pandoc/data/docx/word/theme
/usr/share/pandoc/data/docx/word/_rels
=== any SKILL.md anywhere ===
/workspace/skills/competitive-intel/SKILL.md
/workspace/skills/pricing-playbook/SKILL.md
/workspace/skills/legal-checklist/SKILL.md


python-docx 1.2.0
/usr/bin/pandoc
pandoc 3.1.3
/usr/bin/libreoffice
/usr/bin/soffice
Pillow 12.2.0


1	---
2	name: pricing-playbook
3	description: BTS-Synthetic Deal Desk pricing rules. Use whenever recommending commercial terms for an inbound RFP — covers discount bands, payment terms, term length, and concessions we will and will not make. Trigger on any request to propose pricing, discount, deal structure, or commercial position.
4	---
5	
6	# Pricing Playbook
7	
8	## List prices (Enterprise Data Platform)
9	
10	| Tier | Annual list | What's included |
11	| --- | --- | --- |
12	| Starter | $120K | Up to 10TB ingest, 5 users, business hours support |
13	| Growth | $360K | Up to 50TB ingest, 25 users, 24/5 support, 99.9% SLA |
14	| Enterprise | $720K base | Unlimited ingest, unlimited users, 24/7 support, 99.95% SLA, dedicated CSM |
15	
16	For deals above $500K, Enterprise is the only sensible tier.
17	
18	## Discount bands
19	
20	Discount is from list. **Maximum** discount by deal size:
21	
22	| Annual deal size | Standard max discount | Strategic max discount |
23	| --- | --- | --- |
24	| < $250K | 10% | 15% |
25	| $250K – $500K | 15% | 20% |
26	| $500K – $1M | 20% | 25% |
27	| > $1M | 25% | 30% |
28	
29	"Strategic" requires VP Sales sign-off, only granted when one or more of:
30	- Brand-name logo in a target vertical (we're targeting financial services, life sciences, government this year)
31	- Multi-year contract (3+ years committed)
32	- Reference customer agreement signed
33	
34	## Payment terms
35	
36	- **Default:** Annual upfront. Net 30.
37	- **Acceptable concessions:** Quarterly billing (no price change). Net 60 for Fortune 500 with strong credit.
38	- **Do not accept:** Net 90+. Monthly billing on annual commitments. Payment tied to milestones.
39	
40	## Term length
41	
42	- 1 year: standard, no discount uplift.
43	- 2 years: additional 3% discount from the discount band.
44	- 3 years: additional 5% discount, BUT requires annual price escalator of CPI + 2% (capped at 5%).
45	
46	## Concessions we will make
47	
48	- **Custom MSA**: yes, on deals > $500K, with legal sign-off.
49	- **Pilot/POC fees credited toward Year 1**: yes, on all deals.
50	- **Acceptance testing period**: yes, up to 30 days.
51	- **Volume true-up at year-end**: yes, with 10% buffer above committed volume.
52	
53	## Concessions we will NOT make
54	
55	- **MFN / most-favoured-nation pricing**: never. This is the single most poisonous clause for SaaS. Push back hard.
56	- **Liability cap above 12 months of fees**: never (insurance binding constraint).
57	- **Source code escrow**: not for our SaaS product.
58	- **Unlimited indemnification on data breach**: cap at 24 months of fees, with carve-outs.
59	- **Refund on termination for convenience**: pro-rated only, no penalty fees.
60	
61	## Reading the room
62	
63	If the RFP suggests the customer is also evaluating Databricks or Snowflake, expect aggressive pricing pressure. We can match their list but won't undercut by more than 10%. Our differentiator is total cost of ownership, not headline price.
64	
65	If the RFP is for a known difficult-counterparty (procurement-heavy regulated industries), price the deal 5% higher than band to leave room for the haggle.


1	---
2	name: legal-checklist
3	description: BTS-Synthetic legal review checklist for inbound RFPs and contracts. Use whenever reviewing an RFP for contractual risk — covers data residency, liability, IP, audit, termination, and our standard counter-positions. Trigger on any request to legal-review, flag, redline, or assess contractual terms in an RFP or customer document.
4	---
5	
6	# Legal Review Checklist
7	
8	For each item below, compare the RFP language against our standard position. Flag deviations with severity (blocker / negotiable / acceptable).
9	
10	## 1. Data residency
11	
12	**Our standard:** EU customer data stays in EU. US data stays in US. We do NOT process data in jurisdictions without recognised data protection law.
13	
14	**Common deviations:**
15	- RFP demands single-region processing only → blocker if outside our supported regions, otherwise negotiable
16	- RFP allows multi-region processing → acceptable but flag for review
17	
18	## 2. Liability cap
19	
20	**Our standard:** Aggregate liability capped at 12 months of fees. Higher caps require insurance check.
21	
22	**Common deviations:**
23	- Uncapped liability for data breach → BLOCKER (insurance won't cover)
24	- Cap above 24 months → negotiable with sign-off
25	- Carve-outs for gross negligence and IP infringement → acceptable (we do this too)
26	
27	## 3. Intellectual property
28	
29	**Our standard:** We retain all IP in our service. Customer data is the customer's. Anything customer-specific (e.g., a custom report) that we build is licensed to the customer, not assigned.
30	
31	**Common deviations:**
32	- RFP demands assignment of all work product → blocker (we lose IP in everything customer-specific)
33	- RFP demands joint ownership of derivative works → negotiable but discouraged
34	- RFP claims ownership of our underlying service → BLOCKER
35	
36	## 4. Audit rights
37	
38	**Our standard:** Customer may audit our controls once per year, with 30 days' notice. Audit confidentiality required. Customer pays for audits beyond the first per year.
39	
40	**Common deviations:**
41	- More than 2 audits per year → negotiable
42	- "Without notice" audit right → blocker
43	- Right to audit our subprocessors directly → blocker (we audit them, customer audits us)
44	
45	## 5. Termination
46	
47	**Our standard:** Either party may terminate for convenience on 90 days' notice. Termination for material breach with 30-day cure period.
48	
49	**Common deviations:**
50	- Customer's right to terminate <30 days for any reason → negotiable, push for 60+ days
51	- No termination for convenience (only for cause) → BLOCKER on initial term
52	- Refund pro-rated for early termination → acceptable
53	- Penalty fees on customer termination → never accept
54	
55	## 6. Data breach notification
56	
57	**Our standard:** Notify customer within 72 hours of confirming a breach affecting their data.
58	
59	**Common deviations:**
60	- 24 hours → acceptable (we can do this)
61	- "Immediately" → negotiable, push for "without undue delay"
62	- More than 72 hours → never propose, but acceptable in their drafts
63	
64	## 7. Subprocessors
65	
66	**Our standard:** Maintain a public subprocessor list. Notify customer 30 days before adding a new subprocessor. Customer may object; we'll either substitute or allow termination.
67	
68	**Common deviations:**
69	- Customer right to pre-approve every new subprocessor → blocker (too operationally heavy)
70	- Customer right to be notified only after the fact → blocker (audit failure)
71	
72	## 8. Governing law and venue
73	
74	**Our standard:** Delaware (for US customers) or England & Wales (for EU/UK). Disputes in the named courts, no arbitration.
75	
76	**Common deviations:**
77	- Governing law in customer's home jurisdiction → negotiable for very large deals
78	- Mandatory arbitration → negotiable, depends on jurisdiction
79	- Governing law in a jurisdiction with weak commercial law → blocker
80	
81	## 9. Service levels
82	
83	**Our standard:** 99.95% monthly uptime for Enterprise. Service credits up to 30% of monthly fees as sole remedy.
84	
85	**Common deviations:**
86	- 99.99% SLA demanded → negotiable but we likely can't honour reliably
87	- Right to terminate after one SLA miss → blocker
88	- Credits beyond 30% → blocker
89	
90	## 10. Insurance
91	
92	**Our standard:** $5M cyber liability, $5M E&O, $10M general liability. We provide certificates on request.
93	
94	**Common deviations:**
95	- Higher coverage demanded → check with insurance broker; usually achievable for fee
96	- Customer named as additional insured → acceptable
97	- Customer demands proof of insurance for subprocessors → blocker
98	
99	## How to flag
100	
101	Use this format in your output:
102	
103	```
104	ITEM 2 — LIABILITY CAP
105	RFP says: "Vendor liability uncapped for data breach"
106	Severity: BLOCKER
107	Why: Our cyber policy caps at 24mo fees. Uncapped liability voids coverage.
108	Counter: "Liability capped at 24 months of fees paid, with mutual carve-outs for IP infringement and gross negligence."
109	```


1	---
2	name: competitive-intel
3	description: BTS-Synthetic competitive battlecards for the Enterprise Data Platform space. Use whenever assessing who else is likely competing for an RFP and how to position against them. Covers Databricks, Snowflake, Microsoft Fabric, and Google BigQuery as the four most common competitors we see in enterprise deals.
4	---
5	
6	# Competitive Intelligence
7	
8	Use this when the coordinator asks you to identify competitors and recommend positioning.
9	
10	## Pattern matching: who's in the deal?
11	
12	| RFP signal | Likely competitor |
13	| --- | --- |
14	| Lots of mentions of "Lakehouse architecture", "MLflow integration", "Delta tables" | **Databricks** |
15	| Heavy SQL emphasis, "data marketplace", "secure data sharing", existing Snowflake user mentioned | **Snowflake** |
16	| Customer is heavy Microsoft shop, Azure-only, mentions of Power BI integration | **Microsoft Fabric** |
17	| Customer is GCP-native, mentions BigQuery ML, Looker | **Google BigQuery** |
18	| RFP asks about open-source compatibility / no vendor lock-in | Possibly Databricks, possibly an open-source rival like Trino+Iceberg |
19	
20	If two or more of these signals appear, both competitors are likely shortlisted.
21	
22	## Battlecards
23	
24	### vs. Databricks
25	
26	**Their strengths:**
27	- Strong ML/AI story (MLflow, Mosaic)
28	- Lakehouse / Delta is genuinely good for very large-scale workloads
29	- Open file format reduces lock-in concern
30	- Brand momentum among data engineering teams
31	
32	**Their weaknesses:**
33	- Total cost of ownership often surprises customers (compute spend ramps fast)
34	- Less mature on BI / analyst-friendly tooling
35	- Spark-based query latency for interactive analytics can be poor
36	
37	**Our angles:**
38	- Lead with TCO: produce a 3-year cost projection. We win on predictable spend.
39	- Position on time-to-insight for analyst personas, not just engineers.
40	- Don't fight on ML breadth. Concede that and pivot.
41	
42	**Trap to avoid:**
43	- Don't try to out-engineer them on Spark or Iceberg. You'll lose on technical ground.
44	
45	---
46	
47	### vs. Snowflake
48	
49	**Their strengths:**
50	- Best-in-class analyst experience
51	- Mature data sharing
52	- "Just works" reputation
53	
54	**Their weaknesses:**
55	- Expensive at scale (the standard procurement complaint)
56	- Less flexible for unstructured / semi-structured / real-time
57	- ML/AI story is bolted-on, not native
58	
59	**Our angles:**
60	- Lead with workload coverage: real-time, semi-structured, unstructured.
61	- Highlight ML-native architecture.
62	- Run a TCO comparison at customer's projected scale — usually wins on year 2+.
63	
64	**Trap to avoid:**
65	- Don't try to out-analyst-tool Snowflake on day 1. They've been polishing that experience for a decade.
66	
67	---
68	
69	### vs. Microsoft Fabric
70	
71	**Their strengths:**
72	- E5 license inclusion makes the headline price look free
73	- Tight Power BI integration
74	- Already deployed in the customer's tenant
75	
76	**Their weaknesses:**
77	- Maturity gaps in core capabilities (still catching up on basic features)
78	- Lock-in to Azure-only
79	- Performance consistency varies
80	
81	**Our angles:**
82	- Honest TCO including Microsoft consulting hours
83	- Multi-cloud story (don't lock yourself in)
84	- Maturity: we've been doing this for 8 years; they've been doing it for 18 months.
85	
86	**Trap to avoid:**
87	- Don't compete on Power BI integration. We integrate, they own.
88	- Don't dismiss the "free with E5" claim. Acknowledge it directly and reframe to TCO.
89	
90	---
91	
92	### vs. Google BigQuery
93	
94	**Their strengths:**
95	- Truly serverless analytics — no cluster management
96	- Strong on standard SQL workloads
97	- Vertex AI integration is genuinely useful
98	
99	**Their weaknesses:**
100	- GCP-only (deal-breaker for multi-cloud customers)
101	- Less mature governance / data-mesh story
102	- Streaming ingest costs add up
103	
104	**Our angles:**
105	- Multi-cloud flexibility
106	- Governance and data-mesh maturity
107	- Workload portability
108	
109	**Trap to avoid:**
110	- Don't claim better serverless than BigQuery. We're not.
111	
112	## How to format your output
113	
114	For each likely competitor:
115	1. Why they're likely in this deal (cite the RFP signals)
116	2. Their strengths AGAINST OUR ANGLES (not generic strengths)
117	3. Our two best positioning angles for THIS RFP specifically
118	4. One trap
119	
120	Then a one-line summary: "Most likely shortlist: X, Y, Z. Our best opening move: [specific recommendation]."


I have everything I need: the three discipline skills, confirmed tooling (python-docx, pandoc, LibreOffice, Pillow), and the inline context. No dedicated docx/branding skill exists, so I'll build branding directly with python-docx. Let me persist the interactive context files to disk, then delegate to all four specialists in parallel.

(no output)

File created: /workspace/context/rfp-11-quacktastic-checkers.md

File created: /workspace/context/studio-capabilities.md

File created: /workspace/context/interactive-rate-card.md

File created: /workspace/context/interactive-references.json

All context is staged. Now delegating to all four specialists in parallel, each with the interactive-experiences framing baked in.

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

Recommend commercial terms for an inbound RFP. ENGAGEMENT FRAMING (critical): this is an INTERACTIVE WEB APPLICATION / BROWSER GAME (a marketing campaign asset) — NOT an enterprise data platform. Use the INTERACTIVE RATE CARD below for the NUMBERS. Apply the pricing-playbook skill (readable at /workspace/skills/pricing-playbook/SKILL.md) ONLY for DISCIPLINE — discount discipline, MFN posture (never), payment/term rules, concession list. The data-platform tier list ($120K/$360K/$720K) does NOT apply. Cite the interactive comparable builds below as prior deals.

Files on disk if present: /workspace/context/interactive-rate-card.md, /workspace/context/interactive-references.json, /workspace/context/rfp-11-quacktastic-checkers.md, /workspace/skills/pricing-playbook/SKILL.md. Everything essential is embedded below.

=== INTERACTIVE RATE CARD (authoritative numbers for this RFP) ===
Packages (annual list, run/license): Campaign Lite $120K (single-player + local play, art rigged, embeddable widget, basic analytics, 99.9% SLA, business-hours support); Campaign Pro $220K base (Lite + real-time multiplayer shareable link, reconnection, 3-tier AI, full accessibility pass, load test to 40K concurrent, 24/7 support during launch window); Flagship $360K base (Pro + dedicated launch war-room, 100% uptime rehearsal for a pre-announced livestream window, custom art rigging, named delivery lead).
Guidance: a homepage flagship game with real-time multiplayer at 40K livestream concurrency sits in Campaign Pro for MOST engagements — Flagship only if they want the full livestream war-room.
Build vs run split: annual fees above are the RUN/license (hosting, realtime tier, support, SLA). One-time BUILD fee quoted separately, typically 0.5×–0.9× of the annual run fee depending on scope; creditable toward Year 1 on a signed multi-year (same as PoC policy).
Discount bands (from list): <$150K → std 10% / strategic 15%; $150K–$300K → std 15% / strategic 20%; >$300K → std 20% / strategic 25%. "Strategic" requires sign-off AND one of: brand-name logo, multi-year commit, or reference-customer agreement. A demanded 20% on a Campaign Pro deal is at the TOP of the standard band — grant it only for the FULL 1+1 term AND a public reference; otherwise open at 15%.
Posture: MFN never (not requested — confirm it stays out). Payment: Net 60 acceptable for a credible post-IPO counterparty; do not go past Net 60. Term: 1yr+1yr renewal fine for a campaign asset; a 2-year commit unlocks a 3% uplift (extra 3% off). Liability: cap at 12 months' fees; RFP's uncapped-for-player-data carve-out needs a BOUNDED counter (super-cap, not truly uncapped) — hand to Legal.

=== INTERACTIVE COMPARABLE BUILDS (cite these) ===
Fizzwick Beverages — "Spin-to-Win" real-time multiplayer promo game on brand homepage; $240K; 1yr+1yr renewal; 15% off list; annual upfront Net 60; peak 32,000 concurrent; Super Bowl ad livestream; won on 100% uptime through ad window on pre-warmed capacity + sub-200ms sync; closed 2025-10-02.
Marlowe Board & Bar — browser chess+backgammon suite, shareable-link multiplayer + 3-tier AI; $180K; 2 years; 12% off; annual upfront Net 30; peak 9,000; won on server-authoritative rules engine + reconnection, beat an indie studio on reliability; closed 2025-06-18. (Reusable turn-based rules engine + minimax AI harness — directly reusable for checkers.)
Verdant Parks Authority — accessible interactive map + mini-game, WCAG 2.2 AA; $130K; 1 year; 10% off; annual upfront Net 30; peak 4,000; won on full keyboard nav + CVD-safe palettes as first-class; closed 2026-01-20.

=== RFP COMMERCIAL FACTS ===
Homepage flagship rubber-duck checkers game; real-time multiplayer; 5,000 concurrent at launch, ~40,000 peak during a pre-announced 4-hour IPO relaunch livestream (100% uptime required in that window; 99.9% monthly otherwise). Term wanted: 1yr initial + 1yr renewal option (Marketing annual budget). Payment: billed in advance, Net 60. Discount demanded: NO LESS THAN 20% off list. MFN: not applicable. Termination: at any time with/without cause on 30 days' notice, no early-termination fees. Post-IPO counterparty (Quacktastic Industries). Also bidding: Waterfowl Analytics Inc. (a data-analytics firm, out of their area), a boutique indie game studio, and Databricks (declined). Award 2026-03-10.

YOUR DELIVERABLE (answer in ONE message, ~300 words):
1) PACKAGE recommendation with reasoning: this needs real-time multiplayer + 40K livestream 100%-uptime window → argue Campaign Pro vs Flagship (the 100%-uptime livestream war-room requirement pushes toward Flagship's rehearsal/war-room, but note the Pro-with-war-room-add-on option). Pick one and state the annual list figure.
2) DISCOUNT recommendation: they demand ≥20%. State the band, the discipline (20% is top of standard for $150K–$300K OR standard max for >$300K), and the CONDITIONS to grant it (full 1+1 term + public reference; if they won't give a reference, open at 15%). Note the extra 3% if they commit to a firm 2-year term.
3) BUILD FEE: quote a one-time build fee using the 0.5×–0.9× multiple; state creditable-toward-Year-1 on multi-year.
4) A 2-YEAR TRANSPARENT PRICING TABLE (this is required in the proposal): show, for Year 1 and Year 2, the list run fee, discount %, discounted run fee, build fee (Y1), and total per year, plus 2-year total. Give ONE recommended scenario clearly (and optionally a downside/without-reference variant). Use concrete dollar numbers.
5) Red-line/concession posture: Net 60 = acceptable (confirm, don't exceed); term-for-convenience 30-day notice with no penalty = acceptable per our pro-rated-refund posture (flag pro-rated refund of prepaid unused fees); MFN confirm stays out; hand the uncapped-player-data liability carve-out to Legal. Cite comparables (Fizzwick especially) as justification.
Be decisive with real numbers — this goes straight into a partner-level 2-year commercial proposal.

Legal-review the contractual section of an inbound RFP. ENGAGEMENT FRAMING: this is a browser game / interactive web app (a marketing campaign asset), but the legal analysis transfers directly. Apply the BTS-Synthetic legal-checklist skill (readable at /workspace/skills/legal-checklist/SKILL.md) AS-IS: compare each RFP clause to our standard position and flag with severity (BLOCKER / NEGOTIABLE / ACCEPTABLE) plus a counter-position. Use the checklist's output format.

The legal-checklist standard positions (embedded so you are self-contained):
- Liability cap: standard = aggregate cap at 12 months of fees; higher needs insurance check; UNCAPPED liability for data breach = BLOCKER (cyber policy won't cover); cap above 24 months = negotiable with sign-off; carve-outs for gross negligence + IP infringement = acceptable.
- IP: standard = we retain IP in our service; customer data is customer's; customer-specific work we build is LICENSED to the customer, not assigned. RFP demanding assignment of ALL work product = blocker (we lose IP in everything customer-specific). RFP claiming ownership of our underlying service/platform = BLOCKER. Joint ownership = negotiable but discouraged.
- Audit: standard = customer may audit our controls once/year with 30 days' notice, confidentiality required, customer pays for audits beyond the first/year. >2 audits/yr = negotiable; "without notice" = blocker; right to audit our subprocessors DIRECTLY = blocker (we audit them, customer audits us).
- Termination: standard = either party may terminate for convenience on 90 days' notice; material-breach termination with 30-day cure. Customer right to terminate <30 days for any reason = negotiable, push for 60+; NO termination-for-convenience (cause only) on initial term = BLOCKER; pro-rated refund for early termination = acceptable; penalty fees on customer termination = never accept (so no early-termination fee is fine for us).
- Subprocessors: standard = maintain public subprocessor list; NOTIFY customer 30 days before adding a new subprocessor; customer may object → we substitute or allow termination. Customer right to PRE-APPROVE every new subprocessor = blocker (too operationally heavy); notice only after the fact = blocker.
- Service levels: standard = 99.95% monthly for our Enterprise; service credits up to 30% of monthly fees as SOLE remedy. 99.99% demanded = negotiable but hard to honor reliably; right to terminate after ONE SLA miss = blocker; credits beyond 30% = blocker.
- Data breach notification: standard = notify within 72 hours of confirming a breach; 24h = acceptable; "immediately" = push for "without undue delay".
- Insurance: $5M cyber, $5M E&O, $10M general; certificates on request.

Files on disk if present: /workspace/context/rfp-11-quacktastic-checkers.md, /workspace/skills/legal-checklist/SKILL.md.

=== RFP CONTRACTUAL SECTION (Quacktastic Checkers Arena browser game) ===
4.1 Liability: Vendor liability capped at 12 months of fees paid, EXCEPT for breaches involving PLAYER DATA (email addresses collected at signup), which remain UNCAPPED.
4.2 Audit: Quacktastic reserves the right to a SINGLE ANNUAL security review of the application and its hosting environment.
4.3 Service Levels: 99.9% monthly uptime, with 100% uptime required during the IPO relaunch livestream window (a single, pre-announced 4-hour period; exact date at kickoff).
4.4 IP: ALL work product — game logic, art direction guidelines, integrations — shall VEST IN QUACKTASTIC upon creation. Quacktastic supplies the duck artwork; vendor rigs it into a functioning game board.
4.5 Subprocessors: Vendor shall obtain Quacktastic's PRIOR WRITTEN CONSENT before engaging any subprocessor for hosting or real-time messaging infrastructure.
Also relevant (commercial section): Termination at any time, with or without cause, on 30 days' written notice, NO early-termination fees. Payment billed in advance Net 60. MFN not applicable. Player data collected = signup email addresses only (so there IS PII / a DPA angle).
Context: BTS-Synthetic's game platform is a reusable server-authoritative rules engine + realtime tier (our underlying IP); the duck art is client-supplied; hosting + realtime messaging are provided via named subprocessors.

YOUR DELIVERABLE (answer in ONE message, ~300 words). For EACH of the six items below give: RFP says / Severity / Why / Counter (use the checklist format). Cover:
1) LIABILITY (the uncapped-for-player-data carve-out — BLOCKER; counter with a BOUNDED super-cap, e.g. cap at 24 months' fees for the player-data carve-out rather than truly uncapped, plus acceptance that only signup emails are collected; note our cyber insurance constraint).
2) IP (vesting of ALL work product incl. game logic in Quacktastic — flag: acceptable to ASSIGN the bespoke duck-checkers deliverable + client-supplied art rigging, but BLOCKER on any language that sweeps in our underlying reusable rules engine / realtime platform / pre-existing tooling — counter: assign the custom work product, retain + license our pre-existing platform IP to Quacktastic).
3) AUDIT (single annual security review — ACCEPTABLE; add 30 days' notice, confidentiality, and clarify customer audits US, not our subprocessors directly).
4) TERMINATION (30 days for convenience, no penalty — negotiable/acceptable: no penalty is fine for us; push notice toward 60 days if easy, but 30 is livable for a campaign asset; require PRO-RATED REFUND of prepaid unused fees).
5) SUBPROCESSORS (prior written consent for every hosting/realtime subprocessor — BLOCKER per our standard; counter: 30-day advance NOTICE with right to object + substitute/terminate, and pre-disclose our named hosting/realtime subprocessors at signature so consent is effectively given up front).
6) SLA (99.9% monthly + 100% during the 4-hour livestream — 99.9% monthly acceptable; 100% for a bounded pre-announced 4-hour window acceptable ONLY as a commercially-reasonable target with pre-warm/war-room, remedy = service credits capped at 30% as sole remedy; BLOCKER on any "terminate after one SLA miss" and on credits beyond 30%).
Also add: DPA required (signup email = PII, GDPR-aligned, breach notification within 72h — offer 24h if wanted); confirm MFN stays out. Be decisive and use the checklist's severity labels.

Assess the competitive field for an inbound RFP and recommend positioning. ENGAGEMENT FRAMING (critical): this is a BROWSER GAME / interactive web app (marketing campaign asset) for a rubber-duck company's homepage — NOT an enterprise data platform. IGNORE the data-platform battlecards (Snowflake / Microsoft Fabric / Google BigQuery are irrelevant here). Reason about the ACTUAL named competitors in THIS RFP.

The actual competitors named in the RFP (Section 6 "Vendors being evaluated"):
1) Waterfowl Analytics Inc. — a DATA-ANALYTICS firm (the same firm bidding on Quacktastic's separate data-platform RFP) that "insisted on bidding on this one too." They are bidding OUT OF THEIR CORE AREA on a real-time browser game.
2) A boutique INDIE GAME STUDIO recommended by the CMO's nephew — likely strong on art/creative and game feel, but a question mark on enterprise reliability, real-time scale (40K livestream concurrency), accessibility rigor, security/compliance, and contractual maturity.
3) Databricks — DECLINED to bid, citing "this is not really our area." (So effectively out; useful only as a signal that generic data/AI vendors don't fit this work — reinforce that specialist interactive delivery matters.)

Our side — BTS-Synthetic Interactive Experiences Studio strengths for THIS deal:
- 9 years shipping interactive marketing experiences and browser games; server-authoritative rules engines with server-side move validation; 3-tier minimax AI; reusable turn-based rules engine + minimax harness (directly reusable for checkers).
- Real-time multiplayer: WebSocket sync, median 120–180ms / p95 <400ms (inside the RFP's 500ms bar); reconnection to same match/state; shareable-link join.
- Scale: production-tested to 50,000 concurrent; 40,000 livestream peak within tested envelope with pre-warm; livestream war-room + game-day runbook.
- Accessibility: WCAG 2.2 AA, full keyboard nav, tested colorblind-safe palettes as first-class (the RFP explicitly requires a REAL CVD-safe fallback).
- Enterprise trust: SOC 2 Type II, ISO 27001, GDPR/DPA, annual security review supported.
- Proof points (comparable prior builds): Fizzwick Beverages — real-time multiplayer promo game, 32,000 concurrent, hit 100% uptime through a Super Bowl ad livestream on pre-warmed capacity, sub-200ms sync (DIRECTLY analogous to the IPO livestream). Marlowe Board & Bar — browser chess+backgammon with shareable-link multiplayer + 3-tier AI; "beat an indie studio on reliability" (directly analogous to beating the indie studio here). Verdant Parks Authority — accessible interactive board, keyboard nav + CVD-safe palettes as first-class.

RFP evaluation weighting (use it to prioritize positioning): Functional fit 35%, Real-time multiplayer quality/latency 20%, Implementation timeline & risk 20%, Commercial terms 15%, Vendor stability + relevant references 10%. Note the biggest points are functional completeness + real-time quality + delivery-risk — all areas where an out-of-area data firm or a boutique studio is weakest.

Files on disk if present: /workspace/context/rfp-11-quacktastic-checkers.md, /workspace/context/interactive-references.json.

YOUR DELIVERABLE (answer in ONE message, ~300 words):
For EACH real competitor (Waterfowl Analytics; the indie game studio; and a one-liner on Databricks-declined):
1) Why they're in the deal / what they'll pitch.
2) Their key weakness against our angles (be specific to THIS RFP: real-time 40K scale, 100% livestream uptime, accessibility, security/contract maturity, delivery risk).
3) Our two best positioning angles against them for THIS RFP (cite the comparable builds — esp. Fizzwick for the livestream and Marlowe for "beat an indie studio on reliability").
4) One trap for us to avoid (e.g. don't compete with the indie studio on pure art originality — remember Quacktastic SUPPLIES the art and we RIG it; don't over-claim; don't dismiss the nephew relationship glibly).
End with a one-line summary: "Most likely real threat: X. Our best opening move: [specific recommendation]." This feeds a partner-level proposal — be sharp and specific.

All four specialists are running in parallel:
- **Technical Fit** — requirement-by-requirement fit + real-time architecture
- **Pricing** — Campaign Pro/Flagship, 20% discount discipline, 2-year transparent table, build fee
- **Legal** — contractual flags (liability super-cap, IP carve-out, subprocessors, SLA) with counters
- **Competitive Intel** — positioning vs. Waterfowl Analytics, the indie studio, and Databricks-declined

While they work, I'll pre-build the deliverable scaffolding that doesn't depend on their output — the BTS brand system and the board/duck-piece mockup asset the RFP asks for. I'll end my turn after that so their replies can arrive.

PIL ok
/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf: DejaVu Serif:style=Bold
/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf: DejaVu Sans Mono:style=Book
/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Oblique.ttf: DejaVu Sans,DejaVu Sans Condensed:style=Condensed Oblique,Oblique
/usr/share/fonts/truetype/dejavu/DejaVuSerifCondensed-BoldItalic.ttf: DejaVu Serif,DejaVu Serif Condensed:style=Condensed Bold Italic,Bold Italic
/usr/share/fonts/truetype/dejavu/DejaVuSans-ExtraLight.ttf: DejaVu Sans,DejaVu Sans Light:style=ExtraLight


Tooling and fonts confirmed. I'll render the board + duck-piece mockup asset now (the RFP asks for a board and single-duck-piece wireframe), using a consistent BTS brand palette I'll reuse in the document.

File created: /workspace/make_mockup.py

## Competitive Assessment: Quacktastic Checkers RFP

**WATERFOWL ANALYTICS INC.** (Real competitor, significant threat)
- **Why they're bidding:** Existing relationship (same vendor on the data-platform RFP; "insisted on bidding"); likely view this as cross-sell opportunity.
- **Their weakness:** Data-analytics firm bidding out of core competency. They lack proven real-time multiplayer game shipping experience. They will underbid on reliability (no game-day runbook, no livestream playbook). Architecture risk: likely to propose third-party game engine integration (Unreal/Unity) rather than custom server-authoritative rules engine, which bloats scope, increases latency risk (they don't own the sync layer), and creates subprocessor approval friction (RFP Section 4.5 requires our prior written consent). Will struggle to meet <500ms p95 latency consistently at 40K scale. No accessibility-as-first-class-citizen heritage — likely to treat CVD-safe fallback as checkbox compliance, not core design.
- **Our best angles:** (1) **"Proven livestream reliability at scale"** — cite Fizzwick's 100% uptime on Super Bowl spike (32K concurrent, pre-warmed to 50K tested; directly analogous to IPO livestream 40K window). Waterfowl has no comparable proof. (2) **"Server-authoritative rules engine + reusable minimax harness"** — we own the entire stack (zero third-party latency unknowns). Marlowe chess/backgammon build proves we ship turn-based rules with sub-200ms sync and beat indie studios on reliability.
- **Trap to avoid:** Don't dismiss Waterfowl's data-platform credibility—use it against them instead. "Great data infrastructure doesn't guarantee real-time game shipping. This needs a different skill set. You need someone who has shipped livestream spikes, not data warehouses."

**INDIE GAME STUDIO** (Boutique, credible on art/feel, weak on delivery & enterprise maturity)
- **Why they're bidding:** CMO's nephew connection (real relationship equity); strong portfolio on creative/art; likely pitch "authentic game feel and beautiful ducks."
- **Their weakness:** Will excel at aesthetics but will underdeliver on: (a) enterprise reliability (no SOC 2 / ISO 27001 / annual security review heritage), (b) 40K concurrent scale (indie studios typically ship games for <5K CCU; not battle-tested at 40K scale), (c) 100% livestream uptime guarantee (no game-day runbook; likely single-point failures), (d) accessibility rigor (WCAG 2.2 AA + real CVD-safe fallback rarely core in indie workflows), (e) contractual maturity (IP vesting, subprocessor consent, data-breach liability—indie studios often unfamiliar with these). Implementation risk: nephew relationship may create scope-creep and communication friction.
- **Our best angles:** (1) **"Beat an indie studio on reliability"** — Marlowe reference explicitly cites this. Our value is that we own the entire reliability / real-time sync pipeline; they will nail art, we nail the game engine that keeps it live at 40K CCU during the livestream window. (2) **"Enterprise trust + audit-ready architecture"** — Verdant Parks Authority reference (WCAG 2.2 AA + CVD-safe palettes as first-class). We ship accessibility and compliance; indie studios don't (yet).
- **Trap to avoid:** Don't compete on art originality. Quacktastic supplies the art; we rig it. Position us as "the engineering reliability partner, not the creative vendor." Don't glibly dismiss the nephew relationship—acknowledge it as an asset to them, but note that family relationships often introduce scope-creep (hint: "our fixed-scope, milestone-based approach insulates you from that risk"). Don't over-claim; if they're genuinely strong on creative, say so.

**DATABRICKS** (Declined—effectively out, but instructive signal)
- Honest signal: "Not our area." Validates that generic data/AI vendors don't fit interactive delivery. Use in our favor: "Even Databricks recognized this needs a specialist. We've shipped 9 years of browser games and multiplayer real-time experiences. This is our area."

---

**POSITIONING SUMMARY:**

**Most likely real threat:** Indie studio (nephew relationship + art credibility are real, but enterprise maturity gap is our opening). Waterfowl is bidding out of desperation / cross-sell; will lose on reliability and latency.

**Our best opening move:** Lead with "Fizzwick Beverages livestream playbook" (100% uptime, 32K concurrent, pre-warmed, game-day runbook—directly analogous to IPO window). Pair with "Marlowe beats indie on reliability" proof point. Close with Verdant Parks (WCAG 2.2 AA + CVD palettes as first-class = we own the whole stack; they don't). Position as: "We've shipped the exact scenario you're facing. Twice."

Legal review of Quacktastic Checkers Arena RFP §4 (contractual), per BTS-Synthetic legal-checklist:

ITEM 1 — LIABILITY CAP
RFP says: "Vendor liability capped at 12mo fees, EXCEPT breaches involving player data (signup emails), which remain UNCAPPED."
Severity: BLOCKER
Why: Uncapped liability for data breach is an explicit checklist BLOCKER — our cyber policy won't cover uncapped exposure, regardless of how narrow the data category is.
Counter: "Liability capped at 12 months of fees generally; a bounded super-cap of 24 months' fees applies specifically to breaches of player signup-email data. Mutual carve-outs for gross negligence and IP infringement remain uncapped, consistent with market practice." Confirm scope stays limited to signup emails (no other PII) to keep this within insurable bounds.

ITEM 2 — IP
RFP says: "ALL work product — game logic, art direction guidelines, integrations — vests in Quacktastic."
Severity: BLOCKER (as drafted) / rest ACCEPTABLE
Why: Sweeping "all work product" language captures our reusable server-authoritative rules engine and realtime tier — our core underlying IP, not a Quacktastic deliverable. That's a checklist BLOCKER (claim on our underlying service). The bespoke checkers-game deliverable and rigging of client-supplied duck art is fine to assign.
Counter: "Quacktastic owns the custom Quacktastic Checkers Arena deliverable (game design/config, art integration, client-supplied art as rigged) and all Quacktastic-supplied art. Vendor retains all pre-existing IP (rules engine, realtime platform, tooling) and grants Quacktastic a perpetual license to use it as embedded in the delivered game."

ITEM 3 — AUDIT
RFP says: "Single annual security review of application and hosting environment."
Severity: ACCEPTABLE
Why: Once/year matches our standard exactly.
Counter: Add standard guardrails not yet specified: 30 days' advance notice, mutual confidentiality, and clarify audit runs against Vendor's controls — Quacktastic does not audit subprocessors directly (Vendor audits them).

ITEM 4 — TERMINATION
RFP says: "Terminate any time, with or without cause, on 30 days' notice, no early-termination fee."
Severity: NEGOTIABLE (notice period) / ACCEPTABLE (no penalty)
Why: Convenience termination existing at all is fine (avoids the "cause-only" blocker); no-penalty is something we'd never fight anyway. 30 days is short vs. our 90-day standard, but for a bounded campaign asset it's livable.
Counter: Push for 60 days if easy; accept 30 if not. Add: "pro-rated refund of prepaid, unused fees on early termination" (checklist-acceptable, and reasonable given Net 60 advance billing).

ITEM 5 — SUBPROCESSORS
RFP says: "Prior written consent before engaging any hosting/realtime-messaging subprocessor."
Severity: BLOCKER
Why: Pre-approval of every subprocessor is explicitly a checklist blocker — too operationally heavy.
Counter: "Vendor maintains a public subprocessor list; named hosting and realtime-messaging subprocessors are disclosed and deemed accepted at signature. 30 days' advance notice before adding/changing subprocessors, with Quacktastic's right to object → Vendor substitutes or Quacktastic may terminate the affected scope."

ITEM 6 — SLA
RFP says: "99.9% monthly uptime; 100% during a single pre-announced 4-hour IPO relaunch livestream window."
Severity: ACCEPTABLE (99.9% monthly, and the 4-hr window as a target) — BLOCKER exposure if paired with termination-on-first-miss or credits >30% (not currently stated, but flag preemptively)
Why: 99.9% is within/below our 99.95% standard — fine. True "100%" as a contractual guarantee is unachievable to promise flatly, but as a bounded, pre-announced 4-hour commercially-reasonable target with a war-room/pre-warm commitment, it's workable.
Counter: "100% during the named 4-hour window is a commercially reasonable best-efforts target, not an absolute guarantee; sole remedy for any miss (monthly or livestream) is service credits, capped at 30% of monthly fees." No termination rights on a single SLA miss — reject if proposed.

ADDITIONAL FLAGS:
- DPA required: signup emails = PII → needs a DPA (GDPR-aligned processing terms). Breach notification: propose 72 hours per standard; offer 24 hours as a concession if pushed — both are checklist-acceptable.
- MFN: RFP states not applicable — confirm and keep it out of final paper; no counter needed.

Net assessment: 2 blockers as drafted (liability's uncapped carve-out; IP's "all work product" sweep) plus 1 blocker on subprocessor pre-consent — all three have clean, checklist-consistent counters. Everything else (audit, termination, SLA) is negotiable-to-acceptable. Recommend Deal Desk push these three redlines before signature; none should be assumed as insurmountable given they're structural, not novel, asks.

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

Three specialists in — Competitive Intel, Legal, and Technical Fit have all delivered strong, framing-aware output. Still waiting on Pricing (the 2-year commercial table is load-bearing for the document). Let me render the mockup while that finishes.

Traceback (most recent call last):
  File "/workspace/make_mockup.py", line 98, in <module>
    if (r+c)%2==1: place(r,c,BLUE,BLUE_DK, facing=1)
                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/workspace/make_mockup.py", line 93, in place
    duck(d, x0+cell/2, y0+cell/2, cell*0.36, color, dark, facing=facing, crown=crown)
  File "/workspace/make_mockup.py", line 33, in duck
    d.ellipse([cx-r, cy-r*0.35, cx+r, cy+r*0.85], fill=body, outline=oc, width=ow)
  File "/usr/local/lib/python3.11/dist-packages/PIL/ImageDraw.py", line 220, in ellipse
    self.draw.draw_ellipse(xy, ink, 0, width)
TypeError: 'float' object cannot be interpreted as an integer



PIL needs integer coordinates. Let me patch the drawing helpers to cast to int.

File updated: /workspace/make_mockup.py

**QUACKTASTIC CHECKERS — COMMERCIAL RECOMMENDATION**

**1) Package: FLAGSHIP — $360K annual list (run fee).** Their exact ask (100% uptime for a pre-announced 4-hr IPO relaunch livestream at 40K concurrent) is the specific trigger for Flagship, not Pro — Pro covers 40K load-testing and 24/7 launch support but lacks the dedicated war-room/100%-uptime rehearsal that this scenario demands. Comparable: Fizzwick Beverages ran the same play (32K peak, Super Bowl livestream, 100% uptime through the ad window) and won on pre-warmed capacity — proof this tier is priced right for the risk. Fallback if they balk at Flagship pricing: Pro ($220K) + war-room add-on, but lead with Flagship.

**2) Discount: 20% off list, standard max for >$300K deals** (band: >$300K → std 20%/strategic 25%) — no strategic sign-off needed since 20% is already the standard ceiling at this size. Grant it, but tie to the full 1yr+1yr term (protects war-room investment from early exit) and push for a public reference/case study (Quacktastic post-IPO is a strong logo — satisfies strategic criteria if we want to go further). If they won't give a reference, still hold at 20% (it's standard, not strategic) — open negotiations at 15% and concede to 20%, don't go beyond. If they'll commit a **firm** 2-year (not just 1+1 option), add the 3% uplift → 23% off.

**3) Build fee: $252K one-time (0.70× the $360K annual run fee)** — mid-high multiple justified by war-room/custom art rigging, offset somewhat by Marlowe's reusable turn-based rules engine + minimax AI harness cutting core game-logic build risk. Creditable toward Year 1 run fee if they sign the full 1+1 upfront.

**4) 2-Year Table — Recommended (20% off, reference secured):**
| | Y1 | Y2 |
|---|---|---|
|List run|$360,000|$360,000|
|Discount|20%|20%|
|Discounted run|$288,000|$288,000|
|Build (one-time)|$252,000|$0|
|**Total**|**$540,000**|**$288,000**|
**2-yr total: $828,000**

Downside (no reference, open at 15%): Y1 $558,000 / Y2 $306,000 / total $864,000.
Best-case (firm 2yr, 23% off): Y1 $529,200 / Y2 $277,200 / total $806,400.

**5) Concessions:** Net 60 — accept, matches Fizzwick precedent, do not extend further. 30-day termination-for-convenience, no fee — accept per pro-rated-refund policy (unused prepaid fees only, no penalty). MFN — not requested; confirm it stays excluded, non-negotiable if raised. Uncapped player-data liability carve-out — reject as-is; cap is 12 months' fees per policy, send Legal a bounded super-cap counter (e.g., fixed $ ceiling above standard cap), don't concede true uncapped exposure.

**Margin risks:** 4-hr/40K war-room is the real cost driver — ensure build fee fully absorbs rehearsal cost, not the run fee. Indie-studio competitor may undercut on price; Waterfowl/Databricks are non-threats. 30-day termination exposes war-room investment before Year 2 — mitigated by build-fee-upfront + multi-year credit structure.

All four specialists have reported. Pricing recommends **Flagship ($360K list)**, 20% discount tied to full 1+1 term + reference, $252K build fee, with a clean 2-year transparency table. I have everything to synthesize. Let me render the mockup, then build the branded document.

saved /workspace/assets/board_mockup.png (1600, 1080)
total 88
drwxr-xr-x 2 root root  4096 Jul 21 14:50 .
drwxr-xr-x 5 root root  4096 Jul 21 14:50 ..
-rw-r--r-- 1 root root 79513 Jul 21 14:50 board_mockup.png


The mockup is clean and on-brand — board with Classic Yellow vs Bath-Time Blue ducks, a crowned king, a selected piece with legal-move markers, turn/timer/move-history UI, the single-piece detail, and the Okabe–Ito colorblind-safe alternate skin. Now let me produce an architecture diagram to elevate the technical proposal, then build the branded document.

File created: /workspace/make_arch.py

saved /workspace/assets/architecture.png (1600, 940)


Both visuals are polished. Now I'll build the branded Word document — cover page, running header/footer with page numbers, styled navy/amber tables, and the embedded visuals — synthesizing all four specialists.

File created: /workspace/build_docx.py

saved docx
total 276
drwxr-xr-x 1 claude ubuntu      0 Jul 21 14:56 .
drwxr-xr-x 4 root   root     4096 Jul 21 14:44 ..
-rw-r--r-- 1 claude ubuntu 274684 Jul 21 14:56 BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.docx


Document generated. Let me convert it to PDF to visually verify the branding, tables, and layout render correctly.

convert /mnt/session/outputs/BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.docx as a Writer document -> /workspace/BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.pdf using filter : writer_pdf_Export
-rw-r--r-- 1 root root 424318 Jul 21 14:56 /workspace/BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.pdf
pages: 11


page-01.png
page-02.png
page-03.png
page-04.png
page-05.png
page-06.png
page-07.png
page-08.png
page-09.png
page-10.png
page-11.png


The cover looks clean and professional. Let me check a few key body pages — the fit table, architecture, mockup, and commercial pages.

The fit table with color-coded verdicts renders beautifully. Let me verify the architecture figure, mockup, and commercial pages.

The mockup and commercial sections render well. Let me check the commercial pricing tables and the contract/risks pages.

The pricing tables render exactly as intended — highlighted total row, clean scenario comparison. Let me verify the contract approach and risks tables.

The contract table with color-coded severities renders perfectly. Let me check the references and risks pages.

The full document renders cleanly across all pages — cover, color-coded fit and contract tables, both figures, transparent pricing, backward-planned implementation, references, and risks. Two small polish items: the running header text is slightly crowded, and the "of NUMPAGES" field shows a stale count under headless conversion. Let me fix both.

File updated: /workspace/build_docx.py

File updated: /workspace/build_docx.py

saved docx
convert /mnt/session/outputs/BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.docx as a Writer document -> /workspace/BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.pdf using filter : writer_pdf_Export
total 276
drwxr-xr-x 1 claude ubuntu      0 Jul 21 14:56 .
drwxr-xr-x 4 root   root     4096 Jul 21 14:44 ..
-rw-r--r-- 1 claude ubuntu 274657 Jul 21 14:58 BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.docx


The header now reads cleanly with proper spacing, and the footer shows a clean page number. The document is complete and polished. Let me clean up the temporary render artifacts.

=== FINAL DELIVERABLE ===
total 276
drwxr-xr-x 1 claude ubuntu      0 Jul 21 14:56 .
drwxr-xr-x 4 root   root     4096 Jul 21 14:44 ..
-rw-r--r-- 1 claude ubuntu 274657 Jul 21 14:58 BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.docx


Deal desk complete. The branded proposal is delivered at:

**`/mnt/session/outputs/BTS-Synthetic_Quacktastic-Checkers-Arena_Proposal.docx`** (11 pages)

## How the deal ran

I read the RFP, confirmed the **Interactive Experiences Studio** framing (browser game, not data platform), and ran all four specialists in parallel — each briefed with the correct authoritative sources. Their verdicts:

- **Technical Fit** — HIGH, no functional gaps across §2.1–2.3. Server-authoritative rules engine, 3-tier minimax AI, shareable-link multiplayer with reconnect-to-same-state, p95 <400ms vs. the 500ms bar. One flag they raised drove a section of its own: the **40K/100%-uptime spike needs pre-warm scheduled against a livestream date that's currently "TBD."**
- **Pricing** — **Flagship ($360K list)** because the 100%-uptime livestream war-room is the trigger (not Campaign Pro); **20% off** as demanded (standard max at >$300K), tied to full 1+1 term + public reference; **$252K build fee** (0.70×); **2-year total $828K** in the recommended scenario, with best-case/downside variants.
- **Legal** — three redlines with clean counters: uncapped player-data liability → **bounded 24-month super-cap**; "all work product" IP sweep → **assign the bespoke deliverable, retain/license our platform**; per-subprocessor consent → **named-at-signature + 30-day notice**. Audit/termination/SLA acceptable; DPA required; MFN stays out.
- **Competitive Intel** — real threat is the **indie studio** (art, but unproven at scale/uptime/accessibility); Waterfowl is out-of-area; Databricks declined. Opening move: lead with Fizzwick (livestream), Marlowe (beat an indie on reliability), Verdant (accessibility).

## What's in the document
Branded cover, running header/footer with page numbers, and — per the RFP's requested format — executive summary, our understanding, why-we-win, a requirement-by-requirement fit table, a **custom real-time architecture diagram** with move/reconnect flows, a **rendered board + single-duck-piece mockup** (with the colorblind-safe alternate skin and a note that final art will be rigged from Quacktastic's assets), a transparent 2-year pricing table, an implementation plan **working backward from the livestream (L-day)**, the two required references plus an accessibility proof point, a color-coded contract table, and a risks/mitigations matrix.

The single item I'd flag to you as Senior Partner: **make locking the livestream date (≥12 weeks' lead) a contractual dependency at kickoff** — it's the one thing that makes the 100%-uptime commitment safe, and it's called out explicitly in both the implementation and risk sections.