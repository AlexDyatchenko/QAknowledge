Below is a **clear, practical explanation of REST vs RESTful APIs**, followed by **real Playwright API-testing examples** you can use in automation (very relevant for a QA / Automation Lead role).

---

## 1. What is REST?

**REST (Representational State Transfer)** is an **architectural style** for designing networked applications.

It defines **principles**, not a protocol.

### Core REST principles

1. **Client–Server separation**
2. **Stateless** – each request contains all required info
3. **Resource-based** – everything is a resource (`/users`, `/orders/123`)
4. **Uniform interface**
5. **Cacheable responses**
6. **Layered system**

REST usually uses **HTTP**, but REST itself is **not HTTP-specific**.

---

## 2. What is a RESTful API?

A **RESTful API** is an API that **correctly follows REST principles**.

> 👉 REST = theory
> 👉 RESTful = proper implementation of REST

### RESTful characteristics (practical checklist)

| Aspect          | RESTful                       |
| --------------- | ----------------------------- |
| Resource naming | Nouns (`/users`, `/orders`)   |
| HTTP methods    | GET, POST, PUT, PATCH, DELETE |
| Status codes    | 200, 201, 400, 401, 404, 500  |
| Stateless       | Yes                           |
| JSON            | Common (not mandatory)        |
| URL semantics   | Meaningful                    |

---

## 3. REST vs “Not really RESTful” (example)

### ❌ Not RESTful

```http
POST /getUserDetails
POST /createNewUser
POST /deleteUser?id=5
```

### ✅ RESTful

```http
GET    /users/5
POST   /users
DELETE /users/5
```

---

## 4. Typical RESTful API Example

### Resource: Users

| Operation      | HTTP   | Endpoint    |
| -------------- | ------ | ----------- |
| Get all users  | GET    | /users      |
| Get user       | GET    | /users/{id} |
| Create user    | POST   | /users      |
| Update user    | PUT    | /users/{id} |
| Partial update | PATCH  | /users/{id} |
| Delete user    | DELETE | /users/{id} |

---

## 5. REST API testing in **Playwright**

Playwright is **not only UI** – it has a **built-in API testing client**.

### Setup

```ts
import { test, expect } from '@playwright/test';
```

---

## 6. Example: GET request (RESTful)

```ts
test('GET user by id', async ({ request }) => {
  const response = await request.get('/users/1');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.name).toBeDefined();
});
```

✔ Uses **GET**
✔ Resource-based endpoint
✔ Stateless

---

## 7. Example: POST request (Create resource)

```ts
test('Create new user', async ({ request }) => {
  const response = await request.post('/users', {
    data: {
      name: 'Alex',
      email: 'alex@test.com'
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.id).toBeDefined();
});
```

✔ Correct **POST**
✔ Returns **201 Created**

---

## 8. Example: PUT vs PATCH

### PUT – full update

```ts
await request.put('/users/1', {
  data: {
    name: 'Alex Updated',
    email: 'alex.updated@test.com'
  }
});
```

### PATCH – partial update

```ts
await request.patch('/users/1', {
  data: {
    name: 'Alex Patched'
  }
});
```

---

## 9. Example: DELETE

```ts
test('Delete user', async ({ request }) => {
  const response = await request.delete('/users/1');

  expect(response.status()).toBe(204);
});
```

✔ No response body
✔ Proper **204 No Content**

---

## 10. API Context & Base URL (Best Practice)

### `playwright.config.ts`

```ts
use: {
  baseURL: 'https://api.example.com',
  extraHTTPHeaders: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  }
}
```

Then:

```ts
await request.get('/users');
```

---

## 11. API + UI combo (very common in real projects)

```ts
test('Create user via API and verify in UI', async ({ request, page }) => {
  const apiResponse = await request.post('/users', {
    data: { name: 'Alex' }
  });

  const user = await apiResponse.json();

  await page.goto(`/users/${user.id}`);
  await expect(page.locator('h1')).toHaveText('Alex');
});
```

---

## 12. Common REST API checks (Interview gold ⭐)

* Status code correctness
* Response schema validation
* Idempotency (PUT, DELETE)
* Authentication / Authorization
* Error handling (400 vs 401 vs 403)
* Pagination, filtering, sorting
* Rate limits

---

## 13. When an API is NOT RESTful (but still common)

* GraphQL
* gRPC
* SOAP
* RPC-style HTTP APIs

> RESTful APIs are **resource-oriented**, not **action-oriented**.

---

## 14. One-sentence summary (interview-ready)

> **REST** is an architectural style, while a **RESTful API** is an API that correctly implements REST principles using resource-based URLs, proper HTTP methods, stateless communication, and meaningful status codes.

---

If you want, I can:

* 🔹 Show **API schema validation** in Playwright
* 🔹 Compare **REST vs GraphQL vs gRPC (QA perspective)**
* 🔹 Provide **real interview questions & answers** on REST APIs
* 🔹 Build a **Playwright API test framework structure**

Just say the word.
