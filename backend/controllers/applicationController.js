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
      user: req.session.userId,
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
    const applications = await Application.find({
      user: req.session.userId
    }).sort({ createdAt: -1 });

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
    await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.session.userId
    });

    res.redirect("/applications");
  } catch (error) {
    console.error(error);
    res.redirect("/applications");
  }
};

const getDashboard = async (req, res) => {
  try {
    const totalApplications = await Application.countDocuments({
      user: req.session.userId
    });

    const appliedCount = await Application.countDocuments({
      user: req.session.userId,
      status: "Applied"
    });

    const interviewCount = await Application.countDocuments({
      user: req.session.userId,
      status: "Interview"
    });

    const selectedCount = await Application.countDocuments({
      user: req.session.userId,
      status: "Selected"
    });

    const recentApplications = await Application.find({
      user: req.session.userId
    })
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

const getEditApplication = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.session.userId
    });

    if (!application) {
      return res.redirect("/applications");
    }

    res.render("edit-application", {
      application
    });
  } catch (error) {
    console.error(error);
    res.redirect("/applications");
  }
};

const updateApplication = async (req, res) => {
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

    await Application.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.session.userId
      },
      {
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
      }
    );

    res.redirect("/applications");
  } catch (error) {
    console.error(error);
    res.redirect("/applications");
  }
};

module.exports = {
  addApplication,
  getApplications,
  deleteApplication,
  getDashboard,
  getEditApplication,
  updateApplication
};