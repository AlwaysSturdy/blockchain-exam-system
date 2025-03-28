const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true } // Chỉ số trong options
});

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // minutes
  questions: [questionSchema],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
