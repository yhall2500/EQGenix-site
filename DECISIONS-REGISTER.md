# Decisions Register — staged for Sovereign Worker™ Architecture v1.1

Marker IDs logged ahead of the v1.1 seal so the register inherits them
directly instead of being reconstructed from the pages. §11 of v1.0 is
being deleted and replaced; these three entries carry forward.

## Route table — publish gates

| Route | Class | Gate |
|---|---|---|
| /assessment-use-policy | [NOPUBLISH] staged — noindex, out of sitemap, unlinked from all live pages | Written employment-counsel clearance on file |
| /workforce-deployment | LIVE with two [VERIFY] value gaps | v1.1 seal |

## Markers

### SW-M1 — /legal/assessment-use-policy — staged-draft banner
Placement: top of page, above the H1.
Status: OPEN.
[VERIFY: Assessment Use Policy full text and the five non-waivable
governance rules must be cleared by employment counsel before this
page is published. Build the page complete and staged. Do not add
the route to the sitemap, do not link to it from any live page, and
set noindex until counsel clearance is recorded. Owner: Yvonne G.
Hall / employment counsel (TBD). Gate: written clearance on file.]
Note: this marker carries two controls — a content check ([VERIFY])
and a publish gate ([NOPUBLISH]). The gate is surfaced at the route
table above so a builder scanning markers cannot ship the staged page
into the sitemap by accident.

### SW-M2 — /deployment — session cadence
Placement: Tier 3 structure block, cadence line.
Status: OPEN. Cadence table built with live labels and blank values.
[VERIFY: Session cadence (sessions per week/month, session length,
total program duration by tier) is pending Founder seal. Build the
cadence table with live labels and blank values. Do not populate
with example, placeholder, or inferred figures. Owner: Yvonne G.
Hall. Gate: Sovereign Worker™ Architecture Source Document v1.1 seal.]

### SW-M3 — /deployment — contract term
Placement: immediately following the 16-seat contract floor language.
Status: OPEN. The 16-seat floor is sealed and publishes as written.
[VERIFY: Contract term/length (initial term, renewal structure,
minimum commitment period) is pending Founder seal. The 16-seat
contract floor is sealed and publishes as written; term does not.
Do not state or imply a duration anywhere on this page or in the
MSA summary block. Owner: Yvonne G. Hall. Gate: Sovereign Worker™
Architecture Source Document v1.1 seal.]

## Cross-link dependency (resolved)
/deployment ↔ AUP: while the AUP is staged and unlinked, the
deployment page carries the aggregate-only constraint as standalone
prose with no cross-link. Restore the cross-links (deployment, audit,
certificate, workforce, inquiry, evidence, standard, five, parent)
when SW-M1 closes — the anchors were stripped, the sentences kept.
