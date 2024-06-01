// studentRoutes.js
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');
const db = require('../server'); // Importer la connexion à la base de données depuis le fichier server.js

// Route pour récupérer tous les étudiants
router.get('/', (req, res) => {
  // Utiliser la connexion db pour exécuter la requête SQL pour récupérer tous les étudiants
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Route pour récupérer un étudiant par son ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  // Utiliser la connexion db pour exécuter la requête SQL pour récupérer un étudiant par son ID
  db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Étudiant non trouvé');
      return;
    }
    res.json(results[0]);
  });
});

// Route pour créer un nouvel étudiant
router.post('/', (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  // Utiliser la connexion db pour exécuter la requête SQL pour insérer un nouvel étudiant
  db.query('INSERT INTO students (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)', [first_name, last_name, email, phone], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send('Étudiant ajouté avec succès');
  });
});

// Route pour mettre à jour un étudiant par son ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, phone } = req.body;
  // Utiliser la connexion db pour exécuter la requête SQL pour mettre à jour un étudiant
  db.query('UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?', [first_name, last_name, email, phone, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send('Étudiant mis à jour avec succès');
  });
});

// Route pour supprimer un étudiant par son ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  // Utiliser la connexion db pour exécuter la requête SQL pour supprimer un étudiant
  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send('Étudiant supprimé avec succès');
  });
});

module.exports = router;
