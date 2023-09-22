// section 2
increase_btn = document.getElementById("increase");
solve_counter = document.getElementById("solved");

function solveIncreaser() {
    // solved problems will be add only if the timer is on
    // if (document.getElementById("start").disabled == true) {
        solve_counter.innerText = parseInt(solve_counter.innerText) + 1;

        // show the solution table when fist time increase button clicked
        if (document.getElementById("solution_table").style.display == "none") {
            document.getElementById("solution_table").style.display = "table";
        }

        // add increamented value to a new row and add to the table
        if (document.getElementById("solution_table").style.display == "table") {
            // Create a new row element
            const newRow = document.createElement("tr");

            // adding solution number
            // Create a table data cell (td) for solution number
            const newCellForSolutionNumber = document.createElement("td");
            // 
            // adding inputed problem name (if given)
            const problemname = document.getElementById("problem_name");
            // 
            // Set the text content of the cell to "solve"
            newCellForSolutionNumber.textContent = solve_counter.innerText + " " + problemname.value;
            // clearing the input field
            problemname.value = "";
            // Append the cell to the row
            newRow.appendChild(newCellForSolutionNumber);


            // adding time
            // create a table cell for add time
            const newCellForShowTimer = document.createElement("td");
            // setting id
            newCellForShowTimer.setAttribute("id", "solu" + solve_counter.innerText);
            // getting the present time
            let presenttime = presentTime();
            newCellForShowTimer.textContent = presenttime;
            // append cell to the row
            newRow.appendChild(newCellForShowTimer);

            // adding time spend
            // create a table cell for add time
            const newCellForTimeSpend = document.createElement("td");
            // getting the spended time
            newCellForTimeSpend.textContent = timeSpend(solve_counter.innerText, presenttime);
            // append cell to the row
            newRow.appendChild(newCellForTimeSpend);

            // Find the existing table by its ID "solution_table"
            const tableBody = document.getElementById("solution_table_row");
            // Append the new row to the existing table
            tableBody.appendChild(newRow);
        }
    // }
}

// calculate spended time when increase button in clicked
// return present time
function presentTime() {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

function calculateTimeSpent(startTimeStr, endTimeStr) {
    // Parse the time strings into Date objects
    const startTime = new Date(`1970-01-01T${startTimeStr}`);
    const endTime = new Date(`1970-01-01T${endTimeStr}`);

    // Calculate the time difference in milliseconds
    const timeDifference = endTime - startTime;

    // Convert the time difference to hours, minutes, and seconds
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

    return {
        hours,
        minutes,
        seconds
    };
}

function timeSpend(solve_counter, presenttime) {
    let calTime;
    let pasttime;
    if (solve_counter == '1')
        pasttime = "00:00:00";
    else {
        pasttime = document.getElementById(`solu${parseInt(solve_counter) - 1}`).innerHTML;
    }
    calTime = calculateTimeSpent(pasttime, presenttime);
    return `${calTime.hours} h, ${calTime.minutes} m, ${calTime.seconds} s`
}

increase_btn.addEventListener('click', solveIncreaser);

// section 1
// store the time(update when startTimer() is running)
let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0; // milisec will not displayed. but it is need for perfect calculation
let running; // running true means timer will run. else not.
function startTimer() {
    // timer will be update inside this tag
    time = document.getElementById("time");

    let start = new Date, today = new Date;
    today.setHours(hours, minutes, seconds, miliseconds); 
    running = true
    // timer in the html page will be displayed in this formate
    const format = new Intl.DateTimeFormat('en', {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // fractionalSecondDigits: 2
    });
    // add today's timestamp so the timezone would be properly handled
    const timer = () => requestAnimationFrame(() => {
        // finding current time
        let currentTime = new Date - start + +today; // currentTime is in now miliseconds
        // pushing to html tag "time" by converting to the previous format 
        time.textContent = format.format(currentTime);
        // converting to date object to use getHours() and methods
        currentTime = new Date(currentTime)
        // saving the time for future use. (example: again start form this time)
        hours = currentTime.getHours();
        minutes = currentTime.getMinutes();
        seconds = currentTime.getSeconds();
        miliseconds = currentTime.getMilliseconds();

        running && timer();
    });

    timer();
    // disable start button while running
    document.getElementById("start").disabled = true;
}

function stopTimer() {
    // stoping the timeer function above
    running = false;
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