[Acceptance-criteria by JIRA](https://www.atlassian.com/work-management/project-management/acceptance-criteria)


### Characteristics of good acceptance criteria

Effective acceptance criteria share several key characteristics that ensure clear communication and a smooth development process. Here's a breakdown of these essential components:

**1. Clarity and conciseness**

    Write acceptance criteria in plain language that all stakeholders, including developers, product owners, and testers, can easily understand. Avoid technical jargon or ambiguous phrasing. State the criteria concisely and directly, focusing on specific outcomes.

**2. Testability**

    Well-written acceptance criteria are demonstrably verifiable. Each criterion should translate into one or more clear tests that determine whether the implemented functionality meets the defined requirements. This allows for objective evaluation and eliminates room for misinterpretation.

**3. Outcome**

    Focus on the desired result or user experience rather than the technical implementation details. The criteria should define the feature's goal, not how to build it. This empowers developers while ensuring the final product aligns with user needs.

**4. Measurability**

    Whenever possible, express the criteria in measurable terms. This allows for a clear pass/fail determination during testing. For example, instead of stating, "The search results page should have visual appeal," a better criterion might be, "The search results page should display product images with a minimum resolution of 300x300 pixels."

**5. Independence**

    Ideally, each acceptance criterion should be independent of others. This enables you to test and evaluate in isolation, streamlining the testing process.

Here are a few well-written acceptance criteria examples:

---

**Example 1**

User story: `As a customer, I want to search for products by name to find certain items easily.`

Acceptance criteria:
- The search function should return results that exactly match the entered product name.
- The search function should also return results that partially match the entered product name (with at least three matching characters).
- Search results should be displayed clearly and organized, including the product name, image, and price.
- The search results page should allow pagination to display a maximum of 20 items per page.

---

**What is the difference between acceptance criteria and definition of done?**

Acceptance criteria and DoD are crucial for project success, but they serve distinct purposes. Acceptance criteria focus on the specific functionalities a user story must fulfill to be complete for the end user. **DoD establishes a broader set of quality standards** for all development work. These encompass non-functional aspects such as code quality and documentation. Acceptance criteria define what must happen for a user story, while DoD outlines the overall quality standards for how a team completes development work.

---

**When should you write acceptance criteria?**

The ideal timing can vary, but there are a few key windows to consider. One option is identifying initial criteria during backlog refinement sessions, where the team discusses and fleshes out user stories. Another suitable time is during sprint planning when the team collaboratively finalizes the acceptance criteria for user stories slated for the upcoming sprint. This ensures the criteria are current and reflect the latest understanding. Define acceptance criteria before development begins to ensure clear expectations and a smooth development process.
