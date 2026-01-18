```ts
// 1. JSON body with headers
const res1 = await request.post('/api/users', {
  data: { name: 'John', email: 'john@example.com' },
  headers: { 'Content-Type': 'application/json' }
});
```
```ts
// 2. Form data (URL encoded)
const res2 = await request.post('/login', {
  form: { username: 'admin', password: 'secret' }
});
```
```ts
// 3. Multipart form data (file upload)
const res3 = await request.post('/upload', {
  multipart: {
    file: { name: 'document.pdf', mimeType: 'application/pdf', buffer: Buffer.from('...') },
    description: 'My file'
  }
});
```
```ts
// 4. With authorization header
const res4 = await request.post('/api/orders', {
  data: { productId: 123, quantity: 2 },
  headers: { 'Authorization': `Bearer ${token}` }
});
```
```ts
// 5. With query parameters
const res5 = await request.post('/api/search?category=electronics', {
  data: { query: 'laptop', minPrice: 500 }
});
```
```ts
// 6. Expecting specific status
const res6 = await request.post('/api/items', {
  data: { name: 'New Item' },
  failOnStatusCode: false
});
expect(res6.status()).toBe(201);
```
```ts
// 7. With timeout
const res7 = await request.post('/api/long-operation', {
  data: { task: 'process' },
  timeout: 30000
});
```
```ts
// 8. Array in body
const res8 = await request.post('/api/bulk-create', {
  data: [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
  ]
});
```
```ts
// 9. Nested object
const res9 = await request.post('/api/checkout', {
  data: {
    customer: { id: 1, name: 'Jane' },
    items: [{ sku: 'ABC', qty: 2 }],
    shipping: { address: '123 Main St', city: 'NYC' }
  }
});
```