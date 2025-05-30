
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = './beta_testers.json';

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

app.post('/signup', (req, res) => {
    const { name, email, wallet } = req.body;

    if (!name || !email || !wallet) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const existing = JSON.parse(fs.readFileSync(filePath));
    existing.push({ name, email, wallet, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    res.json({ success: true, message: 'Sign-up successful!' });
});

app.get('/beta-testers', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
