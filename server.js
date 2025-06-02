
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'beta_testers.json');

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { name, email, wallet } = req.body;
    if (!name || !email || !wallet) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newEntry = { name, email, wallet };

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        let testers = [];
        if (!err && data) {
            try {
                testers = JSON.parse(data);
            } catch (parseErr) {
                console.error('Failed to parse existing data:', parseErr);
            }
        }

        testers.push(newEntry);

        fs.writeFile(DATA_FILE, JSON.stringify(testers, null, 2), err => {
            if (err) {
                console.error('Failed to save data:', err);
                return res.status(500).json({ message: 'Failed to save data.' });
            }
            res.status(200).json({ message: 'Sign-up successful.' });
        });
    });
});

app.get('/signups', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Could not load signups.' });
        }
        res.status(200).json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
