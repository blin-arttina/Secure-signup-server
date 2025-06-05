
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Signup route
app.post('/api/signup', (req, res) => {
  const { name, email, wallet } = req.body;

  if (!name || !email || !wallet) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newTester = {
    name,
    email,
    wallet,
    timestamp: new Date().toISOString()
  };

  const filePath = path.join(__dirname, 'beta_testers.json');

  let data = [];
  if (fs.existsSync(filePath)) {
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      return res.status(500).json({ error: 'Error reading data file' });
    }
  }

  data.push(newTester);

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true, message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
