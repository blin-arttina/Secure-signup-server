
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const BETA_TESTERS_FILE = path.join(__dirname, 'betaTesters.json');

// Ensure betaTesters.json exists
if (!fs.existsSync(BETA_TESTERS_FILE)) {
    fs.writeFileSync(BETA_TESTERS_FILE, JSON.stringify([]));
}

// Helper to read beta testers from file
function readBetaTesters() {
    try {
        const data = fs.readFileSync(BETA_TESTERS_FILE);
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading beta testers:', err);
        return [];
    }
}

// Helper to write beta testers to file
function writeBetaTesters(data) {
    fs.writeFileSync(BETA_TESTERS_FILE, JSON.stringify(data, null, 2));
}

// POST /api/signup
app.post('/api/signup', (req, res) => {
    const { name, email, wallet } = req.body;
    if (!name || !email || !wallet) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const testers = readBetaTesters();
    testers.push({ name, email, wallet });
    writeBetaTesters(testers);

    res.json({ success: true });
});

// GET /api/beta-testers
app.get('/api/beta-testers', (req, res) => {
    const testers = readBetaTesters();
    res.json(testers);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
