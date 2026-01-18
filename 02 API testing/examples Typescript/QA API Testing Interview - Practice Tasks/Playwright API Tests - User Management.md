import { test, expect } from "@playwright/test";

const BASE_URL = "https://jsonplaceholder.typicode.com";

test.describe("User Management API Tests", () => {
  test("GET /users - should return list of users", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    // Validate user structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("name");
    expect(firstUser).toHaveProperty("email");
    expect(firstUser.email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  });

  test("GET /users/:id - should return single user", async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/users/${userId}`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(userId);
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("address");
  });

  test("GET /users/:id - should return 404 for non-existent user", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/users/99999`);

    expect(response.status()).toBe(404);
  });

  test("POST /users - should create new user", async ({ request }) => {
    const newUser = {
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: newUser,
    });

    expect(response.status()).toBe(201);

    const createdUser = await response.json();
    expect(createdUser).toHaveProperty("id");
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
  });

  test("POST /users - should handle invalid data", async ({ request }) => {
    const invalidUser = {
      // Missing required fields
      username: "testuser",
    };

    const response = await request.post(`${BASE_URL}/users`, {
      data: invalidUser,
    });

    // Note: JSONPlaceholder doesn't validate, but in real scenario:
    // expect(response.status()).toBe(400);
    expect([200, 201, 400]).toContain(response.status());
  });

  test("PUT /users/:id - should update existing user", async ({ request }) => {
    const userId = 1;
    const updatedData = {
      name: "Updated Name",
      email: "updated@example.com",
    };

    const response = await request.put(`${BASE_URL}/users/${userId}`, {
      data: updatedData,
    });

    expect(response.status()).toBe(200);

    const updatedUser = await response.json();
    expect(updatedUser.id).toBe(userId);
  });

  test("DELETE /users/:id - should delete user", async ({ request }) => {
    const userId = 1;
    const response = await request.delete(`${BASE_URL}/users/${userId}`);

    expect(response.status()).toBe(200);
  });

  test("Response time - should respond within acceptable time", async ({
    request,
  }) => {
    const startTime = Date.now();
    const response = await request.get(`${BASE_URL}/users`);
    const endTime = Date.now();

    const responseTime = endTime - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(2000); // Less than 2 seconds
  });
});

// Advanced: Test with custom headers and authentication
test.describe("API Tests with Authentication", () => {
  test("should send custom headers", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: "Bearer fake-token",
        "X-Custom-Header": "test-value",
      },
    });

    expect(response.status()).toBe(200);
  });

  test("should handle pagination parameters", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });

    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.length).toBeLessThanOrEqual(5);
  });
});
