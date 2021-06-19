const router = require("./other");
const otherRouter = require("./other");
const studentRouter = require("./Students");

router.use("/", otherRouter);
router.use("/students", studentRouter);

module.exports = router;
