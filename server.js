const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Signup route
app.post('/api/signup', (req, res) => {
  const { name, email, wallet } = req.body;

  if (!name || !email || !wallet) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newTester = { name, email, wallet };
  const filePath = path.join(__dirname, 'beta-testers.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let testers = [];
    if (!err && data) {
      try {
        testers = JSON.parse(data);
      } catch (parseErr) {
        console.error('JSON parse error:', parseErr);
      }
    }

    testers.push(newTester);

    fs.writeFile(filePath, JSON.stringify(testers, null, 2), (err) => {
      if (err) {
        console.error('Write error:', err);
        return res.status(500).json({ error: 'Server error writing file' });
      }
      res.status(200).json({ message: 'Signup successful' });
    });
  });
});

// Endpoint to GET signups
app.get('/api/beta-testers', (req, res) => {
  const filePath = path.join(__dirname, 'beta-testers.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    try {
      const testers = JSON.parse(data);
      res.status(200).json(testers);
    } catch (parseErr) {
      res.status(500).json({ error: 'Invalid JSON in file' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
