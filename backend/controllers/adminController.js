const User = require("../models/User");
const Application = require("../models/Application");
const bcrypt = require("bcryptjs");

exports.getAdminLogin = (req, res) => {
  res.render("admin-login");
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({
      email,
      role: "admin"
    });

    if (!admin) {
      return res.render("admin-login", {
        error: "Admin not found"
      });
    }

const isMatch = await bcrypt.compare(
  password,
  admin.password
);

if (!isMatch) {
  return res.render("admin-login", {
    error: "Invalid credentials"
  });
}

    req.session.userId = admin._id;
    req.session.userName = admin.fullName;

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.adminLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};

exports.getDashboard = async (req, res) => {
  try {

    const users = await User.find()
      .sort({ createdAt: -1 });

    const applications = await Application.find()
      .populate("user")
      .sort({ createdAt: -1 });

    const totalUsers = users.length;

    const totalApplications = applications.length;

    const interviewApplications =
      applications.filter(
        app => app.status === "Interview"
      ).length;

    const selectedApplications =
      applications.filter(
        app => app.status === "Selected"
      ).length;

    const rejectedApplications =
      applications.filter(
        app => app.status === "Rejected"
      ).length;

    const pendingApplications =
      applications.filter(
        app =>
          app.status === "Applied" ||
          app.status === "Pending"
      ).length;

    const successRate =
      totalApplications > 0
        ? Math.round(
            (selectedApplications /
              totalApplications) *
              100
          )
        : 0;

    const interviewRate =
      totalApplications > 0
        ? Math.round(
            (interviewApplications /
              totalApplications) *
              100
          )
        : 0;

    res.render("admin-dashboard", {
      totalUsers,
      totalApplications,
      interviewApplications,
      selectedApplications,
      rejectedApplications,
      pendingApplications,
      successRate,
      interviewRate,

      users,
      applications,

      recentUsers: users.slice(0, 5),
      recentApplications: applications.slice(0, 5)
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(
      req.params.id
    );

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};



exports.exportFullReport = async (req, res) => {
  try {

    const applications = await Application.find()
      .populate("user")
      .sort({ createdAt: -1 });

    let csv =
      "Sr No,User Name,Email,Company,Job Role,Status,Applied Date\n";

    applications.forEach((app, index) => {

      csv += `${index + 1},`;

      csv += `"${app.user?.fullName || "Deleted User"}",`;

      csv += `"${app.user?.email || "N/A"}",`;

      csv += `"${app.companyName}",`;

      csv += `"${app.jobRole}",`;

      csv += `"${app.status}",`;

      csv += `"${app.appliedDate ? app.appliedDate.toISOString().split("T")[0] : "N/A"}"\n`;

    });

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      "careertrack-report.csv"
    );

    return res.send(csv);

  } catch (error) {

    console.error(error);

    res.status(500).send(
      "Failed to export report"
    );

  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {

    await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      }
    );

    res.redirect("/admin/dashboard");

  } catch (error) {

    console.error(error);

    res.status(500).send("Server Error");

  }
};