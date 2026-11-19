const card = document.querySelector("#number-card");
const front = document.querySelector("#number-front");
const back = document.querySelector("#number-back");
const options = document.querySelector("#number-options");
const soundButton = document.querySelector("#number-sound");

const numberWords = [
    "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten"
];

const numberAudio = new Audio();
let selectedNumber = 1;

function selectNumber(number, button) {
    numberAudio.pause();
    selectedNumber = number;

    const fileName = String(number).padStart(2, "0");
    const word = numberWords[number - 1];

    front.src = `../static/images/numbers/front/${fileName}.png`;
    back.src = `../static/images/numbers/back/${fileName}.png`;
    front.alt = `Number ${number}, ${word}`;
    back.alt = number === 1 ? "One strawberry" : `${number} strawberries`;

    front.decode().catch(() => { });
    back.decode().catch(() => { });

    card.classList.remove("is-flipped");
    card.setAttribute("aria-pressed", "false");
    card.setAttribute("aria-label", `Flip number ${number} card`);

    const previousButton = options.querySelector('[aria-pressed="true"]');
    previousButton?.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-pressed", "true");

    soundButton.textContent = `Hear ${word}`;
}

function toggleCard() {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
}

for (let number = 1; number <= numberWords.length; number++) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "numbers-option";
    button.textContent = number;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => selectNumber(number, button));
    options.append(button);
}

selectNumber(1, options.firstElementChild);

card.addEventListener("click", toggleCard);

card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
    }
});

soundButton.addEventListener("click", async () => {
    const fileName = String(selectedNumber).padStart(2, "0");
    numberAudio.src = `../static/audios/numbers/${fileName}.mp3`;

    try {
        await numberAudio.play();
    } catch (error) {
        if (error.name !== "AbortError") {
            console.error("Couldn't play the number sound:", error);
        }
    }
});