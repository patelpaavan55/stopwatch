let timerDisplay = document.getElementById('timerDisplay'),
    startStopButton = document.getElementById('btnStartStop'),
    lapResetButton = document.getElementById('btnLapReset'),
    milisecs = 0,
    secs = 0,
    mins = 0,
    milisecsDisplay,
    secsDisplay,
    minsDisplay,
    lapDisplayContainer = document.getElementById('lapDisplayContainer'),
    time,
    isRunning = false;
let lapArr = [];
// let temp_stop = document.getElementById('temp-stop');
// let temp_lap = document.getElementById('temp-lap');

lapResetButton.disabled = true;

function add() {
    milisecs++;
    if (milisecs >= 100) {
        milisecs = 0;
        secs++;
        if (secs >= 60) {
            secs = 0;
            mins++;

            if (mins >= 60) {
                mins = 0;
                //TODO Reset timer  here <<-----------
            }
        }
    }
    // milisecsDisplay = milisecs ? (milisecs > 9 ? milisecs : "0" + milisecs) : "00";
    // secsDisplay = secs ? (secs > 9 ? secs : "0" + secs) : "00";
    // minsDisplay = mins ? (mins > 9 ? mins : "0" + mins) : "00";
    milisecsDisplay = String(milisecs).padStart(2, '0');
    secsDisplay = String(secs).padStart(2, '0');
    minsDisplay = String(mins).padStart(2, '0');
    timerDisplay.textContent = minsDisplay + ":" + secsDisplay + "." + milisecsDisplay;
    timer();
}

function timer() {
    time = setTimeout(add, 10);
}
//timer();

// startStopButton.onclick = timer;
startStopButton.onclick = () => {
    if (!isRunning) {
        isRunning = true;
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
        timer();
    } else {
        isRunning = false;
        startStopButton.innerHTML = "Start";
        if (startStopButton.classList.contains("red")) {
            startStopButton.classList.remove("red");
            startStopButton.classList.add("green");
        }
        lapResetButton.innerHTML = "Reset";
        clearTimeout(time);
    }
};
// temp_stop.onclick = function() {

//     clearTimeout(time);
// }

// temp_lap.onclick = function() {
//     timerDisplay.textContent = "00:00.00";
//     milisecs = 0;
//     secs = 0;
//     mins = 0;
//     minsDisplay = "00";
//     secsDisplay = "00";
//     milisecsDisplay = "00";
//     removeAllChildNodes(lapDisplayContainer);
//     lapArr = [];
// }



lapResetButton.onclick = function() {
    if (String(lapResetButton.innerHTML).toLowerCase() === "lap") {
        console.log(minsDisplay + ":" + secsDisplay + "." + milisecsDisplay);
        let newLap = document.createElement('li');
        let lapWrapper = document.createElement('div');
        let lapNumber = document.createElement('p');
        let lapTime = document.createElement('p');
        lapWrapper.classList.add('lap-item');
        // let newHrTag = document.createElement('hr');
        // newHrTag.classList.add('separator');
        lapDisplayContainer.appendChild(newLap);
        // lapDisplayContainer.appendChild(newHrTag);
        newLap.appendChild(lapWrapper);
        lapWrapper.appendChild(lapNumber);
        lapWrapper.appendChild(lapTime);
        lapNumber.innerHTML = "Lap " + (lapArr.length + 1);
        lapTime.innerHTML = minsDisplay + ":" + secsDisplay + "." + milisecsDisplay;
        lapArr.push(newLap);
    } else if (String(lapResetButton.innerHTML).toLowerCase() === "reset") {
        timerDisplay.textContent = "00:00.00";
        milisecs = 0;
        secs = 0;
        mins = 0;
        minsDisplay = "00";
        secsDisplay = "00";
        milisecsDisplay = "00";
        removeAllChildNodes(lapDisplayContainer);
        lapArr = [];
        lapResetButton.innerHTML = "Lap";
        lapResetButton.disabled = true;
        lapResetButton.classList.add("disabled");
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}