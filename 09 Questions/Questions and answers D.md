Q: Which of the following is a typical test objective?
- A: Building confidence in the quality of the test object

Q: Test conditions are being used by testers to generate test cases and execute tests. Which of the following
‘principles of testing’ is being addressed through the variation of test cases?
- A: Tests wear out

Q: Which of the following is a benefit of using a risk-based approach to testing?

Q: Given the following test tasks:

- A: Derive test cases from test conditions -> Test design
- A: Identify reusable testware -> Test completion
- A: Organize test cases into test procedures -> Test implementation
- A: Evaluate the test basis and the test object -> Test analysis

Q: Given the following testware
- A: Test cases - output of test design
- A: test completion report is an output of test completion
- A: Data held in a database - output of test implementation
- A: The list of elements needed to build the test environment is the
test environment requirements - output of test design

Q: Roles and responsibilities in the test process:
- A :Evaluate the test basis and the test object -> Test analysis -> testing role
- A: Define test environment requirements -> Test analysis -> testing role
- A: Assess testability of the test object  -> Test analysis -> testing role
- A: Create the test completion report -> Test completion -> management role

Q: Which of the following is a good testing practice that applies to all software development lifecycles?
- A: For every development activity, there is a corresponding test activity
- A: Each test level has specific and distinct test objectives
- A: Testers should start test design as soon as an agreed test basis is available
- A: dynamic testing activity NOT always has corresponding static testing activity. 
    - *static analysis* has no obvious corresponding dynamic testing activity.

Q: Which of the following is MOST likely to be a challenge encountered when implementing DevOps?
- A: Automated processes like continuous integration/continuous delivery (CI/CD) used in DevOps facilitate stable test environments

Q: Which of the following BEST describes retrospectives?
- A: Retrospectives give testers an opportunity to identify activities that were successful so that these are retained when potential improvements are made in the future

Q: Which of the following tests is MOST likely to be performed as part of functional testing?
- A: The test checks that the sort function puts the elements of the list or array in ascending order

Q: Which of the following is MOST likely to be a trigger that leads to maintenance testing of a currency exchange system?
- A:Then it would be done by maintainability testing rather than maintenance testing

Q: Which of the following CANNOT be examined by static testing?
- A: Most work products can be examined using some form of static testing, and a 
    - contract 
    - test plan,
    - test charter
    must be interpretable by humans and so could be reviewed, which is a form of static testing.

Q: Which of the following statements about the value of static testing is CORRECT?
- A: Dynamic testing can identify some of the defects that can be found by static testing but not all of them
- E: you needto read tricky answers with ALL word addition: 
    - Dynamic testing can detect **ALL** the defect types that can be found by static testing plus some additional defect types

Q: Which participant in the review process is responsible for ensuring that the review meetings run
effectively and that everyone at the meetings can voice their opinions freely?
- A: The moderator

Q: You perform system testing of an e-commerce web application and are provided with the following
requirement:
- *REQ 05-017. If the total cost of purchases exceeds $100, the customer gets a 5% discount on subsequent purchases. Otherwise, the customer does not receive a discount.*

Which test techniques will be MOST helpful in designing test cases based on this requirement?
- A: hh
- E: The document does not refer to the test object’s internal
structure but specifies the desired behavior of the test object.

Q: Assuming all test cases start in the ‘Requesting’ state, which of the following test cases, represented as sequences of events, achieves the highest valid transitions coverage?
- A: b) Available, ChangeRoom, NotAvailable, Available, Pay
- E: d) NotAvailable, Cancel, ChangeRoom, Available, Pay <br>
*This sequence of five events does not represent a
feasible test case, because after “Cancel” the system ends up in the
End state and no further valid transitions can be executed*

Q: Your test suite S for a program P achieves 100% statement coverage. Which of the following statements is CORRECT?
- A: **A statement with a defect, when executed, does not have to cause a failure**. For example, a statement x := y / z will cause a failure only when z equals 0
- A: Every executable statement in P containing a defect has been run at least once during the
execution of S

Q: Why does white-box testing facilitate defect detection even when the software specification is
vague, outdated or incomplete?
- A: Test cases are designed based on the structure of the test object rather than the specification
- E: If the software does not implement one or more requirements, white-box testing is unlikely to detect the resulting defects of omission

Q: Which of the following is true about exploratory testing?
- A: During exploratory testing the tester may use black-box test techniques
- E: Test cases are designed before the exploratory testing session starts

Q: Which collaborative user story writing practice enables the team to achieve a collective understanding of what needs to be delivered?
- A: Brainstorming, Conversation, so that team members can understand how the software will be used

Q: Which of the following BEST define EXIT criteria in a testing project?
- A : Budget runs out
- A : Test cases achieved at least 80% statement coverage

Q: How can the testing quadrants be beneficial for testing?
- A: They help non-technical stakeholders to understand the different test types and that some test types are more relevant to certain test levels than others
- E: Testing quadrants have nothing to do with describing the relationships between test levels

Q: For a given risk, its risk level is $1,000 and its risk likelihood is estimated as 50%. What is the risk impact?
- A: `Risk impact = Risk level      / Risk likelihood` => `1,000 / 0.5 = 2,000`

Q: Which of the following are product risks?
- A: Poor architecture, Too long response time
- A: Project risks: Scope creep, Poor tool support, Cost-cutting
- E: Scope creep is an example of a project risk related to technical issues. Poor tool support is an example of a project risk related to technical issues 

Q: Which of the following is NOT a valid purpose for a test report?
- A: Providing information about each defect, such as the steps to reproduce it
- E: Providing information about defects is the purpose of a defect report, not a test report.

Q: Which of the following is MOST likely to help the developer reproduce the failure quickly?
- A: Adding information about which users and which books the failure affects to the “Description” section

Q: Tools from which of the categories are MOST likely to facilitate test execution?
- A: DevOps tools, Non-functional testing tools

Q: Which of the following is MOST likely to be a risk of test automation?
- A: Incompatibility with the development platform





0
0
1
1
0
1
1
0
0
1
0
1
1
0
1
0
0
0
1 ?
0 
1 +
1 ?
0 
1 ?
0 
0
1
1 ?
1 +
0 ?
1
0 
0
0
0
1
1
1
1
1