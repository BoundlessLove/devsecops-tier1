/*import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/



import { render, screen } from "@testing-library/react";
import App from "../App.js";

// 1. Mock environment variables BEFORE importing App
jest.mock('./App', () => {
  process.env.REACT_APP_API_URL = "http://localhost:5000";
  return jest.requireActual('./App');
});





// Mock the API call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Hello from Node.js backend!" }),
  })
);


/*
//React components are evaluated as soon as they are imported.
// By moving the env setup above the import, - process.env.REACT_APP_API_URL is defined, URL valid,
// mock fetch intercepts the call and the test is evaluated

beforeAll(() => {
// Set the environment variable for the test, 
//as they are only injected at build time (i.e. not available for NPM test)
if (process.env.NODE_ENV === "development") {
  process.env.REACT_APP_API_URL = "http://localhost:5000";
} else {
  process.env.REACT_APP_API_URL = "http://mock-url-for-tests";
}
});*/


test("renders backend message", async () => {
  render(<App />);
  const element = await screen.findByText("Hello from Node.js backend!");
  expect(element).toBeInTheDocument();
});