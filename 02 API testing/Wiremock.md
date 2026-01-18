Here’s a **quick, practical overview of WireMock**, with **typical use-cases and concrete examples**—focused on how QA / automation engineers actually use it.

---

## What is WireMock (in one sentence)

**WireMock is an HTTP mock server** used to **simulate external APIs/services** so you can test your application **without depending on real downstream systems**.

---

## Typical Applications (Real-World QA Use Cases)

### 1️⃣ Isolating external dependencies

When your app depends on:

* Payment gateway
* Auth provider
* 3rd-party API
* Legacy system

👉 You mock it so tests are **stable, fast, and deterministic**

**Example:**
Your backend calls `/payments/authorize` → WireMock returns predefined responses.

---

### 2️⃣ Contract / Integration testing

* Validate **request shape**
* Control **response structure**
* Simulate **edge cases** not easy in real systems

---

### 3️⃣ Negative & edge-case testing

Simulate:

* 500 errors
* Timeouts
* Slow responses
* Invalid payloads
* Auth failures

---

### 4️⃣ Local development & CI pipelines

* Run app locally without real APIs
* Run tests in CI without environment dependencies

---

### 5️⃣ Performance & resilience testing (lightweight)

* Inject delays
* Random failures
* Throttling responses

---

## How WireMock Works (Conceptually)

```
Your App  →  WireMock  →  (Real service NOT called)
               ↓
         Stubbed response
```

You define **stubs**:

* Request matcher
* Response definition

---

## Basic WireMock Stub (JSON)

### Simple GET mock

```json
{
  "request": {
    "method": "GET",
    "url": "/api/users/123"
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": "{\"id\":123,\"name\":\"Alex\"}"
  }
}
```

📌 When app calls `GET /api/users/123` → returns fixed JSON

---

## Matching Request Details

### Match query params

```json
{
  "request": {
    "method": "GET",
    "urlPath": "/api/users",
    "queryParameters": {
      "role": { "equalTo": "admin" }
    }
  },
  "response": {
    "status": 200,
    "body": "[{\"id\":1,\"role\":\"admin\"}]"
  }
}
```

---

### Match headers (Auth testing)

```json
{
  "request": {
    "method": "GET",
    "url": "/secure/data",
    "headers": {
      "Authorization": {
        "matches": "Bearer .*"
      }
    }
  },
  "response": {
    "status": 200,
    "body": "{\"secure\":true}"
  }
}
```

---

## POST with Body Matching

### Exact JSON match

```json
{
  "request": {
    "method": "POST",
    "url": "/login",
    "bodyPatterns": [
      { "equalToJson": "{\"username\":\"admin\",\"password\":\"pass\"}" }
    ]
  },
  "response": {
    "status": 200,
    "body": "{\"token\":\"abc123\"}"
  }
}
```

---

### Partial / flexible body match (recommended)

```json
{
  "request": {
    "method": "POST",
    "url": "/orders",
    "bodyPatterns": [
      { "matchesJsonPath": "$.orderId" }
    ]
  },
  "response": {
    "status": 201
  }
}
```

---

## Error & Edge-Case Simulation

### Simulate 500 error

```json
{
  "request": {
    "method": "GET",
    "url": "/api/payments"
  },
  "response": {
    "status": 500,
    "body": "Internal Server Error"
  }
}
```

---

### Simulate slow service (timeout testing)

```json
{
  "request": {
    "method": "GET",
    "url": "/slow-api"
  },
  "response": {
    "status": 200,
    "fixedDelayMilliseconds": 5000,
    "body": "Delayed response"
  }
}
```

---

## Stateful Scenarios (Advanced but Common in QA)

### Example: Login → Fetch profile

```json
{
  "scenario": "User session",
  "request": {
    "method": "POST",
    "url": "/login"
  },
  "response": {
    "status": 200
  },
  "newScenarioState": "LOGGED_IN"
}
```

```json
{
  "scenario": "User session",
  "requiredScenarioState": "LOGGED_IN",
  "request": {
    "method": "GET",
    "url": "/profile"
  },
  "response": {
    "status": 200,
    "body": "{\"name\":\"Alex\"}"
  }
}
```

📌 Simulates **real user flow**

---

## Typical Folder Structure (Standalone Mode)

```
wiremock/
├── mappings/
│   ├── users-get.json
│   ├── login-post.json
├── __files__/
│   ├── users.json
│   ├── error-response.json
```

---

## When WireMock is a GREAT choice

✔ Microservices
✔ Contract testing
✔ CI stability
✔ Backend testing
✔ Testing retries / fallbacks
✔ QA-driven environments

---

## When it’s NOT ideal

❌ UI mocking (use Playwright mocks instead)
❌ Complex business logic simulation
❌ Full system E2E replacement

---

## Quick Interview-Style Summary (Useful for You)

> “WireMock is used to mock external HTTP services so tests don’t rely on unstable third-party systems. It allows request matching by URL, headers, query params, and body, and supports error simulation, delays, and stateful scenarios.”

---

Can you explain when not to mock?

**Why do we use WireMock?**

WireMock is used to **mock/stub external HTTP dependencies** (third‑party APIs, internal microservices) so your tests stay **fast, reliable, and deterministic**.

### 1) Isolate dependencies
- Your service can be tested without requiring the real payment provider / shipping service / auth server.
- Lets you validate *your* request logic (URL, method, headers, body) and how your app handles responses.

### 2) Test error scenarios
- Real systems don’t reliably produce errors on demand (500s, timeouts, malformed JSON, slow responses).
- With WireMock you can force those responses consistently and verify retries, fallbacks, user messages, etc.

### 3) Improve stability in CI
- CI environments suffer from network flakiness, rate limits, credential issues, and external outages.
- Mocking removes those sources of random failures and makes tests predictable and quicker.

### Example (force a 500)
```json
{
  "request": { "url": "/payment", "method": "POST" },
  "response": { "status": 500 }
}
```

---

## Self-check: When **not** to mock?
Don’t mock when your test goal is to verify the **real integration** and contract with the actual system. Examples:

- **End-to-end / staging smoke tests**: You want to confirm the real payment gateway works with real credentials and network.
- **Contract validation**: If you own both services or have a strict API contract, you should periodically test against the real provider (or use consumer-driven contract tests plus a small set of real calls).
- **Critical production-like behavior**: TLS/certs, auth flows (OAuth), caching headers, redirects, real latency characteristics—mocks can hide issues here.
- **When the dependency is stable and local**: e.g., your own database in a test container—prefer real infrastructure for integration tests.

**Rule of thumb:**  
- Use WireMock for **unit/functional/service tests** to control inputs and error cases.  
- Use real dependencies in a smaller number of **integration/E2E tests** to catch wiring/config/auth/network problems.