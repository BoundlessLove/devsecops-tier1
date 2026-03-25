const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Import your actual server file
const app = require("../index.js"); // adjust if your entry file is named differently

describe("GET /api/hello", () => {
  it("returns the expected message", async () => {
    const res = await request(app).get("/api/hello");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello from Node.js backend!");
  });
});