const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

document.addEventListener("click", (e) => {
  if (e.target.closest("#themeToggle")) {
    document.body.classList.toggle("dark-mode");

    const themeToggle = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      if (themeToggle) themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      if (themeToggle) themeToggle.textContent = "🌙";
    }
  }
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) themeToggle.textContent = "☀️";
}

