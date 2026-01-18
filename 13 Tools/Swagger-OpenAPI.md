# Swagger is a toolset and specification for designing, documenting, and testing REST APIs.
Today, it’s formally known as **OpenAPI**, but many people still say “Swagger” out of habit.

> Swagger (OpenAPI) is a standardized API contract that enables documentation, validation, testing, and collaboration across teams.
---

## In simple terms

Swagger lets you **describe your API in a standard, machine-readable format**, and then automatically:

* Generate **interactive documentation**
* Validate requests and responses
* Generate client/server code
* Enable testing and mocking

---

## What Swagger actually is

Swagger consists of **three closely related things**:

### 1️⃣ **OpenAPI Specification (OAS)**

A standard (YAML or JSON) that describes:

* Endpoints (`/users`, `/orders/{id}`)
* HTTP methods (`GET`, `POST`, etc.)
* Request parameters & bodies
* Response schemas
* Status codes
* Auth methods (OAuth, API keys, JWT)

Example:

```yaml
paths:
  /users:
    get:
      summary: Get users
      responses:
        '200':
          description: OK
```

This spec is the **contract** between frontend, backend, and QA.

---

### 2️⃣ **Swagger UI**

A web interface that:

* Renders API documentation
* Allows you to **try endpoints directly in the browser**
* Shows request/response examples

👉 This is the part most testers and developers interact with daily.

---

### 3️⃣ **Swagger Editor**

An online or local editor for:

* Writing OpenAPI specs
* Live validation and previews
* Catching schema errors early

---

## Why Swagger is important for API testing

From a **QA / testing perspective** (very relevant to your background):

### ✔ Contract testing

* Swagger defines the **expected behavior**
* You can validate that:

  * Required fields exist
  * Data types are correct
  * Status codes match the contract

### ✔ Early testing (shift-left)

* Test APIs **before backend implementation**
* Frontend and QA can work in parallel

### ✔ Automation support

* Postman collections can be generated from Swagger
* Tests can assert responses against the OpenAPI schema

---

## Swagger vs Postman vs WireMock (quick comparison)

| Tool                  | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| **Swagger / OpenAPI** | API **contract & documentation**                |
| **Postman**           | API **manual & automated testing**              |
| **WireMock**          | API **mocking & stubbing**                      |
| **FastAPI**           | API **implementation** (auto-generates Swagger) |

🔹 Swagger is **not a test runner**
🔹 Swagger is **not a mock server** (by itself)
🔹 Swagger is the **source of truth**

---

## Swagger with FastAPI (important)

FastAPI automatically:

* Generates OpenAPI spec
* Exposes Swagger UI at:

  * `/docs` (Swagger UI)
  * `/redoc` (ReDoc)

This makes FastAPI very popular in test-driven API development.

---

## Typical real-world flow

1. Define API in **Swagger (OpenAPI)**
2. Frontend + QA use Swagger UI
3. Mock APIs (WireMock / Postman / Prism)
4. Backend implements API
5. Validate implementation against Swagger

---

## One-line summary

> **Swagger (OpenAPI) is a standardized API contract that enables documentation, validation, testing, and collaboration across teams.**

OpenAPI (Swagger) can be written in **JSON** as well as **YAML**.
They are **100% equivalent** — same structure, same meaning.

---

## When JSON is preferred

* Machine-generated specs
* Code-first frameworks
* Automated diffing
* Strict formatting environments

## When YAML is preferred

* Human readability
* Manual editing
* Reviews & discussions
