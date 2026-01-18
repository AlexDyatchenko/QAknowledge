## 2. **Gherkin - The Language**
**What it is:** A business-readable, domain-specific language (DSL) that BDD specifications are written in.

**Key components:**
```gherkin
Feature: User login
  As a registered user
  I want to login to the system
  So that I can access my account

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter "test@email.com" in the email field
    And I enter "password123" in the password field
    And I click the login button
    Then I should see the dashboard
    And I should see "Welcome, User!" message
```

**Structure:**
- `Feature`: Describes a feature/functionality
- `Scenario`: A concrete example/use case
- `Given`: Preconditions/initial state
- `When`: Actions/events
- `Then`: Expected outcomes