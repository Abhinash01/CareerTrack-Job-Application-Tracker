const express = require("express");

const {
  addApplication,
  getApplications,
  deleteApplication,
  getEditApplication,
  updateApplication
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/add", addApplication);
router.get("/", getApplications);
router.post("/delete/:id", deleteApplication);
router.get("/edit/:id", getEditApplication);
router.post("/edit/:id", updateApplication);

module.exports = router;