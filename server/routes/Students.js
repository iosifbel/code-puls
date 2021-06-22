const express = require("express");
const router = express.Router();

const studentController = require("../controllers").student;

router.get("/:student_id", studentController.getById);
router.get("/group/:student_group", studentController.getByGroup);
router.get("/year/:student_year", studentController.getByYear);
router.get("/:student_id/subjects", studentController.getSubjects);
router.get("/:student_id/due", studentController.getAssignmentsDue);
router.get("/:student_id/expired", studentController.getAssignmentsExpired);
router.put("/:student_id/upload/:test_id", studentController.uploadAssignment);

module.exports = router;
