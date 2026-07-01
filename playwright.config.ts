import { defineConfig } from '@playwright/test';

// Configuration for the API testing project. Since we are only using the
// request API here, we do not need any browser-specific settings. The
// baseURL points at JSONPlaceholder, a public fake REST API suitable
// for demonstrating CRUD operations.
export default defineConfig({
  testDir: './tests',
  timeout: 20 * 1000,
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    // Disables browser launch since API tests do not interact with a UI
    browserName: 'chromium',
    headless: true,
  },
  reporter: [['list'], ['html']],
});
