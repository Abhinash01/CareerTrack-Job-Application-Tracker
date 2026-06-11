document.addEventListener("DOMContentLoaded", () => {
  const statusChart = document.getElementById("statusChart");

  if (!statusChart) return;

  const applied = Number(statusChart.dataset.applied);
  const interview = Number(statusChart.dataset.interview);
  const selected = Number(statusChart.dataset.selected);
  const total = Number(statusChart.dataset.total);

  new Chart(statusChart, {
    type: "doughnut",
    data: {
      labels: ["Applied", "Interview", "Selected"],
      datasets: [
        {
          data: [applied, interview, selected],
          backgroundColor: [
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
        title: {
          display: true,
          text: `Total Applications: ${total}`
        },
        legend: {
          position: "bottom"
        }
      }
    }
  });
});