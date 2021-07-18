const express = require("express");
const router = express.Router();

const gradesController = require("../controllers").grade;

router.get(
  "/submission/:id_test/:id_student",
  gradesController.getStudentSubmission
);
router.get(
  "/scatterplot/:subject_id/:group_id",
  gradesController.getGradesBySubjectAndGroup
);
router.put("/grade/:test_id/:student_id", gradesController.gradeSubmission);

module.exports = router;
