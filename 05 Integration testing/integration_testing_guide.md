# Integration Testing Layer - Complete Guide

## Overview

Integration tests verify how multiple units (components, services, stores, APIs) work together in realistic scenarios. They're the sweet spot between unit tests (too isolated) and E2E tests (too slow).

---

## File Structure & Relationships

```
tests/integration/
├── auth/
│   └── login.integration.test.ts          # Auth flows & tokens
├── data-fetching/
│   └── user-list.integration.test.ts      # Data loading, pagination, caching
├── forms/
│   └── user-profile-form.integration.test.ts  # Form validation & submission
└── workflows/
    └── checkout.integration.test.ts       # Multi-step user journeys
```

### Cross-Folder Connections

```
┌─────────────────────────────────────────────────┐
│         Workflows (checkout flow)               │
│  Uses: Auth + Forms + Data-fetching             │
└─────────────────────────────────────────────────┘
           ↓            ↓            ↓
    ┌─────────┐   ┌────────────┐   ┌──────────┐
    │   Auth  │   │  Forms     │   │ Data-Fch │
    │ (login) │   │(validation)│   │(products)│
    └─────────┘   └────────────┘   └──────────┘
           ↓            ↓            ↓
    ┌─────────────────────────────────────────┐
    │    Shared Context & State Management    │
    │  (AuthContext, CartContext, QueryClient)│
    └─────────────────────────────────────────┘
```

---

## Core Patterns

### 1. **Render with Providers**

Every integration test needs a "wrapper" component that provides context:

```typescript
const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            {component}
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
```

**Why**: Tests must run with the same providers as real app, ensuring context works correctly.

---

### 2. **Mock External Services Only**

```typescript
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

// ✅ Good: Mock external API
mockedAxios.post.mockResolvedValueOnce(mockResponse);

// ❌ Bad: Don't mock internal components
// vi.mock('@/components/Button'); // Don't do this!
```

**Why**: Test real component logic, but isolate external dependencies (APIs, third-party services).

---

### 3. **Test Double Strategy**

```typescript
// Stub: Return canned response without validation
mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

// Spy: Track calls while letting real behavior happen
const spy = vi.spyOn(console, 'log');

// Mock: Full replacement with custom behavior
mockedAxios.post.mockImplementationOnce((url, data) => {
  if (data.email === 'taken@example.com') {
    throw new Error('Email exists');
  }
  return Promise.resolve({ data: { success: true } });
});
```

**Use case**:
- **Stubs** for happy path tests (quick, simple)
- **Spies** to verify behavior without changing it
- **Mocks** for complex conditional responses

---

## Folder-Specific Patterns

### **Auth Folder** (`/auth`)

**Tests**: Login, logout, token refresh, permission checks

**Key patterns**:
- Test localStorage/sessionStorage interactions
- Verify JWT token handling
- Test unauthorized redirects
- Test credential validation

**Example flow**:
```
User enters credentials 
  → Form validation (client) 
  → API call with credentials 
  → Token stored 
  → State updated 
  → Navigation triggered
```

---

### **Data-Fetching Folder** (`/data-fetching`)

**Tests**: Async data loading, pagination, filtering, caching, error states

**Key patterns**:
- Test loading states (skeleton, spinner)
- Verify React Query caching behavior
- Test pagination and sorting
- Test stale data invalidation

**Example flow**:
```
Component mounts 
  → Loading state shown 
  → API called with params 
  → Data cached by React Query 
  → Navigation away/back uses cache 
  → Filter change invalidates cache 
  → New API call made
```

---

### **Forms Folder** (`/forms`)

**Tests**: Validation, submission, file uploads, error messages, field interactions

**Key patterns**:
- onChange validation (real-time feedback)
- onBlur validation (after field loses focus)
- onSubmit validation (before API call)
- Server-side validation error handling
- Conditional fields (show/hide based on state)

**Example flow**:
```
User types 
  → Real-time validation triggers 
  → Error appears/disappears 
  → User submits 
  → Client validation prevents bad data 
  → API called 
  → Server returns validation errors 
  → Errors mapped to fields
```

---

### **Workflows Folder** (`/workflows`)

**Tests**: Multi-step journeys, feature interactions, state across pages

**Key patterns**:
- Complete user journeys (login → browse → purchase)
- State persistence across navigation
- Error recovery without data loss
- Multi-step form validation
- Complex calculations (tax, shipping, discounts)

**Example flow**:
```
Start: Browse products 
  → Add items to cart 
  → Cart persists across nav 
  → Checkout: fill shipping 
  → Verify inventory 
  → Apply discount 
  → Payment processing 
  → Confirmation email sent 
  → Order confirmation shown
```

---

## Best Practices Checklist

### ✅ Setup & Teardown

```typescript
beforeEach(() => {
  vi.clearAllMocks();      // Reset mocks
  localStorage.clear();    // Clear storage
  // Note: Don't reset DB in integration tests
});

afterEach(() => {
  vi.clearAllMocks();      // Clean up
});
```

### ✅ User Interactions

```typescript
// Always use userEvent, never fireEvent
const user = userEvent.setup();
await user.type(input, 'text');        // ✅
await user.click(button);
await user.selectOptions(select, 'value');

// Bad:
fireEvent.change(input, { target: { value: 'text' } }); // ❌
```

**Why**: `userEvent` simulates real user behavior (delays, event order).

### ✅ Async Handling

```typescript
// Wait for API responses
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});

// Don't wait unnecessarily
expect(screen.getByRole('button')).toBeDisabled(); // ✅ (sync state)

// Bad:
await waitFor(() => {
  expect(screen.getByRole('button')).toBeDisabled(); // ❌ (overkill)
});
```

### ✅ Query Selectors

```typescript
// Prefer accessible queries (mimics user perspective)
screen.getByRole('button', { name: /submit/i })     // ✅ Best
screen.getByLabelText(/email/i)                      // ✅ Good
screen.getByPlaceholderText(/search/i)               // ✅ Good
screen.getByText('Specific text')                    // ⚠️ Use sparingly
screen.getByTestId('element')                        // ⚠️ Last resort
```

### ✅ Assertions

```typescript
// Verify API calls
expect(mockedAxios.post).toHaveBeenCalledWith(
  '/api/users',
  { name: 'John' },
  expect.any(Object)
);

// Verify state updates
expect(localStorage.getItem('token')).toBe('xyz');

// Verify UI updates
expect(screen.getByText(/saved/i)).toBeInTheDocument();

// Verify navigation
expect(window.location.pathname).toBe('/dashboard');
```

### ✅ Mocking Strategy

```typescript
// Mock at module level
vi.mock('axios');

// Reset before each test
beforeEach(() => vi.clearAllMocks());

// Setup expectations per-test
it('test 1', () => {
  mockedAxios.get.mockResolvedValueOnce(response1);
  // test code
});

it('test 2', () => {
  mockedAxios.get.mockResolvedValueOnce(response2);
  // test code
});
```

---

## Common Test Patterns

### Pattern 1: Happy Path
```typescript
it('should complete successfully', async () => {
  mockedAxios.post.mockResolvedValueOnce(successResponse);
  // arrange, act, assert
});
```

### Pattern 2: Error Handling
```typescript
it('should handle errors gracefully', async () => {
  mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));
  // arrange, act, assert error display
});
```

### Pattern 3: State Transitions
```typescript
it('should transition through loading states', async () => {
  expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Loading
  await waitFor(() => expect(screen.getByText('Data')).toBeInTheDocument()); // Success
});
```

### Pattern 4: API Contract Verification
```typescript
it('should call API with correct parameters', async () => {
  // ... setup
  expect(mockedAxios.post).toHaveBeenCalledWith(
    '/api/endpoint',
    { expectedData },
    expect.any(Object)
  );
});
```

---

## Common Pitfalls to Avoid

| ❌ Anti-Pattern | ✅ Better Approach |
|---|---|
| Using `setTimeout` for waiting | Use `waitFor()` with conditions |
| Mocking internal components | Mock only external services (APIs) |
| Not clearing mocks between tests | Use `beforeEach(() => vi.clearAllMocks())` |
| Ignoring async/await | Always await user interactions |
| Testing implementation details | Test user behavior and outcomes |
| No error test cases | Always test error paths |
| Slow API responses | Use immediate mock resolution |
| Not testing validation | Test client and server validation |

---

## When to Use Integration Tests vs Others

| Test Type | When to Use |
|---|---|
| **Unit** | Single component/function in isolation |
| **Integration** | Multiple components working together, API interactions |
| **E2E** | Complete user workflows in real browser (slower) |
| **Component** | Single component with complex internal logic |

**Pyramid rule**: Many unit tests (40%), moderate integration tests (35%), few E2E tests (25%)

---

## Debugging Tips

```typescript
// Log rendered output
screen.debug(); // Shows full DOM

// Check mock calls
console.log(mockedAxios.post.mock.calls);

// Show only specific element
screen.debug(screen.getByRole('form'));

// Wait longer during debugging
await waitFor(() => { ... }, { timeout: 5000 });
```

---

## Coverage Goals

- **Auth folder**: 100% of auth flows
- **Data-fetching folder**: Loading, success, error, empty, pagination states
- **Forms folder**: Validation, submission, error handling, edge cases
- **Workflows folder**: Happy paths, error recovery, state persistence

Aim for **80-90% integration test coverage** of critical user paths.