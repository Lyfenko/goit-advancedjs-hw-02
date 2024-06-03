function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

buttonStart.addEventListener('click', () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    buttonStart.disabled = true;
});

buttonStop.addEventListener('click', () => {
    clearInterval(timerId);
    buttonStart.disabled = false;
})

