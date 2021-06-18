export default function getFormattedTime(totalTime) {
    const totalTimeinSeconds = totalTime / 1000;
    let minutes = Math.floor(totalTimeinSeconds / 60);
    let seconds = Math.floor((totalTimeinSeconds) % 60);
    let centiseconds = Math.floor((totalTime % 1000) / 10);

    return `${minutes.toString(10).padStart(2,0)}:${seconds.toString(10).padStart(2,0)}.${centiseconds.toString(10).padStart(2,0)}`;
}