// import Counter from './Counter.js';
import getFormattedTime from './utils/getFormattedTime.js';

let timerDisplay = document.getElementById('timerDisplay'),
    startStopButton = document.getElementById('btnStartStop'),
    lapResetButton = document.getElementById('btnLapReset'),
    lapDisplayContainer = document.getElementById('lapDisplayContainer'),
    startTime = 0,
    isRunning = false;
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


let timer;
const timerUpdate = () => {
    timer = requestAnimationFrame(timerUpdate);
    timerDisplay.textContent = getFormattedTime((Date.now() - startTime));
}


startStopButton.onclick = () => {
    if (!isRunning) {
        isRunning = true;
        changeToStop();
        startTime = Date.now();
        requestAnimationFrame(timerUpdate);

    } else {
        isRunning = false;
        // new_timer.stop();
        changeToStart();
        cancelAnimationFrame(timer);
        // // pauseTime = Date.now();
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
            // console.log("First TIme: " + getFormattedTime((lapTimeStamp - startTime)));
            lapTime.innerHTML = getFormattedTime((lapTimeStamp - startTime));
        } else {
            let previousLap = lapArr[lapArr.length - 1];
            // console.log("Array: " + lapArr);
            // console.log("Previous Value: " + previousLap);
            // console.log("Current Lap Value: " + getFormattedTime((lapTimeStamp - previousLap[1])));
            lapTime.innerHTML = getFormattedTime((lapTimeStamp - previousLap[1]));
        }
        lapArr.push([newLap, lapTimeStamp]);
        if (lapArr.length > 1) {

        }
    } else if (String(lapResetButton.innerHTML).toLowerCase() === "reset") {
        timerDisplay.textContent = "00:00.00";
        startTime = 0;
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