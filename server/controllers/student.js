const connection = require("../config/db");
const mysql = require("mysql2");

const controller = {
  getById: async (req, res) => {
    connection.query(
      mysql.format("SELECT * FROM `studenti` WHERE id = ?", [
        req.params.student_id,
      ]),

      (err, result) => {
        if (!err) {
          if (result[0]) {
            res.status(200).send(result[0]);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
  getByGroup: async (req, res) => {
    connection.query(
      mysql.format("SELECT * FROM `studenti` WHERE grupa = ?", [
        req.params.student_group,
      ]),

      (err, result) => {
        if (!err) {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
  getByYear: async (req, res) => {
    connection.query(
      mysql.format("SELECT * FROM `studenti` WHERE an = ?", [
        req.params.student_year,
      ]),

      (err, result) => {
        if (!err) {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
  getSubjects: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT m.id, m.descriere, p.nume, p.prenume, m.an FROM materii m JOIN inrolare_materie im ON m.id = im.id_materie JOIN studenti s ON im.id_student = s.id JOIN profesori p ON p.id = m.id WHERE s.id = ?",
        [req.params.student_id]
      ),

      (err, result) => {
        if (!err) {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
  getAssignmentsDue: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT t.*, n.nota, n.intarziat FROM teste t INNER JOIN note n ON t.id = n.id_test WHERE n.id_student = ? AND NOW() < t.deadline",
        [req.params.student_id]
      ),

      (err, result) => {
        if (!err) {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
  getAssignmentsExpired: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT t.*, n.nota, n.intarziat FROM teste t INNER JOIN note n ON t.id = n.id_test WHERE n.id_student = ? AND t.deadline < NOW()",
        [req.params.student_id]
      ),

      (err, result) => {
        if (!err) {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
};

module.exports = controller;
