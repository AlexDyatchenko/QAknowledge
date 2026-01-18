```ts

  test('should handle pagination parameters', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      params: {
        _page: 1,
        _limit: 5
      }
    });
    
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.length).toBeLessThanOrEqual(5);
  });
});

```