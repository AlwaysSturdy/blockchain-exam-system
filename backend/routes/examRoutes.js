const express = require("express");
const router = express.Router();
const examCtrl = require("../controllers/examController");
const auth = require("../middlewares/authMiddleware");
const { isTeacher, isManager } = require("../middlewares/roleMiddleware");

// Tất cả các route dưới đây yêu cầu xác thực đăng nhập
router.use(auth);

// 🚫 Ai cũng có thể xem danh sách đề thi
router.get("/", examCtrl.getAllExams);
router.get("/:id", examCtrl.getExamById);

// 👨‍🏫 Chỉ giáo viên mới được tạo, sửa, xoá đề
router.post("/", isTeacher, examCtrl.createExam);
router.put("/:examId", isTeacher, examCtrl.updateExam);
router.delete("/:examId", isTeacher, examCtrl.deleteExam);

// ✅ Chỉ TRƯỞNG PHÒNG mới được duyệt hoặc từ chối đề thi
router.put("/:examId/approve", isManager, examCtrl.approveExam);
router.put("/:examId/reject", isManager, examCtrl.rejectExam);

module.exports = router;
