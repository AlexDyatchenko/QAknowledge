# LocalDatabase vs. localStorage: What is the difference?

If you see a website using a "LocalDatabase," they are likely referring to **IndexedDB** (the modern standard) or the now-deprecated **Web SQL**.

While both live in your browser and don't get sent to the server automatically, they are built for very different tasks:

| Feature | localStorage | LocalDatabase (IndexedDB) |
| --- | --- | --- |
| **Type** | Simple Key-Value store | Document-based NoSQL database |
| **Data Format** | **Strings only** (you must "stringify" objects) | **Native Objects** (stores arrays, files, and objects) |
| **Storage Limit** | Very small (~5MB to 10MB) | Very large (hundreds of MBs to GBs) |
| **Performance** | **Synchronous** (stops the page while it works) | **Asynchronous** (runs in the background) |
| **Searchability** | You have to load everything to find one item | Built-in **Indexes** for fast searching |

#### Why a site would use a "LocalDatabase" for a session key:

1. **Security/Structure:** They might be storing more than just a key—perhaps your whole user profile, cached messages, or offline data—and they want it all in one structured place.
2. **Size:** If the application is "Offline-First" (like a web-based email client or a complex dashboard), `localStorage` is too small and slow to handle the data volume.
3. **Modern Standards:** Many developers now use libraries like `localForage` or `Dexie.js`. These libraries "look" like a database but are actually smart wrappers that choose the best storage method available in your browser.

**Which one is "better" for a session key?**
For just a single session string, `localStorage` is usually plenty. If you see a site using a full database for it, they are likely building a complex **Progressive Web App (PWA)** that needs to stay functional even if you lose your internet connection.

---
