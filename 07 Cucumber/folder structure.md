**Recommended Structure:**

```
test/E2E/
├── cucumber.js
├── features/
│   ├── login.feature
│   ├── checkout.feature
│   └── step_definitions/
│       ├── login_steps.js       (calls page objects)
│       ├── checkout_steps.js
│       └── common_steps.js
├── pages/                        (Page Object Model)
│   ├── LoginPage.js
│   ├── CheckoutPage.js
│   ├── TodoPage.js
│   └── BasePage.js              (common methods)
└── helpers/                      (Reusable business logic)
    ├── paymentHelper.js         ("take an advance", "pay out scheduled payment")
    ├── authHelper.js
    └── dataHelper.js
```

**Key principles:**

1. **Step definitions** = thin layer, just call page objects
2. **Page Objects** = one class per page, contains locators & page actions
3. **Helpers** = reusable business logic that spans multiple pages
4. **Scenarios can use multiple pages** - totally fine! Steps call different page objects as needed

Sometimes AI **do not follow** POM structure and put selectors to steps file.

