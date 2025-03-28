const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  answers: [{ type: Number, required: true }],
  score: { type: Number, required: true },
  submissionHash: { type: String, required: true, unique: true },
  txHash: { type: String } // Hash của giao dịch blockchain
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
