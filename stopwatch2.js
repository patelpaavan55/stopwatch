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
        let lapTimeStamp = Date.now();
        let lapInterval;

        if (!lapArr.length) {
            lapInterval = lapTimeStamp - startTime;
        } else {
            let previousLap = lapArr[lapArr.length - 1];
            lapInterval = lapTimeStamp - previousLap[1];
            // lapTime.innerHTML = getFormattedTime((lapTimeStamp - previousLap[1])) + " -> " + timerDisplay.textContent;
        }
        lapTime.innerHTML = getFormattedTime(lapInterval);
        lapWrapper.id = lapIntervalArr.length + 1;
        lapIntervalArr.push([lapIntervalArr.length + 1, lapInterval]);
        lapArr.push([lapArr.length + 1, lapTimeStamp]);
        console.log(lapArr)
        console.log("Before Sorting:" + lapIntervalArr);

        if (lapArr.length > 1) {
            let children = lapDisplayContainer.children;
            //removing previous shortest and longest laps
            for (let i = 0; i < children.length; i++) {
                if (children[i].firstChild.classList.contains("shortestLap")) {
                    children[i].firstChild.classList.remove("shortestLap")
                }
                if (children[i].firstChild.classList.contains("longestLap")) {
                    children[i].firstChild.classList.remove("longestLap");
                }
            }
            let shortestLapId, longestLapId;
            lapIntervalArr.sort((a, b) => a[1] - b[1]);
            shortestLapId = String(lapIntervalArr[0][0]);
            longestLapId = String(lapIntervalArr[lapIntervalArr.length - 1][0]);
            console.log("After Sorting:" + lapIntervalArr);
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