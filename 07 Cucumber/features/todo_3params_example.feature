# features/login.feature
Feature: User Login

  As a registered user
  I want to log in securely
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter "alice@example.com" as email
    And I enter "securePassword123!" as password
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see a welcome message for "Alice"

  Scenario Outline: Login fails with invalid credentials
    Given I am on the login page
    When I enter "<email>" as email
    And I enter "<password>" as password
    And I click the login button
    Then I should see an error message "<error>"

    Examples:
      | email               | password           | error                          |
      | invalid@example.com | securePassword123! | "Invalid email or password."   |
      | alice@example.com   | wrongPass!         | "Invalid email or password."   |
      | ""                  | ""                 | "Email and password required." |