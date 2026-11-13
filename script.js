
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 7;

const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const restartButton = document.getElementById("restartButton");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

guessButton.addEventListener("click", checkGuess);

guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

restartButton.addEventListener("click", restartGame);

function checkGuess() {
    const guess = Number(guessInput.value);

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent = "Please enter a whole number between 1 and 100!";
        return;
    }

    attemptsLeft--;

    attemptsDisplay.textContent =
        "Attempts remaining: " + attemptsLeft;

    if (guess === secretNumber) {
        message.textContent = "🎉 Congratulations! You won!";
        showFireworks();
        endGame();
    } else if (attemptsLeft === 0) {
        message.textContent =
            "😢 Game over! The number was " + secretNumber;
        endGame();
    } else if (guess < secretNumber) {
        message.textContent = "Too low! Try a higher number.";
    } else {
        message.textContent = "Too high! Try a lower number.";
    }

    guessInput.value = "";
    guessInput.focus();
}

function endGame() {
    guessButton.disabled = true;
    guessInput.disabled = true;
}

function restartGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 7;

    message.textContent = "Good luck!";
    attemptsDisplay.textContent = "Attempts remaining: 7";

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;

    clearFireworks();

    guessInput.focus();
}

function showFireworks() {
    const container = document.getElementById("fireworks");

    const colors = [
        "#ff0000",
        "#ffff00",
        "#00ff00",
        "#00bfff",
        "#ff00ff",
        "#ffa500"
    ];

    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            const centerX = 20 + Math.random() * 60;
            const centerY = 20 + Math.random() * 40;

            for (let i = 0; i < 24; i++) {
                const angle = (i / 24) * Math.PI * 2;
                const distance = 60 + Math.random() * 80;

                const particle = document.createElement("span");

                particle.className = "firework-particle";
                particle.style.left = centerX + "%";
                particle.style.top = centerY + "%";

                particle.style.backgroundColor =
                    colors[Math.floor(Math.random() * colors.length)];

                particle.style.setProperty(
                    "--dx",
                    Math.cos(angle) * distance + "px"
                );

                particle.style.setProperty(
                    "--dy",
                    Math.sin(angle) * distance + "px"
                );

                container.appendChild(particle);

                setTimeout(() => particle.remove(), 1000);
            }
        }, burst * 250);
    }
}

function clearFireworks() {
    document.getElementById("fireworks").innerHTML = "";
}
