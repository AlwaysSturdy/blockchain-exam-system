const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // thời gian làm bài (phút)
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
