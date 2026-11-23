const guessInput = document.getElementById("guess-value");
const guessButton = document.getElementById("guess-btn");
const restartButton = document.getElementById("restart-btn");
const attemptDisplay = document.getElementById("attempt");
const resultDisplay = document.getElementById("result");

let targetNumber;
let attempts = 0;
const maxAttempts = 5;

// When the page first opens or refreshes.
guessInput.value = "";
attemptDisplay.textContent = "0";
resultDisplay.textContent = "";
guessButton.style.display = "none";
restartButton.style.display = "block";

function restartGame() {
  targetNumber = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  attemptDisplay.textContent = "0";
  resultDisplay.textContent = "";
  guessInput.value = "";
  restartButton.style.display = "none";
  guessButton.style.display = "block";
  guessInput.focus();
}

function finishGame(message) {
  resultDisplay.textContent = message;
  guessButton.style.display = "none";
  restartButton.style.display = "block";
}

function makeGuess() {
  const raw = guessInput.value.trim();
  if (raw === "" || !Number.isFinite(Number(raw))) return;

  const number = Number(raw);
  attempts++;
  attemptDisplay.textContent = attempts;

  if (number === targetNumber) {
    finishGame("You WIN!");
  } else if (attempts >= maxAttempts) {
    finishGame("You LOSE!");
  } else if (number > targetNumber) {
    resultDisplay.textContent = number + " is too high";
  } else {
    resultDisplay.textContent = number + " is too low";
  }

  guessInput.value = "0";
  guessInput.focus();
}

restartButton.addEventListener("click", restartGame);
guessButton.addEventListener("click", makeGuess);
guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && guessButton.style.display !== "none") {
    makeGuess();
  }
});
