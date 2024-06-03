// Функція для створення промісу
function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}

// Експортуємо функцію createPromise, якщо використовуються модулі
export { createPromise };

// Обробник події для відправлення форми
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

// Функція обробки відправлення форми
function onFormSubmit(event) {
    event.preventDefault();

    // Отримуємо значення полів форми
    const delay = Number(form.elements.delay.value);
    const step = Number(form.elements.step.value);
    const amount = Number(form.elements.amount.value);

    let delayStep = delay;

    // Цикл для створення промісів на основі кількості
    for (let i = 1; i <= amount; i += 1) {
        createPromise(i, delayStep)
            .then(({ position, delay }) => {
                console.log(`✅ Виконаний проміс ${position} через ${delay}мс`);
                iziToast.success({
                    title: 'Успіх',
                    message: `Виконаний проміс ${position} через ${delay}мс`,
                });
            })
            .catch(({ position, delay }) => {
                console.log(`❌ Відхилений проміс ${position} через ${delay}мс`);
                iziToast.error({
                    title: 'Помилка',
                    message: `Відхилений проміс ${position} через ${delay}мс`,
                });
            });
        delayStep += step;
    }
}
