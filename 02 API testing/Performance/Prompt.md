Generate a robust k6 performance test script for the API endpoint: [INSERT ENDPOINT URL & METHOD].

Requirements:

- Load Profiles: Include multiple exported options objects for Smoke (1 VU), Load (Steady state), and Stress testing (Ramp-up to breaking point).

- Authentication: Include a placeholder for [INSERT AUTH TYPE, e.g., Bearer Token/API Key] in the headers.

- Validation: Implement check() calls for status codes, response time (<500ms), and verify that the response body contains [INSERT KEY FIELDS, e.g., 'id', 'status'].

- Custom Metrics: Define a Trend metric to track the latency of this specific operation and a Rate metric for custom business-logic errors.

- Thresholds: Set a threshold for p(95) response time and a failure rate of <1%.

- Dynamic Data: If it's a POST/PUT request, use dynamic data generation (using **VU and **ITER) to ensure unique payloads.

- Lifecycle: Include setup() and teardown() functions with console logging for test tracking.

- Pacing: Include a sleep(1) between iterations to simulate realistic user behavior.

- create separate test of each type:
  - smoke test
  - load test
  - stress test
  - spike test
  - soak test

Update readme.md if needed.
Use emoji in headings where appropriate to enhance readability.
Run and check all tests are working fine as expected.
fix all errors in all created or updated js files.
Don't put '✓' symbol in front of check messages in check() functions.
---

Comparison of Test Types

When using the prompt above, it helps to visualize which load profile you should run based on your goals:
| Test Type | Goal | Strategy |
| :--- | :--- | :--- |
| Smoke | Verify script works | 1-5 VUs for a very short duration. |
| Load | Test expected traffic | Steady state at your target concurrent users. |
| Stress | Find the breaking point | Continually increase users until errors occur or latency spikes. |
| Spike | Test sudden bursts | Rapidly jump from low to high traffic and back. |
| Soak | Test stability/leaks | Run at 80% capacity for hours or days. |
