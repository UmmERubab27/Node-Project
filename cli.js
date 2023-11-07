#!usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
let sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow(`let start calculation       \n\n       Developed By Rubab Nasir`); //start
    await sleep();
    rainbowTitle.stop(); //stop after 2sec
    console.log(`
     _____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|`);
}
;
await welcome();
async function askQuestion() {
    const answers = await inquirer
        .prompt([
        /* pass your Question in here */
        {
            type: "input",
            name: "ask",
            message: "(User) What is your name? \n\n",
        },
        {
            type: "number",
            name: "number1",
            message: "Enter your frist number? \n\n ",
        },
        {
            type: "list",
            name: "operator",
            message: "Which operation you want to perform? \n\n ",
            choices: ["Addition", "Subtraction", "Multiplication", "Division"]
        },
        {
            type: "number",
            name: "number2",
            message: "Enter your second number? \n\n",
        },
    ]);
    if (answers.operator === "Addition") {
        console.log(chalk.green(`${answers.number1} + ${answers.number2} = ${answers.number1 + answers.number2}`));
    }
    else if (answers.operator === "Subtraction") {
        console.log(chalk.greenBright(`${answers.number1} - ${answers.number2} = ${answers.number1 - answers.number2}`));
    }
    else if (answers.operator === "Multiplication") {
        console.log(chalk.green(`${answers.number1} * ${answers.number2} = ${answers.number1 * answers.number2}`));
    }
    else if (answers.operator === "Division") {
        console.log(chalk.green(`${answers.number1} / ${answers.number2} = ${answers.number1 / answers.number2}`));
    }
    ;
}
;
//askQuestion();
async function startAgain() {
    do {
        await askQuestion();
        var again = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: " Do you want to continue? Press (Y/N)? ",
        });
    } while (again.restart == `y` || again.restart == `Y` || again.restart == `yes` || again.restart `YES`);
}
;
startAgain();
