Below is a **clear, QA-interview-ready explanation of how contract testing is done with WireMock**, including **consumer-driven flow, concrete examples, and where it fits vs Pact**.

---

## What “contract testing with WireMock” means

With WireMock, **contract testing = validating that requests and responses conform to an agreed HTTP contract** by:

* **Consumer** defining expectations (request → response)
* **Provider** validating against those expectations

WireMock is usually used on the **consumer side** and sometimes on the **provider side for verification**.

---

## Typical Contract Testing Flow (Consumer-Driven)

```
Consumer tests
   ↓
WireMock stubs = CONTRACT
   ↓
Consumer app validated
   ↓
Provider validates against same stubs
```

---

## Step 1: Define the Contract as WireMock Stubs

The **stub itself is the contract**.

### Example Contract: `GET /users/{id}`

```json
{
  "request": {
    "method": "GET",
    "urlPathPattern": "/users/[0-9]+",
    "headers": {
      "Accept": { "equalTo": "application/json" }
    }
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "jsonBody": {
      "id": 123,
      "name": "Alex",
      "email": "alex@test.com"
    }
  }
}
```

📌 This defines:

* Required endpoint
* Required headers
* Response shape

This **is the contract**.

---

## Step 2: Consumer Tests Against WireMock

The consumer application:

* Points to WireMock instead of real provider
* Runs integration tests

### Consumer test validates:

✔ Endpoint exists
✔ Request format is correct
✔ Response fields are present and usable

If consumer code changes request shape → **test fails**

---

## Step 3: Provider Verifies the Contract

On the provider side:

### Option A: Run provider tests against WireMock stubs

* Load consumer stubs
* Call real provider implementation
* Verify responses match the contract

#### Example (Java-ish logic)

```java
// Provider test
call GET /users/123
assert status == 200
assert response.body.name exists
assert response.body.email exists
```

If provider:

* Removes field
* Changes status code
* Changes endpoint

➡ Contract breaks

---

## Request Matching = Contract Enforcement

WireMock lets you define **strict or flexible contracts**.

### Strict (dangerous if overused)

```json
"equalToJson": "{ \"id\": 123, \"name\": \"Alex\" }"
```

❌ Breaks if new optional field is added

---

### Flexible (recommended)

```json
"matchesJsonPath": "$.id"
```

```json
"matchesJsonPath": "$.email"
```

✔ Allows backward-compatible evolution

---

## Schema-Based Contract Testing (Best Practice)

Instead of static bodies → validate **JSON Schema**.

### Response schema

```json
{
  "request": {
    "method": "GET",
    "url": "/users/123"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "required": ["id", "name", "email"],
      "properties": {
        "id": { "type": "number" },
        "name": { "type": "string" },
        "email": { "type": "string" }
      }
    }
  }
}
```

📌 Contract = **shape, not exact values**

---

## Recording Contracts from Real Traffic

WireMock can **record real provider responses**:

```
WireMock → record → mappings
```

This is useful when:

* Contract already exists
* Legacy APIs
* No documentation

Then:

* Clean up stubs
* Replace literals with schemas

---

## Negative Contract Testing

### Example: Auth required

```json
{
  "request": {
    "method": "GET",
    "url": "/users/123",
    "headers": {
      "Authorization": { "absent": true }
    }
  },
  "response": {
    "status": 401
  }
}
```

✔ Contract includes failure cases

---

## CI Integration Pattern (Common in Enterprises)

### Consumer pipeline

* Run tests with WireMock
* Publish stubs as artifacts

### Provider pipeline

* Pull stubs
* Validate implementation

```
Consumer CI → contract.json
             ↓
Provider CI → verify
```

---

## WireMock vs Pact (Important Interview Angle)

| Aspect          | WireMock        | Pact                       |
| --------------- | --------------- | -------------------------- |
| Learning curve  | Low             | Medium                     |
| Tooling         | Generic         | Opinionated                |
| Contract format | JSON stubs      | Pact spec                  |
| Consumer-driven | Manual          | Built-in                   |
| Best for        | QA-driven teams | Strong contract governance |

📌 **Many teams use both**:

* WireMock for mocking & edge cases
* Pact for formal CDC contracts

---

## How to Explain in an Interview (Short Answer)

> “With WireMock, contract testing is done by defining request/response stubs that represent the agreed API contract. Consumer tests run against these stubs, and the same stubs are used by the provider to verify their implementation. Matching rules and schemas ensure flexibility while preventing breaking changes.”

---

## Common Anti-Patterns (Good to Mention)

❌ Over-strict `equalToJson`
❌ Using WireMock as a fake backend forever
❌ Not sharing stubs with provider teams
❌ Ignoring negative scenarios

---

To arrange contract testing with WireMock, you need to bridge the gap between your **Consumer** (which uses the stub) and your **Provider** (which implements the real API).

Since WireMock itself doesn't "know" if your stub matches the real backend, you use one of these three industry-standard patterns:

---

### 1. Consumer-Driven (WireMock + Pact)

This is the most popular way to turn WireMock stubs into "legal" contracts.

* **The Flow:** Your consumer runs a test against WireMock. An extension (like `wiremock-pact`) records that interaction and exports it as a **Pact JSON file**.
* **The Check:** You send that Pact file to the Provider team. They run it against their real code. If their code produces a different response than what’s in the file, the build fails.

### 2. Specification-Driven (WireMock + OpenAPI)

If you have a "Source of Truth" like a Swagger/OpenAPI file, you can force WireMock to validate its stubs against it.

* **The Tool:** Use the [WireMock OpenAPI Validator](https://github.com/tidusjar/Wiremock.OpenAPIValidator).
* **How it works:** In your CI/CD pipeline, this tool scans your `mappings/` folder. It compares your `jsonBody` and `request` patterns against your `openapi.yaml`.
* **Example:** If your OpenAPI says `id` is an `integer` but your WireMock stub sends `"id": "abc"`, the validator will flag it as a contract violation before you ever deploy.

### 3. Spring Cloud Contract (The "Stub Runner" Pattern)

If you are in a Java/Spring environment, this is the native "heavy-duty" approach.

* **The Flow:** The **Provider** writes the contract (Groovy/YAML). Spring Cloud Contract then automatically generates:
1. A **test** for the Provider (to ensure they follow the contract).
2. A **WireMock stub** for the Consumer (to ensure they have a reliable mock).


* **Benefit:** The stub and the real code are mathematically linked; you can't change one without the other breaking.

---

### Comparison: Which should you choose?

| Feature | WireMock + Pact | WireMock + OpenAPI | Spring Cloud Contract |
| --- | --- | --- | --- |
| **Best For** | Multi-language teams | Teams with existing Swagger docs | Pure Java/Spring teams |
| **Effort** | Medium (Setup Broker) | Low (Just a CLI check) | High (Initial setup) |
| **Ownership** | Consumer defines needs | Shared "Doc" defines reality | Provider defines capability |

### Your Next Step

To get started without adding too much complexity:
**Would you like me to show you how to set up the OpenAPI Validator to check if your `{id}` stub matches an existing Swagger file?**