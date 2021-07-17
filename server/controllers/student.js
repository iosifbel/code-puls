const connection = require("../config/db");
const mysql = require("mysql2");
const { response } = require("express");
const { verifyPassword, hashPassword, createToken } = require("../utils/Hash");
const jwtDecode = require("jwt-decode");

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
        "SELECT m.*, p.nume, p.prenume FROM materii m INNER JOIN inrolare_materie im ON m.id = im.id_materie INNER JOIN profesori p ON m.id_profesor = p.id WHERE im.id_student = ?",
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
  uploadAssignment: async (req, res) => {
    connection.query(
      mysql.format(
        "UPDATE note SET incercare = ? WHERE id_student = ? AND id_test = ?",
        [req.body.incercare, req.params.student_id, req.params.test_id]
      ),
      (err, result) => {
        if (!err) {
          if (result) {
            if (result.affectedRows > 0)
              res.status(200).send("Assignment uploaded");
            else {
              res.status(404).send("No student with this test assigned found");
            }
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
  uploadAssessedAssignment: async (req, res) => {
    connection.query(
      mysql.format(
        "UPDATE note SET incercare = ?, evaluareAutomata = ?, notaAutomata = ?, intarziat = ? WHERE id_student = ? AND id_test = ?",
        [
          req.body.incercare,
          req.body.evaluareAutomata,
          req.body.notaAutomata,
          req.body.intarziat,
          req.params.student_id,
          req.params.test_id,
        ]
      ),
      (err, result) => {
        if (!err) {
          if (result) {
            if (result.affectedRows > 0)
              res.status(200).json("Test incarcat cu succes!");
            else {
              res
                .status(404)
                .send("Nu a fost gasit niciun student cu acest test");
            }
          }
        } else {
          res.status(500).send("Server error");
        }
      }
    );
  },
};

async function saveStudent(student) {
  const query = `INSERT INTO studenti () VALUES (?,?,?)`;
}

module.exports = controller;
