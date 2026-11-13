const flipToggle = document.getElementById("flipToggle");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");
const soundBtn = document.getElementById("soundBtn");
const letters = document.getElementById("letters");

let currentLetter = "A";

letters.addEventListener("click", (e) => {
  const cube = e.target.closest("img[data-letter]");
  if (!cube) return;

  currentLetter = cube.dataset.letter;
  cardFront.src = `/static/images/cards/${currentLetter}.png`;
  cardFront.alt = `Letter ${currentLetter}`;

  cardBack.src = `/static/images/cards/${currentLetter}@4x.png`;
  cardBack.alt = `Letter ${currentLetter}`;

  flipToggle.checked = true;
});

soundBtn.addEventListener("click", () => {
  const n = currentLetter.charCodeAt(0) - 64; // A=1, B=2, ... Z=26
  const audio = new Audio(`/static/audios/alphabet/${n}-1-letter-${currentLetter.toLowerCase()}-sound.mp3`);

  audio.play().catch(() => {
    const u = new SpeechSynthesisUtterance(currentLetter);
    u.lang = "en-US";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  });
});