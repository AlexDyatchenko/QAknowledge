**p95** (95th percentile) is a latency metric that answers:

> “For **95%** of requests, the response time is **at or below** this value.”

So if your report says:

- **p95 latency = 480ms**

That means:

- **95 out of 100 requests** finished in **≤ 480ms**
- The **slowest 5%** took **> 480ms** (these are your “tail latencies”)

Why it matters ✅  
- **Average** can hide spikes (a few very slow requests don’t move the mean much).
- **p95** highlights user pain caused by occasional slowness 🎯
- Many SLAs/SLOs use p95 (or p99) because users notice “sometimes slow” behavior.

How it maps to a threshold 📌  
If you set:

```js
http_req_duration: ['p95<500']
```

You’re saying:

- “Pass only if **95% of requests are faster than 500ms**.” 🚦

Quick intuition example 🧠  
If you have 1000 requests, sort them by duration.  
- The **950th fastest** request duration is approximately your **p95**.

Want me to also explain **p99 vs p95** and when to choose each? 🙂