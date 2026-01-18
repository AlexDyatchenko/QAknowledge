import { test, expect } from "@playwright/test";

// WireMock setup - would typically use wiremock-standalone or @wiremock/standalone
// For this example, showing the configuration and usage pattern

const WIREMOCK_URL = "http://localhost:8080";

// Helper function to setup WireMock stubs
async function setupWireMockStub(request: any, stub: any) {
  await request.post(`${WIREMOCK_URL}/__admin/mappings`, {
    data: stub,
  });
}

// Helper function to reset WireMock
async function resetWireMock(request: any) {
  await request.post(`${WIREMOCK_URL}/__admin/reset`);
}

test.describe("WireMock API Mocking Tests", () => {
  test.beforeEach(async ({ request }) => {
    // Reset WireMock before each test
    await resetWireMock(request);
  });

  test("should mock successful user response", async ({ request }) => {
    // Setup mock
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      role: "admin",
    };

    await setupWireMockStub(request, {
      request: {
        method: "GET",
        urlPath: "/api/users/1",
      },
      response: {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
        jsonBody: mockUser,
      },
    });

    // Test the mocked endpoint
    const response = await request.get(`${WIREMOCK_URL}/api/users/1`);

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toEqual(mockUser);
  });

  test("should mock 404 error response", async ({ request }) => {
    await setupWireMockStub(request, {
      request: {
        method: "GET",
        urlPath: "/api/users/999",
      },
      response: {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
        jsonBody: {
          error: "User not found",
          code: "USER_NOT_FOUND",
        },
      },
    });

    const response = await request.get(`${WIREMOCK_URL}/api/users/999`);

    expect(response.status()).toBe(404);
    const error = await response.json();
    expect(error.code).toBe("USER_NOT_FOUND");
  });

  test("should mock delayed response", async ({ request }) => {
    await setupWireMockStub(request, {
      request: {
        method: "GET",
        urlPath: "/api/slow-endpoint",
      },
      response: {
        status: 200,
        fixedDelayMilliseconds: 3000,
        jsonBody: {
          message: "This was delayed",
        },
      },
    });

    const startTime = Date.now();
    const response = await request.get(`${WIREMOCK_URL}/api/slow-endpoint`);
    const duration = Date.now() - startTime;

    expect(response.status()).toBe(200);
    expect(duration).toBeGreaterThan(2900);
  });

  test("should mock POST request with request matching", async ({
    request,
  }) => {
    await setupWireMockStub(request, {
      request: {
        method: "POST",
        urlPath: "/api/users",
        bodyPatterns: [
          {
            matchesJsonPath: "$.email",
          },
        ],
      },
      response: {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
        jsonBody: {
          id: 123,
          message: "User created successfully",
        },
      },
    });

    const response = await request.post(`${WIREMOCK_URL}/api/users`, {
      data: {
        name: "New User",
        email: "newuser@example.com",
      },
    });

    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data.id).toBe(123);
  });

  test("should mock server error (500)", async ({ request }) => {
    await setupWireMockStub(request, {
      request: {
        method: "GET",
        urlPath: "/api/error",
      },
      response: {
        status: 500,
        jsonBody: {
          error: "Internal Server Error",
          message: "Something went wrong",
        },
      },
    });

    const response = await request.get(`${WIREMOCK_URL}/api/error`);

    expect(response.status()).toBe(500);
  });

  test("should verify request was made to WireMock", async ({ request }) => {
    // Setup stub
    await setupWireMockStub(request, {
      request: {
        method: "GET",
        urlPath: "/api/verify-test",
      },
      response: {
        status: 200,
        jsonBody: { success: true },
      },
    });

    // Make request
    await request.get(`${WIREMOCK_URL}/api/verify-test`);

    // Verify the request was received
    const verifyResponse = await request.post(
      `${WIREMOCK_URL}/__admin/requests/find`,
      {
        data: {
          method: "GET",
          urlPath: "/api/verify-test",
        },
      },
    );

    const verifyData = await verifyResponse.json();
    expect(verifyData.requests.length).toBeGreaterThan(0);
  });

  test("should mock conditional responses based on headers", async ({
    request,
  }) => {
    // Mock for authorized request
    await setupWireMockStub(request, {
      priority: 1,
      request: {
        method: "GET",
        urlPath: "/api/protected",
        headers: {
          Authorization: {
            matches: "Bearer .+",
          },
        },
      },
      response: {
        status: 200,
        jsonBody: {
          message: "Access granted",
          data: "sensitive information",
        },
      },
    });

    // Mock for unauthorized request
    await setupWireMockStub(request, {
      priority: 2,
      request: {
        method: "GET",
        urlPath: "/api/protected",
      },
      response: {
        status: 401,
        jsonBody: {
          error: "Unauthorized",
        },
      },
    });

    // Test with authorization
    const authorizedResponse = await request.get(
      `${WIREMOCK_URL}/api/protected`,
      {
        headers: {
          Authorization: "Bearer valid-token",
        },
      },
    );
    expect(authorizedResponse.status()).toBe(200);

    // Test without authorization
    const unauthorizedResponse = await request.get(
      `${WIREMOCK_URL}/api/protected`,
    );
    expect(unauthorizedResponse.status()).toBe(401);
  });
});
