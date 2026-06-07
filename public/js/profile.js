const savedUserName = localStorage.getItem("userName") || "Abhinash Gupta";
const savedUserEmail = localStorage.getItem("userEmail") || "abhinash@example.com";

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const infoName = document.getElementById("infoName");
const infoEmail = document.getElementById("infoEmail");

if (profileName) profileName.textContent = savedUserName;
if (profileEmail) profileEmail.textContent = savedUserEmail;
if (infoName) infoName.textContent = savedUserName;
if (infoEmail) infoEmail.textContent = savedUserEmail;