const dashboardCards = document.querySelectorAll(".dash-card");

dashboardCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  setTimeout(() => {
    card.style.transition = "0.5s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, index * 150);
});
const welcomeUser = document.getElementById("welcomeUser");

const userName = localStorage.getItem("userName") || "User";

const hour = new Date().getHours();

let greeting = "Good Evening";

if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 18) {
  greeting = "Good Afternoon";
}

if (welcomeUser) {
  welcomeUser.textContent = `${greeting}, ${userName} 👋`;
}