Impact of the **Software Development Lifecycle** on Testing
Testing must be adapted to the SDLC to succeed. The choice of the SDLC impacts on the:
- Scope and timing of test activities (e.g., test levels and test types)
- Level of detail of test documentation
- Choice of test techniques and test approach
- Extent of test automation
- Role and responsibilities of a tester

**ATDD** is a test-first approach (see section 2.1.3). Test cases are created prior to implementing the user
story. The test cases are created by team members with different perspectives, e.g., customers,
developers, and testers (Adzic 2009).

**Test cases should be expressed in a way that is understandable for the stakeholders.** Typically, test cases contain sentences in natural language involving the necessary preconditions (if any), the inputs, and the postconditions.

A **failure** is the manifestation (observable incorrect behavior) when a defect (flaw in the component or system) is executed under certain conditions.
**Failure**: Deviation of the component or system from its expected delivery, service, or result (i.e., the observable incorrect behavior).
A failure is the manifestation or effect — it occurs only when the **defect is triggered during execution** under specific conditions.
In ISTQB, testers detect failures during testing, which provide evidence of underlying defects.
Testers detect failures in dynamic testing.
Testers detect defects (directly) in static testing.

**Defect** (also called bug or fault): A flaw in a component or system that can cause the component or system to fail to perform its required function (e.g., an incorrect statement or data definition). Importantly, "A defect, if encountered during execution, may cause a failure of the component or system."
A defect is the **root cause** (the flaw itself), which is static and present in the code or system.

**Test basis** is the set of source documents and information used as the foundation for designing and deriving test cases.

Word “regression” causes confusion because it’s used differently in everyday language vs testing. In everyday language, **regression** means:
`Going backward instead of forward`
Examples: A child regresses when they stop using words they already learned.
So regression = **loss of previously achieved progress**.
In software testing, regression means:
`Something that used to work correctly no longer works after a change`
Simple example:
    Login worked yesterday ✅
    Developer adds a new “Remember Me” feature
    Now login fails for some users ❌
    👉 This failure is a regression

**Beta testing** is a type of acceptance testing performed at an external site by roles outside the development organization

adverse effects - негативных последствий.

Good question — this confusion is **very common**, and it’s exactly the kind of thing exam questions try to trip you up on.

Let’s break it down **step by step**, in *plain, non-theoretical language*, and then tie it back to the exam logic (ISTQB-style).

## 2. Who are **stakeholders**?

**Stakeholders = anyone with an interest in the product**

This **includes**:

* End users
* Business owners
* Product managers
* Operations
* Support
* Compliance
* Marketing
* Etc.

### Important:

> **End users are a subset of stakeholders**, not a separate group.

So:

* ✅ All end users are stakeholders
* ❌ Not all stakeholders are end users

---
These ARE stakeholders, even though many people think they aren’t: <br>
✅ Testers -> They influence quality and delivery. <br>
✅ Developers -> They build and maintain the system. <br>
✅ Operations / Support -> They run the system in production. <br>
✅ Regulators / Auditors -> They enforce legal or compliance rules. <br>
✅ Management -> They fund, approve, or measure success. <br>

Stakeholder prioritization is usually based on:
- Power / influence
- Interest
- Risk
- Responsibility
- Legal or business impact
These are typically defined:
 -At project start
- In a stakeholder analysis or communication plan

**Validation** = Are we building the **right product?**
→ Meets user needs and expectations

**Verification** = Are we building the **product right**?
→ Meets specified / documented requirements

A **defect** (bug, fault) is a flaw in a work product
A **failure** is the observable incorrect behavior of the system during execution

adversarial relationship - враждебные отношения
subsumes - включает в себя
Test charters - Тестовые задания
drop‑in replacement - полная замена без доработок
granularity - детализация
rigor - строгость
are deliberated upon - обсуждаются
anticipated - ожидаемый
(with backoff) - (с задержкой)


**Test charters** are concise, written descriptions used primarily in exploratory testing to guide and focus the tester's efforts.

there is NO common understanding of the term ‘development level’

There is NO such thing as the left-hand side of the test process

**Test basis** is the source of information used to design test cases.

A **Rule** is a specific combination of condition values (plus the resulting action).

Modifiability - Evaluating the ease with which the function can be
modified, a form of non-functional maintainability testing.

Adaptability testing is Assessing that the sort function still functions correctly when moved from a 32-bit to a 64-bit architecture.

**test conditions** = acceptance criteria

**race condition** is a situation where the outcome of a process depends on the uncontrollable timing or sequence of other events.  It occurs when two or more threads or processes "race" to access the same shared resource simultaneously without proper coordination. 
These bugs are notoriously hard to find because they often disappear when you try to debug them (sometimes called "**Heisenbugs**")

AI AskUserQuestion tool
