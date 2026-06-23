document.querySelectorAll(".dash-card h2").forEach((counter) => {
  const originalText = counter.textContent.trim();

  const hasPercent = originalText.includes("%");
  const target = parseInt(originalText.replace("%", ""));

  if (isNaN(target)) return;

  let count = 0;
  const increment = Math.max(1, Math.ceil(target / 25));

  const updateCounter = () => {
    count += increment;

    if (count >= target) {
      counter.textContent = hasPercent ? `${target}%` : target;
      return;
    }

    counter.textContent = hasPercent ? `${count}%` : count;

    requestAnimationFrame(updateCounter);
  };

  updateCounter();
});

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

if (quoteText && quoteAuthor) {
  fetch("/api/quote")
    .then((res) => res.json())
    .then((data) => {
      quoteText.textContent = `"${data.quote}"`;
      quoteAuthor.textContent = `— ${data.author}`;
    })
    .catch(() => {
      quoteText.textContent = "Unable to load quote.";
    });
}