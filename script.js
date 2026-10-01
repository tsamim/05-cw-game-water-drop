// Variables to control game state
let gameRunning = false;
let dropMaker;
let gameTimer;
let score = 0;
let timeLeft = 30;
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", resetGame);

// Start the game when the button is clicked
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  timeLeft = 30;

  // Update the score and timer
  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft;

  // Create a new drop every second
  dropMaker = setInterval(createDrop, 1000);

  // Start the countdown timer
  gameTimer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;

  document.getElementById("time").textContent = timeLeft;

  // End the game when the timer reaches 0
  if (timeLeft <= 0) {
    endGame();
  }
}

function endGame() {
  gameRunning = false;

  clearInterval(dropMaker);
  clearInterval(gameTimer);

  document.getElementById("game-container").innerHTML = "";

  if (score >= 100) {
    document.getElementById("game-container").innerHTML =
      '<div id="win-message">🎉 Great job! You collected clean water! 🎉</div>';

    document.getElementById("win-message").style.display = "block";
  } else {
    alert("Game over! Your score was " + score);
  }
}

function resetGame() {
  gameRunning = false;

  clearInterval(dropMaker);
  clearInterval(gameTimer);

  score = 0;
  timeLeft = 30;

  document.getElementById("score").textContent = score;
  document.getElementById("time").textContent = timeLeft;
  document.getElementById("game-container").innerHTML = "";
}

function createDrop() {
  // Create a new drop
  const drop = document.createElement("div");

  // Randomly decide if the drop is good or bad
  const isBad = Math.random() < 0.3;

  if (isBad) {
    drop.className = "bad-drop";
  } else {
    drop.className = "water-drop";
  }

  // Make drops different sizes
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;

  drop.style.width = size + "px";
  drop.style.height = size + "px";

  // Position the drop randomly
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - size);

  drop.style.left = xPosition + "px";

  // Make the drop fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the drop to the game
  document.getElementById("game-container").appendChild(drop);

  // Add points or subtract points when clicked
  drop.addEventListener("click", function () {
    if (!gameRunning) return;

    if (isBad) {
      score -= 10;
    } else {
      score += 10;
    }

    document.getElementById("score").textContent = score;

    // Remove the drop after clicking
    drop.remove();
  });

  // Remove drops that reach the bottom
  drop.addEventListener("animationend", function () {
    drop.remove();
  });
}