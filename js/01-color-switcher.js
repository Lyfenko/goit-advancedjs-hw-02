function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

buttonStart.addEventListener('click', () => {
    if (!timerId) { // Prevent multiple intervals
        timerId = setInterval(() => {
            body.style.backgroundColor = getRandomHexColor();
        }, 1000);
        buttonStart.disabled = true;
        buttonStop.disabled = false;
    }
});

buttonStop.addEventListener('click', () => {
    if (timerId) { // Prevent clearing interval if not active
        clearInterval(timerId);
        timerId = null;
        buttonStart.disabled = false;
        buttonStop.disabled = true;
    }
});
