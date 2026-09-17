# EQGenix website: formation-first redesign

Design review · September 17, 2026 · Proposed changes for review

## Executive judgment

The current site has a distinctive editorial identity: generous space, serif typography, a restrained palette, and memorable language. Its problem is commercial clarity. Visitors meet an abstract advisory practice before they can identify the relevant product, its format, or their next step. The redesign keeps the premium character and gives it an intelligible front door.

The strategic position is **human formation for an AI age**. The proposed hero, “The future needs more human,” is immediately followed by a plain explanation of what EQGenix offers. “Built, Not Downloaded™” remains the signature philosophy.

This is a design and content review, not an analytics audit. No conversion lift, user-research result, or commercial outcome is claimed.

## Findings and decisions

| Priority | Observation | Why it matters | Proposed response |
|---|---|---|---|
| High | The homepage leads with “Emotional & Cognitive Wealth Advisors” and “The Practice.” | Category and offer are hard to identify without reading multiple sections. | Name formation programs and the intended audiences within the first screen. |
| High | The primary homepage action is the EWD-1™ Diagnostic. | Families, agency buyers, and research partners have different goals. | Make program selection primary; give institutions a separate direct route; retain the diagnostic as an optional route. |
| High | Most desktop navigation is inside a full-screen menu. | Research, program discovery, and company information are unnecessarily concealed. | Use visible navigation on desktop and an accessible disclosure on mobile. |
| High | Trademarked program names appear before visitors understand who they are for. | Brand recognition is being assumed at first contact. | Lead with audience and need, then introduce the program name. |
| High | Published theoretical work can be read as evidence of program effectiveness. | Serious institutional buyers need to distinguish hypotheses, measurement design, and demonstrated results. | Give the latest thesis a prominent evidence-status statement. Preserve direct links to research and evidence pages. |
| Medium | Long staged animations initially conceal core homepage content. | The first impression can be an almost empty screen. | Render all key content immediately; keep only subtle interaction transitions and honor reduced motion. |
| Medium | Dense inline CSS and page-specific layout patches make consistency difficult. | Future editorial changes risk layout drift. | Create an isolated, reusable stylesheet and small progressive-enhancement script. |
| Medium | “Seven working papers” remains on impact.html after the eighth publication was added. | Small discrepancies weaken the impression of editorial control. | Correct to eight. Do not describe the count as outcome evidence. |
| Medium | The founder is represented by text more than human presence on the homepage. | The company’s founding conviction lacks a visible author. | Use the existing founder image and a concise, explicit stewardship statement. |

## What this branch implements

- A complete redesigned homepage: positioning, four audience pathways, a plain-language account of formation, featured thesis, founder section, and clear next steps.
- A new program directory with seven program pathways, audience filters, shareable filter URLs, browser-back support, FAQs, and a contact route.
- A responsive design system for those two pages, with visible desktop navigation, a keyboard-operable mobile menu, focus styles, semantic headings, and a skip link.
- Original lightweight vector artwork representing formation through successive layers. It is conceptual artwork, not a chart or a measurement.
- A responsive review page at `/design-review.html`, marked noindex, for viewing the new homepage and directory at desktop, tablet, and phone widths.
- A sitemap entry for the program directory and the corrected publication count.

Existing program pages, checkout destinations, contact forms, the research library, and the thesis/PDF remain connected through their current URLs. This branch establishes the new public-facing design with two fully implemented pages; it does not claim that every existing program detail page has already been redesigned.

## Information architecture

| Main route | Visitor question | Destination |
|---|---|---|
| Programs | “What fits my life or audience?” | Filterable directory, then the specific program page |
| Our approach | “What does formation mean in practice?” | Existing methodology page |
| Research | “What is proposed, published, or demonstrated?” | Research library and individual papers |
| About | “Who is behind this?” | Founder and organizational background |
| For institutions | “Can we bring this to our people?” | Partnership inquiry; procurement when appropriate |

Program pages should ultimately share a consistent sequence: **audience → need → program format → actual participant work → evidence status → delivery/pricing or inquiry → FAQ → next step**. Preserve each program’s identity inside this structure rather than letting every sub-brand invent a separate buying journey.

## Visual direction

- Warm paper (`#f6f3eb`), deep forest ink (`#202e29`), and subdued gold (`#80623a`). Gold functions as an accent, not pale body text.
- Cormorant Garamond for editorial headlines; Instrument Sans for explanations, actions, and metadata. System fallbacks remain usable if font delivery fails.
- A split hero with immediate explanatory copy and an architectural illustration. Substantial typography is balanced by specific, readable content.
- Rule-based layouts, deliberate spacing, and a small number of strong sections. No stock “AI brain,” invented partner logos, unverified results, or fake testimonials.
- Existing founder imagery is reused; no new likeness is generated.
- Mobile uses a single-column reading order, natural page flow, large controls, and no delayed reveal dependency.

## Content decisions requiring owner reconciliation

These are editorial issues, not a reason to block review of the design.

1. **Mission-Ready Civilian:** confirm a single authoritative price and delivery model. Existing pages and recent planning materials need reconciliation before any price is promoted in the new directory. The redesign links to the existing program page without asserting a new price, accreditation, or funding approval.
2. **Privacy by program:** Sovereign Shield describes participant/instructor access, while partnership language makes broader statements about individual results remaining with the individual. Establish a precise matrix for journal entries, scores, completion records, instructor access, and agency reporting before making a universal privacy promise.
3. **Workforce contracting:** the existing decisions register marks deployment cadence and contract term as unverified. Preserve the inquiry route until approved facts are available.
4. **Employment assessment policy:** `assessment-use-policy.html` remains noindex and unlinked under the decisions register. No new link is introduced.
5. **Measurement:** distinguish self-report entry/exit scores from observed performance, independent retention/transfer, or causal evidence of effectiveness. A publication count is not a validation claim.
6. **Offer availability:** maintain a dated, owner-approved source for every offer’s audience, delivery mode, price, availability, and purchase/inquiry URL. Avoid scattering independent versions across pages.

## Next rollout after design approval

1. Apply this navigation and content hierarchy to the six program families, with each owner confirming format and commercial facts.
2. Refine methodology into concrete examples while retaining the canonical framework and its exact naming.
3. Standardize evidence labels across homepage, papers, instruments, program pages, and institutional materials.
4. Streamline institutional inquiry around audience, organization, scale, and desired next step, with verified privacy and procurement details.
5. Establish a privacy-appropriate measurement plan: program discovery, program-page engagement, inquiries, completed purchases where available, and form abandonment. Define baselines before discussing lift.

## Review criteria

Visitors should be able to identify what EQGenix offers, find a relevant program, and distinguish individual and institutional routes without opening a menu on desktop. Every claim must be traceable to an approved program source or clearly labeled as a proposed research claim. Keyboard navigation, audience filters, responsive layout, and essential links must work. With JavaScript unavailable, all program cards and navigation remain available.
