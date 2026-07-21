# Request for Proposal — Quacktastic Industries Global Duck Intelligence Platform

**From:** Quacktastic Industries, Procurement Office (procurement@quacktastic-synthetic.example)
**To:** Vendor — BTS-Synthetic
**Issued:** 2026-01-14
**Response due:** 2026-01-28 (14 days)
**Award expected:** 2026-03-05

## 1. About Quacktastic Industries

Quacktastic Industries is the world's largest manufacturer of rubber ducks, novelty bath toys, and duck-adjacent merchandise. Revenue ~$680M (2025). 4,400 employees across 11 countries, with flagship factories in Shenzhen and Tijuana. We are 90 days from an IPO and our S-1 auditors have Opinions about our current spreadsheet-based supply chain.

We are a Google Cloud shop. Legacy inventory data lives in a Microsoft Access database maintained by a single beloved employee named Gary, who is retiring in June.

## 2. Scope

### 2.1 Workloads
- Real-time ingest from ~65,000 factory-floor IoT sensors (mold temperature, squeak-frequency QA, float-buoyancy testing)
- Batch ETL from 30+ distributor and retail-partner feeds
- BI and reporting for ~200 analysts and executives
- Self-service data prep for ~35 data engineers
- Duck Sentiment Analysis: ML pipeline scoring social media mentions of our ducks by perceived "cuteness" (planned, not active — but the board keeps bringing it up)

### 2.2 Scale
- ~90 TB current data volume
- ~5 TB / month growth rate
- Peak ingest: 22,000 events/second (Q4 holiday production surge)

### 2.3 Capabilities
- Native Looker integration (non-negotiable — the board reviews Looker dashboards, not raw data)
- Multi-region deployment (primary APAC, secondary Americas)
- Data residency: EU customer data must remain in EU
- Lakehouse architecture preferred
- Open file formats (Parquet, Delta, Iceberg) for portability

## 3. Commercial requirements

### 3.1 Term
We are seeking a 3-year initial term with a 2-year renewal option. Pricing for the full 5-year horizon must be fixed at signature, with no escalators.

### 3.2 Payment
Annual fees billed in advance, due Net 90.

### 3.3 Discount
The successful vendor must offer no less than 35% off published list pricing. (We will ask for 40% during negotiation. Everyone knows this. Let's not pretend otherwise.)

### 3.4 Most Favoured Nation
Vendor must warrant that pricing offered to Quacktastic is no less favourable than pricing offered to any comparable customer for the duration of the contract.

### 3.5 Termination
Quacktastic reserves the right to terminate at any time, with or without cause, on 30 days' written notice. No early termination fees.

## 4. Contractual requirements

### 4.1 Liability
Vendor liability for any data breach is uncapped. Vendor must indemnify Quacktastic for all costs, including notification costs, regulatory fines, and reputational damages (a leaked "cuteness score" methodology would be catastrophic to our brand).

### 4.2 Audit
Quacktastic reserves the right to audit vendor's controls, facilities, and personnel without prior notice, up to four times per calendar year. Audit costs shall be borne by the vendor.

### 4.3 Service Levels
Vendor must commit to 99.99% monthly uptime. Any SLA failure during the 6-week pre-IPO quiet period shall entitle Quacktastic to terminate immediately with full refund.

### 4.4 IP
All work product, including any custom development, configurations, and integrations, shall vest in Quacktastic upon creation. This explicitly includes the Duck Sentiment Analysis model, should it ever leave the whiteboard.

### 4.5 Subprocessors
Vendor shall obtain Quacktastic's prior written consent before engaging any subprocessor for any part of the services.

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
- QuackData Solutions
- Waterfowl Analytics Inc.
- Databricks
- Snowflake

## 7. Response format

Please respond by 2026-01-28 with:
- Executive summary (1 page)
- Technical proposal (no page limit)
- Commercial proposal with full pricing transparency for 5 years
- Implementation plan with key milestones
- Three customer references (manufacturing or consumer goods preferred)
- Filled "Capability Matrix" attachment (not included in this synthetic — coordinator: assume it's filled separately)

## 8. Contact

Direct all questions and the response to: procurement@quacktastic-synthetic.example
Procurement lead: Deborah Finch, VP Procurement
Technical lead: Kai Reyes, Chief Data Officer (and, per his email signature, "Duck Whisperer")
