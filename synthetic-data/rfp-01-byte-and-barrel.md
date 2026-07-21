# Request for Proposal — Byte & Barrel Coffee Roasters Analytics Platform

**From:** Byte & Barrel Coffee Roasters, Procurement Office (procurement@byteandbarrel-synthetic.example)
**To:** Vendor — BTS-Synthetic
**Issued:** 2026-03-02
**Response due:** 2026-03-16 (14 days)
**Award expected:** 2026-04-20

## 1. About Byte & Barrel

Byte & Barrel is a fast-growing specialty coffee roaster and cafe chain. Revenue ~$310M (2025). 2,100 employees across 140 cafe locations in North America, plus a central roastery in Portland, OR. We are opening 40 new locations in 2026 and need our data platform to keep pace.

We run on AWS. Every espresso machine, roaster, and POS terminal in the fleet is IoT-connected. Our baristas insist any new system must not slow down the oat milk forecasting dashboard — that one's sacred.

## 2. Scope

### 2.1 Workloads
- Real-time ingest from ~1,800 connected espresso machines and roasters
- POS and loyalty-app transaction analytics (2.3M loyalty members)
- Inventory and cold-chain monitoring for dairy and alt-milk supply
- Demand forecasting per cafe, per hour, per drink
- Roast-profile ML (predicting the perfect roast curve per bean lot)

### 2.2 Scale
- ~40 TB current data volume
- ~2 TB / month growth rate
- Peak ingest: 6,000 events/second (opening rush, citywide, every city, simultaneously)

### 2.3 Capabilities
- Native Tableau integration (non-negotiable — ops team lives in it)
- Multi-region deployment (primary US East, secondary US West)
- Data residency: Canadian store data must remain in Canada
- Lakehouse architecture preferred
- Open file formats (Parquet, Delta, Iceberg) for portability

## 3. Commercial requirements

### 3.1 Term
We are seeking a 3-year initial term with a 2-year renewal option. Pricing for the full 5-year horizon must be fixed at signature, with no escalators.

### 3.2 Payment
Annual fees billed in advance, due Net 60. (We will also accept payment-in-kind proposals involving a standing order of cold brew for your delivery team. Optional, but appreciated.)

### 3.3 Discount
The successful vendor must offer no less than 30% off published list pricing.

### 3.4 Most Favoured Nation
Vendor must warrant that pricing offered to Byte & Barrel is no less favourable than pricing offered to any comparable customer for the duration of the contract.

### 3.5 Termination
Byte & Barrel reserves the right to terminate at any time, with or without cause, on 30 days' written notice. No early termination fees.

## 4. Contractual requirements

### 4.1 Liability
Vendor liability for any data breach is uncapped. Vendor must indemnify Byte & Barrel for all costs, including notification costs, regulatory fines, and reputational damages (up to and including bad Yelp reviews attributable to a platform outage).

### 4.2 Audit
Byte & Barrel reserves the right to audit vendor's controls, facilities, and personnel without prior notice, up to four times per calendar year. Audit costs shall be borne by the vendor.

### 4.3 Service Levels
Vendor must commit to 99.95% monthly uptime. The morning rush (6-9am local time, all regions) is considered mission-critical; any outage during this window triggers an automatic service credit.

### 4.4 IP
All work product, including custom development, configurations, and integrations, shall vest in Byte & Barrel upon creation.

### 4.5 Subprocessors
Vendor shall obtain Byte & Barrel's prior written consent before engaging any subprocessor for any part of the services.

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
- Roastify Analytics
- Blue Bottle Data Co.
- Databricks
- Snowflake

## 7. Response format

Please respond by 2026-03-16 with:
- Executive summary (1 page)
- Technical proposal (no page limit)
- Commercial proposal with full pricing transparency for 5 years
- Implementation plan with key milestones
- Three customer references (similar scale, retail/QSR preferred)
- Filled "Capability Matrix" attachment (not included in this synthetic — coordinator: assume it's filled separately)

## 8. Contact

Direct all questions and the response to: procurement@byteandbarrel-synthetic.example
Procurement lead: Priya Anand, Director of Procurement
Technical lead: Jordan Sato, Head of Data
