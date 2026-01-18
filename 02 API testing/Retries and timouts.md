To test **retries** and **timeouts** in API tests, you want **deterministic** behavior (not “real” flaky networks). The best way is to spin up a tiny local HTTP server inside the test that can intentionally **fail N times** or **respond slowly**, then assert your client logic does the right thing ✅🧪

Below are practical Playwright + TypeScript patterns.

---

## 1) Testing **timeouts** ⏱️

### Key point
Playwright’s `APIRequestContext` supports per-request `timeout` (ms). You can create an endpoint that delays longer than that and assert it throws.

### Example: local server that delays
```ts
import { test, expect, request } from '@playwright/test';
import http from 'http';

test('request times out', async () => {
  // Local server that responds after 2s
  const server = http.createServer((req, res) => {
    if (req.url === '/slow') {
      setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      }, 2000);
      return;
    }
    res.writeHead(404); res.end();
  });

  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as any;
  const baseURL = `http://127.0.0.1:${port}`;

  const api = await request.newContext({ baseURL });

  await expect(api.get('/slow', { timeout: 300 })).rejects.toThrow(/Timeout/i);

  await api.dispose();
  await new Promise<void>((resolve) => server.close(() => resolve()));
});
```

### Tip ✅
If the **test itself** times out before the request, increase test timeout:
```ts
test.setTimeout(10_000);
```

---

## 2) Testing **retries** 🔁

Playwright has **test retries** (`retries` in config) but that retries the *whole test*, not a single API call.

For API-call retries, implement a small retry helper and test it against a **flaky endpoint** you control.

### A simple retry wrapper (with backoff)
```ts
import type { APIRequestContext, APIResponse } from '@playwright/test';

export async function getWithRetry(
  api: APIRequestContext,
  url: string,
  {
    retries = 3,
    delayMs = 100,
    timeoutMs = 2000,
    retryOnStatus = (s: number) => s >= 500,
  } = {}
): Promise<APIResponse> {
  let lastErr: unknown;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const res = await api.get(url, { timeout: timeoutMs });
      if (!retryOnStatus(res.status())) return res;

      lastErr = new Error(`Retryable status: ${res.status()}`);
    } catch (e) {
      lastErr = e;
    }

    if (attempt <= retries) {
      await new Promise(r => setTimeout(r, delayMs * attempt)); // linear backoff
    }
  }

  throw lastErr;
}
```

### Test it with a server that fails the first N times
```ts
import { test, expect, request } from '@playwright/test';
import http from 'http';
import { getWithRetry } from './retry';

test('retries until success', async () => {
  let hitCount = 0;

  const server = http.createServer((req, res) => {
    if (req.url === '/flaky') {
      hitCount++;
      if (hitCount < 3) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, attempt: hitCount }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, attempt: hitCount }));
      }
      return;
    }
    res.writeHead(404); res.end();
  });

  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as any;
  const api = await request.newContext({ baseURL: `http://127.0.0.1:${port}` });

  const res = await getWithRetry(api, '/flaky', { retries: 5, delayMs: 10 });
  expect(res.status()).toBe(200);
  expect(hitCount).toBe(3); // proves it retried exactly as expected ✅

  await api.dispose();
  await new Promise<void>((resolve) => server.close(() => resolve()));
});
```

### Test “it eventually fails” too ❌
```ts
test('retries exhaust and throws', async () => {
  // server always 500
  const server = http.createServer((req, res) => {
    res.writeHead(500); res.end();
  });

  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as any;
  const api = await request.newContext({ baseURL: `http://127.0.0.1:${port}` });

  await expect(getWithRetry(api, '/', { retries: 2, delayMs: 10 }))
    .rejects.toThrow(/Retryable status|500/i);

  await api.dispose();
  await new Promise<void>((resolve) => server.close(() => resolve()));
});
```

---

## 3) What to assert (good signals) 🎯

For **timeouts**:
- request throws within expected time
- error message contains `Timeout`
- your code handles it (e.g., logs, returns fallback, etc.)

For **retries**:
- number of attempts (hit counter)
- delays/backoff (optional; keep it small in tests)
- stops retrying on success
- does **not** retry on non-retryable errors (e.g., 400)

---

If you tell me what retry policy you want (retry on 5xx only? also on network errors? exponential backoff? jitter?), I can tailor a clean helper + tests for your exact rules 🙂