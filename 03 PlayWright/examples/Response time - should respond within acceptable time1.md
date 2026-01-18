```ts

  test('Response time - should respond within acceptable time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get(`${BASE_URL}/users`);
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(2000); // Less than 2 seconds
  });
});

```