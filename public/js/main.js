
// CareerTrack Main JavaScript


// Normal Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active"); // Missing tha
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      navLinks.classList.remove("active");
      menuBtn.classList.remove("active");
    }
  });

}

// Dark Mode
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

if (themeToggle) {
  themeToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// Startup Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("startupLoader");

  if (!loader) return;

  if (sessionStorage.getItem("careertrack_loader")) {
    loader.style.display = "none";
    return;
  }

  setTimeout(() => {
    loader.style.display = "none";
    sessionStorage.setItem("careertrack_loader", "shown");
  }, 250);
});

// Smooth Page Transitions
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  const href = link.getAttribute("href");

  if (
    href &&
    !href.startsWith("#") &&
    !href.startsWith("http") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:") &&
    !link.hasAttribute("target")
  ) {
    e.preventDefault();

    if (navLinks) {
      navLinks.classList.remove("active");
    }

    if (menuBtn) {
      menuBtn.classList.remove("active");
    }

    document.body.classList.add("page-exit");

    setTimeout(() => {
      window.location.href = href;
    }, 180);
  }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(
  ".feature-card, .step, .dashboard-panel, .dash-card, .action-card, .hero-card"
);

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
};

revealElements.forEach((el) => el.classList.add("reveal"));

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Active Navbar Highlight
const currentPath = window.location.pathname;

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPath = link.getAttribute("href");

  if (linkPath === currentPath) {
    link.classList.add("active-nav");
  }

  if (currentPath === "/application" && linkPath === "/applications") {
    link.classList.add("active-nav");
  }

  if (currentPath.startsWith("/admin") && linkPath === "/admin/dashboard") {
    link.classList.add("active-nav");
  }
});

// Admin Mobile Sidebar
const adminMenuBtn = document.getElementById("adminMenuBtn");
const adminSidebar = document.querySelector(".admin-sidebar");

if (adminMenuBtn && adminSidebar) {
  adminMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    adminSidebar.classList.toggle("active");
    adminMenuBtn.classList.toggle("active");
  });

  adminSidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      adminSidebar.classList.remove("active");
      adminMenuBtn.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".admin-sidebar") &&
      !e.target.closest("#adminMenuBtn")
    ) {
      adminSidebar.classList.remove("active");
      adminMenuBtn.classList.remove("active");
    }
  });

  window.addEventListener("scroll", () => {
    adminSidebar.classList.remove("active");
    adminMenuBtn.classList.remove("active");
  });
}