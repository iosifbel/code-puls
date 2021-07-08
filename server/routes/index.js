const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const studentRouter = require("./students");
const teacherRouter = require("./teachers");
const subjectRouter = require("./subjects");
const assignmentRouter = require("./assignments");
const questionRouter = require("./questions");
const gradeRouter = require("./grades");

router.use("/auth", authRouter);
router.use("/students", studentRouter);
router.use("/teachers", teacherRouter);
router.use("/subjects", subjectRouter);
router.use("/assignments", assignmentRouter);
router.use("/questions", questionRouter);
router.use("/grades", gradeRouter);

module.exports = router;
