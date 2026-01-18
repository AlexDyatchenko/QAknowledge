Understanding how applications handle identity and security can be tricky because these three concepts often work together, yet they serve very different purposes.

### 1. Session Cookies

A session cookie is like a **physical coat check ticket**.

* **How it works:** When you log in, the server creates a "session" in its database and sends a unique Session ID to your browser. Your browser stores this ID in a cookie.
* **Storage:** The server must remember (stateful) who you are.
* **Best for:** Standard web applications where the server has plenty of memory/database space to track active users.

### 2. JWT (JSON Web Tokens)

A JWT is like a **digital passport**.

* **How it works:** When you log in, the server creates a token containing your user info (e.g., "This is User 123") and signs it with a private key. It sends this to you.
* **Storage:** The server doesn’t store anything (stateless). Every time you make a request, you show the passport, and the server just checks the signature to see if it’s authentic.
* **Best for:** Mobile apps and APIs where multiple servers need to verify you without checking a central database.

---

### 3. CSRF Tokens (Cross-Site Request Forgery)

While Cookies and JWTs prove **who you are**, a CSRF token proves **the request actually came from your intentional action** on the real website, rather than a malicious script running in the background of another tab.

#### How it looks

A CSRF token is usually a long, random string of characters. It is often embedded in a hidden field within an HTML form or sent in a custom HTTP header.

**Example in HTML:**

```html
<form action="/transfer-money" method="POST">
  <input type="hidden" name="csrf_token" value="6e8f292d-9b3a-4e8c-8f2a-8392010c9e82">
  <input type="text" name="amount" value="100">
  <button type="submit">Send</button>
</form>

```

#### How it works (The Workflow)

1. **The Handshake:** When you load a page (like a "Settings" or "Bank Transfer" page), the server generates a unique, one-time string (the CSRF token) and hides it inside the page's code.
2. **The Submission:** When you click "Submit," your browser sends that hidden token back to the server along with your data.
3. **The Validation:** The server compares the token in the form to the one it generated for your session.
* **Match:** The request is processed.
* **No Match:** The server rejects the request, assuming a hacker tried to "forge" the request from a different site.



### Comparison Table

| Feature | Session Cookie | JWT | CSRF Token |
| --- | --- | --- | --- |
| **Purpose** | Identify user (Stateful) | Identify user (Stateless) | Prevent malicious form submissions |
| **Stored on Server?** | Yes | No | Yes (usually tied to session) |
| **Sent via** | Cookie Header | Authorization Header | Hidden field or Custom Header |

---

Would you like me to show you a code example of how to implement a CSRF check in a specific language like Python or Node.js?