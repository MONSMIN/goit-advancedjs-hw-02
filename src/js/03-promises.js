import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function resetForm() {
  form.reset();
}

function handleSubmitForm(event) {
  event.preventDefault();
  
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);
  resetForm();

  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + step * (i - 1);
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });
  }
}

form.addEventListener('submit', handleSubmitForm);
