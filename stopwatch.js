var h1 = document.getElementById('timer'),
start_stop = document.getElementById('start-stop'),
lap_reset = document.getElementById('lap-reset'),
milisecs = 0,
secs = 0,
mins = 0,
milisecs_txt,
secs_txt,
mins_txt,
container = document.getElementById('container'),
t;
var lapArr = [];
var temp_stop = document.getElementById('temp-stop');
var temp_lap = document.getElementById('temp-lap');

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
milisecs_txt = milisecs ? (milisecs > 9 ? milisecs : "0" + milisecs) : "00";
secs_txt = secs ? (secs > 9 ? secs : "0" + secs) : "00";
mins_txt = mins ? (mins > 9 ? mins : "0" + mins) : "00";
h1.textContent = mins_txt + ":" + secs_txt + "." + milisecs_txt;
timer();
}

function timer() {
t = setTimeout(add, 10);
}
//timer();

start_stop.onclick = timer;
temp_stop.onclick = function () {

clearTimeout(t);
}

lap_reset.onclick = function () {
h1.textContent = "00:00.00";
milisecs = 0;
secs = 0;
mins = 0;
mins_txt="00";
secs_txt="00";
milisecs_txt="00";
removeAllChildNodes(container);
lapArr = [];
}



temp_lap.onclick = function () {
console.log(mins_txt + ":" + secs_txt + "." + milisecs_txt);
var newLap=document.createElement('li');
var content=mins_txt + ":" + secs_txt + "." + milisecs_txt;
container.appendChild(newLap);
newLap.innerHTML="Lap "+(lapArr.length+1)+" "+content;
lapArr.push(newLap);

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}