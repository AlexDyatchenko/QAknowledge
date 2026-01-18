Below is a **practical, day-by-day view of QA activities in a typical 2-week (10 working days) sprint**. This reflects how **mature Scrum teams** usually work, not textbook theory. I’ll assume:

* Backend + UI features
* API-first development
* Automation already exists (API + UI)
* QA is embedded in the team (not a gatekeeper)

---

## Sprint Day 0 (or last day of previous sprint)

**Sprint Planning / Backlog Refinement**

* Review stories for **testability**
* Check acceptance criteria (AC)
* Identify:

  * API vs UI coverage
  * Test data needs
  * Environment dependencies
* Call out **test risks early** (missing mocks, unstable env, unclear flows)
* Rough test effort estimation

---

## Day 1 – Sprint Start

**Context setup & preparation**

* Read finalized stories
* Update **test scenarios / test cases** (lightweight, not huge docs)
* Identify:

  * Which stories can be **API-tested immediately**
  * Which require UI later
* Prepare:

  * Postman / Playwright API tests skeleton
  * WireMock stubs (if needed)
* Sync with devs on:

  * API contracts
  * Feature flags

📌 *No UI testing yet — mostly backend work starts here*

---

## Day 2

**API testing starts early**

* Test **ready APIs** (even partial implementations)
* Validate:

  * Status codes
  * Request/response schema
  * Error handling
* Log defects early (cheap fixes)
* Begin **API automation** for stable endpoints

🔁 Regression:

* No full regression yet
* Smoke existing API suite only if env changed

---

## Day 3

**Parallel testing**

* Continue API testing
* Expand automation coverage
* Validate DB side effects (if applicable)
* Start **negative and edge cases**
* Review UI designs / Figma / UX flows

📌 QA often helps devs here by spotting contract gaps early

---

## Day 4

**First UI builds appear**

* Start **manual UI testing** for completed stories
* Validate:

  * Happy paths
  * Navigation
  * Basic validations
* Raise UI bugs early (before dev moves on)

🔁 Automation:

* Create **UI automation placeholders** (locators, structure)
* Avoid full UI automation if UI is still unstable

---

## Day 5

**Stabilisation checkpoint**

* Re-test fixed API & UI bugs
* Expand UI test coverage
* Convert **stable manual cases → automated**
* Update:

  * Regression suite selection
  * Test data configs

📌 Mid-sprint check: Are we on track to finish testing?

---

## Day 6 (Week 2 starts)

**Feature-complete focus**

* Most stories should be dev-complete
* Full **API + UI testing** in parallel
* Validate:

  * Cross-feature flows
  * Integration points
* Increase automation intensity

🔁 Regression:

* Run **targeted regression** on affected areas

---

## Day 7

**Hardening**

* Execute:

  * Full API regression
  * Core UI regression paths
* Verify non-functional basics:

  * Auth
  * Permissions
  * Data integrity
* Re-test high-risk bug fixes

📌 Bugs found here are more expensive — urgency increases

---

## Day 8

**Pre-release validation**

* Full **smoke + critical regression**
* Validate:

  * All ACs met
  * No P1/P2 open
* Test edge cases often skipped earlier
* Prepare **release test summary**

---

## Day 9

**Release readiness**

* Final regression (selected scope)
* Verify:

  * Environment stability
  * Feature flags
  * Rollback scenarios (if applicable)
* Support PO with **UAT / acceptance questions**
* Sign-off recommendation (QA does not “approve” alone)

---

## Day 10 – Sprint End

**Sprint Review + Retrospective**

* Demo support (QA often validates demo data)
* Provide:

  * Defect metrics
  * Escaped risk discussion
* Retrospective input:

  * What slowed testing?
  * Where QA joined too late?
* Regression suite updates:

  * Remove obsolete tests
  * Tag flaky tests

---

## Summary by Activity Type

### API Testing

* Starts **Day 2**
* Continues **throughout sprint**
* Mostly automated by mid-sprint
* Regression focus in Week 2

### UI Testing

* Starts **Day 4**
* Manual first → automate when stable
* Heavy in Days 6–9

### Regression

* Light smoke early
* Targeted mid-sprint
* Full/critical at end

### Automation

* API: early & aggressive
* UI: delayed until UI stabilizes

---

## Key Principle

> QA work is **front-loaded for API**, **mid-loaded for UI**, and **back-loaded for regression**.

If you want, I can:

* Adapt this to **your team size**
* Map it to **Playwright + WireMock**
* Show **what NOT to do** (anti-patterns QA teams fall into)
