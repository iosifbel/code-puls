const express = require("express");
const router = express.Router();

const teacherController = require("../controllers").teacher;

router.get("/:teacher_id", teacherController.getById);
router.get("/:teacher_id/subjects", teacherController.getSubjects);
router.get(
  "/:teacher_id/subjects/submissions",
  teacherController.getAllSubmissions
);
// router.get("/:teacher_id/submi", teacherController.getAllSubmissions);
// router.get("/:teacher_id/subjects", teacherController.getSubjects);

module.exports = router;
