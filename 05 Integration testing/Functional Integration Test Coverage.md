**Checking Functional/Integration Test Coverage**

This is trickier because "coverage" at the functional level isn't measured the same way as code coverage. Here are the approaches:

**1. Requirements Traceability Matrix (RTM)**

Create a mapping of test cases to requirements:

- List all functional requirements (e.g., "User can login," "User can update profile," "System should reject invalid passwords")
- Map each requirement to test cases that validate it
- Track which requirements have tests and which don't

Example:

| Requirement ID | Requirement | Test Case ID | Status |
|---|---|---|---|
| REQ-001 | User login with email | TC-LOGIN-001 | ✓ Covered |
| REQ-002 | User login with username | TC-LOGIN-002 | ✓ Covered |
| REQ-003 | Password reset functionality | TC-RESET-001 | ✗ Not Covered |

**2. Test Case Management Tools**

Use tools like TestRail, Zephyr, or Azure Test Plans to:
- Organize test cases by feature/module
- Track which tests have been executed and passed
- Generate reports showing "% of requirements tested"

**3. Manual Coverage Analysis**

For simpler systems, create a spreadsheet:
- Column 1: All user workflows/scenarios
- Column 2: Test case that covers it
- Sum up: "45 out of 50 workflows covered = 90% functional coverage"

**4. Functional Coverage Metrics in Test Reports**

Track coverage by feature area:

```
Feature: User Authentication
- Login with valid credentials: ✓ Tested
- Login with invalid credentials: ✓ Tested
- Password reset: ✓ Tested
- Session timeout: ✓ Tested
- Multi-factor authentication: ✗ Not tested
Coverage: 4/5 = 80%

Feature: User Profile
- View profile: ✓ Tested
- Update profile: ✓ Tested
- Delete account: ✗ Not tested
Coverage: 2/3 = 67%
```

**5. Integration Test Coverage**

For integration testing, track:

- **API integrations**: Which APIs have been tested (e.g., "Payment gateway integration: 8/10 endpoints tested")
- **Database interactions**: Which database operations are tested (CRUD operations per entity)
- **Third-party service integrations**: Which external services have integration tests
- **Data flow**: Which end-to-end workflows have been validated

Example integration coverage report:

```
Payment Module Integration:
- Create payment: ✓ Tested
- Verify payment with bank: ✓ Tested
- Refund payment: ✗ Not tested
- Handle payment timeout: ✓ Tested
Coverage: 3/4 = 75%
```

**6. Risk-Based Coverage**

Instead of testing everything equally, prioritize:
- **Critical paths**: User login, payment processing, data security—must have near 100% coverage
- **Medium risk**: User profile updates, notifications—aim for 80%+
- **Low risk**: Admin reports, minor UI features—aim for 50%+

**Practical Implementation**

Most teams combine approaches:

1. **Requirements Traceability Matrix** for functional requirements
2. **Feature-based tracking** in test management tools
3. **Regular coverage reports** showing gaps
4. **Sprint reviews** where QA reports uncovered functionality

When gaps are found (e.g., "Password reset not tested"), they become work items for the next sprint.

---

**Key Difference**

- **Code coverage** (unit tests): Automated, precise, measurable by tools
- **Functional coverage** (QA tests): Manual tracking, requires discipline, measured by requirements/workflows mapped to tests

That's why functional coverage is harder—there's no automated way to detect it. You must actively maintain traceability between what you're supposed to test and what you've actually tested.