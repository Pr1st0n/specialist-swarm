# Request for Proposal — Pacific Northwest Cryptid & Bigfoot Tourism Board Sighting Intelligence Platform

**From:** Pacific Northwest Cryptid & Bigfoot Tourism Board, Procurement Office (procurement@cryptidtourism-synthetic.example)
**To:** Vendor — BTS-Synthetic
**Issued:** 2026-06-01
**Response due:** 2026-06-22 (21 days — we are a small board and everyone has a day job)
**Award expected:** 2026-08-01 (before peak sighting season)

## 1. About the Board

The Pacific Northwest Cryptid & Bigfoot Tourism Board is a regional nonprofit-public partnership promoting cryptid-adjacent tourism across six counties. We drive an estimated $40M/year in tourism revenue from Bigfoot enthusiasts, documentary crews, and the occasional actual researcher. 22 staff, 300 volunteer "Trail Spotters," and one full-time Director of Sasquatch Relations (title is official, per our bylaws).

We currently log sightings on paper forms mailed to a PO box. Our board chair describes this as "extremely on-brand but no longer sustainable."

## 2. Scope

### 2.1 Workloads
- Real-time ingest from ~150 trail-cam and audio-sensor stations across the forest network
- Batch ETL from the public sighting-report hotline and web form (roughly 40 reports/week, spiking to 400/week after any viral TikTok)
- BI and reporting for the board and county tourism offices
- Weather-correlation analysis (sightings reportedly cluster around fog and low barometric pressure — we would like this confirmed or debunked, scientifically, once and for all)
- Cryptid sentiment analysis on social media mentions (planned, not active — pending grant funding)

### 2.2 Scale
- ~1.2 TB current data volume, including four decades of digitized paper archives
- ~50 GB / month growth rate
- Peak ingest: 900 events/second (the week a blurry video goes viral)

### 2.3 Capabilities
- Native Power BI integration (the county's IT department insists on it)
- Single-region deployment, US West only
- Data residency: sighting-reporter identities must never leave board-controlled infrastructure — many are, understandably, private about this hobby
- Lakehouse architecture preferred
- Open file formats (Parquet, Delta, Iceberg) for portability

## 3. Commercial requirements

### 3.1 Term
We are seeking a 3-year initial term with a 2-year renewal option. Pricing for the full 5-year horizon must be fixed at signature — our grant funding does not tolerate surprises.

### 3.2 Payment
Annual fees billed in advance, due Net 90, contingent on annual state tourism-grant disbursement (typically arrives late, see Section 3.5).

### 3.3 Discount
The successful vendor must offer no less than 35% off published list pricing. We are, again, a nonprofit board that sells Bigfoot-shaped keychains to fund operations.

### 3.4 Most Favoured Nation
Vendor must warrant that pricing offered to the Board is no less favourable than pricing offered to any comparable regional tourism organization.

### 3.5 Termination
The Board reserves the right to terminate at any time, with or without cause, on 30 days' written notice — including if state grant funding is not renewed, which has happened twice in the Board's history.

## 4. Contractual requirements

### 4.1 Liability
Vendor liability for any data breach is uncapped. Vendor must indemnify the Board for all costs, including notification costs and reputational damages — a leaked sighting-reporter database would end several marriages, per our Director of Sasquatch Relations.

### 4.2 Audit
The Board reserves the right to audit vendor's controls, facilities, and personnel without prior notice, up to four times per calendar year. Audit costs shall be borne by the vendor.

### 4.3 Service Levels
Vendor must commit to 99.9% monthly uptime, with 100% required during the annual Sasquatch Sighting Festival (third weekend of August), our single largest revenue event.

### 4.4 IP
All work product, including any custom development, configurations, and integrations, shall vest in the Board upon creation. This explicitly includes any weather-correlation model, which the Board intends to publish (we would like to be taken seriously, eventually).

### 4.5 Subprocessors
Vendor shall obtain the Board's prior written consent before engaging any subprocessor for any part of the services.

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
- CryptidCloud
- Sasquatch Analytics LLC
- Databricks (rumored to have submitted, unconfirmed as of this writing)
- A vendor whose website we can no longer find, but who called our Director of Sasquatch Relations directly

## 7. Response format

Please respond by 2026-06-22 with:
- Executive summary (1 page)
- Technical proposal (no page limit)
- Commercial proposal with full pricing transparency for 5 years
- Implementation plan with key milestones
- Three customer references (tourism boards, parks departments, or wildlife agencies preferred)
- Filled "Capability Matrix" attachment (not included in this synthetic — coordinator: assume it's filled separately)

## 8. Contact

Direct all questions and the response to: procurement@cryptidtourism-synthetic.example
Procurement lead: Wanda Ostrander, Board Treasurer
Technical lead: Felix Marsh, Director of Sasquatch Relations
