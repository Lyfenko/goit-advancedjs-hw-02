document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('[data-start]');
    const goBackButton = document.getElementById('go-back');
    const daysSpan = document.querySelector('[data-days]');
    const hoursSpan = document.querySelector('[data-hours]');
    const minutesSpan = document.querySelector('[data-minutes]');
    const secondsSpan = document.querySelector('[data-seconds]');
    let countdownInterval;

    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            if (selectedDate <= new Date()) {
                iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
                startButton.disabled = true;
            } else {
                startButton.disabled = false;
            }
        },
    };

    flatpickr("#datetime-picker", options);

    startButton.addEventListener('click', () => {
        const endDate = new Date(document.querySelector("#datetime-picker").value);
        startCountdown(endDate);
    });

    goBackButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function startCountdown(endDate) {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            const now = new Date();
            const timeRemaining = endDate - now;
            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                updateTimerDisplay(0, 0, 0, 0);
                return;
            }
            const timeParts = convertMs(timeRemaining);
            updateTimerDisplay(timeParts.days, timeParts.hours, timeParts.minutes, timeParts.seconds);
        }, 1000);
    }

    function updateTimerDisplay(days, hours, minutes, seconds) {
        daysSpan.textContent = addLeadingZero(days);
        hoursSpan.textContent = addLeadingZero(hours);
        minutesSpan.textContent = addLeadingZero(minutes);
        secondsSpan.textContent = addLeadingZero(seconds);
    }

    function addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }
});