Q: Which of the following is an example of why testing is necessary? 
- A: Reviews increase the quality of requirements specifications and lead to fewer changes being needed in derived work products
- E: that static testing (and static analysis) is used to detect **defects**, not **failures**, which are found by dynamic testing.

Q: Which test activity involves working with test data requirements, test conditions, test environment requirements and test cases?
- A: The number of years’ experience of the members of the performance efficiency testing team

Q: One of the ‘principles of testing’ states that exhaustive testing is impossible. Which of the following is an example of addressing this principle in practice?
- A: The use of equivalence partitioning and boundary value analysis to generate test cases

Q: Which test activity involves working with test data requirements, test conditions, test environment requirements and test cases?
- A: Test design

Q: During which test activity are test cases prioritized and arranged within a test execution schedule for efficient test execution?
- A: Test implementation

Q: Which of the following is NOT typically included in a defect report logged during dynamic testing?
- A: Certified Tester level of the person reporting the defect

Q: Which of the following statements is a CORRECT example of the value of traceability?
- A: Traceability helps to ensure that 
    - all requirements have been tested and that 
    - all tests can be traced back to specific requirements. 
    Traceability between 
    - user requirements and 
    - test results provides a means of measuring 
        - project progress against business goals

Q: Which of the following is MOST likely to be an example of a tester using a generic skill when testing
- A: The tester was a former pilot and was better able to understand the acceptance criteria for the helicopter control system.
- E: Domain knowledge that can be used to understand and communicate with end-users and business representatives is one of the generic skills required by testers. A tester with experience as a pilot would make them better able to appreciate the acceptance criteria for the helicopter control system.

Q: Which of the following is an advantage of the whole-team approach?
- A: It generates a team synergy that benefits the entire project
- E: By leveraging the **diverse skill sets** of each team member most effectively, the whole-team approach fosters superior team dynamics, promotes robust communication and collaboration, and generates a **team synergy** that benefits the entire project

Q: Which of the following statements about the chosen software development lifecycle is CORRECT?
- A: If a sequential development model is used, then the dynamic testing is typically restricted to later in the lifecycle
- E: If a sequential development model is used, then early in the software development lifecycle no code is available for execution, and so during this time static testing (e.g., reviews) is performed. Later in the lifecycle, when code is available for execution, dynamic testing is possible. Note, however, that preparation for dynamic testing will often occur early in any software development lifecycle

Q: Which of the following is a good testing practice that applies to all software development lifecycles?
- A: Testers should review work products **as soon as drafts** are available to enable early testing as part of a shift-left approach
- E: Test activities should start as early as possible in the software development lifecycle to find defects early, when they are cheaper to fix. This applies to all software development lifecycles, whether sequential, iterative, or agile.

Q: Which of the following is an example of a test-first approach to development?
- A: Test-Driven Development. Writing automated acceptance tests before implementing the corresponding functionality.
- E:  Test-Driven Development (TDD) is a well-known example of a test-first approach to development

Q: Which of the following statements about DevOps is CORRECT?
- A: To be able to update and release systems on a more frequent basis, many automated regression tests are required to reduce the risk of regression
- E: DevOps enhances testing in several ways, such as by providing fast feedback on code quality, automated regression testing that minimizes regression risk, and promoting a shift-left approach with high-quality code submission and component tests.

Q: Which of the following is MOST likely to be performed as part of system testing?
- A: Security testing of a credit management system by an independent test team
- E: System testing examines the behavior and capabilities of the
complete system and covers non-functional testing of quality
characteristics, which includes security testing. This type of testing is
often performed by an independent test team based on system
specifications

Q: Which of the following statements about confirmation testing and regression testing is CORRECT? 
- A: Regression testing is concerned with adverse effects in unchanged code, whereas confirmation testing is concerned with testing changed code
- E:  Regression testing ensures that changes do not have negative effects on unchanged PARTS of software. Confirmation testing verifies
that a defect has been fixed – and so is concerned with changed code

Q: Which of the following is an example of a defect that can be found by static testing but NOT by
dynamic testing?
- A: Code with no path that reaches it
- E: A code review can detect code that cannot be reached by
any path, however dynamic tests can only exercise reachable code and cannot determine that code cannot be reached without running every possible combination of inputs and input states, which is impractical for real code

Q: Which of the following is a benefit of early and frequent stakeholder feedback?
- A: It facilitates early communication of potential quality issues
- E: Obtaining feedback from stakeholders early and often in the software development process can be highly beneficial as it facilitates early communication of potential quality issues, can prevent misunderstandings about requirements, and ensures that any changes in stakeholder requirements are understood and implemented sooner

Q: The quality characteristics to be evaluated and the exit criteria are selected
 - A: Planning

Q: Everyone has access to the work product
 - A: Review initiation

Q: Anomalies are identified in the work product
 - A: Individual review

Q: Anomalies are discussed
 - A: Communication and analysis

Q: Given the following roles in reviews:
 - Scribe - records information
 - Review leader - verall responsibility, when and where
 - Facilitator/Moderator - ffective running of review, environment
 - Manager - staff and time
 - Author - creates work product

Q: Which of the following statements BEST describes the difference between decision table testing
and branch testing?
- A: In decision table testing, the test cases are independent of how the software is implemented. In branch testing, test cases can be created only after the design or
implementation of the code.

Q: For every tenth wash the system gives a 10% discount, and for every twentieth wash, the system gives a further 40% discount (i.e., a 50% discount in total)
- A: 19 covers the “no discount” partition, 20 covers the “50%
discount” partition, and 30 covers the “10% discount” partition. These three values cover all three of the valid equivalence partition

Q: The password length is correct if it has between 6 and 12 characters inclusive.
- A: 3 partitions: 

| Equivalence Class | 2-value BVA | 3-value BVA |
|-----------------------------|-------|----------------------|
| Less than 6 characters      | 0, 5  | 0, **1**, **4**, 5   |
| 6–12 characters (inclusive) | 6, 12 | 6, **7**, **11**, 12 |
| More than 12 characters     | 13    | 13, **14**           |

Q: Let the branch coverage metric be defined as BCov = (X / Y) * 100%.
What do X and Y represent in this formula?
- A: X = number of exercised branches, Y = total number of branches

Q: Which TWO of the following statements provide the BEST rationale for using exploratory testing?
- A: Testers have not been allocated enough time for test design and test execution
- A: Testers are experienced in the business domain and have good analytical skills

Q: Which of the following BEST fits as an element of the checklist used in checklist-based testing?
- A: The error messages are written in language that the user can understand

Q: Acceptance criteria formats are:
- A: Rule-oriented
    - The system must reject any password shorter than 12 characters and containing fewer than 2 special characters.
- A: Scenario-oriented 
    - Given a user is creating a new account, when they enter a password with fewer than 12 characters or fewer than 2 special characters, then the system should display an error message and prevent account creation until the requirements are met.
- A: Product-oriented
    - The password field should enforce a minimum length of 12 characters and require at least 2 special characters, with real-time validation feedback indicating which requirements are not yet met.
- A: Process-oriented
    - When a user submits a password during account creation, the system must execute these steps in order: check character count → check special character count → if either fails, return error message → if both pass, proceed to next step in account creation.

Q: Give me examples of user story and acceptance criteria for it.
- A: User Story - "As a customer, I want to return an item so that I can get a refund"
Process-oriented AC: When a customer initiates a return, the system must execute these steps in order: 
    - (1) customer selects item and reason for return, 
    - (2) system generates return shipping label and displays it on screen
    - (3) customer prints or downloads label, 
    - (4) customer ships item back, 
    - (5) warehouse receives and scans item, 
    - (6) system verifies item condition against return policy, 
    - (7) if approved, initiate refund process; if rejected, notify customer with reason, 
    - (8) process refund to original payment method within 5-7 business days.

Q: What risk is out of our contorl?
- A: Changes in consumers’ preferences are usually out of our control, so usually we **accept this risk**

Q: Which of the following is a product quality metric?
- A: Mean time to failure
- E: Product quality metrics measure quality characteristics. Mean
time to failure measures maturity, so it is a product quality metric

Q: Connect activity and tool:
- A: Support workflow tracking => DevOps tools
- A: Facilitate communication  => Collaboration tools
- A: Virtual machines => Tools supporting scalability and deployment standardization
- A: Support reviews           => Static testing tools

Q: Which of the following is MOST likely to be a benefit of test automation?
- A: It provides coverage measures that are too complicated for humans to derive









0
1
1
0
1
0
1
