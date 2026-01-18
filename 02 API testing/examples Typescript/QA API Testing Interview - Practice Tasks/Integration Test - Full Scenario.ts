import { test, expect, APIRequestContext } from "@playwright/test";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Custom fixture for API context with auth
test.describe("Complete User Workflow Integration Test", () => {
  let userId: number;
  let createdPostId: number;

  test("Complete user journey - CRUD operations", async ({ request }) => {
    // Step 1: Create a new user
    console.log("Step 1: Creating new user...");
    const newUser = {
      name: "Integration Test User",
      username: "integrationuser",
      email: "integration@test.com",
      address: {
        street: "123 Test St",
        city: "Test City",
        zipcode: "12345",
      },
      phone: "555-0123",
      website: "testuser.com",
    };

    const createUserResponse = await request.post(`${BASE_URL}/users`, {
      data: newUser,
    });

    expect(createUserResponse.ok()).toBeTruthy();
    expect(createUserResponse.status()).toBe(201);

    const createdUser = await createUserResponse.json();
    userId = createdUser.id;

    expect(createdUser).toMatchObject({
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    });

    console.log(`✓ User created with ID: ${userId}`);

    // Step 2: Verify user was created by fetching it
    console.log("Step 2: Verifying user creation...");
    const getUserResponse = await request.get(`${BASE_URL}/users/${userId}`);

    expect(getUserResponse.ok()).toBeTruthy();
    const fetchedUser = await getUserResponse.json();
    expect(fetchedUser.id).toBe(userId);

    console.log("✓ User verified");

    // Step 3: Create a post for the user
    console.log("Step 3: Creating post for user...");
    const newPost = {
      userId: userId,
      title: "My Integration Test Post",
      body: "This is a test post created during integration testing.",
    };

    const createPostResponse = await request.post(`${BASE_URL}/posts`, {
      data: newPost,
    });

    expect(createPostResponse.status()).toBe(201);
    const createdPost = await createPostResponse.json();
    createdPostId = createdPost.id;

    expect(createdPost).toMatchObject({
      userId: userId,
      title: newPost.title,
      body: newPost.body,
    });

    console.log(`✓ Post created with ID: ${createdPostId}`);

    // Step 4: Get all posts for the user
    console.log("Step 4: Fetching user posts...");
    const userPostsResponse = await request.get(`${BASE_URL}/posts`, {
      params: {
        userId: userId,
      },
    });

    expect(userPostsResponse.ok()).toBeTruthy();
    const userPosts = await userPostsResponse.json();
    expect(Array.isArray(userPosts)).toBeTruthy();

    console.log(`✓ Found ${userPosts.length} posts for user`);

    // Step 5: Add comments to the post
    console.log("Step 5: Adding comments to post...");
    const newComment = {
      postId: createdPostId,
      name: "Test Commenter",
      email: "commenter@test.com",
      body: "This is a test comment.",
    };

    const createCommentResponse = await request.post(`${BASE_URL}/comments`, {
      data: newComment,
    });

    expect(createCommentResponse.status()).toBe(201);
    const createdComment = await createCommentResponse.json();

    expect(createdComment.postId).toBe(createdPostId);
    console.log("✓ Comment added to post");

    // Step 6: Update user information
    console.log("Step 6: Updating user information...");
    const updatedUserData = {
      name: "Updated Integration User",
      email: "updated.integration@test.com",
    };

    const updateUserResponse = await request.patch(
      `${BASE_URL}/users/${userId}`,
      {
        data: updatedUserData,
      },
    );

    expect(updateUserResponse.ok()).toBeTruthy();
    const updatedUser = await updateUserResponse.json();
    expect(updatedUser.id).toBe(userId);

    console.log("✓ User information updated");

    // Step 7: Update post
    console.log("Step 7: Updating post...");
    const updatedPostData = {
      title: "Updated Post Title",
      body: "This post has been updated.",
    };

    const updatePostResponse = await request.patch(
      `${BASE_URL}/posts/${createdPostId}`,
      {
        data: updatedPostData,
      },
    );

    expect(updatePostResponse.ok()).toBeTruthy();
    console.log("✓ Post updated");

    // Step 8: Get post comments
    console.log("Step 8: Fetching post comments...");
    const commentsResponse = await request.get(
      `${BASE_URL}/posts/${createdPostId}/comments`,
    );

    expect(commentsResponse.ok()).toBeTruthy();
    const comments = await commentsResponse.json();
    expect(Array.isArray(comments)).toBeTruthy();

    console.log(`✓ Found ${comments.length} comments on post`);

    // Step 9: Delete post
    console.log("Step 9: Deleting post...");
    const deletePostResponse = await request.delete(
      `${BASE_URL}/posts/${createdPostId}`,
    );

    expect(deletePostResponse.ok()).toBeTruthy();
    console.log("✓ Post deleted");

    // Step 10: Delete user
    console.log("Step 10: Deleting user...");
    const deleteUserResponse = await request.delete(
      `${BASE_URL}/users/${userId}`,
    );

    expect(deleteUserResponse.ok()).toBeTruthy();
    console.log("✓ User deleted");

    console.log("\n✅ Complete integration test passed!");
  });

  test("Error handling and edge cases", async ({ request }) => {
    // Test 404 handling
    const notFoundResponse = await request.get(`${BASE_URL}/users/999999`);
    expect(notFoundResponse.status()).toBe(404);

    // Test invalid POST data
    const invalidUserResponse = await request.post(`${BASE_URL}/users`, {
      data: {
        // Missing required fields
        username: "incomplete",
      },
    });
    // JSONPlaceholder accepts anything, but in real API would be 400
    expect([200, 201, 400, 422]).toContain(invalidUserResponse.status());

    // Test empty response handling
    const emptyResponse = await request.get(`${BASE_URL}/users`, {
      params: {
        id: 999999,
      },
    });
    expect(emptyResponse.ok()).toBeTruthy();
  });

  test("Concurrent requests handling", async ({ request }) => {
    // Make multiple requests concurrently
    const userIds = [1, 2, 3, 4, 5];

    const promises = userIds.map((id) =>
      request.get(`${BASE_URL}/users/${id}`),
    );

    const responses = await Promise.all(promises);

    // Verify all requests succeeded
    responses.forEach((response, index) => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    // Parse and verify data
    const users = await Promise.all(responses.map((r) => r.json()));

    users.forEach((user, index) => {
      expect(user.id).toBe(userIds[index]);
    });
  });

  test("Response validation and schema check", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    expect(response.ok()).toBeTruthy();

    const user = await response.json();

    // Schema validation
    const requiredFields = [
      "id",
      "name",
      "username",
      "email",
      "address",
      "phone",
      "website",
      "company",
    ];

    requiredFields.forEach((field) => {
      expect(user).toHaveProperty(field);
    });

    // Type validation
    expect(typeof user.id).toBe("number");
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");

    // Nested object validation
    expect(user.address).toHaveProperty("street");
    expect(user.address).toHaveProperty("city");
    expect(user.address).toHaveProperty("zipcode");

    // Email format validation
    expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test("Performance metrics tracking", async ({ request }) => {
    const iterations = 10;
    const responseTimes: number[] = [];

    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      const response = await request.get(`${BASE_URL}/users`);
      const duration = Date.now() - start;

      responseTimes.push(duration);
      expect(response.ok()).toBeTruthy();
    }

    // Calculate metrics
    const avgResponseTime =
      responseTimes.reduce((a, b) => a + b, 0) / iterations;
    const maxResponseTime = Math.max(...responseTimes);
    const minResponseTime = Math.min(...responseTimes);

    console.log(`Average response time: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`Max response time: ${maxResponseTime}ms`);
    console.log(`Min response time: ${minResponseTime}ms`);

    // Assert performance requirements
    expect(avgResponseTime).toBeLessThan(1000);
    expect(maxResponseTime).toBeLessThan(3000);
  });
});
