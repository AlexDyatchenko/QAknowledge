You are **confused for the right reason** 🙂 — because many teams mix **3 different things** and call them all “BDD”.
Let’s untangle this **cleanly**, end-to-end, with **one concrete Jira story** and **best-practice structure**.

I’ll show:

1. **User Story (product level)**
2. **BDD Scenarios (acceptance criteria – business level)**
3. **QA test cases / automation (technical level)**
4. **What lives in Jira vs Git**
5. **What NOT to add (the common trap)**

---

# 1️⃣ Jira User Story (Product owns this)

**Jira Story**

> **Title:** User can log in to access their dashboard
>
> **User Story:**
> *As a user*
> *I want to log in*
> *So that I can access my dashboard*

That’s it.
No buttons. No fields. No passwords.

---

# 2️⃣ BDD Scenarios = Acceptance Criteria (inside the same Jira story)

👉 These **ARE BDD**
👉 These are **NOT test scripts**
👉 These are the **definition of “done”**

### Acceptance Criteria (BDD)

```gherkin
Feature: User authentication

  Scenario: Successful login
    Given the user has a registered account
    And the user is on the login page
    When the user submits valid credentials
    Then the user is authenticated
    And the user gains access to their dashboard

  Scenario: Login with invalid credentials
    Given the user is on the login page
    When the user submits invalid credentials
    Then access is denied
    And the user is informed that the credentials are invalid

  Scenario: Login attempt by a blocked user
    Given the user account is blocked
    When the user submits valid credentials
    Then access is denied
    And the user is informed that the account is blocked
```

### Why this is **correct BDD**

✅ Business language
✅ No UI mechanics
✅ No test data
✅ No assertions about HTML
✅ Stable if UI changes
✅ Product + QA + Dev all agree on behavior

---

# 3️⃣ What QA does next (NOT in Jira story body)

Now QA **implements** these scenarios as tests.

### Example mapping

| BDD Scenario        | Test Type     |
| ------------------- | ------------- |
| Successful login    | UI E2E test   |
| Invalid credentials | API + UI test |
| Blocked user        | API test      |

---

## Example: UI Automation (Playwright)

```ts
test('Successful login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', user.email);
  await page.fill('#password', user.password);
  await page.click('[data-testid=login]');

  await expect(page).toHaveURL('/dashboard');
});
```

This **DOES NOT go into Jira**.
This lives in **Git**, owned by QA/Dev.

---

# 4️⃣ Where do “QA-style detailed scenarios” belong?

❌ **Not in BDD acceptance criteria**
❌ **Not mixed with business scenarios**

If QA wants **manual test cases**, they go to:

* TestRail / Xray / Zephyr
* Or automation only (preferred)

### Example QA Test Case (separate tool)

```
Test Case: Login with valid credentials

1. Open /login
2. Enter valid email
3. Enter valid password
4. Click Login
5. Verify dashboard loads
```

⚠️ This is **not BDD**
⚠️ This is a **test case**

---

# 5️⃣ What NOT to do (common anti-pattern)

❌ **This is WRONG to put in Jira acceptance criteria**

```gherkin
Scenario: Successful login
  When I enter "test@email.com"
  And I enter "password123"
  And I click the login button
  Then I should see the dashboard
```

Why ❌:

* Couples story to UI
* Leaks test data
* Becomes obsolete quickly
* Product people don’t care
* Breaks BDD purpose

---

# 6️⃣ Best-practice Jira Story layout (visual)

### Jira Story

```
Title: User can log in to access dashboard

Description:
As a user
I want to log in
So that I can access my dashboard

Acceptance Criteria:
[BDD Scenarios ONLY]
- Successful login
- Invalid credentials
- Blocked user
```

### Outside Jira (engineering space)

```
/tests
  /e2e
    login.spec.ts
  /api
    auth.spec.ts
```

---

# 7️⃣ Mental model that removes confusion forever

```
User Story        → WHY
BDD Scenario      → WHAT (behavior)
Test Case         → HOW (verification)
Automation Code   → IMPLEMENTATION
```

Or even simpler:

> **BDD scenarios define behavior.
> Test cases verify behavior.
> Automation executes verification.**

---

# 8️⃣ One rule you can enforce as QA Lead

> ❗ If a step contains **click, type, field, button, selector, data** — it does NOT belong in a BDD scenario.
