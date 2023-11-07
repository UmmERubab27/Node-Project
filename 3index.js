#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
const sleep = (ms = 1500) => {
    return new Promise((resolve, rejects) => {
        setTimeout(resolve, ms);
    });
};
async function shine() {
    console.clear();
    const msg = `ATM M A C H I N E!!!`;
    figlet(msg, (err, Data) => {
        console.log(gradient.pastel.multiline(Data));
    });
}
;
async function getStarted() {
    let rainbowTitle = chalkAnimation.rainbow(`
    /$$$$$$  /$$$$$$$$ /$$      /$$       /$$      /$$                     /$$       /$$                          
    /$$__  $$|__  $$__/| $$$    /$$$      | $$$    /$$$                    | $$      |__/                          
    | $$  \ $$   | $$   | $$$$  /$$$$      | $$$$  /$$$$  /$$$$$$   /$$$$$$$| $$$$$$$  /$$ /$$$$$$$   /$$$$$$       
    | $$$$$$$$   | $$   | $$ $$/$$ $$      | $$ $$/$$ $$ |____  $$ /$$_____/| $$__  $$| $$| $$__  $$ /$$__  $$      
    | $$__  $$   | $$   | $$  $$$| $$      | $$  $$$| $$  /$$$$$$$| $$      | $$  \ $$| $$| $$  \ $$| $$$$$$$$      
    | $$  | $$   | $$   | $$\  $ | $$      | $$\  $ | $$ /$$__  $$| $$      | $$  | $$| $$| $$  | $$| $$_____/      
    | $$  | $$   | $$   | $$ \/  | $$      | $$ \/  | $$|  $$$$$$$|  $$$$$$$| $$  | $$| $$| $$  | $$|  $$$$$$$      
    |__/  |__/   |__/   |__/     |__/      |__/     |__/ \_______/ \_______/|__/  |__/|__/|__/  |__/ \_______/   
    \n`);
    await sleep();
    rainbowTitle.stop();
}
;
await getStarted();
// variable declarations
let usernames = ["Rubab", "admin", "F"];
let passwords = ["2704", "admin", "F"];
let amounts = ["500", "1000", "1500", "2500", "3000", "4000", "5000",];
//chalk animation messages 
let welcome_msg = "\n<== Welcome to ATM ==>\n";
let closing_msg = "\n\t<== Transaction Done ==>";
// authentication questions
const authenticate = [
    {
        type: "input",
        name: "username",
        message: "Enter User ID:",
        validate: validUser
    },
    {
        type: "password",
        name: "password",
        message: "Enter Password",
        when: (answers) => answers.username,
        validate: validPassword
    }
];
// transaction questions
const selectOperation = [
    {
        type: "list",
        name: "operation",
        message: "Choose an Operation",
        choices: ["Withdraw Cash", "Deposit Cash", "Check Balance", "Exit"]
    },
    {
        type: "input",
        name: "withDrawAmount",
        message: "Enter Amount to Withdraw Cash",
        validate: numberValidation,
        when: (answers2) => answers2.operation === "Withdraw Cash"
    },
    {
        type: "input",
        name: "depositCash",
        message: "Enter Amount to Deposit",
        validate: numberValidation,
        when: (answers2) => answers2.operation === "Deposit Cash"
    },
    {
        type: "list",
        name: "exit",
        when: (answers2) => answers2.operation === "Exit",
        choices: () => process.exit() // this process can be done like "check balance"
    },
]; //again prompt
const again = [
    {
        type: "input",
        name: "ask",
        message: "Do You Want Another Transaction (Y|N):"
    }
];
// transactions operations
async function transOperations(authnAnswers, operationAnswers) {
    let userIndex = usernames.indexOf(authnAnswers.username);
    let currentUserAmount = parseFloat(amounts[userIndex]);
    let newAmount;
    if (operationAnswers.operation === "Check Balance") {
        console.log(`${chalk.greenBright(`Current Balance`)} = ${chalk.yellowBright(currentUserAmount)}`);
    }
    else if (operationAnswers.depositCash) {
        console.log(`${chalk.redBright(`Previous Balance`)} = ${chalk.yellowBright(currentUserAmount)}`);
        currentUserAmount = currentUserAmount + parseFloat(operationAnswers.depositCash);
        amounts[userIndex] = currentUserAmount;
        console.log(`${chalk.greenBright(`New Balance`)} = ${chalk.yellowBright(currentUserAmount)}`);
    }
    else if (operationAnswers.withDrawAmount) {
        console.log(`${chalk.redBright(`Previous Balance`)} = ${chalk.yellowBright(currentUserAmount)}`);
        let enteredAmount = parseFloat(operationAnswers.withDrawAmount);
        newAmount = currentUserAmount - enteredAmount;
        if (newAmount < 0) {
            console.log(chalk.redBright("Transaction Invalid !!!\nWithdraw Amount cant Exceed from Available Balance"));
        }
        else {
            amounts[userIndex] = newAmount;
            console.log(`${chalk.greenBright(`New Balance`)} = ${chalk.yellowBright(newAmount)}`);
        }
    }
}
// validate number
function numberValidation(amount) {
    if (amount) {
        if (isNaN(parseFloat(amount))) {
            return "Enter Amount in Digits";
        }
        else {
            return true;
        }
    }
    else {
        return "Enter some Value";
    }
}
// validate user ID
function validUser(inUser) {
    if (inUser) {
        if (usernames.includes(inUser)) {
            // console.log("Congratulations")
            return true;
        }
        else {
            return "Username in not valid";
        }
    }
    else {
        return "Enter your User ID";
    }
}
// validate password w.r.t user ID
function validPassword(inPass, answers) {
    if (inPass) {
        if (inPass === passwords[usernames.indexOf(answers.username)]) {
            // if(inPass === "rizi"){
            // return authenticate[0].name
            return true;
        }
        else {
            return "Password in Invalid";
        }
    }
    else {
        return "Enter Your Password";
    }
}
// welcome function 
async function welcome(input) {
    let msg = chalkAnimation.rainbow(input);
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            msg.stop();
            resolve();
        }, 1000);
    });
}
// start of ATM
async function main() {
    const authnAnswers = await inquirer.prompt(authenticate);
    await welcome(welcome_msg);
    do {
        const operationAnswers = await inquirer.prompt(selectOperation);
        await transOperations(authnAnswers, operationAnswers);
        var agask = await inquirer.prompt(again);
    } while (agask === "Y" || agask.ask === "y");
}
main();
