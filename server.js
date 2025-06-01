
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = './beta_testers.json';

app.get('/testers', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read data' });
        res.json(JSON.parse(data));
    });
});

app.post('/signup', (req, res) => {
    const newTester = req.body;
    fs.readFile(filePath, (err, data) => {
        let testers = [];
        if (!err && data.length > 0) {
            testers = JSON.parse(data);
        }
        testers.push(newTester);
        fs.writeFile(filePath, JSON.stringify(testers, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Failed to write data' });
            res.status(201).json({ message: 'Tester added successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
