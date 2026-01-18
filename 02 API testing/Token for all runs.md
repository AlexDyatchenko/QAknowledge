In Playwright Test, “cache token per test run” depends on **where you need it shared**:

- **Module/global variable**: cached **only inside one worker process** (NOT shared across parallel workers).
- **Worker-scoped fixture**: cached **once per worker** (still not shared across workers).
- **globalSetup + file/env**: cached **once for the whole run** and usable by **all workers**.

Below are the common patterns.

---

## 1) Per *whole test run* (all workers): `globalSetup` writes token to a file

### `playwright.config.ts`
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: 'https://api.example.com',
  },
});
```

### `global-setup.ts`
```ts
import { request, FullConfig } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_PATH = path.join(__dirname, '.auth', 'token.json');

export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL as string;

  const api = await request.newContext({ baseURL });

  const res = await api.post('/auth/login', {
    data: { username: 'user', password: 'pass' },
  });

  if (!res.ok()) throw new Error(`Login failed: ${res.status()}`);

  const { accessToken } = await res.json();

  await fs.mkdir(path.dirname(TOKEN_PATH), { recursive: true });
  await fs.writeFile(TOKEN_PATH, JSON.stringify({ accessToken }, null, 2), 'utf-8');

  await api.dispose();
}

export { TOKEN_PATH };
```

### How it’s stored (example file content): `.auth/token.json`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Use it in tests
```ts
import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

const TOKEN_PATH = path.join(__dirname, '.auth', 'token.json');

test('call API with cached token', async ({ request, baseURL }) => {
  const { accessToken } = JSON.parse(await fs.readFile(TOKEN_PATH, 'utf-8'));

  const res = await request.get(`${baseURL}/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  expect(res.ok()).toBeTruthy();
});
```

**What is it?** Not a global variable. It’s **persisted to disk**, so every worker can read it.

---

## 2) Per worker (cached once per worker): worker-scoped fixture (no file)

This is often enough if you don’t care about duplication across workers.

### `fixtures.ts`
```ts
import { test as base, expect } from '@playwright/test';

type Fixtures = {
  token: string;
};

export const test = base.extend<Fixtures>({
  token: [async ({ request, baseURL }, use) => {
    // cached once per worker because of scope: 'worker'
    const res = await request.post(`${baseURL}/auth/login`, {
      data: { username: 'user', password: 'pass' },
    });
    expect(res.ok()).toBeTruthy();

    const { accessToken } = await res.json();
    await use(accessToken);
  }, { scope: 'worker' }],
});

export { expect };
```

### `example.spec.ts`
```ts
import { test, expect } from './fixtures';

test('uses worker-cached token', async ({ request, baseURL, token }) => {
  const res = await request.get(`${baseURL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(res.ok()).toBeTruthy();
});
```

**What is it?** Not a global variable. It’s a Playwright **fixture** cached per worker process.

---

## 3) Module-level “global var” (works only within the same worker)

This is the simplest, but remember: **each worker has its own memory**, so it’s *not* per whole run if you run in parallel.

```ts
// token-cache.ts
let cachedToken: string | undefined;

export async function getToken(request: any, baseURL: string) {
  if (cachedToken) return cachedToken;

  const res = await request.post(`${baseURL}/auth/login`, {
    data: { username: 'user', password: 'pass' },
  });
  const { accessToken } = await res.json();

  cachedToken = accessToken;
  return cachedToken;
}
```

**What is it?** A **module variable** (in-memory). Shared only within that worker’s process.

---

### Which should you use?
- Want **one token for the entire run across all parallel workers** → **`globalSetup` + file** (option #1).
- Want **one token per worker** (fast, no file I/O) → **worker fixture** (option #2).
- Want **quick & dirty** and you run with `workers: 1` → module variable (option #3).

If you tell me whether your run uses parallel workers and whether the token is for **API calls** or **browser authenticated state**, I can show the best-practice setup for that case.