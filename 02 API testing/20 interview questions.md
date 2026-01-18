Great choice of role, Alex — this maps **very closely** to what you’ve been doing (API, Playwright, CI, performance, Grafana). I’ll structure this like a **real Virgin Australia–style interview** and use **practical examples** so you can honestly self-assess where you’re strong vs where to sharpen.

Below are **20 high-probability interview questions with strong sample answers**.
After each answer, I’ll add a **“Self-check”** so you can quickly see if you’re interview-ready or need practice.

---

## API Automation (Core)

### 1. How do you design a scalable API automation framework?

**Answer:**
I design API frameworks in layers:

* **Client layer** – handles HTTP calls (RestAssured or Playwright request)
* **Data builders** – request payload builders (POJOs or factories)
* **Assertions layer** – reusable response validation
* **Test layer** – business scenarios
* **Config layer** – env, auth, secrets

Example (Playwright API):

```ts
export class BookingClient {
  constructor(private request: APIRequestContext) {}

  async createBooking(payload: BookingRequest) {
    return this.request.post('/bookings', { data: payload });
  }
}
```

This ensures low duplication and easy maintenance.

**Self-check:**
✔ Can you explain *why* layering matters?
✔ Can you draw this on a whiteboard?

---

### 2. Rest Assured vs Playwright for API automation – when do you use each?

**Answer:**

* **Rest Assured (Java)**: Strong typing, mature ecosystem, ideal for large backend-heavy systems.
* **Playwright API (TypeScript)**: Faster dev feedback, shared tooling with UI tests, better for full-stack teams.

Example:

```java
given()
  .auth().oauth2(token)
  .body(request)
.when()
  .post("/booking")
.then()
  .statusCode(201);
```

**Self-check:**
✔ Can you justify a choice based on team skillset?

---

### 3. How do you handle authentication in API tests?

**Answer:**
I abstract auth into a reusable utility:

* OAuth2 → token service
* Cache token per test run
* Refresh on expiry

```ts
export async function getToken(request) {
  const res = await request.post('/oauth/token', { data: creds });
  return res.json().access_token;
}
```

**Self-check:**
✔ Do you understand token lifecycle & expiry?

---

### 4. How do you convert Postman collections into automated tests?

**Answer:**

* Export Postman collection
* Identify reusable requests
* Convert environment variables → config
* Convert tests → assertions

Example:

```ts
expect(response.status()).toBe(200);
expect(body.bookingId).toBeDefined();
```

**Self-check:**
✔ Have you done this end-to-end before?

---

### 5. How do you structure API test data?

**Answer:**
I avoid static JSON and use **builders**:

```ts
BookingBuilder.valid()
  .withPassenger("Alex")
  .withFlight("SYD-MEL")
  .build();
```

This makes tests readable and flexible.

**Self-check:**
✔ Are your tests readable without comments?

---

## BDD & Cucumber

### 6. When is BDD actually useful?

**Answer:**
BDD works when:

* Business rules are complex
* Non-technical stakeholders review scenarios

Bad use: low-level CRUD APIs.

Good example:

```gherkin
Scenario: Passenger books a flight
  Given a valid passenger
  When a booking is created
  Then the booking is confirmed
```

**Self-check:**
✔ Do you avoid “Given I call API” anti-patterns?

---

### 7. How do you prevent Cucumber step duplication?

**Answer:**

* Use **domain language**, not technical steps
* Reuse step definitions
* Keep assertions in hooks or helper classes

**Self-check:**
✔ Do you refactor steps regularly?
<div style="border:1px solid #0080ffff; border-left:6px solid #0080ffff; border-radius:4px; padding:8px 12px;">
  <b>Answer:</b> Yes, whenever duplication starts to appear (same step intent implemented multiple times, or steps differing only by small details)..
</div>

---

## WireMock & Service Virtualization

### 8. Why do we use WireMock?

**Answer:**

* Isolate dependencies
* Test error scenarios
* Improve stability in CI

Example:

```json
{
  "request": { "url": "/payment", "method": "POST" },
  "response": { "status": 500 }
}
```

**Self-check:**
✔ Can you explain *when not* to mock?

---

### 9. How do you test retries and timeouts?

**Answer:**

* Stub delayed responses
* Assert retry count
* Validate fallback logic

**Self-check:**
✔ Have you tested failure paths explicitly?

---

## Test Coverage & Strategy

### 10. Difference between smoke, regression, integration API tests?

**Answer:**

* **Smoke**: critical endpoints only
* **Regression**: full functional coverage
* **Integration**: service-to-service contracts

**Self-check:**
✔ Can you map tests to CI stages?

---

### 11. How do you handle flaky API tests?

**Answer:**

* Fix data coupling
* Remove sleeps
* Mock unstable dependencies
* Retry only idempotent requests

**Self-check:**
✔ Do you treat flakiness as a bug?

---

## Performance Testing (K6 & JMeter)

### 12. Why K6 over JMeter?

**Answer:**

* Code-based
* Git-friendly
* Easier CI integration

```js
export default function () {
  http.get(`${BASE_URL}/booking`);
}
```

**Self-check:**
✔ Can you read & write K6 scripts confidently?

---

### 13. How do you define performance thresholds?

**Answer:**

* p95 latency
* Error rate
* Throughput
* Business SLAs

```js
thresholds: {
  http_req_duration: ['p95<500']
}
```

**Self-check:**
✔ Do you understand percentiles?

---

### 14. How do you analyze performance results?

**Answer:**

* Compare baseline vs current
* Identify saturation points
* Correlate CPU/memory in Grafana

**Self-check:**
✔ Can you explain a performance regression clearly?

---

### 15. How do you integrate K6 results into Grafana?

**Answer:**

* K6 → InfluxDB / Prometheus
* Grafana dashboards
* CI artifacts

**Self-check:**
✔ Have you built dashboards yourself?

---

## CI/CD & Engineering Practices

### 16. How do you run API tests in CI?

**Answer:**

* Parallel execution
* Environment-specific config
* Test tagging

```bash
npx playwright test --grep @smoke
```

**Self-check:**
✔ Can you debug CI-only failures?

---

### 17. How do you version test frameworks?

**Answer:**

* Semantic versioning
* Breaking changes documented
* Shared libraries

**Self-check:**
✔ Do you treat test code as production code?

---

### 18. How do you report API test results?

**Answer:**

* CI reports (HTML / JUnit)
* Slack notifications
* Trend analysis

**Self-check:**
✔ Can stakeholders understand your reports?

---

## Real-World Scenarios

### 19. An API returns 200 but business logic is broken. How do you catch it?

**Answer:**
Validate **business rules**, not status codes:

```ts
expect(body.bookingStatus).toBe("CONFIRMED");
```

**Self-check:**
✔ Do your tests catch silent failures?

---

### 20. What would you improve in an existing API test suite?

**Answer:**

* Remove duplication
* Improve data builders
* Add contract tests
* Reduce flakiness
* Improve performance visibility

**Self-check:**
✔ Can you critique a test suite constructively?

---

## Next Step (Highly Recommended)

If you want, next we can:

1. **Do a mock Virgin Australia interview (live Q&A)**
2. **Create a 2-minute “tell me about your API automation experience” answer**
3. **Gap-analysis: Rest Assured vs your Playwright strength**
4. **Hands-on exercise**: build a mini API + K6 test together


