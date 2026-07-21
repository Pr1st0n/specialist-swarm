# Request for Proposal — CheeseCloud Artisanal Subscriptions Provenance Platform

**From:** CheeseCloud Artisanal Subscriptions Inc., Procurement Office (procurement@cheesecloud-synthetic.example)
**To:** Vendor — BTS-Synthetic
**Issued:** 2026-02-09
**Response due:** 2026-02-16 (7 days — we move fast, we're a Series C company)
**Award expected:** 2026-02-28

## 1. About CheeseCloud

CheeseCloud is a venture-backed direct-to-consumer cheese subscription box, valued at $1.2B after our Series C ("unicorn," per TechCrunch, a headline we have laminated and hung in the lobby). Revenue ~$95M (2025), growing 300% YoY, profitability "not currently a KPI we're optimizing for." 310 employees, mostly in our Brooklyn HQ, plus a curing facility in Wisconsin we refer to internally as "The Cave."

We are multi-cloud by accident, not by design. Our current stack is "whichever cloud the engineer who built it in 2023 preferred." We would like this to no longer be true.

## 2. Scope

### 2.1 Workloads
- Real-time ingest from ~1,200 IoT humidity/temperature sensors across our aging caves
- Blockchain-verified provenance tracking for every wheel of cheese, farm to doorstep
- Subscriber churn prediction ML (our board asks about this in every meeting)
- BI and reporting for ~40 analysts
- "Vibes dashboard" — a real-time feed of subscriber unboxing videos, sentiment-scored (this is a hard requirement, not a joke, per our Head of Brand)

### 2.2 Scale
- ~8 TB current data volume
- ~1.5 TB / month growth rate (we are growing faster than our data platform, which is the whole problem)
- Peak ingest: 3,000 events/second (monthly box-ship day, all 400,000 subscribers at once)

### 2.3 Capabilities
- Native integration with our existing BI tool, which we will disclose only after signing an NDA
- Multi-region deployment (we have subscribers in the US and, mysteriously, 40 in Reykjavik)
- Data residency: no specific requirement, but the platform must "feel premium"
- Lakehouse architecture preferred
- Open file formats (Parquet, Delta, Iceberg) for portability

## 3. Commercial requirements

### 3.1 Term
We are seeking a 3-year initial term with a 2-year renewal option, though our Head of Strategy would like the option to renegotiate "if we get acquired, which we are not saying is imminent."

### 3.2 Payment
Annual fees billed in advance, due Net 90. Alternatively, we are open to an equity-for-services arrangement at a valuation TBD by our board.

### 3.3 Discount
The successful vendor must offer no less than 35% off published list pricing.

### 3.4 Most Favoured Nation
Vendor must warrant that pricing offered to CheeseCloud is no less favourable than pricing offered to any comparable customer for the duration of the contract.

### 3.5 Termination
CheeseCloud reserves the right to terminate at any time, with or without cause, on 30 days' written notice. No early termination fees.

## 4. Contractual requirements

### 4.1 Liability
Vendor liability for any data breach is uncapped. Vendor must indemnify CheeseCloud for all costs, including notification costs, regulatory fines, reputational damages, and — per our legal team's insistence — "any resulting cheese spoilage attributable to sensor downtime."

### 4.2 Audit
CheeseCloud reserves the right to audit vendor's controls, facilities, and personnel without prior notice, up to four times per calendar year. Audit costs shall be borne by the vendor.

### 4.3 Service Levels
Vendor must commit to 99.99% monthly uptime. Any outage on a box-ship day is a material breach.

### 4.4 IP
All work product, including any custom development, configurations, and integrations, shall vest in CheeseCloud upon creation, including the Vibes Dashboard sentiment model.

### 4.5 Subprocessors
Vendor shall obtain CheeseCloud's prior written consent before engaging any subprocessor. Note: final sign-off on vendor selection also requires the approval of Brie, our Head of Brand's dog and official "VP of Vibes." This is not negotiable and has, in fairness, correctly vetoed two vendors already.

## 5. Evaluation criteria

| Criterion | Weight |
| --- | --- |
| Functional fit (workloads + capabilities) | 30% |
| Commercial terms (pricing + flexibility) | 25% |
| Total cost of ownership (3 + 2 years) | 20% |
| Implementation timeline and risk | 15% |
| Vendor financial stability + customer references | 10% |

## 6. Vendors being evaluated

We are also issuing this RFP to:
- Fromage Fabric
- BlockChain Brie Co.
- Databricks
- Snowflake
- A regional vendor we will not name in this document

## 7. Response format

Please respond by 2026-02-16 with:
- Executive summary (1 page)
- Technical proposal (no page limit)
- Commercial proposal with full pricing transparency for 5 years
- Implementation plan with key milestones
- Three customer references (DTC subscription or CPG preferred)
- Filled "Capability Matrix" attachment (not included in this synthetic — coordinator: assume it's filled separately)

## 8. Contact

Direct all questions and the response to: procurement@cheesecloud-synthetic.example
Procurement lead: Tobias Kwan, Head of Strategy & Procurement
Technical lead: Marisol Fenn, VP Engineering
