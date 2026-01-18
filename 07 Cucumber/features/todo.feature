Feature: Sample Todo Application
  As a user
  I want to add items to my todo list
  So that I can track my tasks

  Scenario: Add a new todo item
    Given I am on the todo application page
    When I add a new todo item "Complete Cucumber tutorial"
    Then the todo item should be added to the list
