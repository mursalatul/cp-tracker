// section 2
increase_btn = document.getElementById("increase");
solve_counter = document.getElementById("solved");

function solveIncreaser() {
    // solved problems will be add only if the timer is on
    if (document.getElementById("start").disabled == true)
        solve_counter.innerText = parseInt(solve_counter.innerText) + 1;
    else
        alert("Please Start the timer first");
}

increase_btn.addEventListener('click', solveIncreaser);

// section 1

// store the time
let hours = 0;
let minutes = 0;
let seconds = 0;

function startTimer() {

    timerElement = document.getElementById("time");

    timerInterval = setInterval(function () {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;

            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }

        const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        timerElement.textContent = formattedTime;
    }, 1000); // Update every 1 second
    // Disable the "Start" button when the timer is running
    document.getElementById("start").disabled = true;
}

function stopTimer() {
    clearInterval(timerInterval);

    // Enable the "Start" button when the timer is stopped
    document.getElementById("start").disabled = false;
}

function resetTimer() {
    stopTimer();

    // resetting the time
    hours = 0;
    minutes = 0;
    seconds = 0;

    // displaying the time
    timerElement.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


// Start the timer when needed, e.g., when a button is clicked
document.getElementById("start").addEventListener("click", startTimer);

// Stop the timer when the "Stop" button is clicked
document.getElementById("stop").addEventListener("click", stopTimer);

// reset the timer when the reset button in clicked
document.getElementById("reset").addEventListener("click", resetTimer);