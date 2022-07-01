export class Pomodoro {
    #onTick;
    #clockTimer;
    #alarm;
    constructor() {
        this.isRunning = false;
        this.workTime = 1500;
        this.shortBreak = 300;
        this.longBreak = 600;
        this.timeRemaining = this.workTime;
        this.sessions = 1;
        this.mode = "work";
    }

    setOnTick(callback) {
        if (typeof callback === 'function') {
            this.#onTick = callback;
        }
    }
    getOnTick() {
        return this.#onTick;
    }

    setAlarm(callback) {
        if (typeof callback === 'function') {
            this.#alarm = callback;
        }
    }

    getAlarm() {
        return this.#alarm;
    }

    toggleClock(reset) {
        if (reset) {
            // STOP THE TIMER
            clearInterval(this.#clockTimer);
            this.resetTimer();

        } else {

            if (this.isRunning === true) {
                // PAUSE THE TIMER
                clearInterval(this.#clockTimer);
                this.isRunning = false;

            } else {
                // START THE TIMER
                this.isRunning = true;
                this.#clockTimer = setInterval(() => {

                    this.decreaseTimer();

                    if (typeof this.#onTick === 'function') {
                        this.#onTick();
                    }

                }, 1000)
            }
        }
    }

    decreaseTimer() {

        if (this.timeRemaining > 0) {

            this.timeRemaining--;

        } else if (this.timeRemaining === 0) {

            clearInterval(this.#clockTimer);
            this.soundAlarm();
            this.endSession();
        }
    }

    soundAlarm() {
        if (typeof this.#alarm === 'function') {
            this.#alarm();
        }
    }

    resetTimer() {

        this.isRunning = false;
        this.updateSession();

        if (typeof this.#onTick === 'function') {
            this.#onTick();
        }
    }

    endSession() {

        setTimeout(() => {

            this.sessions++;
            this.updateSession();
            this.isRunning = false;
            this.toggleClock();

        }, 3000);
    }

    updateSession() {

        if (this.sessions % 4 == 0) {

            this.timeRemaining = this.longBreak;
            this.mode = "long break"

        } else if (this.sessions % 2 == 0) {

            this.timeRemaining = this.shortBreak;
            this.mode = "break"

        } else {

            this.timeRemaining = this.workTime;
            this.mode = "work"
        }

    }



}