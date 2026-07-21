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


Confirmed the checklist format. Now producing the analysis per the six items requested.

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

Delivered the full legal review to the coordinator, covering all six requested items plus the DPA/MFN flags, using the checklist's severity format (BLOCKER/NEGOTIABLE/ACCEPTABLE) with counter-positions for each.