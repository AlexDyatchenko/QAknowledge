# Playwright API Testing - Best Practice Structure

[playwright-typescript API boilerplate GitHub](https://github.com/akshayp7/playwright-typescript-playwright-test)

I'll create a comprehensive, production-ready project structure for API testing with Playwright and TypeScript.I've created a comprehensive best-practice structure for API testing with Playwright and TypeScript. Here are the key highlights:

**Architecture Highlights:**

- **Modular organization** with clear separation of concerns (config, fixtures, API clients, auth, models, utilities)
- **BaseClient** class for centralized HTTP request handling with built-in error management
- **AuthManager & TokenManager** for secure authentication and token lifecycle management
- **Fixture-based approach** using Playwright's dependency injection for reusable test setup
- **Path aliases** in tsconfig for cleaner imports
- **Environment-specific configuration** supporting dev, staging, and production

**Key Features:**

- Comprehensive error handling and logging with Pino
- Retry mechanisms for resilient testing
- Support for bearer token authentication
- Multiple environment profiles in playwright.config
- Test data separation for maintainability
- HTML and JSON reporting

**Additional Components I Included:**

- Request/response interceptors structure
- Data models for type safety
- Test data builder utilities
- Validators for response assertions
- Helper utilities and retry handlers

You can customize the auth endpoint, headers, and request methods based on your specific API requirements. The structure scales well from small projects to large testing suites.

## Project Structure

```
api-testing-framework/
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .env
├── .env.example
├── .gitignore
├── README.md
│
├── src/
│   ├── config/
│   │   ├── config.ts
│   │   └── environments.ts
│   │
│   ├── fixtures/
│   │   ├── api.fixture.ts
│   │   ├── auth.fixture.ts
│   │   ├── data.fixture.ts
│   │   └── custom.fixture.ts
│   │
│   ├── api/
│   │   ├── baseClient.ts
│   │   ├── endpoints/
│   │   │   ├── users.api.ts
│   │   │   ├── posts.api.ts
│   │   │   └── auth.api.ts
│   │   └── interceptors/
│   │       ├── requestInterceptor.ts
│   │       └── responseInterceptor.ts
│   │
│   ├── auth/
│   │   ├── authManager.ts
│   │   ├── tokenManager.ts
│   │   └── credentials.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── post.model.ts
│   │   ├── response.model.ts
│   │   └── error.model.ts
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── testDataBuilder.ts
│   │   ├── validators.ts
│   │   ├── helpers.ts
│   │   └── retryHandler.ts
│   │
│   └── constants/
│       └── apiConstants.ts
│
├── tests/
│   ├── api/
│   │   ├── users/
│   │   │   ├── getUsers.spec.ts
│   │   │   ├── createUser.spec.ts
│   │   │   └── updateUser.spec.ts
│   │   │
│   │   ├── posts/
│   │   │   ├── getPosts.spec.ts
│   │   │   └── createPost.spec.ts
│   │   │
│   │   └── auth/
│   │       ├── login.spec.ts
│   │       ├── logout.spec.ts
│   │       └── refreshToken.spec.ts
│   │
│   └── smoke/
│       └── healthCheck.spec.ts
│
├── test-data/
│   ├── users.json
│   ├── posts.json
│   └── payloads/
│       ├── createUserPayload.json
│       └── updateUserPayload.json
│
├── reports/
│   ├── html/
│   └── json/
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Key Configuration Files

### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/results.json' }],
    ['list'],
  ],
  timeout: 30000,
  expect: { timeout: 10000 },
  use: {
    baseURL: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'development',
      use: { baseURL: process.env.DEV_URL },
    },
    {
      name: 'staging',
      use: { baseURL: process.env.STAGING_URL },
    },
    {
      name: 'production',
      use: { baseURL: process.env.PROD_URL },
    },
  ],
});
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@config/*": ["src/config/*"],
      "@fixtures/*": ["src/fixtures/*"],
      "@api/*": ["src/api/*"],
      "@auth/*": ["src/auth/*"],
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"],
      "@constants/*": ["src/constants/*"]
    }
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### package.json
```json
{
  "name": "api-testing-framework",
  "version": "1.0.0",
  "description": "Playwright API Testing Framework",
  "scripts": {
    "test": "playwright test",
    "test:dev": "playwright test --project=development",
    "test:staging": "playwright test --project=staging",
    "test:prod": "playwright test --project=production",
    "test:smoke": "playwright test tests/smoke",
    "test:debug": "playwright test --debug",
    "test:headed": "playwright test --headed",
    "report": "playwright show-report",
    "lint": "eslint src tests",
    "format": "prettier --write src tests"
  },
  "dependencies": {
    "@playwright/test": "^1.48.0",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "joi": "^17.11.0",
    "pino": "^8.17.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0"
  }
}
```

---

## Core Implementation Files

### src/config/config.ts
```typescript
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
  apiTimeout: parseInt(process.env.API_TIMEOUT || '10000', 10),
  environment: process.env.ENVIRONMENT || 'development',
  
  auth: {
    username: process.env.AUTH_USERNAME || '',
    password: process.env.AUTH_PASSWORD || '',
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    tokenEndpoint: process.env.TOKEN_ENDPOINT || '',
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: process.env.LOGGING_ENABLED !== 'false',
  },

  retry: {
    maxAttempts: parseInt(process.env.RETRY_ATTEMPTS || '3', 10),
    delayMs: parseInt(process.env.RETRY_DELAY || '1000', 10),
  },
};
```

### src/api/baseClient.ts
```typescript
import { APIRequestContext } from '@playwright/test';
import { config } from '@config/config';
import { logger } from '@utils/logger';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

export class BaseClient {
  constructor(private request: APIRequestContext) {}

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const url = `${config.baseUrl}${endpoint}`;
      logger.info(`GET ${url}`);
      
      const response = await this.request.get(url, {
        headers: options?.headers,
        params: options?.params,
        timeout: options?.timeout || config.apiTimeout,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`GET request failed: ${error}`);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const url = `${config.baseUrl}${endpoint}`;
      logger.info(`POST ${url}`, data);
      
      const response = await this.request.post(url, {
        data,
        headers: options?.headers,
        timeout: options?.timeout || config.apiTimeout,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`POST request failed: ${error}`);
      throw error;
    }
  }

  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    try {
      const url = `${config.baseUrl}${endpoint}`;
      logger.info(`PUT ${url}`, data);
      
      const response = await this.request.put(url, {
        data,
        headers: options?.headers,
        timeout: options?.timeout || config.apiTimeout,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`PUT request failed: ${error}`);
      throw error;
    }
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    try {
      const url = `${config.baseUrl}${endpoint}`;
      logger.info(`DELETE ${url}`);
      
      const response = await this.request.delete(url, {
        headers: options?.headers,
        timeout: options?.timeout || config.apiTimeout,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`DELETE request failed: ${error}`);
      throw error;
    }
  }

  private async handleResponse<T>(response: any): Promise<T> {
    const status = response.status();
    const body = await response.json().catch(() => response.text());
    
    logger.info(`Response Status: ${status}`);
    
    if (status >= 400) {
      logger.error(`Error Response: ${JSON.stringify(body)}`);
      throw new Error(`API Error: ${status} - ${JSON.stringify(body)}`);
    }
    
    return body as T;
  }
}
```

### src/auth/authManager.ts
```typescript
import { APIRequestContext } from '@playwright/test';
import { config } from '@config/config';
import { TokenManager } from './tokenManager';
import { logger } from '@utils/logger';

export class AuthManager {
  private tokenManager: TokenManager;

  constructor(private request: APIRequestContext) {
    this.tokenManager = new TokenManager();
  }

  async login(username: string, password: string): Promise<string> {
    try {
      logger.info(`Logging in user: ${username}`);
      
      const response = await this.request.post(
        `${config.baseUrl}${config.auth.tokenEndpoint}`,
        {
          data: {
            username,
            password,
            clientId: config.auth.clientId,
            clientSecret: config.auth.clientSecret,
          },
        }
      );

      const body = await response.json();
      const token = body.accessToken || body.token;

      if (!token) {
        throw new Error('No token received from login response');
      }

      this.tokenManager.setToken(token);
      logger.info('Login successful');
      return token;
    } catch (error) {
      logger.error(`Login failed: ${error}`);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      logger.info('Logging out user');
      this.tokenManager.clearToken();
      logger.info('Logout successful');
    } catch (error) {
      logger.error(`Logout failed: ${error}`);
      throw error;
    }
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.tokenManager.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  isAuthenticated(): boolean {
    return this.tokenManager.hasToken();
  }
}
```

### src/auth/tokenManager.ts
```typescript
export class TokenManager {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  setToken(token: string, expiresIn?: number): void {
    this.token = token;
    if (expiresIn) {
      this.tokenExpiry = Date.now() + expiresIn * 1000;
    }
  }

  getToken(): string | null {
    if (this.tokenExpiry && Date.now() > this.tokenExpiry) {
      this.clearToken();
      return null;
    }
    return this.token;
  }

  hasToken(): boolean {
    return this.getToken() !== null;
  }

  clearToken(): void {
    this.token = null;
    this.tokenExpiry = null;
  }

  isExpired(): boolean {
    return this.tokenExpiry !== null && Date.now() > this.tokenExpiry;
  }
}
```

### src/fixtures/api.fixture.ts
```typescript
import { test as base, APIRequestContext } from '@playwright/test';
import { BaseClient } from '@api/baseClient';
import { AuthManager } from '@auth/authManager';

type APIFixtures = {
  apiClient: BaseClient;
  authManager: AuthManager;
};

export const test = base.extend<APIFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new BaseClient(request);
    await use(client);
  },

  authManager: async ({ request }, use) => {
    const authManager = new AuthManager(request);
    await use(authManager);
    await authManager.logout().catch(() => {});
  },
});

export { expect } from '@playwright/test';
```

### src/fixtures/auth.fixture.ts
```typescript
import { test as base } from '@playwright/test';
import { AuthManager } from '@auth/authManager';
import { config } from '@config/config';

type AuthFixtures = {
  authenticatedUser: { token: string; username: string };
};

export const test = base.extend<AuthFixtures>({
  authenticatedUser: async ({ request }, use) => {
    const authManager = new AuthManager(request);
    const token = await authManager.login(
      config.auth.username,
      config.auth.password
    );

    await use({
      token,
      username: config.auth.username,
    });

    await authManager.logout();
  },
});

export { expect } from '@playwright/test';
```

### src/utils/logger.ts
```typescript
import pino from 'pino';
import { config } from '@config/config';

const pinoLogger = pino({
  level: config.logging.level,
  enabled: config.logging.enabled,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});

export const logger = {
  info: (message: string, data?: any) => pinoLogger.info({ data }, message),
  error: (message: string, data?: any) => pinoLogger.error({ data }, message),
  warn: (message: string, data?: any) => pinoLogger.warn({ data }, message),
  debug: (message: string, data?: any) => pinoLogger.debug({ data }, message),
};
```

---

## Sample Test File

### tests/api/users/getUsers.spec.ts
```typescript
import { test, expect } from '@fixtures/api.fixture';

test.describe('Users API', () => {
  test('GET /users should return list of users', async ({ apiClient }) => {
    const users = await apiClient.get('/users');
    
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
  });

  test('GET /users/:id should return specific user', async ({ apiClient }) => {
    const user = await apiClient.get('/users/1');
    
    expect(user).toHaveProperty('id');
    expect(user.id).toBe(1);
    expect(user).toHaveProperty('name');
  });
});
```

---

## Environment Configuration

### .env.example
```
# Application
ENVIRONMENT=development
BASE_URL=https://jsonplaceholder.typicode.com
DEV_URL=https://dev-api.example.com
STAGING_URL=https://staging-api.example.com
PROD_URL=https://api.example.com

# API Configuration
API_TIMEOUT=10000

# Authentication
AUTH_USERNAME=testuser
AUTH_PASSWORD=testpass123
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
TOKEN_ENDPOINT=/auth/login

# Retry Policy
RETRY_ATTEMPTS=3
RETRY_DELAY=1000

# Logging
LOG_LEVEL=info
LOGGING_ENABLED=true
```

---

## Running Tests

```bash
# Run all tests
npm run test

# Run environment-specific tests
npm run test:dev
npm run test:staging

# Run smoke tests
npm run test:smoke

# Debug mode
npm run test:debug

# View HTML report
npm run report
```

This structure provides scalability, maintainability, and follows industry best practices for API testing with Playwright.
