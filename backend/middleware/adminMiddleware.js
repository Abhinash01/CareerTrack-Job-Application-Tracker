const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/admin/login");
    }

    const user = await User.findById(req.session.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).send("Access Denied");
    }

    req.admin = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = adminMiddleware;