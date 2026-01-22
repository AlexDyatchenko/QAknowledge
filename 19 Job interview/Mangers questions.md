Since you have already cleared the technical round, this third stage with an **Engineering Manager (EM)** and the **Head of Software Engineering** will shift away from "How do you write a script?" toward **"How do you fit into our ecosystem?"**

At Megaport (a Network-as-a-Service leader), they care deeply about **scalability, automation, and the speed of delivery**. Because Mini and Jerome both emphasize Agile, DevOps, and "High-Performance Teams," they want to see if you are a QA who just finds bugs or a QA who **enables the whole team to move faster.**

---

### Category 1: Culture & Philosophy (Mini's Focus)

*Mini cares about psychological safety, mentorship, and team health.*

**1. How do you define "Quality" in a high-performance engineering team?**

* **Answer:** Quality isn't just "lack of bugs." It’s about reliability, performance, and user trust. In a cloud-native environment like Megaport’s, it also means ensuring that our APIs and portal are resilient to failures.

**2. How do you handle a situation where a developer pushes back on a bug you’ve reported?**

* **Answer:** I focus on the data. I provide clear reproduction steps, logs, and the potential impact on the customer. I approach it as a collaborator, not an adversary—asking, "How can we make this work for the user?" rather than "You made a mistake."

**3. Mini mentions "psychological safety." How do you contribute to a safe environment for engineers?**

* **Answer:** By practicing "blameless" retrospectives. When a bug reaches production, I don't point fingers. Instead, I ask, "What was missing in our testing pipeline that allowed this to slip through, and how can we automate a check for it?"

**4. If we are behind schedule on a release, what is your approach to testing?**

* **Answer:** I perform a risk-based assessment. I identify the "Happy Path" and the most critical business features (like cloud connectivity) and ensure those are 100% verified. I communicate clearly what has been tested and what the risks are for the parts we skipped.

**5. How do you mentor junior testers or developers regarding quality?**

* **Answer:** I advocate for "shifting left." I help them write better unit tests and involve them in creating test plans early so they understand the edge cases before they even start coding.

---

### Category 2: Strategy & Delivery (Jerome's Focus)

*Jerome has a background in Program Management and Business Strategy. He wants to see the big picture.*

**6. Megaport is an API-first company. How do you ensure the quality of our global NaaS platform?**

* **Answer:** I prioritize API contract testing and integration testing. Since our services connect global data centers, I focus on how our services interact under latency and high-volume conditions.

**7. We use Agile and DevOps. Where does QA fit into a CI/CD pipeline?**

* **Answer:** QA shouldn't be a bottleneck at the end. I believe in automated smoke tests that run on every PR, followed by automated regression suites. My goal is to provide fast feedback loops so developers know within minutes if they’ve broken something.

**8. How do you balance the need for speed with the need for technical excellence?**

* **Answer:** By automating the mundane and focusing manual efforts on high-risk, complex exploratory testing. We achieve excellence by building "quality in" through TDD (Test Driven Development) or BDD (Behavior Driven Development).

**9. Can you describe a time you improved a testing process? What was the business outcome?**

* **Answer:** *(Example)* "I noticed our regression suite took 4 hours. I containerized the tests and ran them in parallel, reducing the time to 20 minutes. This allowed the team to deploy 3 times a day instead of once, increasing our delivery velocity."

**10. How do you measure the success of a QA team?**

* **Answer:** I look at metrics like **Lead Time for Changes**, **Change Failure Rate**, and **Mean Time to Recovery (MTTR)**. If our QA is effective, our failure rate in production should be low, and our ability to catch bugs early should be high.

---

### Category 3: Technical Leadership & Scalability

*Both interviewers focus on "Scalable, Cloud-Native Platforms."*

**11. What is your experience testing microservices in a cloud-native environment (AWS/Azure/GCP)?**

* **Answer:** I focus on service isolation. I use "mocking" or "stubbing" for external dependencies to ensure I’m testing the specific logic of a microservice, while also running end-to-end tests to ensure the whole flow works.

**12. How do you handle "flaky" tests in an automated suite?**

* **Answer:** Flaky tests destroy trust. I immediately quarantine them, investigate the root cause (usually timing issues or unstable data), and only re-introduce them once they are stable.

**13. What is your approach to "Chaos Engineering" or testing for resilience?**

* **Answer:** Especially for a network provider like Megaport, we need to know what happens when a node goes down. I advocate for testing how the system handles timeouts, retries, and circuit-breaking.

**14. Jerome manages "New Builds." How do you handle testing for a brand-new product with no existing documentation?**

* **Answer:** I start with exploratory testing to learn the system's boundaries. I work closely with Product Managers to understand the "User Personas" and build a test strategy based on the most valuable user journeys.

**15. If a critical bug is found in production, what is the first thing you do?**

* **Answer:** Help the team stabilize the system (Hotfix). Then, once the fire is out, I lead the effort to write a regression test that mimics that exact bug so it can never happen again.

---

### Category 4: Behavioral & Personal Growth

**16. Why Megaport?**

* **Answer:** Megaport is at the intersection of networking and software. I’m excited by the challenge of ensuring quality for a platform that businesses rely on for their core cloud infrastructure.

**17. Give me an example of a time you disagreed with a manager’s decision on quality.**

* **Answer:** Focus on how you presented a "risk-based" argument and how you supported the final decision once it was made (disagree and commit).

**18. Where do you see the future of QA heading in the next 5 years?**

* **Answer:** Moving away from "manual testers" toward "Quality Engineers" who are part-developers. I see AI being used to generate test data and predictive analytics to tell us where the most likely bugs are.

**19. How do you stay updated with the latest in DevOps and QA?**

* **Answer:** Mention specific blogs, podcasts, or tools (e.g., Playwright, Cypress, K6 for performance, or specific DevOps newsletters).

**20. Do you have any questions for us?**

* **Pro-tip:** Ask Mini: "How do you balance the need for rapid innovation with maintaining a safe environment for engineers to take risks?"
* **Pro-tip:** Ask Jerome: "What is the biggest challenge the engineering department is facing as Megaport scales its global footprint?"

---

### Final Advice for Megaport:

Megaport is a **Brisbane-based success story** that operates globally. They are very proud of their "lean" and "agile" culture. When you answer, use terms like **"fast feedback loops," "reducing friction,"** and **"customer-centric quality."**

**Would you like me to help you draft a "30-60-90 Day Plan" for this QA role to show them you are ready to hit the ground running?**