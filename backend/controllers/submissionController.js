const Submission = require("../models/Submission");
const Exam = require("../models/Exam");
const gradingContract = require("../utils/web3Provider");
const { generateSubmissionHash } = require("../utils/hashUtils");

exports.submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;

    // 1. Lấy đề thi từ MongoDB
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    // 2. Chấm điểm tự động
    const correctAnswers = exam.questions.map(q => q.correctAnswer);
    let score = 0;
    answers.forEach((a, i) => {
      if (a === correctAnswers[i]) score += 1;
    });

    // 3. Tạo hash bài làm + điểm
    const submissionHash = generateSubmissionHash({ examId, answers, score });

    // 4. Gọi smart contract SaveGrading.recordSubmission(...)
    const tx = await gradingContract.recordSubmission(
      examId,
      req.user.address,        // địa chỉ ví sinh viên (lưu trong req.user)
      submissionHash,
      score
    );
    await tx.wait();

    // 5. Lưu vào MongoDB
    const submission = new Submission({
      student: req.user._id,
      exam: examId,
      answers,
      score,
      submissionHash,
      txHash: tx.hash
    });

    await submission.save();

    res.json({
      message: "Submission successful",
      score,
      submissionHash,
      txHash: tx.hash
    });

  } catch (err) {
    console.error("❌ Submit exam error:", err);
    res.status(500).json({ error: "Submit failed", details: err.message });
  }
};

exports.getStudentSubmissions = async (req, res) => {
  try {
    const subs = await Submission.find({ student: req.user._id }).populate("exam");
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: "Get submissions failed", details: err.message });
  }
};
