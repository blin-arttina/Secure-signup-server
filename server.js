
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files if needed
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint for beta tester form
app.post('/submit-form', (req, res) => {
    const { name, email, wallet } = req.body;
    if (!name || !email || !wallet) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEntry = { name, email, wallet, timestamp: new Date().toISOString() };
    const filePath = path.join(__dirname, 'beta_testers.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let json = [];
        if (!err && data) {
            try {
                json = JSON.parse(data);
            } catch (e) {
                json = [];
            }
        }
        json.push(newEntry);
        fs.writeFile(filePath, JSON.stringify(json, null, 2), 'utf8', err => {
            if (err) {
                return res.status(500).json({ message: 'Error saving data' });
            }
            res.status(200).json({ message: 'Thank you for signing up!' });
        });
    });
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
    res.status(404).send('Route not found.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
