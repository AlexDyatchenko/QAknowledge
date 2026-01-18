Prompt for API functionality testing:

- Add one more test to check response time to be less than 200ms - use 3 attempts until you get less than 200ms, fail only after last attempt.
- Add one more test and create mock responses for testing without relying on real backend.
-

Generate a comprehensive Playwright API test suite for the following endpoint: [INSERT ENDPOINT, e.g., POST /api/v1/orders].

Requirements:

    Modular Architecture: Organize the response according to a production-ready folder structure:

        modules/users/users.api.ts: Create a class-based API wrapper for this endpoint.

        tests/api/endpoint_name.spec.ts: The main test file.

        fixtures/mocks/schema.json: A JSON Schema for the successful response.

    Authentication Scenarios: > * Include a test case using a valid Authorization header (Bearer token).

        Include a negative test case for 'Unauthorized' (missing/invalid token).

    Validation & Schema: > * Use AJV to validate the response body against a JSON schema.

        Check specific headers (e.g., Content-Type: application/json).

        Assert status codes (2xx for success, 4xx/5xx for failures).

    Functional Test Cases:

        Success Path: Valid payload and response verification.

        Boundary Testing: Test with minimum/maximum allowed data lengths.

        Error Handling: Send an invalid payload (missing required fields) and assert a 400 Bad Request.

        Performance: Assert that the response time is within a specific threshold (e.g., <500ms).

    Mocking (WireMock Pattern): Provide a code snippet demonstrating how to stub this endpoint using the WireMock pattern from my reference code for local isolation.

    Dynamic Data: Use a payload-builder.ts logic or a faker-style approach to ensure every test run uses unique data.

Context: Use the provided project structure where tests, modules, and fixtures are separated to ensure maintainability.
Update readme.md if needed.
Use emoji in headings where appropriate to enhance readability.
Run and check all tests are working fine as expected.
fix all errors in all created or updated ts files.

Use folder structure:

```
project-root/
├── playwright/
│   ├── .auth/                           # Auth tokens/storage state (add to .gitignore)
│   │   └── user.json                    # Saved auth state
│   └── fixtures/                        # Custom test fixtures
│       ├── page-object-fixture.ts       # POM-based page object fixtures
│       └── api-fixture.ts               # API helper fixtures
│
├── tests/
│   ├── auth/
│   │   ├── login.setup.ts               # Sets up authenticated state
│   │   └── login.spec.ts                # UI login tests
│   │
│   ├── api/                             # API-only tests
│   │   ├── users.spec.ts
│   │   ├── posts.spec.ts
│   │   └── auth.api.spec.ts
│   │
│   ├── ui/                              # UI-only tests
│   │   ├── dashboard.spec.ts
│   │   ├── profile.spec.ts
│   │   └── navigation.spec.ts
│   │
│   ├── integration/                     # Combined API + UI tests
│   │   ├── user-creation-flow.spec.ts   # Create via API, verify in UI
│   │   └── data-sync.spec.ts
│   │
│   └── e2e/                             # Full end-to-end flows
│       ├── signup-to-dashboard.spec.ts
│       └── purchase-flow.spec.ts
│
├── pages/                               # Page Object Models
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   └── profile.page.ts
│
├── modules/                             # Shared business logic & modules
│   ├── auth/
│   │   ├── auth.helper.ts               # Auth utilities (login, logout, etc)
│   │   └── auth.api.ts                  # API authentication helper
│   │
│   ├── users/
│   │   ├── users.api.ts                 # User API endpoints wrapper
│   │   └── users.helper.ts              # User utility functions
│   │
│   └── data/
│       ├── test-data.ts                 # Test data constants
│       └── payload-builder.ts           # Build API request payloads
│
├── utils/
│   ├── api-client.ts                    # Reusable API request wrapper
│   ├── common-utils.ts                  # General utility functions
│   ├── date-utils.ts
│   ├── string-utils.ts
│   └── constants.ts                     # Shared constants & enums
│
├── fixtures/
│   ├── mocks/                           # Mock API responses
│   │   ├── user-response.json
│   │   └── posts-response.json
│   └── test-data/                       # Test data files
│       └── users.json
│
├── .env                                 # Environment variables (local, gitignored)
├── .env.example                         # Example env file for reference
├── .gitignore
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```
