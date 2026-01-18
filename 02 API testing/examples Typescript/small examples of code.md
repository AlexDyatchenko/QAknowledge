```ts
if (!ENV || ![`qa`, `dev`, `qaApi`, `devApi`].includes(ENV)) {
  console.log(
    `Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`
  );
  process.exit();
}
```

```ts
test(`getUsers`, { tag: "@API" }, async ({ request }) => {
  const response = await request.get(`/api/users?per_page=1`);
  await apiActions.verifyStatusCode(response);

  //* Body Response Params and Body Response Headers are stored in single text file separated by #
  const responseBodyParams = (
    await apiActions.readValuesFromTextFile(`getUsers`)
  ).split(`#`)[0];
  await apiActions.verifyResponseBody(
    responseBodyParams,
    await response.json(),
    `Response Body`
  );

  const responseBodyHeaders = (
    await apiActions.readValuesFromTextFile(`getUsers`)
  ).split(`#`)[1];
  await apiActions.verifyResponseHeader(
    responseBodyHeaders,
    response.headersArray(),
    `Response Headers`
  );
});
```

Chrome developer Tools: Use the Filter box to narrow down the list. Common filters include `XHR` or `Fetch` to see only API calls. **XHR** stands for XMLHttpRequest.

**Idempotency** (in API testing) means:

> Calling the same API multiple times with the same request should produce the same result and not cause additional side effects.

```ts
expect(response.status()).toBe(200);
expect(response).verifyStatusCode(200);
```

```ts
expect(userA.json()).not.toEqual(await userB.json());
```

```Powershell
npx tsx tests/TypescriptTests.ts
```

In Node.js, `process` is a global object, available everywhere without import.

```ts
class Point {
  x: number;
  y: number;
}

const pt = new Point();
```

```ts
test(`@API getUsersToken`, async ({ playwright, baseURL }) => {
  const apiContext = await playwright.request.newContext({
    baseURL: baseURL,
    extraHTTPHeaders: {
      Authorization: `Your App Token`,
    },
  });
});
```

```ts
const newContact = {
  firstName: "Test",
  lastName: "User",
};

const response = await apiContext.post("/contacts", {
  data: newContact,
});

await apiActions.verifyStatusCode(response);

const responseBody = await response.json();
expect(responseBody).toHaveProperty("_id");
expect(responseBody.firstName).toBe(newContact.firstName);
```

```ts
expect(start.status()).toBe(202);
const startBody = await start.json();
expect(startBody.jobId).toBeTruthy();

const jobId = startBody.jobId as string;

const jobBody = await job.json();
status = jobBody.status;

if (status === "done") break;
if (status === "failed")
  throw new Error(`Job failed: ${JSON.stringify(jobBody)}`);
```

```ts
expect(body).toMatchObject({
  accepted: 2,
});
```

```ts
// Local server that responds after 2s
const server = http.createServer((req, res) => {
  if (req.url === "/slow") {
    setTimeout(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
    }, 2000);
    return;
  }
  res.writeHead(404);
  res.end();
});
```

```ts
export async function getWithRetry(
  api: APIRequestContext,
  url: string,
  {
    retries = 3,
    delayMs = 100
  } = {}
): Promise<APIResponse> { ... }
//= {}  - default value
```

```powershell
$env:CI="true"
npx playwright test
```

```ts
test.beforeAll(async ({ playwright }) => {
  const baseURL = process.env.BASE_URL;
  const apiContext = await playwright.request.newContext({
    baseURL: baseURL,
  });
  const credentials = {
    email: "Alex@gmail.com",
    password: process.env.userPassword,
  };
  const url = process.env.BASE_URL + "/api/users/login";
  const response = await apiContext.post(url, {
    data: credentials,
  });
});
```

```json
  "request": {
      "method": "POST",
      "url": "/api/users/login",
      "bodyPatterns": [
          { "absent": "email" }
      ]
  }
```
```js
export default function() {
    // Pick a specific user based on the VU's unique ID k6
    const user = data[__VU % data.length]; 
    console.log(`VU ${__VU} is testing user: ${user.id}`);
}
```

```js
/**
 * @typedef {Object} UserData
 * @property {number} id   - User identifier
 * @property {string} name - User name
 */

/** @type {UserData[]} */

```

```js
export const options = {
  stages: [
    { duration: "2s", target: 20 },
    { duration: "2s", target: 20 },
    { duration: "2s", target: 0 },
  ],
  // vus: 10,
  // iterations: 10,
  thresholds: {
    // Check that p95 response time is less than 200ms
    // If the requirement was strictly validation, a failure here indicates p95 > 200
    http_req_duration: ["p(95)<200"],
    http_req_failed: ["rate<0.01"],
    "http_req_duration{ expected_res:true}": ["p(99)<100"]
  },
};
```
```ts
// This is the missing piece you noticed:
  const requestHeaders = response.request().headers();
  expect(requestHeaders['x-custom-header']).toBe('test-value');
```

```ts
    const response = await request.get(`${BASE_URL}/users`, {
      headers: {
        'Authorization': 'Bearer fake-token',
        'X-Custom-Header': 'test-value'
      }
    });
```

```ts
  test('should handle pagination parameters', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      params: {
        _page: 1,
        _limit: 5
      }
    });
    
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.length).toBeLessThanOrEqual(5);
  });
});
```
