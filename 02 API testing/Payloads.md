You already named the **core OO approaches** (plain objects, builder, factory). Below is a **broader industry-style map** of payload preparation techniques, from very low‑level to very high‑level, with **when/why** each is used. This should help you consciously choose per test layer.

---

## 1️⃣ Inline literals (baseline, usually discouraged)

```ts
const payload = {
  userId: 123,
  role: "ADMIN",
  active: true
};
```

**Use when**

* One‑off spike / PoC
* Debugging a failing test quickly

**Problems**

* Duplication
* Hard to evolve
* No reuse / no validation

---

## 2️⃣ Plain data objects (DTOs / interfaces)

```ts
interface CreateUserPayload {
  userId: number;
  role: string;
  active: boolean;
}

const payload: CreateUserPayload = {
  userId: 123,
  role: "ADMIN",
  active: true
};
```

**Use when**

* You want type safety
* Payload is simple
* No variation logic

**Limit**

* No defaults
* No conditional logic

---

## 3️⃣ Builder pattern ✅ (you mentioned)

```ts
CreateUserPayloadBuilder
  .default()
  .withRole("ADMIN")
  .inactive()
  .build();
```

**Best for**

* Many optional fields
* Readable intent
* Prevent invalid states

**Common in**

* Mature test frameworks
* Contract testing

---

## 4️⃣ Factory pattern ✅ (you mentioned)

```ts
PayloadFactory.createAdminUser();
PayloadFactory.createInactiveUser();
```

**Best for**

* Role‑based / scenario‑based payloads
* Fast reuse

**Risk**

* Factory explosion if not layered properly

---

## 5️⃣ Template + override (very powerful, underused)

```ts
const basePayload = {
  userId: 1,
  role: "USER",
  active: true
};

const payload = {
  ...basePayload,
  role: "ADMIN"
};
```

**Use when**

* You want *cheap* variation
* You want visibility of full payload
* You don’t need builders yet

**This is often better than builders for tests.**

---

## 6️⃣ JSON files as payload templates

```json
// create-user.json
{
  "userId": 1,
  "role": "USER",
  "active": true
}
```

```ts
const payload = loadJson("create-user.json");
payload.role = "ADMIN";
```

**Use when**

* Payload is large
* Non‑developers review payloads
* Contract‑heavy APIs

**Common in**

* Regulated environments
* Legacy APIs

---

## 7️⃣ JSON + placeholder replacement

```json
{
  "userId": "{{userId}}",
  "role": "{{role}}",
  "active": {{active}}
}
```

```ts
buildPayload("create-user.json", {
  userId: 123,
  role: "ADMIN",
  active: true
});
```

**Use when**

* You want *data-driven tests*
* Payload is stable, data changes often

---

## 8️⃣ Data‑driven payloads (table / dataset based)

```ts
const testCases = [
  { role: "ADMIN", active: true },
  { role: "USER", active: false }
];

for (const data of testCases) {
  send({
    ...basePayload,
    ...data
  });
}
```

**Use when**

* Boundary testing
* Matrix testing
* Validation scenarios

---

## 9️⃣ Schema‑driven generation (advanced, powerful)

```ts
import jsf from "json-schema-faker";

const payload = jsf.generate(createUserSchema);
```

**Use when**

* Contract testing
* Property‑based testing
* Fuzz / negative testing

**Huge benefit**

* Finds edge cases humans miss

---

## 🔟 Domain‑language builders (DSL style)

```ts
givenUser()
  .admin()
  .inactive()
  .fromAustralia()
  .build();
```

**Use when**

* Large QA teams
* Business‑readable tests
* Long‑lived test suites

**This is test architecture maturity level 5️⃣**

---

## 1️⃣1️⃣ API‑coupled payload generators

Payload is generated from **previous API responses**:

```ts
const userId = await createUser();
const payload = {
  userId,
  action: "SUSPEND"
};
```

**Use when**

* Stateful systems
* Integration testing
* End‑to‑end API flows

---

## 1️⃣2️⃣ Randomized / fuzzed payloads

```ts
payload.email = faker.internet.email();
payload.age = faker.number.int({ min: 0, max: 120 });
```

**Use when**

* Resilience testing
* Validation testing
* Security‑adjacent testing

---

## 1️⃣3️⃣ Hybrid approach (industry standard)

In real teams, **nobody uses just one**.

Typical mature stack:

```
JSON template
  + base object
  + override
  + builder (for complex cases)
  + faker (for data)
  + schema validation
```

---

## Recommended mental model for QA leads

Ask yourself:

| Question           | Best approach   |
| ------------------ | --------------- |
| Payload large?     | JSON template   |
| Many variations?   | Base + override |
| Business readable? | DSL             |
| Contract‑critical? | Schema‑driven   |
| Negative testing?  | Faker + schema  |
| Quick test?        | Inline          |

---

## If you want next

I can:

* Map these to **Playwright API testing**
* Show **anti‑patterns** teams fall into
* Propose a **clean folder structure**
* Compare **Builder vs Template+Override** with real examples

Just say which one.
