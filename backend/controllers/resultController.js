const gradingContract = require("../utils/web3Provider");

exports.getResultByHash = async (req, res) => {
  try {
    const { submissionHash } = req.params;
    const result = await gradingContract.getSubmission(submissionHash);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Get result failed", details: err.message });
  }
};
