A classic example of preventing a race condition is
managing a shared counter or a bank balance that multiple threads are trying to update at once.
The Problem (Without a Lock)
If two threads try to increment a variable counter = 0 at the same time:

    Thread A reads 0.
    Thread B reads 0.
    Thread A adds 1 and writes 1.
    Thread B adds 1 and writes 1.
    Result: The counter is 1, but it should have been 2. 

The Solution (Using a Lock)
A Lock (or Mutex) creates a "one-at-a-time" rule for a specific section of code. 
Python Example
In Python, you use the threading module to ensure only one thread can modify the data at a time. 
python

import threading

# Shared resource
counter = 0
# The Lock object
counter_lock = threading.Lock()

```
class Mutex {
    // A chain of promises that ensures sequential execution
    private mutex = Promise.resolve();

    async acquire(): Promise<() => void> {
        let release: () => void;
        const next = new Promise<void>((resolve) => {
            release = resolve;
        });

        // Add the new request to the end of the chain
        const current = this.mutex;
        this.mutex = current.then(() => next);

        // Wait for the previous link in the chain to finish
        await current;
        return release!;
    }
}

// --- Usage ---
let sharedCounter = 0;
const counterLock = new Mutex();

async function incrementCounter(id: string) {
    // 1. Acquire the lock (Wait your turn)
    const release = await counterLock.acquire();
    
    try {
        console.log(`Thread ${id} is reading: ${sharedCounter}`);
        const current = sharedCounter;
        
        // Simulate a 100ms async delay (where a race condition would normally happen)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        sharedCounter = current + 1;
        console.log(`Thread ${id} wrote: ${sharedCounter}`);
    } finally {
        // 2. Always release the lock in a finally block
        release();
    }
}

// Launch 5 concurrent "threads" (async functions)
Promise.all([
    incrementCounter('A'),
    incrementCounter('B'),
    incrementCounter('C'),
    incrementCounter('D'),
    incrementCounter('E')
]).then(() => {
    console.log(`Final counter value: ${sharedCounter}`); // Exactly 5
});

```

# Create multiple threads to run the same function
threads = [threading.Thread(target=increment) for _ in range(5)]

for t in threads: t.start()
for t in threads: t.join()

print(f"Final counter: {counter}") # Always results in 500000

Use code with caution.
How it Works

    Requesting the Lock: When a thread reaches with counter_lock, it asks the system for permission to proceed.
    Blocking: If another thread already has the lock, the requesting thread is blocked (put on pause) until the lock is released.
    Exclusive Access: Once a thread gets the lock, it has exclusive access to the counter += 1 operation.
    Release: When the operation is done, the thread releases the lock, allowing the next waiting thread to take its turn. 