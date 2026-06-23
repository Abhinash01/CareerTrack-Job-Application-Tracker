const express = require("express");

const router = express.Router();

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

const {
  getAdminLogin,
  adminLogin,
  adminLogout,
  getDashboard,
  deleteUser,
  deleteApplication,
  exportFullReport,
  updateApplicationStatus
} = require("../controllers/adminController");

router.get("/login", getAdminLogin);

router.post("/login", adminLogin);

router.get("/logout", adminLogout);

router.get(
  "/dashboard",
  adminMiddleware,
  getDashboard
);

router.post(
  "/user/delete/:id",
  adminMiddleware,
  deleteUser
);

router.post(
  "/application/delete/:id",
  adminMiddleware,
  deleteApplication
);

router.get(
  "/export/full-report",
  adminMiddleware,
  exportFullReport
);

router.post(
  "/application/status/:id",
  adminMiddleware,
  updateApplicationStatus
);

module.exports = router;