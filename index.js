#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import chalk from "chalk";
let sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow(`Lets Play Number Guessing Game           \n\n          Developed By Rubab Nasir`); //start
    await sleep();
    rainbowTitle.stop(); //stop after 2sec
    console.log();
}
await welcome();
async function guessGame() {
    const systemNumber = Math.floor(Math.random() * 10);
    const userNumber = await inquirer.prompt([
        {
            type: "input",
            name: "ask",
            message: "(User) What Is Your Name? \n"
        },
        {
            type: "number",
            name: "userGuess",
            message: "Enter your number between 1-10 \n"
        }
    ]);
    const { userGuess } = userNumber;
    console.log("Your Guess:   ", userGuess, "\n Sytem Guess:  ", systemNumber);
    if (userGuess === systemNumber) {
        console.log(chalk.bgMagentaBright(`Conguratulation You Won!`));
    }
    else {
        console.log(chalk.bgRedBright `You Guessed It Wrong TRY AGAIN!`);
    }
}
async function startAgain() {
    do {
        await guessGame();
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "If You Want To Play Again Type (Y/N)? \n "
        });
    } while (again.restart == "Y" || again.restart == "y" || again.restart == "YES" || again.restart == "yes");
}
startAgain();
