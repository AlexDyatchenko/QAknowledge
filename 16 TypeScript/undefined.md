Dealing with `undefined` is one of the most common tasks in TypeScript. Because TypeScript's goal is type safety, it forces you to handle these cases to prevent the dreaded "Cannot read property of undefined" errors.

Here are the most effective ways to check, reassign, and handle `undefined` values.

---

## 1. Quick Reassignment (The "Default Value")

If you have a variable that might be `undefined` and you want to fall back to an empty string (or any other default), use the **Nullish Coalescing Operator (`??`)**.

```typescript
let name: string | undefined;

// If name is null or undefined, result becomes ""
const result = name ?? ""; 

```

### Why use `??` instead of `||`?

* **`??` (Nullish):** Only triggers for `null` or `undefined`.
* **`||` (Falsy):** Triggers for `null`, `undefined`, `0`, `false`, and `""` (empty string).
If you use `name || "default"`, and the name is actually an empty string, it will be overwritten. Usually, `??` is the safer choice for strings.

---

## 2. Safe Access (Optional Chaining)

If you are trying to access a property on an object that might be `undefined`, use **Optional Chaining (`?.`)**. This prevents the code from crashing and returns `undefined` instead of throwing an error.

```typescript
type User = { profile?: { bio: string } };
let user: User | undefined;

// This won't crash; it just returns undefined
const bio = user?.profile?.bio; 

// Combined with a default value:
const displayBio = user?.profile?.bio ?? "No bio available";

```

---

## 3. Checking for Undefined (Type Guarding)

TypeScript is smart—if you check for `undefined` inside an `if` statement, it "narrows" the type so you can use the variable safely inside that block.

### Explicit Check

```typescript
if (name !== undefined && name !== null) {
    console.log(name.length); // TypeScript knows name is a string here
}

```

### Truthiness Check

If you just want to ensure the value exists and isn't an empty string or zero:

```typescript
if (name) {
    // Runs if name is NOT undefined, null, "", 0, or false
}

```

---

## 4. Handling Function Parameters

You can prevent `undefined` from ever entering your logic by using **Default Parameters**.

```typescript
function greet(message: string = "Hello!") {
    console.log(message);
}

greet();          // "Hello!"
greet(undefined); // "Hello!"

```

---

## 5. The "I Know Better" Operator (Non-null Assertion)

If you are 100% certain a value exists even though TypeScript thinks it might be `undefined`, you can use the `!` operator. **Use this sparingly**, as it bypasses safety checks.

```typescript
const element = document.getElementById("root")!; // You're telling TS: "I know this exists"
element.innerHTML = "Hello";

```

---

### Summary Table

| Goal | Operator/Syntax | Example |
| --- | --- | --- |
| **Provide Default** | `??` | `val ?? ""` |
| **Deep Access** | `?.` | `user?.address?.city` |
| **Narrowing** | `if` | `if (val) { ... }` |
| **Function Default** | `=` | `(param = "default") => ...` |

Would you like me to show you how to configure your `tsconfig.json` to make these checks stricter (or more lenient) using the `strictNullChecks` flag?