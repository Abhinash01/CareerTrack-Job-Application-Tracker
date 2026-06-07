const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    document.getElementById("contactNameError").textContent = "";
    document.getElementById("contactEmailError").textContent = "";
    document.getElementById("contactSubjectError").textContent = "";
    document.getElementById("contactMessageError").textContent = "";

    let isValid = true;

    if (name.length < 3) {
      document.getElementById("contactNameError").textContent =
        "Name must be at least 3 characters.";
      isValid = false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("contactEmailError").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    if (subject.length < 4) {
      document.getElementById("contactSubjectError").textContent =
        "Subject must be at least 4 characters.";
      isValid = false;
    }

    if (message.length < 10) {
      document.getElementById("contactMessageError").textContent =
        "Message must be at least 10 characters.";
      isValid = false;
    }

    if (!isValid) return;

    const contactBtn = document.getElementById("contactBtn");

    contactBtn.textContent = "Sending...";
    contactBtn.disabled = true;

    setTimeout(() => {
      alert("Message submitted successfully. Backend email service will be connected later.");
      contactForm.reset();
      contactBtn.textContent = "Send Message";
      contactBtn.disabled = false;
    }, 1000);
  });
}