const express = require("express");
const router = express.Router();

const questionController = require("../controllers").question;

router.get("/:question_id", questionController.getById);
router.post("/assess/:question_id/:test_id/:student_id", questionController.assessQuestion);

module.exports = router;
