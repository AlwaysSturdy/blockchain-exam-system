const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
  try {
    const exam = new Exam({ ...req.body, creator: req.user._id });
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: "Create failed", details: err.message });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const updated = await Exam.findByIdAndUpdate(req.params.examId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.examId);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: "List failed", details: err.message });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: "Get failed", details: err.message });
  }
};

exports.approveExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.examId, { approved: true }, { new: true });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: "Approve failed", details: err.message });
  }
};

exports.rejectExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.examId, { approved: false }, { new: true });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: "Reject failed", details: err.message });
  }
};
