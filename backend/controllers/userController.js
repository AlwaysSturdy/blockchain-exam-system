const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createTeacher = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role: "teacher" });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Create teacher failed", details: err.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: "Get teachers failed", details: err.message });
  }
};
