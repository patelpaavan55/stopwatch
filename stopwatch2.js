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
        if (children[i].classList.contains("shortestLap")) {
            children[i].classList.remove("shortestLap")
        }
        if (children[i].classList.contains("longestLap")) {
            children[i].classList.remove("longestLap");
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

    }
};



lapResetButton.onclick = function() {
    if (String(lapResetButton.innerHTML).toLowerCase() === "lap") {
        let newLap = document.createElement('li');
        let lapNumber = document.createElement('p');
        let lapTime = document.createElement('p');
        // let lineSeparator = document.createElement('hr');
        // lineSeparator.style.height = "1px";
        // lineSeparator.style.borderWidth = "0";
        // lineSeparator.style.backgroundColor = "#202022";
        // lineSeparator.classList.add('line-separator');
        newLap.classList.add('lap-item');
        lapDisplayContainer.prepend(newLap);
        newLap.append(lapNumber);
        newLap.append(lapTime);
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

        }
        lapTime.innerHTML = getFormattedTime(lapInterval);
        newLap.id = lapIntervalArr.length + 1;
        lapIntervalArr.push([lapIntervalArr.length + 1, lapInterval]);
        lapArr.push([lapArr.length + 1, lapTimeStamp]);
        if (lapArr.length > 1) {
            let children = lapDisplayContainer.children;
            clearShortestLongestLap(children);
            let shortestLapId, longestLapId;
            lapIntervalArr.sort((a, b) => a[1] - b[1]);
            shortestLapId = lapIntervalArr[0][0];
            longestLapId = lapIntervalArr[lapIntervalArr.length - 1][0];
            console.log(`Lap ${lapNumber.textContent} Shortest id: ${shortestLapId} Longestest id: ${longestLapId}`);
            for (let i = 0; i < children.length; i++) {
                if (children[i].id === shortestLapId.toString(10)) {
                    children[i].classList.add("shortestLap");
                } else if (children[i].id === longestLapId.toString(10)) {
                    children[i].classList.add("longestLap");
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
        lapIntervalArr = [];
        changeToLap();
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}