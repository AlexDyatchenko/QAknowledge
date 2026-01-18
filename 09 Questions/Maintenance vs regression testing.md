From an **ISTQB / QA perspective**, the difference is mainly about **why** the testing is done and **what triggers it**.

---

## Maintenance Testing

**Purpose:**
Testing performed **after the system has been delivered and is in use**, to ensure it still works correctly after changes.

**Trigger:**
Any change during the **maintenance phase** of the software lifecycle, for example:

* Bug fixes in production
* Enhancements or new features
* Configuration or environment changes
* OS / browser / database upgrades
* Data migrations
* Decommissioning parts of the system

**Scope:**
Maintenance testing is an **umbrella term**. It can include:

* **Regression testing**
* Testing of the changed/new functionality
* Impact analysis
* Migration testing
* Retesting of fixed defects
* Testing of system retirement

👉 **Key idea:** *Maintenance testing is about testing a maintained system.*

---

## Regression Testing

**Purpose:**
To ensure that **unchanged functionality has not been broken** by a change.

**Trigger:**

* Code changes (bug fix, refactor, enhancement)
* Configuration changes
* Environment updates

**Scope:**

* Focuses on **existing features**
* Usually re-executes previously passed test cases
* Often automated due to frequency

👉 **Key idea:** *Regression testing checks for unintended side effects.*

---

## Key Differences (Exam-friendly)

| Aspect                       | Maintenance Testing                    | Regression Testing                     |
| ---------------------------- | -------------------------------------- | -------------------------------------- |
| Why it is done               | Because the system is being maintained | Because changes may cause side effects |
| Lifecycle phase              | After delivery (maintenance phase)     | Any phase after a change               |
| Scope                        | Broad (includes many test types)       | Narrow (existing functionality only)   |
| Includes regression testing? | ✅ Yes                                  | ❌ No                                   |
| Focus                        | System stability after changes         | Detecting unintended defects           |

---

## Simple Example

**Scenario:**
A production web app gets a bug fix in the payment module.

* **Maintenance testing** includes:

  * Testing the bug fix itself
  * Regression tests for checkout
  * Smoke testing in production-like environment
  * Checking logs and monitoring after release

* **Regression testing** includes:

  * Ensuring login, cart, and checkout still work
  * Verifying existing payment methods still function

---

## One-line ISTQB answer

> **Maintenance testing** is testing a system after delivery to ensure it continues to work after changes, while **regression testing** is performed to detect unintended side effects of those changes on existing functionality.

If you want, I can also give you:

* **ISTQB exam traps**
* **Mnemonic to remember the difference**
* **A practice multiple-choice question**
