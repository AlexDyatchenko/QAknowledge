# Bug Report

## Application Information
- **Application Name:** WebShop
- **Version:** v0.99
- **Build Number:** 2025.01.0447
- **Release Date:** January 2025

## Defect Summary
Login button not working

## Severity & Priority
- **Severity:** High
- **Priority:** Urgent
- **Status:** Open
- **Date Reported:** January 1, 2026
- **Reported By:** QA Team / User Name

---

## Test Environment

### Operating System
- **OS Name:** Windows 11
- **OS Version:** 23H2 (Build 22631.3880)
- **Architecture:** x64

### Browser Information
- **Browser:** Google Chrome
- **Browser Version:** 132.0.6834.159
- **User Agent:** Mozilla/5.0 (Windows NT 10.0; Win64; x64)

### Backend Environment
- **Server OS:** Linux Ubuntu
- **Server Version:** 22.04 LTS
- **Node.js Version:** 18.19.0
- **npm Version:** 9.8.1
- **Database:** PostgreSQL 15.2
- **API Version:** REST API v2.3

### Frontend Framework Stack
- **React Version:** 18.2.0
- **Redux Version:** 4.2.1
- **Axios Version:** 1.6.0
- **Material-UI Version:** 5.14.1
- **TypeScript Version:** 5.3.2

### Additional Tools & Services
- **Testing Framework:** Jest 29.7.0
- **E2E Testing:** Cypress 13.6.1
- **Environment:** Staging / Development
- **Network:** Stable (Latency: 25ms)
- **Screen Resolution:** 1920 x 1080
- **Device Type:** Desktop

---

## Reproduction Steps

1. Launch the website (https://staging.webshop.local/)
2. Navigate to the homepage
3. Locate the login button (top-right navigation bar)
4. Click on the login button

---

## Expected Result
The user should be redirected to the login page (https://staging.webshop.local/login) with the login form displayed.

## Actual Result
The login button does not respond when clicked. No navigation occurs and the page remains unchanged. No error messages are displayed in the UI.

---

## Additional Information

### Browser Console Errors
```
Uncaught TypeError: Cannot read property 'addEventListener' of null
  at login-handler.js:45:12
```

### Network Activity
- No POST/GET requests initiated when button is clicked
- Network tab shows no failed requests

### Reproducibility
- **Consistently Reproducible:** Yes (100% of the time)
- **Occurs on First Load:** Yes
- **Occurs After Page Refresh:** Yes

### Affected User Base
- All users on the staging environment
- Estimated Impact: Critical (login feature unavailable)

### Workaround
Users can directly access the login page by typing the URL: https://staging.webshop.local/login

---

## Attachments & Evidence
- **Screenshots:** Login button location highlighted
- **Video Recording:** Screen recording of reproduction steps (2min 15sec)
- **Browser DevTools Console Log:** Attached as console_output.txt
- **Network Trace:** HAR file generated during issue reproduction

---

## Investigation Notes
- Issue appears to be a JavaScript binding problem in the login handler
- The DOM element exists but event listeners are not attached
- Suspect caused by changes in commit: a7f3c2d (merged 12/28/2025)

---

## Assigned To
Developer: John Smith

## Resolution Target Date
January 3, 2026