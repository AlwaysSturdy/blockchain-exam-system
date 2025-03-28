const express = require("express");
const router = express.Router();
const submissionCtrl = require("../controllers/submissionController");
const auth = require("../middlewares/authMiddleware");
const { isStudent } = require("../middlewares/roleMiddleware");

router.use(auth);
router.post("/", isStudent, submissionCtrl.submitExam);
router.get("/history", isStudent, submissionCtrl.getStudentSubmissions);

module.exports = router;
