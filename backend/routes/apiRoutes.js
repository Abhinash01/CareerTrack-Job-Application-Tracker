const express = require("express");

const router = express.Router();

let cachedQuote = null;
let cacheTime = null;

const fallbackQuotes = [
  {
    quote: "Success is the sum of small efforts repeated every day.",
    author: "CareerTrack"
  },
  {
    quote: "Stay consistent. Every application is one step closer to your goal.",
    author: "CareerTrack"
  },
  {
    quote: "Opportunities come to those who prepare and keep applying.",
    author: "CareerTrack"
  },
  {
    quote: "Track your progress, improve your strategy, and keep moving.",
    author: "CareerTrack"
  }
];

router.get("/quote", async (req, res) => {
  try {
    if (cachedQuote && cacheTime && Date.now() - cacheTime < 60000) {
      return res.json({
        success: true,
        source: "cache",
        quote: cachedQuote.quote,
        author: cachedQuote.author
      });
    }

    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error("External API failed");
    }

    const data = await response.json();

    cachedQuote = {
      quote: data.slip.advice,
      author: "Advice API"
    };

    cacheTime = Date.now();

    res.json({
      success: true,
      source: "external-api",
      quote: cachedQuote.quote,
      author: cachedQuote.author
    });
  } catch (error) {
    const randomQuote =
      fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

    res.json({
      success: true,
      source: "fallback",
      quote: randomQuote.quote,
      author: randomQuote.author
    });
  }
});

module.exports = router;