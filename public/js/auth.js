const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

if (togglePassword && password) {
  togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      togglePassword.textContent = "Hide";
    } else {
      password.type = "password";
      togglePassword.textContent = "Show";
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("password").value.trim();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (!email.includes("@") || !email.includes(".")) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (pass.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
}

const registerForm = document.getElementById("registerForm");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");
const toggleRegisterPassword = document.getElementById("toggleRegisterPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

function togglePasswordVisibility(input, button) {
  if (input.type === "password") {
    input.type = "text";
    button.textContent = "Hide";
  } else {
    input.type = "password";
    button.textContent = "Show";
  }
}

if (toggleRegisterPassword && registerPassword) {
  toggleRegisterPassword.addEventListener("click", () => {
    togglePasswordVisibility(registerPassword, toggleRegisterPassword);
  });
}

if (toggleConfirmPassword && confirmPassword) {
  toggleConfirmPassword.addEventListener("click", () => {
    togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
  });
}

if (registerPassword) {
  registerPassword.addEventListener("input", () => {
    const value = registerPassword.value;

    let strength = 0;

    if (value.length >= 6) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[@$!%*?&]/.test(value)) strength++;

    if (strength === 0) {
      strengthFill.style.width = "0%";
      strengthText.textContent = "Password strength";
    } else if (strength <= 2) {
      strengthFill.style.width = "35%";
      strengthFill.style.background = "#ef4444";
      strengthText.textContent = "Weak password";
    } else if (strength === 3) {
      strengthFill.style.width = "70%";
      strengthFill.style.background = "#f59e0b";
      strengthText.textContent = "Medium password";
    } else {
      strengthFill.style.width = "100%";
      strengthFill.style.background = "#22c55e";
      strengthText.textContent = "Strong password";
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();
    const terms = document.getElementById("termsCheck").checked;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmError").textContent = "";
    document.getElementById("termsError").textContent = "";

    let isValid = true;

    if (fullName.length < 3) {
      document.getElementById("nameError").textContent =
        "Name must be at least 3 characters.";
      isValid = false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    if (password.length < 6) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters.";
      isValid = false;
    }

    if (password !== confirm) {
      document.getElementById("confirmError").textContent =
        "Passwords do not match.";
      isValid = false;
    }

    if (!terms) {
      document.getElementById("termsError").textContent =
        "Please accept Terms & Conditions.";
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
    }
  });
}