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