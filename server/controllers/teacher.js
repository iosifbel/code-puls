const connection = require("../config/db");
const mysql = require("mysql2");

const controller = {
  getById: async (req, res) => {
    connection.query(
      mysql.format("SELECT * FROM profesori WHERE id = ?", [
        req.params.teacher_id,
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
  getSubjects: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT m.id, m.descriere, m.an FROM materii m WHERE m.id_profesor = ?",
        [req.params.teacher_id]
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
  getTests: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT t.* FROM teste t INNER JOIN materii m ON m.id = t.id_materie INNER JOIN profesori p ON p.id = m.id_profesor WHERE p.id = ?",
        [req.params.teacher_id]
      ),

      (err, result) => {
        if (!err) {
          if (result) {
            res.status(200).send(result);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error" + err);
        }
      }
    );
  },
  getAllUngradedSubmissions: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT n.id_test, t.titlu, t.id_materie, t.id_limbaj_programare, t.deadline, s.id, s.nume, s.prenume, s.grupa, n.incercare, n.evaluareAutomata, n.intarziat FROM studenti s JOIN note n ON n.id_student = s.id JOIN teste t ON n.id_test = t.id JOIN materii m ON m.id = t.id_materie JOIN profesori p ON m.id_profesor = p.id WHERE m.id_profesor = ? AND n.incercare IS NOT NULL AND n.nota IS NULL AND NOW() > t.deadline",
        [req.params.teacher_id]
      ),

      (err, result) => {
        if (!err) {
          if (result) {
            // console.log(result);
            res.status(200).send(result);
          } else {
            res.status(404).send("Not found");
          }
        } else {
          res.status(500).send("Server error" + err);
          console.log(err);
        }
      }
    );
  },
};

module.exports = controller;
