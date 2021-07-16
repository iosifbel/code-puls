const connection = require("../config/db");
const mysql = require("mysql2");

const controller = {
  getStudentSubmission: async (req, res) => {
    try {
      //TODO send test questions with submission
      const { id_test, id_student } = req.params;
      const query =
        "SELECT incercare, evaluareAutomata, intarziat FROM note WHERE id_student = ? AND id_test = ?";
      const [rows] = await connection
        .promise()
        .query(query, [id_student, id_test]);
      //   console.log(rows);

      res.status(200).send(rows);
    } catch (error) {
      res.status(500).json({ message: "Eroare de server" });
      console.log(error);
    }
  },
};

module.exports = controller;
