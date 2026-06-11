const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordPage,
  forgotPassword
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/forgot-password", forgotPasswordPage);
router.post("/forgot-password", forgotPassword);

router.get("/logout", logoutUser);

module.exports = router;