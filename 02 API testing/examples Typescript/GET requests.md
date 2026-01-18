```ts
// 1. Simple GET
const res1 = await request.get('/api/users');
```
```ts
// 2. With path parameter
const res2 = await request.get(`/api/users/${userId}`);
```
```ts
// 3. With query parameters
const res3 = await request.get('/api/products', {
  params: { category: 'electronics', limit: 10, page: 1 }
});
```
```ts
// 4. With authorization header
const res4 = await request.get('/api/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```
```ts
// 5. With multiple headers
const res5 = await request.get('/api/data', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'X-Custom-Header': 'value'
  }
});
```
```ts
// 6. Parse JSON response
const res6 = await request.get('/api/users/1');
const user = await res6.json();
expect(user.name).toBe('John');
```
```ts
// 7. With timeout
const res7 = await request.get('/api/slow-endpoint', {
  timeout: 60000
});
```
```ts
// 8. Without failing on error status
const res8 = await request.get('/api/maybe-missing', {
  failOnStatusCode: false
});
expect(res8.status()).toBe(404);
```
```ts
// 9. Get response headers
const res9 = await request.get('/api/items');
const contentType = res9.headers()['content-type'];
const items = await res9.json();
```
```ts
// 10. Download file / get buffer
const res10 = await request.get('/api/reports/download', {
  headers: { 'Accept': 'application/pdf' }
});
const buffer = await res10.body();