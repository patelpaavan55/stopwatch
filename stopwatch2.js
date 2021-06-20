import getFormattedTime from './utils/getFormattedTime.js';

let timerDisplay = document.getElementById('timerDisplay'),
    startStopButton = document.getElementById('btnStartStop'),
    lapResetButton = document.getElementById('btnLapReset'),
    lapDisplayContainer = document.getElementById('lapDisplayContainer'),
    startTime = 0,
    stopTime = 0,
    isRunning = false,
    overallTime = 0;
let lapArr = [];
let lapIntervalArr = [];

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

function getTimeElapsedSinceLastStart(currentTime = Date.now()) {
    if (!isRunning) {
        return 0;
    }
    return currentTime - startTime;
}


let timer;
const timerUpdate = () => {
    timer = requestAnimationFrame(timerUpdate);
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

function clearShortestLongestLap(children) {
    for (let i = 0; i < children.length; i++) {
        if (children[i].firstChild.classList.contains("shortestLap")) {
            children[i].firstChild.classList.remove("shortestLap")
        }
        if (children[i].firstChild.classList.contains("longestLap")) {
            children[i].firstChild.classList.remove("longestLap");
        }
    }
}


startStopButton.onclick = () => {
    if (!isRunning) {
        changeToStop();
        isRunning = true;
        startTime = Date.now();
        requestAnimationFrame(timerUpdate);

    } else {
        changeToStart();
        cancelAnimationFrame(timer);
        stopTime = Date.now()
        overallTime = overallTime + getTimeElapsedSinceLastStart(stopTime);
        isRunning = false;
        // console.log("Stop Time: " + stopTime);
        // console.log("Text Value: " + timerDisplay.textContent);
        // console.log("Overall :" + getFormattedTime(overallTime));
    }
};



lapResetButton.onclick = function() {
    if (String(lapResetButton.innerHTML).toLowerCase() === "lap") {
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
        let lapTimeStamp = Date.now();
        let lapInterval;

        if (!lapArr.length) {
            lapInterval = lapTimeStamp - startTime;
        } else {
            let previousLap = lapArr[lapArr.length - 1];
            lapInterval = lapTimeStamp - previousLap[1];
            if (startTime > previousLap[1]) {
                lapInterval = lapInterval - (startTime - stopTime)
            }
            // console.log("Previous Lap " + previousLap)
            // console.log(`Current Lap - Previous Lap: ${lapTimeStamp - previousLap[1]} ${getFormattedTime(lapTimeStamp - previousLap[1])}`)
            // console.log("Start Time " + startTime)
            // console.log(`Current Lap - Start Time: ${lapTimeStamp - startTime} ${getFormattedTime(lapTimeStamp - startTime)}`)
        }
        lapTime.innerHTML = getFormattedTime(lapInterval);
        lapWrapper.id = lapIntervalArr.length + 1;
        lapIntervalArr.push([lapIntervalArr.length + 1, lapInterval]);
        lapArr.push([lapArr.length + 1, lapTimeStamp]);
        if (lapArr.length > 1) {
            let children = lapDisplayContainer.children;
            clearShortestLongestLap(children);
            let shortestLapId, longestLapId;
            lapIntervalArr.sort((a, b) => a[1] - b[1]);
            shortestLapId = String(lapIntervalArr[0][0]);
            longestLapId = String(lapIntervalArr[lapIntervalArr.length - 1][0]);

            for (let i = 0; i < children.length; i++) {
                if (children[i].firstChild.id === shortestLapId) {
                    children[i].firstChild.classList.add("shortestLap");
                }
                if (children[i].firstChild.id === longestLapId) {
                    children[i].firstChild.classList.add("longestLap");
                }
            }
        }

    } else if (String(lapResetButton.innerHTML).toLowerCase() === "reset") {
        timerDisplay.textContent = "00:00.00";
        startTime = 0;
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