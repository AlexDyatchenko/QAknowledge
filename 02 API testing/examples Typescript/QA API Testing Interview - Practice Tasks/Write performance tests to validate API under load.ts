import { check, sleep } from "k6";
import http from "k6/http";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const userCreationTime = new Trend("user_creation_duration");

// Test configuration
export const options = {
  stages: [
    { duration: "30s", target: 10 }, // Ramp up to 10 users
    { duration: "1m", target: 10 }, // Stay at 10 users
    { duration: "30s", target: 50 }, // Ramp up to 50 users
    { duration: "1m", target: 50 }, // Stay at 50 users
    { duration: "30s", target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% of requests under 500ms
    http_req_failed: ["rate<0.1"], // Error rate under 10%
    errors: ["rate<0.1"],
  },
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export default function () {
  // Test 1: Get all users
  const usersResponse = http.get(`${BASE_URL}/users`);

  const usersCheck = check(usersResponse, {
    "GET /users status is 200": (r) => r.status === 200,
    "GET /users response time < 500ms": (r) => r.timings.duration < 500,
    "GET /users returns array": (r) => Array.isArray(JSON.parse(r.body)),
  });

  errorRate.add(!usersCheck);

  sleep(1);

  // Test 2: Get single user
  const userId = Math.floor(Math.random() * 10) + 1;
  const userResponse = http.get(`${BASE_URL}/users/${userId}`);

  check(userResponse, {
    "GET /users/:id status is 200": (r) => r.status === 200,
    "GET /users/:id has user data": (r) => {
      const user = JSON.parse(r.body);
      return user.id && user.name && user.email;
    },
  });

  sleep(1);

  // Test 3: Create new user
  const payload = JSON.stringify({
    name: `User ${__VU}-${__ITER}`,
    username: `user${__VU}_${__ITER}`,
    email: `user${__VU}_${__ITER}@example.com`,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const createStart = Date.now();
  const createResponse = http.post(`${BASE_URL}/users`, payload, params);
  const createDuration = Date.now() - createStart;

  userCreationTime.add(createDuration);

  const createCheck = check(createResponse, {
    "POST /users status is 201": (r) => r.status === 201,
    "POST /users returns created user": (r) => {
      const user = JSON.parse(r.body);
      return user.id !== undefined;
    },
  });

  errorRate.add(!createCheck);

  sleep(1);

  // Test 4: Update user
  const updatePayload = JSON.stringify({
    name: `Updated User ${__VU}`,
    email: `updated${__VU}@example.com`,
  });

  const updateResponse = http.put(
    `${BASE_URL}/users/${userId}`,
    updatePayload,
    params,
  );

  check(updateResponse, {
    "PUT /users/:id status is 200": (r) => r.status === 200,
  });

  sleep(1);

  // Test 5: Delete user
  const deleteResponse = http.del(`${BASE_URL}/users/${userId}`);

  check(deleteResponse, {
    "DELETE /users/:id status is 200": (r) => r.status === 200,
  });

  sleep(2);
}

// Setup function - runs once before the test
export function setup() {
  console.log("Setting up test environment...");
  // Could initialize test data here
  return { timestamp: new Date().toISOString() };
}

// Teardown function - runs once after the test
export function teardown(data) {
  console.log(`Test completed at: ${new Date().toISOString()}`);
  console.log(`Test started at: ${data.timestamp}`);
}

// Alternative: Spike test configuration
export const spikeTestOptions = {
  stages: [
    { duration: "10s", target: 5 }, // Normal load
    { duration: "10s", target: 100 }, // Sudden spike
    { duration: "20s", target: 100 }, // Hold spike
    { duration: "10s", target: 5 }, // Return to normal
  ],
};

// Alternative: Stress test configuration
export const stressTestOptions = {
  stages: [
    { duration: "2m", target: 100 }, // Ramp up
    { duration: "5m", target: 100 }, // Stay at 100
    { duration: "2m", target: 200 }, // Ramp up more
    { duration: "5m", target: 200 }, // Stay at 200
    { duration: "2m", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(99)<1000"],
    http_req_failed: ["rate<0.05"],
  },
};

// Smoke test - minimal load to verify functionality
export const smokeTestOptions = {
  vus: 1,
  duration: "1m",
  thresholds: {
    http_req_duration: ["p(95)<300"],
    http_req_failed: ["rate<0.01"],
  },
};
