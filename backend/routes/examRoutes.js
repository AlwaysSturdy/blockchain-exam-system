const express = require("express");
const router = express.Router();
const examCtrl = require("../controllers/examController");
const auth = require("../middlewares/authMiddleware");
const { isTeacher, isManager } = require("../middlewares/roleMiddleware");

router.use(auth); // cần xác thực trước

router.get("/", examCtrl.getAllExams);
router.get("/:id", examCtrl.getExamById);

router.post("/", isTeacher, examCtrl.createExam);
router.put("/:examId", isTeacher, examCtrl.updateExam);
router.delete("/:examId", isTeacher, examCtrl.deleteExam);

// Trưởng phòng duyệt đề
router.post("/:examId/approve", isManager, examCtrl.approveExam);

router.post("/:examId/reject", isManager, examCtrl.rejectExam);
// hoặc dùng PUT như repo gốc
router.put("/:examId/reject", isManager, examCtrl.rejectExam);

module.exports = router;

