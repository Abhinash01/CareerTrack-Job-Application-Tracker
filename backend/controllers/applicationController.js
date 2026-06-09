const Application = require("../models/Application");

const addApplication = async (req, res) => {
  try {
    const {
      companyName,
      jobRole,
      jobType,
      location,
      salary,
      status,
      appliedDate,
      interviewDate,
      source,
      priority,
      notes
    } = req.body;

    if (!companyName || !jobRole || !jobType || !location || !status || !appliedDate) {
      return res.status(400).render("add-application", {
        error: "Please fill all required fields."
      });
    }

    await Application.create({
      user: req.userId || "000000000000000000000000",
      companyName,
      jobRole,
      jobType,
      location,
      salary,
      status,
      appliedDate,
      interviewDate: interviewDate || null,
      source,
      priority,
      notes
    });

    res.redirect("/applications");
  } catch (error) {
    console.error(error);
    res.status(500).render("add-application", {
      error: "Something went wrong while saving application."
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    console.log("Applications Found:", applications.length);
    console.log(applications);

    res.render("applications", {
      applications
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("applications", {
      applications: []
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    await Application.findByIdAndDelete(id);

    res.redirect("/applications");
  } catch (error) {
    console.error(error);
    res.redirect("/applications");
  }
};


const getDashboard = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments();

    const appliedCount = await Application.countDocuments({
      status: "Applied"
    });

    const interviewCount = await Application.countDocuments({
      status: "Interview"
    });

    const selectedCount = await Application.countDocuments({
      status: "Selected"
    });

    const recentApplications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("dashboard", {
      userName: req.session.userName,
      totalApplications,
      appliedCount,
      interviewCount,
      selectedCount,
      recentApplications
    });

  } catch (error) {
    console.error(error);
    res.render("dashboard", {
      userName: req.session.userName,
      totalApplications: 0,
      appliedCount: 0,
      interviewCount: 0,
      selectedCount: 0,
      recentApplications: []
    });
  }
};


module.exports = {
  addApplication,
  getApplications,
  deleteApplication,
  getDashboard
};