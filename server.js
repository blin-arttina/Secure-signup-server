
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/signup', (req, res) => {
  const data = req.body;
  fs.readFile('beta_testers.json', (err, fileData) => {
    const testers = err ? [] : JSON.parse(fileData);
    testers.push(data);
    fs.writeFile('beta_testers.json', JSON.stringify(testers, null, 2), () => {
      res.status(200).send({ message: 'Signup saved.' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
