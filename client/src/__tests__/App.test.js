// src/App.test.js
// src/__tests__/App.test.js
import { render, screen } from "@testing-library/react";
import App from "../App.js";

beforeAll(() => {
  // Force Jest to use your local backend during tests
  process.env.REACT_APP_API_URL = "http://localhost:5000";

    // API key comes from:
    // - .env.local (local)
    // - GitHub Actions Key Vault step (CI)
    if (!process.env.REACT_APP_API_KEY) {
      throw new Error("REACT_APP_API_KEY is missing in test environment");
    }

});

afterEach(() => {
  jest.restoreAllMocks();
});

test("shows backend message or error", async () => {
  render(<App />);
  //if you want to force error:
  //jest.spyOn(global, "fetch").mockRejectedValue(new Error("Server offline"));

  const element = await screen.findByText(
    /Hello from Node\.js backend!|error/i,
    {},
    { timeout: 3000 }
  );

  expect(element).toBeInTheDocument();
});


test("renders backend message", async () => {
  render(<App />);

  // This will fail if the backend is down
  await expect(
    screen.findByText("Hello from Node.js backend!", {}, { timeout: 3000 })
  ).resolves.toBeTruthy();
});


/*
test("shows error when backend is down", async () => {
  jest.spyOn(global, "fetch").mockRejectedValue(new Error("Server offline"));

  render(<App />);

  const error = await screen.findByText(/error/i);
  expect(error).toBeInTheDocument();
});
*/