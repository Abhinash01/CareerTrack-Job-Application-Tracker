const User = require("../models/User");
const Application = require("../models/Application");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password");

    if (!user) {
      return res.redirect("/login");
    }

    const totalApplications = await Application.countDocuments({
      user: req.session.userId
    });

    const interviewCount = await Application.countDocuments({
      user: req.session.userId,
      status: "Interview"
    });

    const selectedCount = await Application.countDocuments({
      user: req.session.userId,
      status: "Selected"
    });

    res.render("profile", {
      user,
      totalApplications,
      interviewCount,
      selectedCount
    });
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard");
  }
};

module.exports = {
  getProfile
};