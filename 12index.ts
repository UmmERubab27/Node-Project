#!/usr/bin/env node

// import promptSync from "prompt-sync"

// const prompt = promptSync();

// import inquirer from 'inquirer';


// let name: string;

// let personality: string; //introvert or extrovert

// let questions = [
//     {
//         type: `input`,
//         name: `name`,
//         message: `What Is Your Name?`,
//         validate: (answer: string) => {
//             if (answer === "") {
//                 return "Please Enter Your Name"
//             }; 
//             return true
//         },
//     },
//     {
//         type: `list`,
//         name: `personality`,
//         message: `Are You An Introvert or Extrovert?`,
//         choices: [
//             `Introvert`,
//             `Extrovert`]
//     },
// ];

// inquirer.prompt(questions).then((answers) => {
//     name = answers.name;
//     if (answers.personality === `introvert`) {
//         personality = `Introvert`;
//     } else if(answers.personality === "Extrovert") {
//         personality = "Extrovert"
//     }
//     console.log(`Your name is ${name} and your personality type is ${personality}`)
// });
    




import inquirer from "inquirer";
import chalk from "chalk";
import chalkanimation from "chalk-animation"

console.clear()

const sleep = () => {
    return new Promise((res) => {
       setTimeout(res, 3000) 
    })
}

async function welcome() {
    let rainbowTitle = chalkanimation.glitch('=========>>>Welcome to KAZIM-BANK<<<=========')

    await sleep();
    rainbowTitle.stop();
}

await welcome();

interface BankAccount {
    AccNo: number;
    AccHolderName: string;
    Balance: number;
    BalanceCheck: () => void;
    Deposit: (amount: number) => void;
    Withdraw: (amount: number) => void;
}

class Transaction implements BankAccount {
    AccNo: number;
    AccHolderName: string;
    Balance: number;
    constructor(accno: number, name: string, bal: number) {
        this.AccNo = accno;
        this.AccHolderName = name;
        this.Balance = bal;
    }
    BalanceCheck(): void {
        console.log('--------------------------COUNTER BALANCE CHECK--------------------------');
        if(this.Balance < 0){
            console.log('Insufficient Balance Please Deposit');
        }
     else {
        console.log(chalk.bgRed.bold('Your Account Balance is: ' + this.Balance));
    }
}
    Deposit(amount: number): void{
        console.log('--------------------------COUNTER CASH DEPOSIT--------------------------');
        this.Balance += amount
        console.log('Amount of ' + amount +" "+ 'Deposit Successfully');
        console.log(chalk.bgBlue.bold('Your Current Balance is: ' + this.Balance));   
    }
    Withdraw(amount: number): void{
        console.log('--------------------------COUNTER CASH WITHDRAW--------------------------');
        if(amount > this.Balance){
            console.log(chalk.bgRed.bold('Not Enough Balance'));            
        }
     else {
        this.Balance -= amount;
        console.log('Amount of ' + amount + ' Withdrawn Successfully');
        console.log(chalk.bgYellow.bold('Your Current Balance is: ' + this.Balance));
    }
}
}
    let user1 = new Transaction(786, "Vj Kazim", 0)
    user1.BalanceCheck();


    
    user1.Deposit(100000)
    user1.Withdraw(50000)
    user1.BalanceCheck()
