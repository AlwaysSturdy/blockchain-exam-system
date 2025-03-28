const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  submissionHash: { type: String, required: true },
  score: { type: Number, required: true },
  examId: { type: Number, required: true },
  studentAddress: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Score", scoreSchema);
