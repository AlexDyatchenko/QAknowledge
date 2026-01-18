To help you prepare for your interview with Virgin Australia, I have compiled 20 technical questions focusing on Playwright with TypeScript, API automation patterns, and the specific responsibilities mentioned in the job description (like data builders and service virtualization).

### **Playwright (TypeScript) API Automation Interview Questions**

#### **1. How do you send a POST request in Playwright and validate the response body?**

**Answer:** You use the `request` object from Playwright test.

```typescript
import { test, expect } from '@playwright/test';

test('create booking', async ({ request }) => {
  const response = await request.post('/booking', {
    data: { firstname: 'Alex', lastname: 'Smith' }
  });
  const body = await response.json();
  expect(response.status()).toBe(200);
  expect(body).toMatchObject({ firstname: 'Alex' });
});

```

#### **2. How do you implement a "Data Builder" pattern in TypeScript for API tests?**

**Answer:** This avoids hardcoding JSON. You create a class or function that returns a dynamic object.

```typescript
export const bookingBuilder = (overrides = {}) => ({
  firstname: "Jim",
  totalprice: 100,
  depositpaid: true,
  ...overrides
});

// Usage
const myData = bookingBuilder({ firstname: "Alex" });

```

#### **3. How do you handle Authentication (e.g., Bearer Tokens) globally in Playwright?**

**Answer:** Use `extraHTTPHeaders` in the `playwright.config.ts` or a `beforeAll` hook to set the header for the `request` context.

```typescript
// playwright.config.ts
use: {
  extraHTTPHeaders: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
  }
}

```

#### **4. How do you convert a Postman Collection to Playwright?**

**Answer:** Postman uses a proprietary JSON schema. Conversion involves:

1. Extracting the URL, Method, and Headers.
2. Converting Postman "Pre-request scripts" to Playwright `beforeEach` hooks.
3. Converting `pm.expect` assertions to Playwright `expect()`.

#### **5. How would you handle an API that returns a large JSON array where you need to find a specific object?**

**Answer:** Use the native `.find()` or `.filter()` methods in TypeScript.

```typescript
const bookings = await response.json();
const specific = bookings.find(b => b.bookingid === 123);
expect(specific).toBeDefined();

```

#### **6. Explain how to use `test.step` for better reporting in API Automation.**

**Answer:** It groups actions in the HTML report, which is vital for complex integration tests.

```typescript
await test.step('Create User', async () => { /* ... */ });
await test.step('Verify User exists', async () => { /* ... */ });

```

#### **7. What is the difference between `request.post` and `page.request.post`?**

**Answer:** `page.request` inherits context state (like cookies/storage) from the browser page, making it ideal for testing APIs after a UI login. `request` is a standalone API context.

#### **8. How do you validate a JSON Schema in Playwright?**

**Answer:** Use a library like `ajv`.

```typescript
import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(require('./schema.json'));
const valid = validate(await response.json());
expect(valid).toBe(true);

```

#### **9. How do you handle "Flaky" APIs that might need a retry?**

**Answer:** You can configure retries in the config file, or use a custom loop with a timeout for a specific status code (polling).

#### **10. How do you use WireMock for service virtualization in a Playwright test?**

**Answer:** You point your Playwright `baseURL` to the WireMock server (e.g., `localhost:8080`) and use the WireMock API to "stub" a response before sending your Playwright request.

#### **11. How do you handle multipart/form-data (file uploads) via API in Playwright?**

**Answer:**

```typescript
await request.post('/upload', {
  multipart: {
    fileField: fs.createReadStream('path/to/file.pdf'),
  }
});

```

#### **12. How do you ensure your TypeScript interfaces match your API response?**

**Answer:** Define an `interface` and cast the JSON response.

```typescript
interface User { id: number; name: string; }
const user = await response.json() as User;

```

#### **13. What is a "Custom Assertion Library" in this context?**

**Answer:** It’s a wrapper to make tests more readable.

```typescript
// Custom utility
export async function expectStatusOk(response) {
  expect(response.status(), `Failed with ${await response.text()}`).toBe(200);
}

```

#### **14. How do you implement BDD (Cucumber) with Playwright API tests?**

**Answer:** You define `Given/When/Then` steps in `.feature` files and use `@playwright/test` inside the step definitions to execute `request.get()`.

#### **15. How do you extract a value from Response A to use in Request B?**

**Answer:**

```typescript
const loginRes = await request.post('/login', { data: creds });
const token = (await loginRes.json()).token;
const dataRes = await request.get('/data', { headers: { Authorization: token } });

```

#### **16. How do you log API request/response details only when a test fails?**

**Answer:** Use a custom fixture or `test.afterEach` that checks the test status and prints the response body if `status === 'failed'`.

#### **17. How do you perform "Negative Testing" on an API?**

**Answer:** Send invalid payloads (wrong types, missing required fields) and assert that the API returns a `400 Bad Request` or `422 Unprocessable Entity`.

#### **18. Why use TypeScript instead of JavaScript for API automation?**

**Answer:** Autocompletion for response objects, catching type errors during development (e.g., passing a string where a number is expected), and better maintainability of large frameworks.

#### **19. How do you measure API response time in Playwright?**

**Answer:** Use `performance.now()` before and after the request, or use the timing information if integrated with a performance tool. (Note: Playwright is primarily for functional testing; K6 is better for precise timing).

#### **20. How do you handle environment-specific URLs (Dev, Test, UAT)?**

**Answer:** Use environment variables (`process.env.BASE_URL`) and a `.env` file, then pass them into the `baseURL` in `playwright.config.ts`.

---

### **Advice for the Virgin Australia Interview**

* **Performance Focus:** Since they mentioned **K6** and **Grafana**, be prepared to explain how an API automation script differs from a load testing script (e.g., load tests focus on concurrency and throughput).
* **Virgin-Specific Logic:** Think about API scenarios for an airline: Searching for flights (GET), Booking a seat (POST), and Updating frequent flyer details (PATCH).
* **Clean Code:** They asked for "reusable utilities." Emphasize your ability to write DRY (Don't Repeat Yourself) code using TypeScript classes and helper functions.

Good luck! You've got this.