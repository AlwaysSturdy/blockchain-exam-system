const { keccak256, toUtf8Bytes } = require("ethers");

// Tạo hash từ nội dung bài thi + điểm
exports.generateSubmissionHash = ({ examId, answers, score }) => {
  const data = JSON.stringify({ examId, answers, score });
  return keccak256(toUtf8Bytes(data));
};
