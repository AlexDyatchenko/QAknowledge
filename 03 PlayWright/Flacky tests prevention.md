Flaky tests are a **very common pain point**, and Playwright actually gives you **first-class tooling** to deal with them properly (not just “add sleep and pray” 🙂).

Below is a **practical, QA-grade guide** with **approaches, examples, and command lines**.

---

## 1. Use Playwright’s Auto-Waiting (First line of defense)

**Golden rule:**
❌ Don’t wait for time
✅ Wait for *conditions*

### ❌ Bad (flaky)

```ts
await page.click('#submit');
await page.waitForTimeout(2000);
await expect(page.locator('.success')).toBeVisible();
```

### ✅ Good (stable)

```ts
await page.click('#submit');
await expect(page.locator('.success')).toBeVisible();
```

Playwright **automatically waits** for:

* element to be attached
* visible
* enabled
* stable (not animating)

📌 **Most flakiness disappears if you rely on this correctly.**

---

## 2. Prefer `locator` over `page.$` / `waitForSelector`

Locators are **retry-aware**.

### ❌ Flaky

```ts
await page.waitForSelector('#login');
await page.click('#login');
```

### ✅ Stable

```ts
await page.locator('#login').click();
```

### ❌ Flaky assertion

```ts
const text = await page.textContent('.status');
expect(text).toBe('Success');
```

### ✅ Stable assertion (auto-retry)

```ts
await expect(page.locator('.status')).toHaveText('Success');
```

---

## 3. Web-first Assertions (Auto-retry until timeout)

Playwright assertions **poll until they pass or timeout**.

### Example

```ts
await expect(page.locator('.spinner')).toBeHidden();
await expect(page.locator('.result')).toContainText('Completed');
```

Instead of:

```ts
await page.waitForTimeout(3000);
```

📌 This alone removes ~60–70% of flaky tests in real projects.

---

## 4. Handle Network & Async Flakiness

### Wait for API response

```ts
await Promise.all([
  page.waitForResponse(resp =>
    resp.url().includes('/api/orders') && resp.status() === 200
  ),
  page.click('button#create-order')
]);
```

### Wait for navigation properly

```ts
await Promise.all([
  page.waitForURL('**/dashboard'),
  page.click('button[type=submit]')
]);
```

❌ Avoid:

```ts
await page.click('button');
await page.waitForNavigation(); // can miss the event
```

---

## 5. Use `expect.poll()` for Eventually Consistent Systems

Perfect for:

* background jobs
* async DB updates
* delayed UI refresh

```ts
await expect.poll(async () => {
  return page.locator('.order-status').textContent();
}).toBe('Completed');
```

---

## 6. Retry Tests (Controlled, not lazy)

### Enable retries in config

```ts
// playwright.config.ts
export default defineConfig({
  retries: 2,
});
```

### Or via CLI

```bash
npx playwright test --retries=2
```

📌 **Best practice**

* retries = safety net
* root cause must still be fixed

---

## 7. Quarantine Known Flaky Tests (Temporary)

### Mark test as flaky

```ts
test.describe.configure({ retries: 3 });

test('sometimes flaky test', async ({ page }) => {
  ...
});
```

### Skip conditionally

```ts
test.skip(process.env.CI === 'true', 'Flaky on CI');
```

---

## 8. Parallelism & Test Isolation Issues

### Disable parallelism for unstable tests

```ts
test.describe.configure({ mode: 'serial' });

test('step 1', async () => {});
test('step 2', async () => {});
```

### Reduce workers

```bash
npx playwright test --workers=1
```

Or in config:

```ts
workers: process.env.CI ? 2 : undefined
```

---

## 9. Stable Selectors (Huge Flakiness Killer)

### ❌ Bad selectors

```ts
page.locator('div > div:nth-child(3) > button')
```

### ✅ Good selectors

```ts
page.getByRole('button', { name: 'Submit' });
page.getByTestId('submit-button');
```

### Example with test id

```html
<button data-testid="submit-button">Submit</button>
```

```ts
await page.getByTestId('submit-button').click();
```

---

## 10. Use Traces & Videos to Debug Flakiness

### Enable trace on retry

```ts
use: {
  trace: 'on-first-retry',
  video: 'retain-on-failure',
  screenshot: 'only-on-failure',
}
```

### Run and inspect

```bash
npx playwright test
npx playwright show-trace trace.zip
```

📌 This is **gold** for CI-only flakes.

---

## 11. Timeouts: Increase Smartly, Not Globally

### Per assertion

```ts
await expect(locator).toBeVisible({ timeout: 10_000 });
```

### Per test

```ts
test.setTimeout(60_000);
```

❌ Avoid:

```ts
timeout: 120000 // globally
```

---

## 12. Mock Unstable Dependencies (Best Practice)

### Mock API

```ts
await page.route('**/api/payments', route =>
  route.fulfill({
    status: 200,
    body: JSON.stringify({ status: 'approved' }),
  })
);
```

📌 Removes:

* network flakiness
* third-party instability
* test data issues

---

## 13. Detect Flaky Tests Automatically

### Run multiple times

```bash
npx playwright test --repeat-each=10
```

### In CI

```bash
npx playwright test --retries=2 --trace=on-first-retry
```

---

## TL;DR – Flaky Test Playbook

| Cause         | Solution                                       |
| ------------- | ---------------------------------------------- |
| Timing        | Use auto-waiting & web assertions              |
| Async         | `waitForResponse`, `waitForURL`, `expect.poll` |
| Selectors     | `getByRole`, `getByTestId`                     |
| Infra         | retries + traces                               |
| Parallel      | reduce workers / serial mode                   |
| External deps | mock APIs                                      |

---
