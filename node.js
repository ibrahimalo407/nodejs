// Create
app.post('/students', (req, res) => {
    const { first_name, last_name, email, phone } = req.body;
    const query = 'INSERT INTO students (first_name, last_name, email, phone) VALUES (?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, phone], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send({ id: results.insertId, first_name, last_name, email, phone });
      }
    });
  });
  
  // Read all
  app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  });
  
  // Read one
  app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.length === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send(results[0]);
      }
    });
  });
  
  // Update
  app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone } = req.body;
    const query = 'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE id = ?';
    db.query(query, [first_name, last_name, email, phone, id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send({ id, first_name, last_name, email, phone });
      }
    });
  });
  
  // Delete
  app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id = ?', [id], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.affectedRows === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send('Student deleted');
      }
    });
  });
  