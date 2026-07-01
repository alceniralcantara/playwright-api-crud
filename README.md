# Playwright API CRUD Example

This project demonstrates how to perform **Create‑Read‑Update‑Delete (CRUD)** operations against a REST API using the Playwright test runner and TypeScript.  Instead of driving a browser, Playwright’s [`APIRequestContext`](https://playwright.dev/docs/api-testing) can be used to send HTTP requests directly.  The test suite interacts with the public [`jsonplaceholder`](https://jsonplaceholder.typicode.com/) service to create a post, read it back, update its content and finally delete it.  Although the API does not persist data beyond a single request, it is an excellent sandbox for demonstrating HTTP workflows.

## Key concepts

- **Direct API calls with Playwright** – Playwright exposes a [`request` fixture](https://playwright.dev/docs/api-testing) that gives you an `APIRequestContext`.  The test uses this context to send `POST`, `GET`, `PUT` and `DELETE` requests and asserts on the returned status codes and response bodies【505178693642137†L288-L392】.  Using the same test runner for UI and API tests keeps your tooling consistent across layers.
- **Verifying responses** – After each call the test asserts the expected HTTP status (e.g., `201` for a successful POST) and inspects JSON fields.  Validating status codes and response content is crucial to ensure both happy paths and error handling【505178693642137†L288-L392】.
- **Isolated state** – Because jsonplaceholder does not persist changes, each test action is independent.  In a real project you may seed data via APIs before running UI tests and reset state afterwards, as recommended by Playwright best practices【465384592128435†L255-L446】.

## Running the tests

1. Install dependencies:

   ```bash
   npm install
   ```

2. Execute the API tests:

   ```bash
   npx playwright test
   ```

3. View the HTML report (optional):

   ```bash
   npx playwright show-report
   ```

The tests live in `tests/api-crud.spec.ts`.  Feel free to adapt the endpoints or payloads to match your own APIs.  See the official Playwright documentation for more details on API testing【505178693642137†L288-L392】.

## Project structure

- `package.json` – defines project metadata and lists `@playwright/test` and TypeScript as dev dependencies.
- `playwright.config.ts` – configures the test runner (base URL, parallelism, reporter etc.).
- `tests/api-crud.spec.ts` – the test suite performing POST, GET, PUT and DELETE operations against jsonplaceholder.

This example can serve as a starting point for integrating API checks into your broader test strategy alongside UI tests.
