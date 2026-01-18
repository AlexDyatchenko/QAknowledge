Below is a “senior-level” example showing **Playwright API tests (TypeScript)** + **WireMock stubs** for an OAuth-style **token retrieval flow** (client credentials) and a **protected endpoint** that requires the Bearer token 🔐🧪.

---

## WireMock stubs (mappings)

> Put these files under: `wiremock/mappings/`

### 1) `oauth-token-success.json`
```json
{
  "request": {
    "method": "POST",
    "urlPath": "/oauth/token",
    "headers": {
      "content-type": {
        "matches": "application/x-www-form-urlencoded.*"
      }
    },
    "bodyPatterns": [
      {
        "matches": ".*grant_type=client_credentials.*"
      },
      {
        "matches": ".*client_id=qa-client.*"
      },
      {
        "matches": ".*client_secret=qa-secret.*"
      },
      {
        "matches": ".*scope=read%3Ame.*"
      }
    ]
  },
  "response": {
    "status": 200,
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-store"
    },
    "jsonBody": {
      "access_token": "stubbed-access-token",
      "token_type": "Bearer",
      "expires_in": 3600,
      "scope": "read:me"
    }
  }
}
```

### 2) `oauth-token-invalid-client.json`
```json
{
  "request": {
    "method": "POST",
    "urlPath": "/oauth/token",
    "headers": {
      "content-type": {
        "matches": "application/x-www-form-urlencoded.*"
      }
    },
    "bodyPatterns": [
      {
        "matches": ".*grant_type=client_credentials.*"
      }
    ]
  },
  "response": {
    "status": 401,
    "headers": {
      "content-type": "application/json"
    },
    "jsonBody": {
      "error": "invalid_client",
      "error_description": "Client authentication failed"
    }
  }
}
```

> Note: WireMock selects the **closest match**. If you run into ambiguity, tighten the “invalid” stub matching (e.g., explicitly match wrong secrets) or use priorities.

### 3) `me-success.json` (protected endpoint)
```json
{
  "request": {
    "method": "GET",
    "urlPath": "/api/me",
    "headers": {
      "authorization": {
        "equalTo": "Bearer stubbed-access-token"
      }
    }
  },
  "response": {
    "status": 200,
    "headers": {
      "content-type": "application/json"
    },
    "jsonBody": {
      "id": "u-123",
      "email": "senior.qa@example.com",
      "roles": ["reader"]
    }
  }
}
```

### 4) `me-unauthorized.json`
```json
{
  "request": {
    "method": "GET",
    "urlPath": "/api/me"
  },
  "response": {
    "status": 401,
    "headers": {
      "content-type": "application/json"
    },
    "jsonBody": {
      "message": "Missing or invalid token"
    }
  }
}
```

---

## Playwright API test (TypeScript)

### `tests/auth-token.spec.ts`
```ts
import { test, expect, APIRequestContext } from "@playwright/test";

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
};

type OAuthErrorResponse = {
  error: string;
  error_description?: string;
};

type MeResponse = {
  id: string;
  email: string;
  roles: string[];
};

class AuthClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getClientCredentialsToken(params: {
    clientId: string;
    clientSecret: string;
    scope: string;
  }): Promise<string> {
    const form = new URLSearchParams();
    form.set("grant_type", "client_credentials");
    form.set("client_id", params.clientId);
    form.set("client_secret", params.clientSecret);
    form.set("scope", params.scope);

    const res = await this.request.post("/oauth/token", {
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: form.toString()
    });

    let token = "";
    if (res.ok()) {
      const json = (await res.json()) as TokenResponse;
      expect(json.access_token, "access_token should be present").toBeTruthy();
      expect(json.token_type).toBe("Bearer");
      token = json.access_token;
    } else {
      const err = (await res.json()) as OAuthErrorResponse;
      expect(res.status(), "Token endpoint should not fail in happy path").toBe(200);
      expect(err.error).toBe("unexpected");
    }

    return token;
  }
}

test.describe("Auth token retrieval (WireMock) 🔐", () => {
  test("retrieves token and uses it to call a protected endpoint 🧪", async ({ request }) => {
    const auth = new AuthClient(request);

    const token = await auth.getClientCredentialsToken({
      clientId: "qa-client",
      clientSecret: "qa-secret",
      scope: "read:me"
    });

    const meRes = await request.get("/api/me", {
      headers: { authorization: `Bearer ${token}` }
    });

    expect(meRes.status()).toBe(200);
    const me = (await meRes.json()) as MeResponse;

    expect(me.id).toBe("u-123");
    expect(me.email).toContain("@");
    expect(me.roles).toEqual(["reader"]);
  });

  test("fails with 401 for protected endpoint without token 🚫", async ({ request }) => {
    const meRes = await request.get("/api/me");

    expect(meRes.status()).toBe(401);
    const body = (await meRes.json()) as { message: string };
    expect(body.message).toContain("token");
  });
});
```

---

## Playwright config (baseURL to WireMock)

### `playwright.config.ts`
```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: process.env.API_BASE_URL ?? "http://localhost:8080"
  }
});
```

---

## Run WireMock

If you use the standalone jar:
```bash
java -jar wiremock-standalone.jar --port 8080 --root-dir ./wiremock
```

Then run Playwright:
```bash
API_BASE_URL=http://localhost:8080 npx playwright test
```

---

If you want, I can also provide:
- WireMock **priorities** to avoid matching conflicts 🎯  
- A **token caching** layer (reuse token until expires_in) in the `AuthClient`  
- A stub using WireMock **response templating** to generate dynamic tokens 🧩