Great questions — these are **core API design + testing interview topics**, so I’ll explain them **from a QA / API-testing perspective**, not just theory.

---

## 1️⃣ If not resource-based (`/users/{id}`), what other API styles exist?

### A. **Resource-based REST (most common)**

```
GET    /users/123
POST   /users
PUT    /users/123
DELETE /users/123
```

**Characteristics**

* Nouns, not verbs
* HTTP methods define action
* Stateless

**QA focus**

* Correct HTTP method usage
* Status codes
* Idempotency (`PUT`, `DELETE`)
* Schema validation

---

### B. **Action-based / RPC-style APIs**

```
POST /users/create
POST /users/update
POST /users/deactivate
```

or

```
POST /login
POST /logout
POST /resetPassword
```

**When used**

* Legacy systems
* Authentication
* Complex workflows
* Some internal microservices

**QA focus**

* Payload-driven behavior
* Action-specific validations
* Error handling per action

**Interview note**

> Not “pure REST”, but very common in real systems.

---

### C. **Query-driven APIs**

```
GET /users?email=test@mail.com
GET /transactions?from=2024-01-01&to=2024-01-31
```

**Used for**

* Filtering
* Searching
* Reporting

**QA focus**

* Pagination
* Sorting
* Boundary values
* Performance (large result sets)

---

### D. **GraphQL**

```
POST /graphql
```

Query example:

```graphql
query {
  user(id: "123") {
    name
    orders {
      id
      amount
    }
  }
}
```

**Characteristics**

* Single endpoint
* Client defines response shape

**QA focus**

* Query validation
* Authorization at field level
* N+1 performance issues
* Schema compatibility

---

### E. **gRPC**

```
POST /UserService/GetUser
```

**Characteristics**

* Protobuf
* Binary
* Strongly typed
* High performance

**QA focus**

* Contract testing
* Backward compatibility
* Proto versioning

---

### F. **Event-driven / Async APIs**

```
OrderCreated event
UserUpdated event
```

via:

* Kafka
* RabbitMQ
* SNS/SQS

**QA focus**

* Message schema
* Idempotency
* Event ordering
* Consumer lag

---

## 2️⃣ API Versioning — how it’s usually treated

This is **very important in interviews**.

---

## Versioning Options (from most → least common)

### 1️⃣ **URI Versioning (most common)**

```
/api/v1/users
/api/v2/users
```

✅ Simple
✅ Clear
❌ Breaks REST purity

**QA impact**

* Separate test suites per version
* Regression tests for old versions
* Contract tests between versions

---

### 2️⃣ **Header-based Versioning**

```
GET /users
Accept: application/vnd.company.v2+json
```

or

```
X-API-Version: 2
```

✅ Cleaner URLs
❌ Harder to debug
❌ Often forgotten by clients

**QA impact**

* Header validation
* Backward compatibility testing

---

### 3️⃣ **Query Parameter Versioning**

```
/users?version=2
```

⚠️ Rare in production
⚠️ Easy to misuse

**QA impact**

* Mostly legacy support
* Usually phased out

---

### 4️⃣ **Content Negotiation**

```
Accept: application/json;version=2
```

Advanced, uncommon.

---

## 3️⃣ What is considered **GOOD versioning practice**

### ✔ When to version

Version **only when breaking changes occur**:

* Field removed/renamed
* Behavior changes
* Validation rules change
* Data types change

❌ Don’t version for:

* Adding optional fields
* Adding new endpoints

---

### ✔ Backward compatibility rules

* Older versions **must continue working**
* New fields should be **optional**
* Defaults should be safe

---

### ✔ Deprecation strategy

Typical flow:

```
v1 → deprecated → read-only → removed
```

**QA checks**

* Deprecation headers
* Warning messages
* Documentation consistency

---

## 4️⃣ How testers usually test API versioning

### 🔹 Contract testing

* Schema per version
* Ensure v1 clients don’t break when v2 is released

### 🔹 Regression tests

* Same scenario across versions
* Different expected responses

### 🔹 Negative testing

* Invalid version
* Unsupported version
* Missing version

### 🔹 Monitoring in prod

* Which version clients are using
* Error rates per version

---

## 5️⃣ Interview-ready summary (you can say this)

> “Most APIs are resource-based REST, but in real systems we also see action-based, GraphQL, gRPC, and event-driven APIs.
> For versioning, URI versioning (`/v1`, `/v2`) is the most common. Versioning should only be introduced for breaking changes, and older versions must remain backward compatible. From a QA perspective, we focus on contract testing, regression across versions, and deprecation handling.”

---

If you want, next we can:

* Compare **REST vs RPC vs GraphQL from testing POV**
* Go deep into **breaking vs non-breaking changes**
* Show **Playwright / RestAssured examples for versioned APIs**

Just tell me 👍
