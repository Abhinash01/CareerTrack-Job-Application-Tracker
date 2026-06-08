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

module.exports = {
  registerUser
};