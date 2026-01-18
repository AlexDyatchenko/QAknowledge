The API correctly returns `201` Created for POST requests that create a new resource. I updated the expected status from `200` to `201`
```ts
expect(response.status()).toBe(200);
expect(body.bookingId).toBeDefined();
```
API BDD Bad:
```
Given I call POST /orders
Then I get 201
```
Better:
```
Given an order request for a valid customer
When the order is submitted
Then the order is created and is retrievable
And the order total equals the sum of line items
```