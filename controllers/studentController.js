// controllers/studentController.js
const Student = require('../models/studentModel');

class StudentController {
  static async getAll(req, res) {
    Student.getAll((err, students) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(students);
      }
    });
  }

  static async getById(req, res) {
    const { id } = req.params;
    Student.getById(id, (err, student) => {
      if (err) {
        res.status(500).send(err);
      } else if (!student) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send(student);
      }
    });
  }

  static async create(req, res) {
    const studentData = req.body;
    Student.create(studentData, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(result);
      }
    });
  }

  static async update(req, res) {
    const { id } = req.params;
    const studentData = req.body;
    Student.update(id, studentData, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.affectedRows === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send(result);
      }
    });
  }

  static async delete(req, res) {
    const { id } = req.params;
    Student.delete(id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.affectedRows === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send('Student deleted');
      }
    });
  }
}

module.exports = StudentController;
