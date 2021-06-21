const router = require("./other");
const otherRouter = require("./other");
const studentRouter = require("./students");
const teacherRouter = require("./teachers");
const subjectRouter = require("./subjects");
const assignmentRouter = require("./assignments");
const questionRouter = require("./questions");
const gradeRouter = require("./grades");

router.use("/", otherRouter);
router.use("/students", studentRouter);
router.use("/teachers", teacherRouter);
router.use("/subjects", subjectRouter);
router.use("/assignments", assignmentRouter);
router.use("/questions", questionRouter);
router.use("/grades", gradeRouter);

module.exports = router;
