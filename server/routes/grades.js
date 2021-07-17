const express = require("express");
const router = express.Router();

const gradesController = require("../controllers").grade;

router.get(
  "/submission/:id_test/:id_student",
  gradesController.getStudentSubmission
);
router.put("/grade/:test_id/:student_id", gradesController.gradeSubmission);

module.exports = router;
