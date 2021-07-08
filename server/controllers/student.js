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
        "UPDATE note SET incercare = ?, evaluareAutomata = ? WHERE id_student = ? AND id_test = ?",
        [
          req.body.incercare,
          req.body.evaluareAutomata,
          req.params.student_id,
          req.params.test_id,
        ]
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
  signup: async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;

      const hashedPassword = await hashedPassword(req.body.password);

      const studentData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        password: hashedPassword,
      };

      checkIfEmailExists(connection, mysql, "studenti", email);

      // savedStudent = saveStudent(studentData);

      if (savedStudent) {
        const token = createToken(savedStudent);
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        const { firstName, lastName, email } = savedStudent;

        const studentInfo = {
          firstName,
          lastName,
          email,
        };

        return res.json({
          message: "Contul de student a fost creat",
          token,
          studentInfo,
          expiresAt,
        });
      } else {
        return res.status(400).json({
          message: "A apărut o problemă la crearea contului de student",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "A apărut o problemă la crearea contului de student",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const query = "SELECT * FROM studenti WHERE email=?";
      const promise = connection.promise();
      const [rows] = await promise.query(mysql.format(query, [email]));
      const user = rows[0];

      if (!user) {
        return res.status(403).json({
          message: "Parolă sau adresa de email este greșită",
        });
      }

      const saltedPasssword = await hashPassword(user.parola);
      const passwordValid = await verifyPassword(password, saltedPasssword);

      if (passwordValid) {
        const { parola, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });

        const token = createToken(userInfo);

        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        res.json({
          message: "Utilizator autentificat cu succes",
          userInfo,
          token,
          expiresAt,
        });
      } else {
        res.status(403).json({
          message: "Parolă sau adresa de email este greșită",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

async function saveStudent(student) {
  const query = `INSERT INTO studenti () VALUES (?,?,?)`;
}

module.exports = controller;
