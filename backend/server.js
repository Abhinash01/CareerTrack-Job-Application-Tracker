console.log("UPDATED SERVER FILE RUNNING");
require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const connectDB = require("./config/db");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const protectRoute = require("./middleware/authMiddleware");

const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { getDashboard } = require("./controllers/applicationController");
const { getProfile } = require("./controllers/profileController");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================
// Database
// ============================

connectDB();

// ============================
// Body Parser
// ============================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================
// Session
// ============================

app.use(
  session({
    secret: process.env.SESSION_SECRET || "careertracksecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: null
    }
  })
);

// ============================
// Flash Messages
// ============================

app.use(flash());

// ============================
// Global Variables
// ============================

app.use((req, res, next) => {

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  res.locals.userLoggedIn = !!req.session.userId;
  res.locals.userName = req.session.userName || null;
  res.locals.userRole = req.session.userRole || null;

  next();

});

// ============================
// Middlewares
// ============================

app.use(loggerMiddleware);

app.use(express.static(path.join(__dirname, "../public")));

// ============================
// View Engine
// ============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// ============================
// Routes
// ============================

app.use("/auth", authRoutes);
app.use("/application", protectRoute, applicationRoutes);
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

// ============================
// Public Pages
// ============================

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/terms", (req, res) => {
  res.render("terms");
});

app.get("/privacy", (req, res) => {
  res.render("privacy");
});

// ============================
// Protected Pages
// ============================

app.get("/dashboard", protectRoute, getDashboard);

app.get("/applications", protectRoute, (req, res) => {
  res.redirect("/application");
});

app.get("/add-application", protectRoute, (req, res) => {
  res.render("add-application");
});

app.get("/profile", protectRoute, getProfile);

// ============================
// Test Route
// ============================

app.get("/test-api", (req, res) => {
  res.send("API test working");
});

app.post("/submit-test", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully using Express server!");
});

// ============================
// Server
// ============================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});