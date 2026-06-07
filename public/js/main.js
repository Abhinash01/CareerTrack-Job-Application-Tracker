const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}



