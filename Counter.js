export default class Counter {
    constructor() {
        this.isRunning = false;
        this.startTime = 0;
        this.totalOverallTime = 0;
    }

    getTimeElapsedSinceLastStart() {
        if (!this.isRunning) {
            return 0;
        }
        return Date.now() - this.startTime;
    }

    start(startTime) {
        if (!this.isRunning) {
            return console.log("Timer already running");
        }
        this.isRunning = true;
        this.startTime = startTime;
    }

    stop() {
        if (!this.isRunning) {
            return console.log("Timer already stopped");
        }
        this.isRunning = false;
        this.totalOverallTime = this.totalOverallTime + this.getTimeElapsedSinceLastStart();
    }

    reset() {
        this.totalOverallTime = 0;
        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }
        this.startTime = 0;
    }

    getTime() {
        if (!this.startTime) {
            return 0;
        }
        if (this.isRunning) {
            return this.totalOverallTime + this.getTimeElapsedSinceLastStart();
        }
        return this.totalOverallTime;
    }


}