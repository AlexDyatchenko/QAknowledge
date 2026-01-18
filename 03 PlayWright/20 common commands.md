Below is a **practical “top-20” Playwright cheat sheet** focused on **real web-app testing**, including **API mocking via `route()`**. This is written the way senior QA / test leads usually *actually* use Playwright in projects.

All examples are **TypeScript**, but same ideas apply to JS.

---

## 1. Navigate to a page

```ts
await page.goto('https://app.example.com');
```

---

## 2. Locate elements (best practice: role / label)

```ts
const loginButton = page.getByRole('button', { name: 'Login' });
```

Avoid CSS/XPath unless unavoidable.

---

## 3. Fill input

```ts
await page.getByLabel('Email').fill('user@test.com');
```

---

## 4. Click element

```ts
await loginButton.click();
```

---

## 5. Expect element visible / hidden

```ts
await expect(page.getByText('Welcome')).toBeVisible();
await expect(page.getByText('Error')).toBeHidden();
```

---

## 6. Wait for navigation

```ts
await Promise.all([
  page.waitForURL('**/dashboard'),
  page.click('button[type=submit]')
]);
```

---

## 7. Wait for API response

```ts
const response = await page.waitForResponse('**/api/login');
expect(response.status()).toBe(200);
```

---

## 8. Assert text / value

```ts
await expect(page.locator('.username')).toHaveText('Alex');
await expect(page.getByLabel('Email')).toHaveValue('user@test.com');
```

---

## 9. Handle dialogs (alert / confirm)

```ts
page.on('dialog', dialog => dialog.accept());
```

---

## 10. Upload file

```ts
await page.setInputFiles('input[type=file]', 'tests/fixtures/file.pdf');
```

---

## 11. Work with iframe

```ts
const frame = page.frameLocator('#payment-iframe');
await frame.getByRole('button', { name: 'Pay' }).click();
```

---

## 12. Keyboard actions

```ts
await page.keyboard.press('Enter');
await page.keyboard.type('hello');
```

---

## 13. Mouse actions

```ts
await page.mouse.move(100, 200);
await page.mouse.click(100, 200);
```

---

## 14. Screenshots (debugging / reports)

```ts
await page.screenshot({ path: 'error.png', fullPage: true });
```

---

## 15. Use test hooks (setup / teardown)

```ts
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
```

---

## 16. Reuse authenticated state (huge speed boost)

```ts
test.use({ storageState: 'auth.json' });
```

Create `auth.json` once via login test.

---

## 17. Mock / modify API request (route)

### Change request payload

```ts
await page.route('**/api/login', async route => {
  const request = route.request();
  const body = JSON.parse(request.postData() || '{}');

  body.username = 'mocked-user';

  await route.continue({
    postData: JSON.stringify(body),
    headers: {
      ...request.headers(),
      'content-type': 'application/json'
    }
  });
});
```

---

## 18. Mock API response (most common)

```ts
await page.route('**/api/profile', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      id: 1,
      name: 'Mock User',
      role: 'admin'
    })
  });
});
```

Perfect for:

* edge cases
* 3rd-party API failures
* hard-to-reproduce backend states

---

## 19. Abort network calls (simulate outage)

```ts
await page.route('**/api/analytics', route => route.abort());
```

---

## 20. Combine UI + API assertions (real E2E)

```ts
const [response] = await Promise.all([
  page.waitForResponse('**/api/order'),
  page.getByRole('button', { name: 'Submit order' }).click()
]);

expect(response.status()).toBe(201);
await expect(page.getByText('Order confirmed')).toBeVisible();
```

---

## How this fits senior-level testing strategy (important)

Based on your earlier questions about **E2E vs API vs mocking**:

* **Playwright route mocking** = fast, test UI logic safely
* **Playwright API testing** = contract + happy path
* **WireMock** still wins when:

  * many services depend on same mock
  * complex stateful backend simulation
  * non-browser tests need same stubs

---

## Recommended project structure (simple & scalable)

```
tests/
 ├─ e2e/
 │   ├─ login.spec.ts
 │   └─ checkout.spec.ts
 ├─ api/
 │   └─ users.api.spec.ts
 ├─ mocks/
 │   └─ profile.mock.ts
 └─ fixtures/
```

---

If you want next:

* 🧪 **Playwright vs Cypress vs Selenium (architectural comparison)**
* 📱 **Playwright + Appium real-device strategy**
* 🏗 **Enterprise Playwright framework example**
* ⚡ **Best practices for selectors & test stability**

Just tell me.
