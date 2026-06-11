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

// Page Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("startupLoader");

  if (!loader) return;

  setTimeout(() => {
    loader.style.display = "none";
    sessionStorage.setItem("careertrack_loader", "shown");
  }, 250);
});

// Smooth page transitions

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  const href = link.getAttribute("href");

  if (
    href &&
    !href.startsWith("#") &&
    !href.startsWith("http") &&
    !link.hasAttribute("target")
  ) {
    e.preventDefault();

    document.body.classList.add("page-exit");

    setTimeout(() => {
      window.location.href = href;
    }, 180);
  }
});
