const Application = require("../models/Application");
const User = require("../models/User");
const transporter = require("../config/mail");

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

const application = await Application.create({
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

try {

  const user = await User.findById(req.session.userId);

  await transporter.sendMail({
    from: `"CareerTrack" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Application Added - ${companyName}`,
    html: `
      <div style="font-family:Arial,sans-serif;padding:25px;max-width:650px;margin:auto">

      <h2 style="color:#6C63FF;">Application Successfully Added ✅</h2>

      <p>Hello <b>${user.fullName}</b>,</p>

      <p>Your job application has been saved successfully in CareerTrack.</p>

      <table style="border-collapse:collapse;width:100%;margin-top:20px">

        <tr>
          <td><b>Company</b></td>
          <td>${companyName}</td>
        </tr>

        <tr>
          <td><b>Role</b></td>
          <td>${jobRole}</td>
        </tr>

        <tr>
          <td><b>Status</b></td>
          <td>${status}</td>
        </tr>

        <tr>
          <td><b>Location</b></td>
          <td>${location}</td>
        </tr>

        <tr>
          <td><b>Priority</b></td>
          <td>${priority}</td>
        </tr>

      </table>

      ${
        interviewDate
          ? `
      <div style="margin-top:25px;padding:15px;background:#E8F5E9;border-left:5px solid green;">
      <b>Interview Scheduled</b><br>
      ${new Date(interviewDate).toDateString()}
      </div>
      `
          : ""
      }

      <br>

      <a href="http://localhost:5000/dashboard"
      style="background:#6C63FF;color:white;padding:12px 25px;text-decoration:none;border-radius:8px;">
      Open Dashboard
      </a>

      <br><br>

      <p>Good Luck with your application! 🚀</p>

      <p><b>CareerTrack Team</b></p>

      </div>
    `
  });

} catch (err) {
  console.log("Mail Error:", err.message);
}

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
    const { search, status } = req.query;

    let filter = {
      user: req.session.userId
    };

    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { jobRole: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    const applications = await Application.find(filter).sort({
      createdAt: -1
    });

    res.render("applications", {
      applications,
      search: search || "",
      status: status || "All"
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("applications", {
      applications: [],
      search: "",
      status: "All"
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