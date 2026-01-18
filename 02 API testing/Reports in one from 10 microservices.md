I have 10 microservices as different projects with separate repo - each has API tests with wiremock in Playwright - how to combine test results in one report?

Good question — this is a **very common problem in microservice QA**, and there are a few *clean* ways to solve it depending on **how independent your services really are** and **what level you want to report on**.

I’ll explain the **recommended patterns**, from most common → more advanced, with **Playwright + WireMock** in mind.

---

## 1️⃣ Best practice: **Central “Test Orchestrator” repo (recommended)**

### Idea

Keep:

* **Each microservice repo** → owns its API tests + WireMock stubs
* **One central repo** → *runs* all tests and **merges reports**

This avoids coupling services together.

### Structure

```
qa-orchestrator/
├─ playwright.config.ts
├─ package.json
├─ services/
│  ├─ users/
│  ├─ orders/
│  ├─ payments/
│  └─ ...
├─ reports/
│  └─ merged/
```

### How it works

1. CI checks out all 10 repos (or installs them as npm/git deps)
2. Orchestrator runs Playwright tests **per service**
3. Each service outputs its own report (JSON / blob)
4. Reports are merged into **one final report**

---

## 2️⃣ Use Playwright **Blob Report → Merge** (BEST with Playwright)

Playwright **natively supports merging reports** — use it.

### Step 1: Each repo outputs blob report

In each microservice repo:

```ts
// playwright.config.ts
export default {
  reporter: [['blob', { outputDir: 'blob-report' }]],
};
```

### Step 2: Orchestrator collects blob reports

After running all services:

```
services/users/blob-report
services/orders/blob-report
services/payments/blob-report
```

### Step 3: Merge them

```bash
npx playwright merge-reports \
  --reporter html \
  services/*/blob-report
```

### Result

✅ **Single unified HTML report**

* All services
* All tests
* Full history, traces, screenshots

💡 **This is the cleanest and most future-proof solution**

---

## 3️⃣ Keep repos independent, merge via CI (no orchestrator repo)

If you **don’t want a central repo**, you can merge in CI.

### Example (GitHub Actions / GitLab CI)

Each pipeline:

```bash
npx playwright test --reporter blob
```

Artifacts:

```
blob-report/
```

Final pipeline job:

```bash
download artifacts from all 10 pipelines
npx playwright merge-reports --reporter html blob-report/*
```

### Pros

* No extra repo
* Teams remain autonomous

### Cons

* CI logic becomes more complex
* Harder to run locally

---

## 4️⃣ Allure as an alternative (common but heavier)

If your org already uses Allure:

### Each service:

```ts
reporter: [['allure-playwright']]
```

### CI:

```bash
allure generate services/*/allure-results -o merged-report
```

### Trade-offs

✅ Cross-tool support
❌ Slower, heavier, extra infra
❌ Playwright-native blob is simpler now

---

## 5️⃣ Logical grouping inside the report (VERY IMPORTANT)

No matter which approach you choose, **tag tests by service**:

```ts
test.describe('@users-service', () => {
  test('GET /users', async () => {});
});
```

or

```ts
test('GET /orders', { tag: ['@orders'] }, async () => {});
```

This gives:

* Filters by service
* Clean dashboards
* Clear ownership

---

## 6️⃣ Recommended setup for your case (10 services + WireMock)

### ✔ What I’d do in your position

Given:

* Separate repos
* API tests
* WireMock per service

👉 **Playwright Blob Reports + Orchestrator repo**

**Why**

* No test duplication
* Clear ownership
* One report for management
* Still microservice-aligned

---

## 7️⃣ Quick decision table

| Approach              | Best for                   | Verdict |
| --------------------- | -------------------------- | ------- |
| Playwright blob merge | Playwright-native projects | ⭐⭐⭐⭐⭐   |
| Orchestrator repo     | Large microservice setups  | ⭐⭐⭐⭐⭐   |
| CI-only merge         | Strict repo isolation      | ⭐⭐⭐⭐    |
| Allure                | Legacy setups              | ⭐⭐⭐     |

---

## 8️⃣ Want a concrete example?

I can:

* Draw **repo + CI architecture**
* Give **GitHub Actions / GitLab CI YAML**
* Show **local dev setup**
* Show **contract-testing-friendly layout with WireMock**

Just tell me:

> CI tool? (GitHub / GitLab / Jenkins)
> Local run needed or CI-only?
