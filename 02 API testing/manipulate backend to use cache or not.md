In load testing, you typically control cache behavior through **HTTP headers** and **query parameters**. Here are common approaches:

## 1. Cache-Control Headers (Most Common)

````javascript
// ...existing code...

export default function (_data) {
  // Test WITH cache (default behavior)
  const headersWithCache = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // Test WITHOUT cache (force fresh data)
  const headersNoCache = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };

  // Choose which headers to use
  const headers = headersNoCache; // or headersWithCache

  // ...existing code...
  const response = http.get(url, { headers });
  // ...existing code...
}
````

## 2. Cache-Busting Query Parameters

````javascript
// ...existing code...

export default function (_data) {
  const params = {
    locationStatuses: "Active",
    metro: "Singapore",
    // Add cache-busting parameter
    _cacheBust: Date.now(), // or use a random value
    // Alternative: _t: new Date().getTime()
  };

  // ...existing code...
}
````

## 3. API-Specific Cache Parameters

Some APIs have specific cache control parameters:

````javascript
// ...existing code...

export default function (_data) {
  const params = {
    locationStatuses: "Active",
    metro: "Singapore",
    // Common API cache parameters (check API docs)
    nocache: "true",
    // or
    refresh: "true",
    // or
    force_refresh: "1",
  };

  // ...existing code...
}
````

## 4. Conditional Requests (ETag/If-Modified-Since)

````javascript
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  // Force revalidation
  "If-None-Match": "force-miss",
  "If-Modified-Since": new Date(0).toUTCString(),
};
````

## 5. Create Separate Test Scenarios

````javascript
import { scenario } from 'k6/execution';

export const options = {
  scenarios: {
    with_cache: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
      tags: { cache: 'enabled' },
    },
    without_cache: {
      executor: 'constant-vus',
      vus: 5,
      duration: '30s',
      tags: { cache: 'disabled' },
    },
  },
  thresholds: {
    // ...existing thresholds...
  },
};

export default function () {
  const useCache = scenario.name === 'with_cache';
  
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(useCache ? {} : {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    }),
  };

  // ...rest of test...
}
````

## Recommendation for Your Test

For the Megaport API, I'd suggest:

````javascript
// ...existing code...

// Add at top level
const USE_CACHE = __ENV.USE_CACHE === "true"; // Control via environment variable

export default function (_data) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(USE_CACHE ? {} : {
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
    }),
  };

  // ...existing code...
}
````

Then run:
```bash
# With cache
docker-compose run -e USE_CACHE=true k6 run /scripts/smoke.test1.js

# Without cache
docker-compose run -e USE_CACHE=false k6 run /scripts/smoke.test1.js
```