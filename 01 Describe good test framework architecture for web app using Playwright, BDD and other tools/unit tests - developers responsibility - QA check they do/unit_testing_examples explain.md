## Structure & Format Overview

**Test File Naming**: `[functionName].test.ts` or `[componentName].test.tsx` - matches the source file name with `.test` suffix

**Imports**: Each test imports from Vitest (modern, fast test runner) and Testing Library (React testing utilities)

## Key Characteristics by Folder

**Utils Tests** (pure functions)
- Simple input → output testing
- Cover happy paths, edge cases, and error states
- No mocking needed (unless external dependencies)
- Clear AAA pattern (Arrange, Act, Assert)

**Hooks Tests** (React hooks)
- Mock external services and API calls
- Use `renderHook` to test hooks outside components
- Test state changes, side effects, and async operations
- Verify integration with services (shown with `authService` mocking)

**Components Tests** (React components)
- Test rendering, props, variants, states
- Use `render` and `screen` queries
- Test user interactions with `userEvent`
- Verify accessibility features
- No deep implementation details—focus on behavior

**Services Tests** (API/business logic)
- Mock API client (the `apiClient` dependency)
- Test data transformation and formatting
- Verify correct API endpoints and methods called
- Test error handling and edge cases
- Test caching, validation logic

## Connections Between Layers

1. **Components use Hooks** → Components test mocks the services that hooks depend on
2. **Hooks use Services** → Hooks test mocks the services layer
3. **Services use API Client** → Services test mocks the API client
4. **Utils are pure** → No mocking, called by everything

The tests show realistic patterns: proper error handling, async operations, caching behavior, and validation logic that you'd actually use in production.