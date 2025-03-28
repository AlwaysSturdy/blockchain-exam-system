exports.isStudent = (req, res, next) => {
    if (req.user.role !== "student") return res.status(403).json({ error: "Student only" });
    next();
  };
  
  exports.isTeacher = (req, res, next) => {
    if (req.user.role !== "teacher") return res.status(403).json({ error: "Teacher only" });
    next();
  };
  
  exports.isManager = (req, res, next) => {
    if (req.user.role !== "manager") return res.status(403).json({ error: "Manager only" });
    next();
  };
  