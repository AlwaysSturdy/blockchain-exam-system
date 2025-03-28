const express = require("express");
const router = express.Router();
const resultCtrl = require("../controllers/resultController");
const auth = require("../middlewares/authMiddleware");

router.use(auth);
router.get("/:submissionHash", resultCtrl.getResultByHash);

module.exports = router;
