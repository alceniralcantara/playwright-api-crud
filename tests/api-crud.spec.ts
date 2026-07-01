import { test, expect } from '@playwright/test';

// This test performs a full CRUD cycle against the JSONPlaceholder API
// (https://jsonplaceholder.typicode.com). Although the API does not
// persist mutations, it responds with appropriate status codes, making it
// suitable for illustrating how to send HTTP requests and validate
// responses with Playwright's APIRequestContext. See the Playwright
// documentation for details on using the request context【505178693642137†L288-L392】.

test('perform CRUD operations via the API', async ({ request }) => {
  // Create a new post (POST)
  const newPost = { title: 'playwright post', body: 'initial body', userId: 1 };
  const createResponse = await request.post('/posts', { data: newPost });
  expect(createResponse.status()).toBe(201);
  const created = await createResponse.json();
  // JSONPlaceholder responds with a new id (101) but echoes the request body.
  expect(created.title).toBe(newPost.title);
  const id = created.id;

  // Read the newly created post (GET)
  const readResponse = await request.get(`/posts/${id}`);
  expect(readResponse.ok()).toBeTruthy();
  const readBody = await readResponse.json();
  // The API returns a canned post for IDs 1‑100; new posts return the
  // placeholder structure. Verify that at least the title is present.
  expect(readBody).toHaveProperty('title');

  // Update the post (PUT)
  const updatedData = { ...newPost, title: 'playwright post updated', body: 'updated body' };
  const updateResponse = await request.put(`/posts/${id}`, { data: updatedData });
  expect(updateResponse.status()).toBe(200);
  const updated = await updateResponse.json();
  expect(updated.title).toBe(updatedData.title);
  expect(updated.body).toBe(updatedData.body);

  // Delete the post (DELETE)
  const deleteResponse = await request.delete(`/posts/${id}`);
  // The API responds with an empty object and status 200 for successful deletion
  expect(deleteResponse.status()).toBe(200);
  const deleteBody = await deleteResponse.text();
  expect(deleteBody).toBe('{}');
});
