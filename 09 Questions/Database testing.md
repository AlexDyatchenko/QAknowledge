**Database testing** is the process of verifying that a database works correctly, reliably, securely, and efficiently as part of an application. It focuses on **data integrity, correctness, performance, and security** rather than UI behavior.

In simple terms: **it checks that the right data is stored, updated, retrieved, and protected in the database.**

---

## Why database testing is important

Applications may look fine in the UI, but still:

* Save incorrect data
* Corrupt relationships between tables
* Lose data during transactions
* Become slow under load
* Expose sensitive information

Database testing catches these issues **before they reach production**.

---

## What is tested in database testing

### 1. Data Integrity Testing

Ensures data is accurate and consistent.

Examples:

* Primary keys are unique
* Foreign keys correctly reference parent tables
* NOT NULL constraints are enforced
* No orphan records exist

✔️ Example:

> When a user is deleted, all related sessions are also removed (or prevented).

---

### 2. CRUD Operations Testing

Validates Create, Read, Update, Delete operations.

Examples:

* Insert correct values into tables
* Updates modify only intended rows
* Deletes don’t break referential integrity

✔️ Example:

> After placing an order, an order row is created and linked to the correct user.

---

### 3. Business Rules & Logic Testing

Checks database-level logic.

Examples:

* Triggers
* Stored procedures
* Views
* Functions

✔️ Example:

> A trigger automatically sets `order_status = 'NEW'` after insert.

---

### 4. Transaction Testing

Ensures atomicity and rollback behavior.

Examples:

* Partial failures do not leave inconsistent data
* Rollback works on error

✔️ Example:

> If payment fails, no order or invoice is committed.

---

### 5. Performance & Load Testing (DB-focused)

Validates database performance under load.

Examples:

* Slow queries
* Missing indexes
* Locking and deadlocks
* Connection pool exhaustion

✔️ Example:

> Dashboard query returns results under 200 ms with 1M rows.

---

### 6. Security Testing

Ensures data is protected.

Examples:

* Role-based access
* SQL injection protection
* Encryption at rest/in transit
* Sensitive fields masked

✔️ Example:

> A read-only user cannot update salary data.

---

### 7. Data Migration & ETL Testing

Validates data movement between systems.

Examples:

* Old → new schema migration
* ETL pipelines
* Backward compatibility

✔️ Example:

> All customer records migrated with no loss or duplication.

---

## Types of database testing

| Type                   | Focus                                             |
| ---------------------- | ------------------------------------------------- |
| Structural testing     | Schema, tables, indexes, constraints              |
| Functional testing     | Data behavior from application actions            |
| Non-functional testing | Performance, security, scalability                |
| Regression testing     | Ensuring DB changes don’t break existing behavior |

---

## How database testing is done

### Manual

* Run SQL queries
* Validate records directly
* Check constraints and counts

### Automated

* Unit tests for repositories/DAOs
* Integration tests against real DB
* Migration tests (Flyway, Liquibase)
* Performance tests (JMeter, Gatling)

---

## Example (simple)

**Scenario:** User registration

1. API call: `POST /register`
2. Verify in DB:

   * User row created
   * Email is unique
   * Password is hashed
   * Default role assigned
   * Audit log entry exists

---

## Where database testing fits (Testing Quadrants)

* **Q1:** Repository tests, stored procedures
* **Q2:** Business rules validation
* **Q3:** End-to-end data flows
* **Q4:** Performance, security, migrations

---

## What database testing is NOT

* Not UI testing
* Not only checking “row exists”
* Not replacing unit or API tests

---

### One-line summary

> **Database testing ensures that data is correct, consistent, secure, and performant across all application operations.**