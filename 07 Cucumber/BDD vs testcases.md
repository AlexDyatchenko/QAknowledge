**BDD scenarios and test cases are related but not the same thing.**
Think of them as living at different levels of abstraction in the testing pyramid.

---

## High-level relationship

**BDD Scenario → Source of truth → One or more test cases**

* **BDD scenarios** describe *business behavior* in a shared language.
* **Test cases** are *technical implementations* that verify that behavior.

> In short: **BDD scenarios define *what* should happen; test cases define *how* we verify it.**

---

## What a BDD scenario is

A **BDD scenario** is:

* Written in **Gherkin** (Given / When / Then)
* Business-focused
* Technology-agnostic
* Understandable by non-technical stakeholders

Example:

```gherkin
Scenario: Successful login
  Given the user is on the login page
  When the user enters valid credentials
  Then the user is logged in
```

This answers:

> *What behavior does the system guarantee?*

---

## What a test case is

A **test case** is:

* Tool-specific (Playwright, Cypress, JUnit, etc.)
* Technical
* Often includes setup, mocks, assertions, data handling
* May validate edge cases not visible in BDD

Example (Playwright):

```ts
test('User can log in with valid credentials', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'user@test.com');
  await page.fill('#password', 'Password123');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('/dashboard');
});
```

This answers:

> *How do we verify the behavior works?*

---

## Mapping scenarios to test cases

### 1 scenario → 1 test case (simple systems)

```gherkin
Scenario: User logs out
```

* One automated UI test
* One manual test
* One API test

---

### 1 scenario → multiple test cases (common)

```gherkin
Scenario: Payment is declined
```

Can produce:

* UI test (error message shown)
* API test (correct error code)
* Contract test (bank response mapping)
* Security test (no sensitive data leaked)

---

### Multiple scenarios → 1 parameterized test

```gherkin
Scenario Outline: Invalid login attempts
  When the user enters <credentials>
  Then login is rejected
```

Becomes:

* One parameterized test with multiple data sets

---

## What should **not** happen ❌

* ❌ Writing BDD scenarios as low-level test steps
* ❌ One BDD scenario per Selenium command
* ❌ Duplicating test cases and scenarios with identical wording

Bad example:

```gherkin
When I click the login button
And I wait 2 seconds
Then I see element #dashboard
```

This is a **test script**, not a BDD scenario.

---

## Practical rule of thumb

| BDD Scenario         | Test Case              |
| -------------------- | ---------------------- |
| Business intent      | Technical verification |
| Stable over time     | Changes often          |
| Owned by team        | Owned by QA/dev        |
| Living documentation | Executable check       |

---

## In real projects (important)

* **BDD scenarios = acceptance criteria**
* **Test cases = implementation**
* Test cases may change without changing scenarios
* Scenarios change only when **business behavior changes**

---

## Short mental model

> **BDD scenarios are the contract.
> Test cases are the enforcement of that contract.**

If you want, I can:

* Show how this works in **Playwright + Cucumber**
* Map **BDD → ATDD → TDD** in one flow
* Show how many scenarios vs tests you actually need in a real product
