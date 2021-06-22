const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers").assignment;

router.get("/:test_id", assignmentController.getTestSubmissions);
router.post("/create",assignmentController.addTest);
router.put("/update/:test_id",assignmentController.updateTest);

module.exports = router;
