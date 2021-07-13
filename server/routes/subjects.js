const express = require("express");
const router = express.Router();

const subjectController = require("../controllers").subject;

router.get("/:subject_id", subjectController.getById);
router.get("/:subject_id/tests", subjectController.getTests);
router.get("/:subject_id/students", subjectController.getStudents);
router.get("/:subject_id/groups", subjectController.getGroups);

module.exports = router;
