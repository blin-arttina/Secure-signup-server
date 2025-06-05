const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// BETA TESTER SIGN-UP ROUTE
app.post('/api/beta-testers', (req, res) => {
  const { name, email, wallet } = req.body;

  if (!name || !email || !wallet) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  console.log('New Beta Tester:', { name, email, wallet });

  // You can replace this with actual storage or email logic
  res.status(200).json({ message: 'Beta tester submitted successfully.' });
});

// START SERVER
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
