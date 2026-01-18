```ts
let name: string | undefined;
// If name is null or undefined, result becomes ""
const result = name ?? "";
```

```ts
type User = { profile?: { bio: string } };
let user: User | undefined;

// This won't crash; it just returns undefined
const bio = user?.profile?.bio; 

// Combined with a default value:
const displayBio = user?.profile?.bio ?? "No bio available";
```
```ts
// 6. Parse JSON response
const res6 = await request.get('/api/users/1');
const user = await res6.json();
expect(user.name).toBe('John');
```
export const testConfig = ... makes testConfig available to other files/modules only if they *import* it.

