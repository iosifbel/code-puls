const connection = require("../config/db");
const mysql = require("mysql2");
const axios = require("axios");

const rootURL = "http://localhost:5000/api";

const controller = {
  getStudentSubmission: async (req, res) => {
    try {
      const { id_test, id_student } = req.params;
      const query =
        "SELECT incercare, evaluareAutomata, intarziat FROM note WHERE id_student = ? AND id_test = ?";
      const [rows] = await connection
        .promise()
        .query(query, [id_student, id_test]);
      const submission = rows[0];

      //getting test questions body
      const { data } = await axios.get(
        `${rootURL}/assignments/${id_test}/questions/privileged`
      );
      // console.log("getting submission route..");
      submission.questions = data;

      //   console.log(submission);

      res.status(200).send(submission);
    } catch (error) {
      res.status(500).json({ message: "Eroare de server" });
      console.log(error);
    }
  },
  gradeSubmission: async (req, res) => {
    try {
      let { feedback, finalGrade } = req.body;
      const { test_id, student_id } = req.params;
      finalGrade = parseFloat(finalGrade).toFixed(2);

      console.log(test_id);
      console.log(student_id);

      //update grade in db
      const query =
        "UPDATE note SET nota = ?, feedback = ? WHERE id_test = ? AND id_student";
      const [rows] = await connection
        .promise()
        .query(query, [finalGrade, feedback, test_id, student_id]);
      console.log(rows);
      if (rows.affectedRows === 1) {
        res.status(200).json({ message: "Notă incarcată cu succes" });
      } else {
        res
          .status(404)
          .json({ message: "Nu a fost gasită perechea student-test" });
      }
    } catch (error) {
      res.status(500).json({ message: "Eroare la server" });
      console.log(error);
    }
  },
};

module.exports = controller;
