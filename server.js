const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

let betaTesters = [];

// ✅ TEST ROUTE to verify server is working
app.get("/api/test", (req, res) => {
  res.send("✅ Server is live and responding to /api/test");
});

// ✅ Handle beta tester sign-up
app.post("/api/beta-testers", (req, res) => {
  const { name, email, wallet } = req.body;

  if (!name || !email || !wallet) {
    return res.status(400).json({ error: "All fields are required." });
  }

  betaTesters.push({ name, email, wallet });
  console.log("New beta tester:", { name, email, wallet });
  res.status(200).json({ message: "Sign-up successful!" });
});

// ✅ Fetch beta testers
app.get("/api/beta-testers", (req, res) => {
  res.status(200).json(betaTesters);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
