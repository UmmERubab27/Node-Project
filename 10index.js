#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const userInput = await inquirer.prompt([
    {
        type: "number",
        name: "minutes",
        message: "Enter minutes in number"
    },
    {
        type: "number",
        name: "seconds",
        message: "Enter seconds in number"
    }
]);
if (isNaN(userInput.minutes) || isNaN(userInput.seconds)) {
    console.log("please insert valid number");
}
async function Timer(minutes, seconds) {
    console.log(`TIME INSERT = ${minutes} minutes and ${seconds} seconds`);
    const totalSeconds = minutes * 60 + seconds;
    let remainingSeconds = totalSeconds;
    // create a setInterval function to start timer 
    const timerInterval = setInterval(() => {
        const minutesRemaining = Math.floor(remainingSeconds / 60);
        const secondsRemaining = remainingSeconds % 60;
        console.log(`Time Remaining: ${minutesRemaining} minutes ${secondsRemaining} seconds`);
        remainingSeconds--;
        // create clearIntervel function to stop the setIntervel Functions
        if (remainingSeconds < 0) {
            clearInterval(timerInterval);
            console.log("Timer's up!");
            console.log(chalk.bgGreenBright `Developed by Rubab Nasir`);
        }
    }, 1000);
}
Timer(userInput.minutes, userInput.seconds);
