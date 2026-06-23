const chartCanvas = document.getElementById("adminAnalyticsChart");

if (chartCanvas) {

  const totalUsers = Number(chartCanvas.dataset.users);
  const totalApplications = Number(chartCanvas.dataset.applications);
  const interviewApplications = Number(chartCanvas.dataset.interviews);
  const selectedApplications = Number(chartCanvas.dataset.selected);

  new Chart(chartCanvas, {
    type: "doughnut",

    data: {
      labels: [
        "Users",
        "Applications",
        "Interviews",
        "Selected"
      ],

      datasets: [
        {
          data: [
            totalUsers,
            totalApplications,
            interviewApplications,
            selectedApplications
          ],

          backgroundColor: [
            "#8b5cf6",
            "#3b82f6",
            "#f59e0b",
            "#10b981"
          ],

          borderWidth: 0
        }
      ]
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

const userSearch = document.getElementById("userSearch");

if (userSearch) {

  userSearch.addEventListener("keyup", () => {

    const value = userSearch.value.toLowerCase();

    document
      .querySelectorAll("#users-section tbody tr")
      .forEach(row => {

        row.style.display =
          row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

      });

  });

}