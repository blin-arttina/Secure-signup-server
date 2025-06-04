const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const betaTestersPath = path.join(__dirname, "beta-testers.json");

// Route to test if server is working
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Route to handle beta tester sign-up
app.post("/api/signup", (req, res) => {
  const { name, email, wallet } = req.body;

  if (!name || !email || !wallet) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newTester = { name, email, wallet };

  let testers = [];
  if (fs.existsSync(betaTestersPath)) {
    const existingData = fs.readFileSync(betaTestersPath);
    testers = JSON.parse(existingData);
  }

  testers.push(newTester);
  fs.writeFileSync(betaTestersPath, JSON.stringify(testers, null, 2));

  res.status(200).json({ success: true, message: "Signup successful" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
