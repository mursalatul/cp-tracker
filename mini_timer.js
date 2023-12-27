// section 1
// store the minitimer(update when startTimer() is minitimer_running)
let minitimer_hours = 0;
let minitimer_minutes = 0;
let minitimer_seconds = 0;
let minitimer_miliseconds = 0; // milisec will not displayed. but it is need for perfect calculation
let minitimer_running; // minitimer_running true means timer will run. else not.
function startTimer() {
    // timer will be update inside this tag
    minitimer = document.getElementById("minitimer");

    let timerstart = new Date, today = new Date;
    today.setHours(minitimer_hours, minitimer_minutes, minitimer_seconds, minitimer_miliseconds); 
    minitimer_running = true
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
        // finding current minitimer
        let currentTime = new Date - timerstart + +today; // currentTime is in now minitimer_miliseconds
        // pushing to html tag "minitimer" by converting to the previous format 
        minitimer.textContent = format.format(currentTime);
        // converting to date object to use getHours() and methods
        currentTime = new Date(currentTime)
        // saving the minitimer for future use. (example: again timerstart form this minitimer)
        minitimer_hours = currentTime.getHours();
        minitimer_minutes = currentTime.getMinutes();
        minitimer_seconds = currentTime.getSeconds();
        minitimer_miliseconds = currentTime.getMilliseconds();

        minitimer_running && timer();
    });

    timer();
    // disable timerstart button while minitimer_running
    document.getElementById("timerstart").disabled = true;
}

function stopTimer() {
    // stoping the timeer function above
    minitimer_running = false;
    // Enable the "timerstart" button when the timer is stopped
    document.getElementById("timerstart").disabled = false;
}

function resetTimer() {
    stopTimer();

    // resetting the minitimer
    minitimer_hours = 0;
    minitimer_minutes = 0;
    minitimer_seconds = 0;
    
    startTimer();
}


// timerstart the timer when needed, e.g., when a button is clicked
document.getElementById("timerstart").addEventListener("click", startTimer);

// Stop the timer when the "Stop" button is clicked
document.getElementById("timerstop").addEventListener("click", stopTimer);

// reset the timer when the reset button in clicked 
document.getElementById("timernew").addEventListener("click", resetTimer);