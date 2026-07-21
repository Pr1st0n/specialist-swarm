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
