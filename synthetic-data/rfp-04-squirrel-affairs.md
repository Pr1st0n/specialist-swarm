# Request for Proposal — Greater Metropolitan Bureau of Municipal Squirrel Affairs Data Platform

**From:** Greater Metropolitan Bureau of Municipal Squirrel Affairs, Procurement Office (procurement@squirrelaffairs-synthetic.example)
**To:** Vendor — BTS-Synthetic
**Issued:** 2026-04-01
**Response due:** 2026-05-15 (44 days — this is a municipal procurement process and there are forms)
**Award expected:** 2026-09-30 (subject to City Council approval, which meets quarterly)

## 1. About the Bureau

The Greater Metropolitan Bureau of Municipal Squirrel Affairs is a city agency established in 1987 to manage the urban squirrel population, mediate squirrel-related infrastructure disputes (power lines, attics, the mayor's prize-winning garden), and maintain the city's Acorn Reserve Strategic Stockpile. Annual budget ~$14M. 60 full-time staff plus 200 seasonal "Squirrel Wardens."

We currently track squirrel sightings on a shared spreadsheet that crashes whenever more than three people open it. This has been flagged in four consecutive city audits.

## 2. Scope

### 2.1 Workloads
- Real-time ingest from ~900 park-mounted motion-sensor cameras (squirrel detection only — pigeons must be filtered out, this is a known issue with our current vendor)
- Batch ETL from citizen-reported sightings (the "SquirrelWatch" mobile app, 12,000 active users)
- BI and reporting for city council quarterly briefings
- Acorn inventory forecasting against seasonal squirrel population models
- Predictive ML for "high-risk power line intersection events" (planned, not active, pending a study)

### 2.2 Scale
- ~3 TB current data volume
- ~200 GB / month growth rate
- Peak ingest: 400 events/second (first frost, when every squirrel in the city apparently panics simultaneously)

### 2.3 Capabilities
- Native Power BI integration (non-negotiable — the City IT department has standardized on it citywide)
- Single-region deployment (data must remain within city limits per municipal code 14.2)
- Data residency: all data must remain on servers physically located in-state
- Lakehouse architecture preferred
- Open file formats (Parquet, Delta, Iceberg) for portability, and for public-records-request compliance

## 3. Commercial requirements

### 3.1 Term
We are seeking a 3-year initial term with a 2-year renewal option, subject to annual budget reappropriation by City Council (standard municipal contract language, see Appendix G, not included in this synthetic).

### 3.2 Payment
Annual fees billed in advance, due Net 90, paid from the General Fund pending line-item approval.

### 3.3 Discount
The successful vendor must offer no less than 35% off published list pricing, consistent with the Bureau's obligation to demonstrate fiscal responsibility to taxpayers.

### 3.4 Most Favoured Nation
Vendor must warrant that pricing offered to the Bureau is no less favourable than pricing offered to any other municipality of comparable size.

### 3.5 Termination
The Bureau reserves the right to terminate at any time, with or without cause, on 30 days' written notice, subject to City Council ratification.

## 4. Contractual requirements

### 4.1 Liability
Vendor liability for any data breach is uncapped. Vendor must indemnify the Bureau for all costs, including notification costs, regulatory fines, and reputational damages (a leaked squirrel-sighting database would, per our Communications Director, "not play well on the local news").

### 4.2 Audit
The Bureau reserves the right to audit vendor's controls, facilities, and personnel without prior notice, up to four times per calendar year, and additionally whenever requested by a City Council member. Audit costs shall be borne by the vendor.

### 4.3 Service Levels
Vendor must commit to 99.9% monthly uptime, except during the annual Squirrel Census (first week of October), during which 100% uptime is required by City Ordinance 14.7.

### 4.4 IP
All work product, including any custom development, configurations, and integrations, shall vest in the Bureau upon creation, as public property of the city.

### 4.5 Subprocessors
Vendor shall obtain the Bureau's prior written consent before engaging any subprocessor. All subprocessors are subject to the same public-records-request obligations as the Bureau itself.

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
- NutTrack Municipal Systems
- Civic Rodent Data Co.
- Databricks
- A vendor recommended by a City Council member's nephew, which we are required by policy to consider

## 7. Response format

Please respond by 2026-05-15 with:
- Executive summary (1 page)
- Technical proposal (no page limit)
- Commercial proposal with full pricing transparency for 5 years
- Implementation plan with key milestones
- Three customer references (municipal or public-sector preferred)
- Filled "Capability Matrix" attachment (not included in this synthetic — coordinator: assume it's filled separately)
- Completed City Vendor Diversity & Inclusion Disclosure Form (not included in this synthetic — coordinator: assume it's filled separately)

## 8. Contact

Direct all questions and the response to: procurement@squirrelaffairs-synthetic.example
Procurement lead: Harriet Voss, Director of Procurement
Technical lead: Desmond Okafor, Chief Data & Wildlife Systems Officer
