const express = require("express");
const app = express();
const cors = require("cors");

const allowedOrigins = [
	"http://localhost:3000"	
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl)
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
//app.use(cors());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

//Export app for tests
module.exports = app;

//Only start server if not in test mode
if (require.main === module){
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}
