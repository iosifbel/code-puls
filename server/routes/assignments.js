const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers").assignment;

router.get("/:test_id", assignmentController.getById);
router.get("/:test_id/submissions", assignmentController.getTestSubmissions);
router.post("/create", assignmentController.addTest2);
router.post(
  "/assign/:test_id/:group_id",
  assignmentController.assignTestToGroup
);
router.post(
  "/sendSubmission/:student_id/:test_id",
  assignmentController.sendTest
);
router.put("/update/:test_id", assignmentController.updateTest);
router.delete("/unassign/:test_id", assignmentController.unassignTest);
router.delete("/delete/:test_id", assignmentController.deleteTest);

router.get("/:test_id/questions", assignmentController.getQuestionsByTest);
router.get(
  "/:test_id/questions/privileged",
  assignmentController.getQuestionsByTestWithAnswers
);
module.exports = router;
