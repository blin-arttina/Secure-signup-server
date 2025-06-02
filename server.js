const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = './beta_testers.json';

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
  const { name, email, wallet } = req.body;
  if (!name || !email || !wallet) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  fs.readFile(filePath, (err, data) => {
    let testers = [];
    if (!err) {
      testers = JSON.parse(data);
    }
    testers.push({ name, email, wallet });
    fs.writeFile(filePath, JSON.stringify(testers, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Failed to save data.' });
      res.status(200).json({ message: 'Sign-up successful!' });
    });
  });
});

app.get('/signups', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading data.' });
    res.status(200).json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});