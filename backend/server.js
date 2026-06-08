require("dotenv").config();

const express = require("express");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "../public")));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Page Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/applications", (req, res) => {
  res.render("applications");
});

app.get("/add-application", (req, res) => {
  res.render("add-application");
});

app.get("/profile", (req, res) => {
  res.render("profile");
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

// Test Form Submission - Cognifyz Task 1
app.post("/submit-test", (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully using Express server!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});