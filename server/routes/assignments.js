const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers").assignment;

router.get("/:test_id", assignmentController.getById);
router.get("/:test_id/submissions", assignmentController.getTestSubmissions);
router.post("/create",assignmentController.addTest);
router.put("/update/:test_id",assignmentController.updateTest);
router.delete("/unassign/:test_id", assignmentController.unassignTest);
router.delete("/delete/:test_id", assignmentController.deleteTest);

module.exports = router;
