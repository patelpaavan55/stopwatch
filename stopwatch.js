import getFormattedTime from './utils/getFormattedTime.js';

let timerDisplay = document.getElementById('timerDisplay'),
    startStopButton = document.getElementById('btnStartStop'),
    lapResetButton = document.getElementById('btnLapReset'),
    lapDisplayContainer = document.getElementById('lapDisplayContainer'),
    startTime = 0,
    stopTime = 0,
    isRunning = false,
    overallTime = 0;

const Laps = {
    numOfLaps: 0,
    min: undefined, //{index: , duration:}
    max: undefined, //{index: , duration:}
    lastLapTimeStamp: undefined
}

function resetLapObject() {
    Laps.numOfLaps = 0;
    Laps.min = undefined;
    Laps.max = undefined;
    Laps.lastLapTimeStamp = undefined;
}


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
        let newLapElement = document.createElement('li');
        let lapNumber = document.createElement('p');
        let lapTime = document.createElement('p');

        lapDisplayContainer.prepend(newLapElement);

        const previousLaps = {...Laps };

        newLapElement.classList.add('lap-item');
        newLapElement.append(lapNumber);
        newLapElement.append(lapTime);

        let currentLapTimeStamp = Date.now();
        lapNumber.innerHTML = `Lap ${Laps.numOfLaps + 1}`;
        newLapElement.id = Laps.numOfLaps + 1;
        console.log("Before any updates");
        console.log(Laps);

        if (Laps.numOfLaps === 0) {
            let lapDuration = currentLapTimeStamp - startTime;
            Laps.numOfLaps += 1;
            lapTime.innerHTML = getFormattedTime(lapDuration);
            Laps.max = Laps.min = { index: Laps.numOfLaps, duration: lapDuration };
            Laps.lastLapTimeStamp = currentLapTimeStamp;
            return;
        }

        let lapDuration = currentLapTimeStamp - Laps.lastLapTimeStamp;
        let currentLapType = ""; //Takes  "shortestLap", "longestLap" or "" string values
        Laps.numOfLaps += 1;


        if (startTime > Laps.lastLapTimeStamp) {
            lapDuration -= (startTime - stopTime);
        }
        Laps.lastLapTimeStamp = currentLapTimeStamp;
        lapTime.innerHTML = getFormattedTime(lapDuration);


        if (lapDuration < Laps.min.duration) {
            Laps.min = { index: Laps.numOfLaps, duration: lapDuration };
            currentLapType = "shortestLap";
        } else if (lapDuration > Laps.max.duration) {
            Laps.max = { index: Laps.numOfLaps, duration: lapDuration };
            currentLapType = "longestLap";
        }


        if (Laps.numOfLaps === 2) {
            lapDisplayContainer.children[Laps.numOfLaps - Laps.min.index].classList.add("shortestLap");
            lapDisplayContainer.children[Laps.numOfLaps - Laps.max.index].classList.add("longestLap");
            return;
        }


        if (currentLapType !== "") {
            if (currentLapType === "shortestLap") {
                lapDisplayContainer.children[Laps.numOfLaps - previousLaps.min.index].classList.remove(currentLapType);
                lapDisplayContainer.children[Laps.numOfLaps - Laps.min.index].classList.add(currentLapType);
            } else {
                lapDisplayContainer.children[Laps.numOfLaps - previousLaps.max.index].classList.remove(currentLapType);
                lapDisplayContainer.children[Laps.numOfLaps - Laps.max.index].classList.add(currentLapType);
            }
        }


    } else if (String(lapResetButton.innerHTML).toLowerCase() === "reset") {
        timerDisplay.textContent = "00:00.00";
        startTime = 0;
        isRunning = false;
        overallTime = 0;
        removeAllChildNodes(lapDisplayContainer);
        resetLapObject()
        console.log("After Reset");
        console.log(Laps);
        changeToLap();
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}