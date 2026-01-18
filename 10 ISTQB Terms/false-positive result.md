A **false-positive result** is when a test or check **indicates a problem or condition exists, but in reality it does not**.

### Simple definition

> **False positive = test says “YES”, reality is “NO”**

### Examples

**1. Software testing**

* A test fails, reporting a bug
* But the application is actually working correctly
  👉 The failure is a **false positive**

**2. Automated tests**

* A UI test fails due to timing, flaky selectors, or environment issues
* No real defect exists
  👉 False positive test failure

**3. Security testing**

* A vulnerability scanner reports SQL injection
* Manual review shows the input is properly sanitized
  👉 False positive vulnerability

**4. Medical testing (classic example)**

* Test result says a disease is present
* Person is actually healthy
  👉 False positive diagnosis

### In testing terminology (QA)

| Term               | Meaning                                  |
| ------------------ | ---------------------------------------- |
| **False positive** | Test reports an issue that doesn’t exist |
| **False negative** | Test misses an issue that *does* exist   |

### Why false positives are bad in QA

* Waste investigation time
* Reduce trust in automated tests
* Increase maintenance cost
* Slow down CI/CD pipelines

### Common causes in software testing

* Flaky tests (timing, async issues)
* Poor test data or environment mismatch
* Over-strict assertions
* Unstable selectors in UI tests
* Mocking/stubbing incorrectly

If you want, I can:

* Compare **false positive vs false negative** visually
* Explain how to **reduce false positives in automated tests**
* Give **real CI/CD examples** where false positives are dangerous
