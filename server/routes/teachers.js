const express = require("express");
const router = express.Router();

const teacherController = require("../controllers").teacher;

router.post("/login", teacherController.login);
router.get("/:teacher_id", teacherController.getById);
router.get("/:teacher_id/subjects", teacherController.getSubjects);
router.get(
  "/:teacher_id/ungradedSubmissions",
  teacherController.getAllUngradedSubmissions
);

module.exports = router;
