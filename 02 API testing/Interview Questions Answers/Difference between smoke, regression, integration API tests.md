10. Difference between smoke, regression, integration API tests?


Yes ✔ Here’s a clean way to map them to CI stages (API-focused) 🚦

### 🟢 Smoke API tests (critical endpoints only)
**When:**  
- **On every push / PR (commit-level pipeline)**  
- Also as a **post-deploy “canary” check** to Dev/QA env

**Why:** Fast signal that the build + deployment isn’t broken.

---

### 🔵 Integration API tests (service-to-service contracts)
**When:**  
- **After build + deploy to an integration environment** (where real dependent services exist)  
- Typically in **PR pipeline (if environment is available)** or **main branch pipeline** right after deploy

**Why:** Validate service boundaries (auth, downstream dependencies, schema/contract expectations) before broader coverage.

---

### 🟠 Regression API tests (full functional coverage)
**When:**  
- **On merge to main** (post-deploy to QA/staging)  
- **Nightly / scheduled pipelines**  
- **Pre-release / pre-production gates**

**Why:** Broad verification is slower, so it’s best as a gate before release and as scheduled safety net.

---

### Example CI flow 🧩
1) **PR:** Smoke ✅ → (optional) Integration ✅  
2) **Merge to main:** Smoke ✅ → Integration ✅ → Targeted Regression ✅  
3) **Nightly:** Full Regression ✅  
4) **Release candidate / pre-prod:** Full Regression ✅ (+ extra non-functional checks if needed)

If you tell me your environments (Dev/QA/Staging/Prod) and pipeline triggers (PR/main/nightly), I can suggest an exact stage layout 📌