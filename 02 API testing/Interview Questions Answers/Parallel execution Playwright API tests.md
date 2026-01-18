### Parallel execution (Playwright API tests) ⚡️

Playwright runs tests in parallel via **workers** (separate Node processes). For API tests this is usually safe *if* your tests don’t share state (same user, same resource IDs, etc.) 🔁

#### 1) Configure workers in `playwright.config.ts`
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // allows parallel within a file too
  workers: process.env.CI ? 4 : 2, // tune for CI machine cores
  retries: process.env.CI ? 2 : 0, // helps catch flakes, enables trace on retry
  use: {
    baseURL: process.env.BASE_URL,
    trace: process.env.CI ? 'on-first-retry' : 'off',
  },
});
```

#### 2) Make test data parallel-safe ✅
If tests create/update/delete data, ensure each test uses **unique identifiers**.
```ts
import { test, expect } from '@playwright/test';

test('creates a user (parallel-safe)', async ({ request }) => {
  const uniqueEmail = `user+${Date.now()}-${test.info().workerIndex}@example.com`;

  const createRes = await request.post('/users', {
    data: { email: uniqueEmail, name: 'CI User' }
  });

  expect(createRes.ok()).toBeTruthy();

  const body: { id: string; email: string } = await createRes.json();
  expect(body.email).toBe(uniqueEmail);
});
```

#### 3) Run in parallel from CLI
- Default parallel (uses configured workers):
```bash
npx playwright test
```

- Override worker count:
```bash
npx playwright test --workers=6
```

- Sharding across multiple CI nodes (fastest at scale) 🧩:
```bash
npx playwright test --shard=1/3
npx playwright test --shard=2/3
npx playwright test --shard=3/3
```

---

## Answer: “Can you debug CI-only failures?” 🕵️‍♂️✅

Yes — here’s the practical checklist that actually works in CI:

### 1) Turn on **trace on retry** (best signal with minimal noise) 🧵
In CI, set:
- `retries: 2`
- `trace: 'on-first-retry'`

This produces a trace only when a test fails and retries. Then download CI artifacts and open locally:
```bash
npx playwright show-trace path/to/trace.zip
```

### 2) Upload artifacts from CI (trace, report, logs) 📦
Make sure CI stores:
- `playwright-report/`
- `test-results/` (contains traces)
- any API response logs you print

### 3) Make failures reproducible locally by matching CI env 🌍
Common CI-only causes:
- wrong `BASE_URL`, missing secrets
- different TLS/proxy settings
- rate limits / IP allowlists
- timing differences (race conditions)

Run locally with CI-like env:
```bash
CI=1 BASE_URL=https://staging.example.com npx playwright test --workers=4
```

### 4) Add **targeted logging** when in CI (use `else`) 🧾
```ts
import { test } from '@playwright/test';

test('logs extra context in CI', async ({ request }) => {
  const res = await request.get('/health');

  if (process.env.CI) {
    console.log('CI mode: status=', res.status());
  } else {
    console.log('Local mode: status=', res.status());
  }
});
```

### 5) Use grep + repeat to catch flakes 🔁
If it fails “only sometimes”:
```bash
npx playwright test --grep @smoke --repeat-each=20
```

### 6) Stabilize parallel issues (most common CI-only culprit) 🧯
If failures appear only when parallel:
- stop sharing accounts/resources
- generate unique test data per test/worker
- avoid ordering assumptions
- isolate by environment or namespace (e.g., `X-Test-Run-Id` header)

---

If you tell me which CI you use (GitHub Actions / GitLab / Azure DevOps) and how many cores the runner has, I can suggest the best `workers` + whether sharding is worth it.


---
---
---

`workers: process.env.CI ? 4 : 2` means:

- `process.env.CI` is an environment variable (string) that indicates “running in CI”.
- The digits are the **number of workers** Playwright will use.
- A **worker** = one Node.js process that runs tests. More workers = more parallel tests ⚡️

So:
- If `CI` is set (truthy), Playwright uses **4 workers** (4 tests can run at the same time, roughly).
- Else (local run), it uses **2 workers** (less CPU load on your laptop) 🙂

Example:
- 40 tests, `workers=4` → tests run in ~10 “batches” (roughly), depending on timing.
- `workers=2` → ~20 batches (slower but lighter).

---

## How can `CI` be applied if it’s not in `.env`? 🤔

Environment variables don’t have to come from `.env`. They can be set by:

### 1) The CI system automatically ✅
Most CI providers set `CI=true` automatically.

Examples:
- **GitHub Actions**: `CI=true` is already set
- **GitLab CI**: `CI=true` is already set
- **Azure DevOps**: `CI=true` is typically set
- **CircleCI**: `CI=true` is set

So you don’t need a `.env` file for that variable.

---

### 2) Set the variable in the CI pipeline config 🧩

#### GitHub Actions
```yaml
- name: Run tests
  run: npx playwright test
  env:
    CI: "true"
    BASE_URL: "https://staging.example.com"
```

#### GitLab CI
```yaml
test:
  script:
    - npx playwright test
  variables:
    CI: "true"
    BASE_URL: "https://staging.example.com"
```

---

### 3) Set it in your terminal (local) 💻

#### macOS/Linux
```bash
CI=true npx playwright test
```

#### Windows PowerShell
```powershell
$env:CI="true"
npx playwright test
```

---

## Important detail (TypeScript/Node) 🧠
`process.env.*` values are **strings or undefined**.

So `process.env.CI ? 4 : 2` works because:
- if `CI` is `"true"` (or any non-empty string), it’s truthy
- if it’s `undefined`, it’s falsy

If you want to be stricter:
```ts
const isCI = process.env.CI === 'true' || process.env.CI === '1';

const workers = isCI ? 4 : 2;
```
(Still no `return`, and using `else` style is fine if you prefer.)

If you tell me your CI provider, I can show the exact config snippet + recommended worker count for that runner type ⚙️