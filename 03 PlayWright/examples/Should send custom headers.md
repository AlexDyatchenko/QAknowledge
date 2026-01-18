```ts

  test('should send custom headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      headers: {
        'Authorization': 'Bearer fake-token',
        'X-Custom-Header': 'test-value'
      }
    });
    
    expect(response.status()).toBe(200);
  });

```