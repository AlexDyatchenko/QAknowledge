Feature: Sample Todo Application
  As a user
  I want to add items to my todo list
  So that I can track my tasks

  Scenario Outline: Add a new todo item
    Given I am on the todo application page
    When I add a new todo item "<task>"
    Then the todo item should be added to the list

    Examples:
      | task                                                                                      |
      | Buy milk                                                                                  |
      | Complete comprehensive end-to-end testing documentation for the entire application suite |