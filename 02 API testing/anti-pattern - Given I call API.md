Yes—I avoid “Given I call API …” because it’s usually an **implementation-detail step** that makes tests verbose, brittle, and hard to read. In API testing (and BDD), the scenario should describe **intent and observable behavior**, not the mechanics of calling HTTP.

## Why “Given I call API …” is an anti-pattern
1. **Leaks implementation details**
   - “Call API” says *how*, not *what* or *why*.
2. **Encourages low-value steps**
   - You end up with steps like “Given I call GET /users” + “Then status is 200” everywhere.
3. **Creates duplication**
   - Every scenario repeats request-building boilerplate rather than reusing helpers/fixtures.
4. **Weak assertions**
   - Tests gravitate toward “status is 200” instead of verifying the contract and business rules.

## What I do instead (good patterns)

### 1) Make steps about business intent/outcomes
Bad:
- Given I call POST `/orders`
- Then I get 201

Better:
- Given an order request for a valid customer
- When the order is submitted
- Then the order is created and is retrievable
- And the order total equals the sum of line items

The “When” can still *perform* the API call, but it shouldn’t be phrased as “call API”; it should be phrased as the **user/system action**.

### 2) Hide HTTP mechanics behind a typed client
In Playwright TypeScript, wrap `APIRequestContext` in a small API client so tests read cleanly:

```ts
// api/ordersClient.ts
import { APIRequestContext, expect } from '@playwright/test';

export class OrdersClient {
  constructor(private request: APIRequestContext) {}

  async createOrder(payload: any) {
    const res = await this.request.post('/orders', { data: payload });
    expect(res.ok()).toBeTruthy();
    return { res, body: await res.json() };
  }

  async getOrder(id: string) {
    const res = await this.request.get(`/orders/${id}`);
    return { res, body: await res.json() };
  }
}
```

Test focuses on behavior:

```ts
import { test, expect } from '@playwright/test';
import { OrdersClient } from '../api/ordersClient';

test('creates an order and returns correct totals', async ({ request }) => {
  const orders = new OrdersClient(request);

  const payload = { /* ... */ };

  const { body: created } = await orders.createOrder(payload);
  const { body: fetched } = await orders.getOrder(created.id);

  expect(fetched.total).toBe(123.45);
  expect(fetched.items).toHaveLength(2);
});
```

### 3) Prefer assertions on contract + business rules
Instead of asserting only status codes, assert:
- required fields exist, types match
- domain invariants (totals, statuses, transitions)
- error shapes for invalid input (400 + error codes/messages)
- idempotency / uniqueness rules, etc.

### 4) Use fixtures to set up preconditions (not step spam)
Preconditions like “an authenticated user” belong in fixtures/setup, not repeated steps:
- `test.use({ storageState })` for auth
- helper `createCustomer()` for data setup
- `beforeEach` for common prerequisites

## When “Given I call API …” is acceptable
- Very low-level HTTP client tests (rare)
- Exploratory “smoke” tests where you truly only care the endpoint responds (still I’d name it “When the service is pinged/healthchecked”)

If you show me a sample of your current scenarios/steps, I can rewrite them into intent-based steps and a small Playwright API client structure.