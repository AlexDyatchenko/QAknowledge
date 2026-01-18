Great question. The test structure **mirrors your src structure** as the project grows. Here's how it evolves:

## Small Project (100s of files)
```
src/
├── utils/
├── hooks/
├── components/
└── services/

tests/unit/
├── utils/
├── hooks/
├── components/
└── services/
```
Simple 1:1 mapping. No problem organizing everything.

## Medium Project (1000s of files)
Your src gets organized by **feature/domain**, and tests follow:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── payments/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── reporting/
│       ├── components/
│       ├── hooks/
│       └── services/
└── shared/
    ├── components/
    ├── hooks/
    ├── services/
    └── utils/

tests/unit/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── payments/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── reporting/
│       ├── components/
│       ├── hooks/
│       └── services/
└── shared/
    ├── components/
    ├── hooks/
    ├── services/
    └── utils/
```

**Key principle**: Tests follow the exact same folder hierarchy as src. No mega-folders with 1000 files.

## Large Project (10k+ files)
Add further subdivisions:

```
src/features/payments/
├── components/
│   ├── checkout/
│   │   ├── PaymentForm.tsx
│   │   ├── CardInput.tsx
│   │   └── PaymentSummary.tsx
│   ├── billing/
│   │   ├── InvoiceList.tsx
│   │   └── InvoiceDetail.tsx
│   └── admin/
│       └── PaymentAnalytics.tsx
├── hooks/
│   ├── usePayment.ts
│   ├── usePaymentValidation.ts
│   └── useStripeIntegration.ts
├── services/
│   ├── paymentService.ts
│   ├── stripeService.ts
│   └── invoiceService.ts
└── utils/
    ├── formatters.ts
    ├── validators.ts
    └── errorHandlers.ts

tests/unit/features/payments/
├── components/
│   ├── checkout/
│   │   ├── PaymentForm.test.tsx
│   │   ├── CardInput.test.tsx
│   │   └── PaymentSummary.test.tsx
│   ├── billing/
│   │   ├── InvoiceList.test.tsx
│   │   └── InvoiceDetail.test.tsx
│   └── admin/
│       └── PaymentAnalytics.test.tsx
├── hooks/
│   ├── usePayment.test.ts
│   ├── usePaymentValidation.test.ts
│   └── useStripeIntegration.test.ts
├── services/
│   ├── paymentService.test.ts
│   ├── stripeService.test.ts
│   └── invoiceService.test.ts
└── utils/
    ├── formatters.test.ts
    ├── validators.test.ts
    └── errorHandlers.test.ts
```

## Real-World Example: Scaling Pattern

**Typical file counts per folder**
- Any single folder: 5-20 files (stays manageable)
- If a folder exceeds 20-30 files: subdivide it further
- Leaf folders usually have 1-5 files

Leaf folders are the end folders in a directory tree — folders that contain files but no subfolders. 

**Bad growth** (don't do this):
```
tests/unit/components/  ← 500 test files in one folder 😱
```

**Good growth** (do this):
```
tests/unit/
├── features/auth/components/  ← 8 files
├── features/dashboard/components/  ← 12 files
├── features/payments/components/checkout/  ← 5 files
├── features/payments/components/billing/  ← 6 files
└── shared/components/  ← 10 files
```

## Configuration & Setup

You also typically add shared test configs:

```
tests/
├── unit/
│   ├── features/
│   ├── shared/
│   └── setup.ts  ← Shared test utilities, mocks
├── integration/
│   └── features/
├── e2e/
│   └── features/
├── vitest.config.ts  ← Test runner config
└── fixtures/  ← Mock data, test data (grows separately)
```

## Why Mirror Structure?

1. **Easy to navigate**: `src/features/auth/hooks/` → `tests/unit/features/auth/hooks/`
2. **Clear ownership**: Each team owns features and their tests together
3. **Import paths**: Can use relative imports consistently
4. **Scales naturally**: As src grows, tests grow proportionally in same places
5. **Discoverages missing tests**: If there's no test folder, you know coverage is missing

## Tools That Help

**IDE shortcuts**: VS Code extensions like "Test Explorer" let you jump between src and test files instantly

**Auto-generation**: Tools can scaffold test files matching src structure:
```bash
npm run generate-tests -- src/features/auth/hooks/useAuth.ts
# Creates: tests/unit/features/auth/hooks/useAuth.test.ts
```

**Coverage reports**: Show which src files lack tests, revealing gaps in your test structure

In summary: **Structure mirrors src exactly. Never put 1000 files in one folder. Subdivide when it gets unwieldy (20+ files per folder).**