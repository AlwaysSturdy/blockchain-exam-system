const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  questionText: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    validate: [arr => arr.length >= 2, "At least 2 options required"]
  },
  correctAnswer: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val >= 0;
      },
      message: "Answer index must be ≥ 0"
    }
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
