import { Pomodoro } from '/pomodoro/Pomodoro.js';

const modeDisplay = document.querySelector('#mode-display');
const timer = document.querySelector('.current-time');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const allButtons = [startBtn, pauseBtn, stopBtn];

const pomodoro = new Pomodoro();
const alarm = new Audio('uplifting-bells.wav');

startBtn.addEventListener('click', () => {
    if (!pomodoro.isRunning) {
        pomodoro.toggleClock();
        updateBtnSelected(startBtn);
    }
})

pauseBtn.addEventListener('click', () => {
    if (pomodoro.isRunning) {
        pomodoro.toggleClock();
        updateBtnSelected(pauseBtn);
    }
})

stopBtn.addEventListener('click', () => {
    pomodoro.toggleClock(true);
    updateBtnSelected(stopBtn);
})

const updatePomodoro = () => {
    updateTimer();
    updateModeDisplay();
}

const updateTimer = () => {
    let minutes = `${Math.floor(pomodoro.timeRemaining / 60)}`.padStart(2, '0');
    let seconds = `${pomodoro.timeRemaining % 60}`.padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`
}

const updateModeDisplay = () => {
    let mode = pomodoro.mode;
    let formattedMode = mode[0].toUpperCase() + mode.substring(1);
    modeDisplay.innerText = formattedMode;
}

const playAlarm = () => {
    alarm.playbackRate = 2;
    alarm.play();
    setTimeout(() => {
        alarm.play();
    }, 2000)
}

const updateBtnSelected = (button) => {
    allButtons.forEach((btn) => {
        btn.classList.remove('selected');
    })
    button.classList.add('selected');
}

pomodoro.setAlarm(playAlarm);
pomodoro.setOnTick(updatePomodoro);
updatePomodoro();