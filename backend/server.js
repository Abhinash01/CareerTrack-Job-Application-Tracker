require("dotenv").config();

const { getProfile } = require("./controllers/profileController");

const express = require("express");
const path = require("path");
const session = require("express-session");

const connectDB = require("./config/db");
const protectRoute = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const {
  getDashboard
} = require("./controllers/applicationController");

const app = express();

const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Session Middleware
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

app.use((req, res, next) => {
  res.locals.userLoggedIn = !!req.session.userId;
  res.locals.userName = req.session.userName || null;
  next();
});

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Routes Middleware
app.use("/auth", authRoutes);
app.use("/application", protectRoute, applicationRoutes);

// Public Page Routes
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

// Protected Page Routes
app.get("/dashboard", protectRoute, getDashboard);

app.get("/applications", protectRoute, (req, res) => {
  res.redirect("/application");
});

app.get("/add-application", protectRoute, (req, res) => {
  res.render("add-application");
});

app.get("/profile", protectRoute, getProfile);
// Test Form Submission - Cognifyz Task 1
app.post("/submit-test", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully using Express server!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

