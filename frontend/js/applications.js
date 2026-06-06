const applicationForm = document.getElementById("applicationForm");

if (applicationForm) {
  applicationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const companyName = document.getElementById("companyName").value.trim();
    const jobRole = document.getElementById("jobRole").value.trim();
    const jobType = document.getElementById("jobType").value;
    const location = document.getElementById("location").value.trim();
    const salary = document.getElementById("salary").value.trim();
    const status = document.getElementById("status").value;
    const appliedDate = document.getElementById("appliedDate").value;
    const interviewDate = document.getElementById("interviewDate").value;
    const source = document.getElementById("source").value;
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value.trim();

    document.getElementById("companyError").textContent = "";
    document.getElementById("roleError").textContent = "";
    document.getElementById("typeError").textContent = "";
    document.getElementById("locationError").textContent = "";
    document.getElementById("statusError").textContent = "";
    document.getElementById("appliedDateError").textContent = "";

    let isValid = true;

    if (companyName.length < 2) {
      document.getElementById("companyError").textContent =
        "Company name is required.";
      isValid = false;
    }

    if (jobRole.length < 2) {
      document.getElementById("roleError").textContent =
        "Job role is required.";
      isValid = false;
    }

    if (!jobType) {
      document.getElementById("typeError").textContent =
        "Please select job type.";
      isValid = false;
    }

    if (location.length < 2) {
      document.getElementById("locationError").textContent =
        "Location is required.";
      isValid = false;
    }

    if (!status) {
      document.getElementById("statusError").textContent =
        "Please select application status.";
      isValid = false;
    }

    if (!appliedDate) {
      document.getElementById("appliedDateError").textContent =
        "Applied date is required.";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const application = {
      id: Date.now(),
      companyName,
      jobRole,
      jobType,
      location,
      salary,
      status,
      appliedDate,
      interviewDate,
      source,
      priority,
      notes
    };

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    applications.push(application);

    localStorage.setItem("applications", JSON.stringify(applications));

    const saveBtn = document.getElementById("saveApplicationBtn");
    saveBtn.textContent = "Saving...";
    saveBtn.disabled = true;

    setTimeout(() => {
      alert("Application saved successfully!");
      window.location.href = "applications.html";
    }, 800);
  });
}