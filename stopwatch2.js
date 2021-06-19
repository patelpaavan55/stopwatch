// import Counter from './Counter.js';
import getFormattedTime from './utils/getFormattedTime.js';

let timerDisplay = document.getElementById('timerDisplay'),
    startStopButton = document.getElementById('btnStartStop'),
    lapResetButton = document.getElementById('btnLapReset'),
    lapDisplayContainer = document.getElementById('lapDisplayContainer'),
    startTime = 0,
    isRunning = false,
    isPaused = false,
    overallTime = 0;
let lapArr = [];

lapResetButton.disabled = true;



function changeToStop() {
    startStopButton.innerHTML = "Stop";
    if (startStopButton.classList.contains("green")) {
        startStopButton.classList.remove("green");
        startStopButton.classList.add("red");
    }
    lapResetButton.innerHTML = "Lap";
    if (lapResetButton.disabled) {
        lapResetButton.disabled = false;
        if (lapResetButton.classList.contains("disabled")) {
            lapResetButton.classList.remove("disabled");
        }
    }

}

function changeToStart() {
    startStopButton.innerHTML = "Start";
    if (startStopButton.classList.contains("red")) {
        startStopButton.classList.remove("red");
        startStopButton.classList.add("green");
    }
    lapResetButton.innerHTML = "Reset";
}

function changeToLap() {
    lapResetButton.innerHTML = "Lap";
    lapResetButton.disabled = true;
    lapResetButton.classList.add("disabled");
}

function getTimeElapsedSinceLastStart() {
    if (!isRunning) {
        return 0;
    }
    return Date.now() - startTime;
}


let timer;
const timerUpdate = () => {
    timer = requestAnimationFrame(timerUpdate);
    // timerDisplay.textContent = getFormattedTime((Date.now() - startTime));
    timerDisplay.textContent = getFormattedTime((getTime()));

}

function getTime() {
    if (!startTime) {
        return 0;
    }
    if (isRunning) {
        return overallTime + getTimeElapsedSinceLastStart();
    }
    return overallTime;

}


startStopButton.onclick = () => {
    if (!isRunning) {
        changeToStop();
        isRunning = true;
        startTime = Date.now();
        requestAnimationFrame(timerUpdate);

    } else {
        // new_timer.stop();
        changeToStart();
        cancelAnimationFrame(timer);
        console.log("Stop Time: " + Date.now());
        console.log("Text Value: " + timerDisplay.textContent);
        overallTime = overallTime + getTimeElapsedSinceLastStart();
        console.log("Overall :" + getFormattedTime(overallTime));
        isRunning = false;
        isPaused = true;
        // startTime = overallTime;
        // pauseTime = Date.now();
        // clearTimeout(time);
    }
};



lapResetButton.onclick = function() {
    if (String(lapResetButton.innerHTML).toLowerCase() === "lap") {
        // console.log(minsDisplay + ":" + secsDisplay + "." + milisecsDisplay);
        let newLap = document.createElement('li');
        let lapWrapper = document.createElement('div');
        let lapNumber = document.createElement('p');
        let lapTime = document.createElement('p');
        lapWrapper.classList.add('lap-item');
        lapDisplayContainer.appendChild(newLap);
        newLap.appendChild(lapWrapper);
        lapWrapper.appendChild(lapNumber);
        lapWrapper.appendChild(lapTime);
        lapNumber.innerHTML = "Lap " + (lapArr.length + 1);
        // lapTime.innerHTML = minsDisplay + ":" + secsDisplay + "." + milisecsDisplay;
        let lapTimeStamp = Date.now();
        // console.log("My Lap Time Stamp: " + lapTimeStamp);
        if (!lapArr.length) {
            lapTime.innerHTML = getFormattedTime((lapTimeStamp - startTime));
        } else {
            let previousLap = lapArr[lapArr.length - 1];
            lapTime.innerHTML = getFormattedTime((lapTimeStamp - previousLap[1])) + " -> " + timerDisplay.textContent;
        }
        lapArr.push([newLap, lapTimeStamp]);
        if (lapArr.length > 1) {

        }
    } else if (String(lapResetButton.innerHTML).toLowerCase() === "reset") {
        timerDisplay.textContent = "00:00.00";
        startTime = 0;
        // isPaused = false;
        isRunning = false;
        overallTime = 0;
        removeAllChildNodes(lapDisplayContainer);
        lapArr = [];
        changeToLap();
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}