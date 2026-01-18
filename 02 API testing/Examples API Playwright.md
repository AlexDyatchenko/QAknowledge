In an interview, the goal isn't just to show that you can write code, but that you understand the **architectural "why"** behind your choices. Playwright is a powerful choice for API testing because it uses a single `APIRequestContext` to handle headers, cookies, and tokens efficiently.

---

## 1. Core Architecture: The Request Fixture

In an interview, explain that Playwright provides a built-in `request` fixture. Unlike UI tests that launch a browser, API tests in Playwright run directly via Node.js, making them incredibly fast.

### Basic GET Example (TypeScript)

```typescript
import { test, expect } from '@playwright/test';

test('Interview Example: Fetch User Profile', async ({ request }) => {
  // 1. Action: The 'request' fixture is pre-configured with context
  const response = await request.get('/api/users/1');

  // 2. Assertions: Status codes and JSON structure
  expect(response.ok()).toBeTruthy(); // 200-299 range
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toMatchObject({
    id: 1,
    name: expect.any(String)
  });
});

```

---

## 2. Authentication vs. Authorization (Interview Perspective)

Interviewers often "trap" candidates by asking how they handle both. You should distinguish them clearly:

* **Authentication (Who you are):** Handling the login process to get a token (JWT, Session Cookie).
* **Authorization (What you can do):** Testing that a "User" role cannot access "Admin" endpoints (403 Forbidden).

### Best Practice: Global Setup for Authentication

Don't log in for every test. Instead, use a **Global Setup** to log in once, save the state, and reuse it across all tests.

**Step 1: Create an `auth.setup.ts**`

```typescript
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ request }) => {
  const response = await request.post('/api/login', {
    data: {
      username: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD
    }
  });
  const { token } = await response.json();
  
  // Save token to an environment variable or a local file
  process.env.API_TOKEN = token;
});

```

**Step 2: Reuse Token in `playwright.config.ts**`

```typescript
use: {
  baseURL: 'https://api.myapp.com',
  extraHTTPHeaders: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Accept': 'application/json',
  },
}

```

---

## 3. Testing Authorization (The "Negative" Path)

A senior-level answer includes **negative testing**. You must prove that an unauthorized request fails.

```typescript
test('Authorization: User should not be able to delete an Admin resource', async ({ request }) => {
  // Overriding the default context headers for this specific test
  const unauthorizedResponse = await request.delete('/api/admin/config', {
    headers: {
      'Authorization': 'Bearer INVALID_TOKEN'
    }
  });

  expect(unauthorizedResponse.status()).toBe(403); // Forbidden
});

```

---

## 4. Interview Best Practices Summary

When asked, "What are your best practices for API automation?" use this checklist:

| Practice | Explanation |
| --- | --- |
| **No Hardcoded Secrets** | Use `.env` files for credentials. Never commit tokens to Git. |
| **Response Schema Validation** | Don't just check `status 200`. Validate the JSON structure using `toMatchObject` or Joi/Zod. |
| **Isolation** | Use `beforeAll` or `setup` to create unique test data so parallel tests don't collide. |
| **Reusability** | Wrap common API calls (e.g., `createProduct`) into a helper class or Page Object Model (POM) for APIs. |
| **Soft Assertions** | Use `expect.soft()` if you want the test to continue even if one check fails (great for large JSONs). |

---

## 5. Typical Interview Question

**Q: "How do you handle flaky API tests in Playwright?"**
**A:** "API tests are rarely flaky due to timing (unlike UI), but they fail due to **test data state**. I handle this by ensuring each test is independent—using a 'Setup-Test-Teardown' pattern where the test creates its own data via an API call in `beforeEach` and deletes it in `afterEach`."

**Would you like me to create a full project structure example with a helper class for these API calls?**