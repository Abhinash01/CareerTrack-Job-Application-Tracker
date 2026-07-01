const bcrypt = require("bcryptjs");
const User = require("../models/User");
const transporter = require("../config/mail");

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

const newUser = await User.create({
  fullName,
  email,
  password: hashedPassword
});

try {
  await transporter.sendMail({
    from: `"CareerTrack" <${process.env.EMAIL_USER}>`,
    to: newUser.email,
    subject: "🎉 Welcome to CareerTrack!",
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Welcome, ${newUser.fullName} 👋</h2>

        <p>Thank you for registering on <b>CareerTrack</b>.</p>

        <p>You can now:</p>

        <ul>
          <li>Track job applications</li>
          <li>Monitor interview progress</li>
          <li>Stay organized during your job search</li>
        </ul>

        <br>

        <a href="https://careertrack-g51h.onrender.com/login"
        style="background:#6C63FF;color:#fff;padding:12px 25px;border-radius:8px;text-decoration:none;">
        Login Now
        </a>

        <br><br>

        <p>Happy Job Hunting 🚀</p>

        <p><b>CareerTrack Team</b></p>
      </div>
    `
  });

} catch (err) {
  console.log("Email Error:", err.message);
}

req.flash("success", "Registration Successful! Welcome to CareerTrack 🚀");

return req.session.save(() => {
    res.redirect("/login");
});
  } catch (error) {
    console.error(error);
    res.status(500).render("register", {
      error: "Something went wrong. Please try again."
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        error: "Email and password are required."
      });
    }

    const user = await User.findOne({ email });

if (!user) {
  req.flash("error", "Invalid Email or Password");
  return res.redirect("/login");
}

    const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  req.flash("error", "Invalid Email or Password");
  return res.redirect("/login");
}

    req.session.userId = user._id;
    req.session.userName = user.fullName;
    req.session.userRole = user.role;

    if (rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.session.cookie.expires = false;
    }

if (user.role === "admin") {
  req.flash("success", "Welcome Admin 👋");
  return res.redirect("/admin/dashboard");
}

req.flash("success", `Welcome back, ${user.fullName}! 👋`);
return req.session.save(() => {
    res.redirect("/dashboard");
});
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

    req.flash("success", "Password Updated Successfully ✅");

return req.session.save(() => {
    res.redirect("/login");
});

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

    return res.redirect("/login?logout=1");

  });

};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordPage,
  forgotPassword
};