// src/App.test.js
import { render, screen } from "@testing-library/react";
import App from "../App.js";

beforeAll(() => {
  // Switch based on NODE_ENV if you want
  if (process.env.NODE_ENV === "development") {
    process.env.REACT_APP_API_URL = "http://localhost:5000";
  } else {
    process.env.REACT_APP_API_URL = "https://prod-url.example.com";
  }
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "Hello from Node.js backend!" }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders backend message", async () => {
  render(<App />);
  const element = await screen.findByText("Hello from Node.js backend!");
  expect(element).toBeInTheDocument();
});