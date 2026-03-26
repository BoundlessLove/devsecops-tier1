/*import { render, screen } from "@testing-library/react";
import App from "../App.js";

beforeAll(() => {
  process.env.REACT_APP_API_URL = "http://localhost:5000";
  console.log("API key length:", process.env.REACT_APP_API_KEY?.length);
});

test("loads secure API-key protected data", async () => {
  render(<App />);

  const element = await screen.findByText(/This is protected data/i, {}, { timeout: 3000 });

  expect(element).toBeInTheDocument();
});
 */

import { render, screen } from "@testing-library/react";
import App from "../App.js";

beforeAll(() => {
  // Backend URL for local + CI
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

test("loads secure API-key protected data", async () => {
  render(<App />);

  // Your App.js sets:
  // setSecureMsg(data.secret)
  //
  // And your backend returns:
  // { secret: "This is protected data" }

  const element = await screen.findByText(
    /This is protected data/i,
    {},
    { timeout: 3000 }
  );

  expect(element).toBeInTheDocument();
});
