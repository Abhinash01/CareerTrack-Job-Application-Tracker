const applicationForm = document.getElementById("applicationForm");
const applicationsTableBody = document.getElementById("applicationsTableBody");
const emptyState = document.getElementById("emptyState");
const applicationCount = document.getElementById("applicationCount");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function getApplications() {
  return JSON.parse(localStorage.getItem("applications")) || [];
}

function saveApplications(applications) {
  localStorage.setItem("applications", JSON.stringify(applications));
}

function getStatusClass(status) {
  if (status === "Applied") return "applied";
  if (status === "Interview") return "interview";
  if (status === "Selected") return "selected";
  if (status === "Rejected") return "rejected";
  if (status === "Shortlisted") return "interview";
  return "applied";
}

function renderApplications() {
  if (!applicationsTableBody) return;

  const applications = getApplications();
  const searchValue = searchInput.value.toLowerCase();
  const filterValue = statusFilter.value;

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchValue) ||
      app.jobRole.toLowerCase().includes(searchValue);

    const matchesStatus =
      filterValue === "All" || app.status === filterValue;

    return matchesSearch && matchesStatus;
  });

  applicationsTableBody.innerHTML = "";

  if (applicationCount) {
    applicationCount.textContent =
      `${filteredApplications.length} Applications`;
  }

  if (filteredApplications.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  filteredApplications.forEach((app) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.companyName}</td>
      <td>${app.jobRole}</td>
      <td>${app.jobType}</td>
      <td>${app.location}</td>
      <td>
        <span class="status ${getStatusClass(app.status)}">
          ${app.status}
        </span>
      </td>
      <td>${app.appliedDate}</td>
      <td>
        <div class="action-buttons">
          <button class="small-btn edit-btn" onclick="editApplication(${app.id})">
            Edit
          </button>
          <button class="small-btn delete-btn" onclick="deleteApplication(${app.id})">
            Delete
          </button>
        </div>
      </td>
    `;

    applicationsTableBody.appendChild(row);
  });
}

function deleteApplication(id) {
  const confirmDelete = confirm("Are you sure you want to delete this application?");

  if (!confirmDelete) return;

  let applications = getApplications();

  applications = applications.filter((app) => app.id !== id);

  saveApplications(applications);

  renderApplications();
}

function editApplication(id) {
  alert("Edit feature will be connected in the next step.");
}

if (searchInput) {
  searchInput.addEventListener("input", renderApplications);
}

if (statusFilter) {
  statusFilter.addEventListener("change", renderApplications);
}

if (applicationsTableBody) {
  renderApplications();
}

/* Add Application Form Logic */

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

    if (!isValid) return;

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

    const applications = getApplications();

    applications.push(application);

    saveApplications(applications);

    const saveBtn = document.getElementById("saveApplicationBtn");
    saveBtn.textContent = "Saving...";
    saveBtn.disabled = true;

    setTimeout(() => {
      alert("Application saved successfully!");
      window.location.href = "/applications";
    }, 800);
  });
}