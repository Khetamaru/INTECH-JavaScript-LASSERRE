export const clock = {

    timePassed : 0,
    startTimer() {
        clock.timerInterval = setInterval(() => {
            clock.timePassed += 1;
            document.getElementById("timer").innerHTML = `${clock.formatTime()}`;
        }, 1000);
    },
    reset() {
        clock.timePassed = 0.00;
        clock.timerInterval = null;
    },
    formatTime() {
        const minutes = Math.floor(clock.timePassed / 60);
        let seconds = clock.timePassed % 60;
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
      }
}