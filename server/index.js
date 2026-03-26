// --- Existing imports ---
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// --- NEW: API key middleware ---
function requireApiKey(req, res, next) {
  const clientKey = req.headers["x-api-key"];
  const serverKey = process.env.API_KEY_PROD;
 // const serverKey = process.env.API_KEY_LOCAL;
  //console.log(`Server key: ${serverKey}`);

  if (!clientKey || clientKey !== serverKey) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  next();
}

// --- Existing CORS config ---
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: false
}));

// --- Existing route ---
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

// --- NEW: Protected route ---
app.get("/api/secure-data", requireApiKey, (req, res) => {
  res.json({
    secret: "This is protected data",
    timestamp: new Date().toISOString()
  });
});

// Export app for tests
module.exports = app;

// Only start server if not in test mode
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}