**Cross-Origin Requests (CORS): what QA should know**

Cross-Origin Resource Sharing (CORS) is a **browser security mechanism** that controls whether a web page from one origin can call APIs or load resources from another origin.

---

## 1. What is an “origin”?

An origin = **scheme + host + port**

Examples:

* `https://app.example.com` ≠ `https://api.example.com` (different host)
* `https://example.com` ≠ `http://example.com` (different scheme)
* `https://example.com:443` ≠ `https://example.com:8443` (different port)

If any part differs → **cross-origin request**.

---

## 2. Why CORS exists (QA perspective)

CORS prevents:

* Data theft via malicious websites
* Unauthorized API access using a user’s browser & cookies

Important:

> **CORS is enforced by browsers, not servers**

* Postman / curl **ignore CORS**
* Real users **don’t**

👉 Many bugs appear *only in browser testing*

---

## 3. Common CORS scenarios QA should test

### ✅ Works in Postman, ❌ fails in browser

**Classic CORS issue**

* Backend missing proper CORS headers
* QA must always test APIs **via UI / browser**, not only tools

### Frontend ↔ Backend on different domains

Examples:

* SPA: `app.company.com`
* API: `api.company.com`

Needs correct CORS configuration.

---

## 4. Simple vs Preflight requests

### Simple request (no preflight)

Conditions:

* Methods: `GET`, `POST`, `HEAD`
* Headers: only basic ones (`Content-Type: text/plain`, `application/x-www-form-urlencoded`, etc.)

Browser sends request directly.

---

### Preflight request (OPTIONS)

Triggered when:

* Method: `PUT`, `DELETE`, `PATCH`
* Custom headers (`Authorization`, `X-*`)
* `Content-Type: application/json`

Flow:

1. Browser sends `OPTIONS` request
2. Server replies with allowed methods/headers
3. Browser sends real request (or blocks it)

👉 **QA must check that OPTIONS is handled correctly**

---

## 5. Key CORS headers QA should recognize

### Response headers (from backend)

| Header                             | Meaning                   |
| ---------------------------------- | ------------------------- |
| `Access-Control-Allow-Origin`      | Which origins are allowed |
| `Access-Control-Allow-Methods`     | Allowed HTTP methods      |
| `Access-Control-Allow-Headers`     | Allowed request headers   |
| `Access-Control-Allow-Credentials` | Cookies / auth allowed    |
| `Access-Control-Max-Age`           | Preflight cache duration  |

Example:

```
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Allow-Credentials: true
```

⚠️ **Important QA trap**

* `Allow-Credentials: true` ❌ cannot be used with `Allow-Origin: *`

---

## 6. Cookies, tokens & auth (very important)

### Cookies

* Requires:

  * `Access-Control-Allow-Credentials: true`
  * Frontend request with `credentials: 'include'`
* Cookies must be:

  * `SameSite=None`
  * `Secure`

### Authorization header (JWT, Bearer)

* Triggers **preflight**
* Backend must explicitly allow `Authorization` header

---

## 7. Typical CORS errors QA will see

### Browser console errors

```
Access to fetch at 'https://api.example.com'
from origin 'https://app.example.com'
has been blocked by CORS policy
```

### Common root causes

* Missing `Access-Control-Allow-Origin`
* OPTIONS returns `401 / 403 / 404`
* Authorization header not allowed
* Wrong origin (e.g. missing `https`)
* Backend only configured for prod, not QA/staging

---

## 8. How QA should debug CORS issues

### In Browser DevTools

1. Open **Network** tab
2. Look for:

   * `OPTIONS` request
   * Actual API request
3. Check **Response Headers**
4. Verify:

   * Origin matches exactly
   * Allowed headers/methods include what UI sends

### Compare:

* **Postman success**
* **Browser failure**

👉 If Postman works but browser fails → **almost always CORS**

---

## 9. What QA should explicitly test

✔ Different environments (local, QA, staging, prod)
✔ Authenticated vs unauthenticated users
✔ With cookies vs token-based auth
✔ Error responses (401, 403, 500 still need CORS headers)
✔ File upload/download endpoints
✔ Preflight caching issues (after config change)

---

## 10. Anti-patterns QA should flag 🚩

* `Access-Control-Allow-Origin: *` in production
* CORS “fixed” only in frontend (proxy hacks)
* OPTIONS blocked by auth middleware
* Different CORS rules per endpoint without reason

---

## 11. One-sentence takeaway for QA

> **If it works in Postman but fails in the browser, suspect CORS first. Always test cross-origin flows in real browsers.**
