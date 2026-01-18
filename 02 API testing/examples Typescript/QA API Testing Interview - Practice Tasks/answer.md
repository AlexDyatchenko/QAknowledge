Prompt: I am going to prepare to technical practical interview for the position of QA API tester. Tech stack: Playwright, Typescript, Wiremock, k6. Interview time: 1h.
give me example of the task I can get on such interview?
Offer proper solution with the code to practice.


# QA API Testing Interview - Practice Tasks

Based on a 1-hour technical interview for a QA API tester position with your tech stack, here are realistic tasks you might encounter:

## Task 1: API Test Automation with Playwright + TypeScript (20-25 min)

**Scenario**: You need to test a REST API for a simple user management service.

**Requirements**:
- Test GET /users endpoint
- Test POST /users endpoint with validation
- Test error scenarios (404, 400)
- Use proper assertions and test structure## Task 2: API Mocking with WireMock (15-20 min)

**Scenario**: Create mock responses for testing without relying on real backend.## Task 3: Performance Testing with k6 (15-20 min)

**Scenario**: Write performance tests to validate API under load.## Task 4: Integration Test (Full Scenario)

**Scenario**: Combine everything - test a complete user workflow using mocks and validate performance.## Additional Files You'll Need

### Package.json configuration:

```json
{
  "name": "qa-api-testing",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "k6:run": "k6 run k6-tests.ts",
    "k6:smoke": "k6 run --vus 1 --duration 30s k6-tests.ts",
    "wiremock": "java -jar wiremock-standalone.jar --port 8080"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

### Playwright config (playwright.config.ts):

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  retries: 1,
  workers: 4,
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
});
```

## Interview Tips:

1. **Explain your approach** - Talk through your testing strategy
2. **Ask clarifying questions** - About API specs, expected behavior, edge cases
3. **Write clean code** - Use proper naming, add comments for complex logic
4. **Think about edge cases** - Null values, empty arrays, error responses
5. **Demonstrate best practices**:
   - Proper assertion messages
   - Test isolation (setup/teardown)
   - Reusable helper functions
   - Environment variables for config

## Common Interview Questions to Prepare:

- "How would you test authentication/authorization?"
- "How do you handle flaky tests?"
- "Explain the difference between smoke, regression, and load testing"
- "How would you test rate limiting?"
- "What metrics are important for API testing?"
- "How do you manage test data?"

Good luck with your interview! Practice running these tests and be ready to explain your decisions.