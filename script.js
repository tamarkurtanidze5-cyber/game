
let secretNumber;
let attempts;
let gameOver = false;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");

const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

// Start a new game
function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 7;
    gameOver = false;

    attemptsDisplay.textContent = attempts;
    message.textContent = "Good luck! Make your first guess.";

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;

    guessInput.focus();
}

// Check the player's guess
function checkGuess() {
    if (gameOver) return;

    const guess = Number(guessInput.value);

    // Validate input
    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent = "Enter a valid number between 1 and 100!";
        return;
    }

    // Reduce attempts
    attempts--;
    attemptsDisplay.textContent = attempts;

    if (guess === secretNumber) {
        message.textContent = "🎉 Congratulations! You won!";
        endGame();
        return;
    }

    if (attempts === 0) {
        message.textContent =
            `💀 Game over! The number was ${secretNumber}.`;

        endGame();
        return;
    }

    if (guess > secretNumber) {
        message.textContent =
            `📉 Too high! Try a smaller number.`;
    } else {
        message.textContent =
            `📈 Too low! Try a bigger number.`;
    }

    guessInput.value = "";
    guessInput.focus();
}

// End the game
function endGame() {
    gameOver = true;

    guessInput.disabled = true;
    guessButton.disabled = true;
}

// Restart game
restartButton.addEventListener("click", startGame);

// Guess button
guessButton.addEventListener("click", checkGuess);

// Allow Enter key to submit guess
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

// Initialize game
startGame();
