// models/studentModel.js

// studentModel.js
const mysql = require('mysql2');

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'students'
});




class Student {
    static getAll(callback) {
        db.query('SELECT * FROM students', callback);
    }
    
    static getById(id, callback) {
        db.query('SELECT * FROM students WHERE id = ?', [id], callback);
    }
    
  static create(studentData, callback) {
      db.query('INSERT INTO students SET ?', [studentData], callback);
    }
    
    static update(id, studentData, callback) {
    db.query('UPDATE students SET ? WHERE id = ?', [studentData, id], callback);
}

static delete(id, callback) {
    db.query('DELETE FROM students WHERE id = ?', [id], callback);
}
}

module.exports = Student;
