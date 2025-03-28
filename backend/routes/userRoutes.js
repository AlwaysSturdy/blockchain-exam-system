const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const { isManager } = require("../middlewares/roleMiddleware");

router.use(auth);
router.post("/", isManager, userCtrl.createTeacher);
router.get("/teachers", isManager, userCtrl.getAllTeachers);

module.exports = router;
