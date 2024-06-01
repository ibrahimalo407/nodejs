// server.js
const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const db = require('./server'); // Importer la connexion à la base de données depuis le fichier server.js

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/students', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = db; // Exporter la connexion à la base de données
