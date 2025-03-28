const Exam = require("../models/Exam");
const Question = require("../models/Question");
const gradingContract = require("../utils/web3Provider");
const { generateSubmissionHash } = require("../utils/hashUtils");

exports.submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;

    // 1. Kiểm tra đề thi tồn tại
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    // 2. Lấy danh sách câu hỏi từ bảng riêng
    const questions = await Question.find({ examId }).sort("_id");
    if (questions.length === 0) return res.status(400).json({ error: "No questions found for this exam" });

    // 3. Tự động chấm điểm
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score += 1;
    });

    // 4. Tạo hash từ bài làm + điểm
    const submissionHash = generateSubmissionHash({ examId, answers, score });

    // 5. Gọi smart contract
    const tx = await gradingContract.recordSubmission(
      examId,
      req.user.address,
      submissionHash,
      score
    );
    await tx.wait();

    // 6. Trả kết quả về frontend
    res.json({
      message: "Submission successful",
      score,
      submissionHash,
      txHash: tx.hash
    });

  } catch (err) {
    console.error("❌ Submit error:", err);
    res.status(500).json({ error: "Submit failed", details: err.message });
  }
};
