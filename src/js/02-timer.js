import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css"

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const now = new Date();
      selectedDate = selectedDates[0];
      if (selectedDate <= now) {
        iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
          position: 'center',
          color: 'red',
        });
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  };


flatpickr(datetimePicker, options);
startButton.addEventListener('click', () => {
    if (countdownInterval) clearInterval(countdownInterval);
    startCountdown();
});


function startCountdown() {
    countdownInterval = setInterval(() => {
      const now = new Date();
      const timeLeft = selectedDate - now;
  
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        updateTimerDisplay(0, 0, 0, 0);
        return;
      }
  
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
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
  
    return { days, hours, minutes, seconds };}

function updateTimerDisplay(days, hours, minutes, seconds) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    }
      

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
    }