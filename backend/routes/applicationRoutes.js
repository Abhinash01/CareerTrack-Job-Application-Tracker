const express = require("express");
const {
  addApplication,
  getApplications,
  deleteApplication
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/add", addApplication);
router.get("/", getApplications);
router.post("/delete/:id", deleteApplication);

module.exports = router;