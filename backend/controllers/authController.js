const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).render("register", {
        error: "All fields are required."
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).render("register", {
        error: "Passwords do not match."
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).render("register", {
        error: "User already exists with this email."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).render("register", {
      error: "Something went wrong. Please try again."
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        error: "Email and password are required."
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).render("login", {
        error: "Invalid email or password."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).render("login", {
        error: "Invalid email or password."
      });
    }

    req.session.userId = user._id;
    req.session.userName = user.fullName;

    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.session.cookie.expires = false;
    }

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).render("login", {
      error: "Something went wrong. Please try again."
    });
  }
};


const forgotPasswordPage = (req, res) => {
  res.render("forgot-password");
};

const forgotPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.render("forgot-password", {
        error: "All fields are required."
      });
    }

    if (password !== confirmPassword) {
      return res.render("forgot-password", {
        error: "Passwords do not match."
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("forgot-password", {
        error: "No account found with this email."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.redirect("/login");

  } catch (error) {
    console.error(error);

    res.render("forgot-password", {
      error: "Something went wrong."
    });
  }
};


const logoutUser = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.redirect("/dashboard");
    }

    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordPage,
  forgotPassword
};