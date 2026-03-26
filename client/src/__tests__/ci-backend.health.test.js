// src/App.test.js
// src/__tests__/App.test.js


test("backend health check", async () => {
  const res = await fetch("http://localhost:5000/api/hello");
  expect(res.ok).toBe(true);
});
