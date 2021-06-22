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
        "SELECT m.id, m.descriere, m.an, s.grupa FROM materii m JOIN studenti s ON s.id = ( SELECT MIN(im.id_student) FROM inrolare_materie im WHERE im.id_materie = m.id ) WHERE m.id_profesor = ?",
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
        "SELECT t.* FROM teste t INNER JOIN materii m ON m.id = t.id_materie INNER JOIN profesori p ON p.id = m.id_profesor WHERE p.id = ?" ,
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
  getAllSubmissions: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT t.titlu, t.id_materie, s.nume, s.prenume, s.grupa, n.incercare, n.evaluareAutomata, n.intarziat, m.id_profesor, p.nume FROM studenti s JOIN note n ON n.id_student = s.id JOIN teste t ON n.id_test = t.id JOIN materii m ON m.id = t.id_materie JOIN profesori p ON m.id_profesor = p.id WHERE m.id_profesor = ? AND incercare IS NOT NULL"
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
};

module.exports = controller;
