#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation"
import inquirer from "inquirer";
import axios from "axios";  //module for parsing and getting data by http request
import { error } from "console";

var currency_list:any;
var rates:any;
var to_currency:any;
var from_currency:any;
var amount:any;

let welcome_msg = "\n<== Currency Converter ==>\n"
let closing_msg = "\n\t<== Ends ==>"

async function welcome(param:any) {
    let msg = chalkAnimation.rainbow(param)
    let promise = await new Promise<void>((resolve, reject) => {
        setTimeout(()=>{
            msg.stop()
            resolve()
        },1000)
    })
};

async function questions(){
    var answers = await inquirer.prompt([
        {
            name:"to_currency",
            type:"list",
            choices:currency_list,
            message:"Select Target Currency:"
        },
        {
            name:"from_currency",
            type:"list",
            choices:currency_list,
            message:"Select Source Currency:"
        },
        {
            name:"amount",
            type:"input",
            message:"Enter Amount:",
            validate:valid
        }
    ])
    // console.log(answers.amount)
    to_currency = answers.to_currency
    from_currency = answers.from_currency
    amount = answers.amount
}

async function valid(input:number){
    if(input){
        if(isNaN(input)){
            return "Enter Valid Number"
        }else{
            return true
        }
    }else{
        return "Enter Some Amount"
    }
}



async function data_request() {
    return new Promise<void>((resolve, reject) => {
        axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=c75dc37788c24102253179cdfbd58654`)
        .then(response=>{
            currency_list = Object.keys(response.data.rates)
            rates = response.data.rates

            resolve()
        })
        .catch(error=>{
            console.log("Error! Server Not Responding")
        })

    })
    
}
async function operation() {
    let to_currencyValue = rates[to_currency]
    let from_currencyValue = rates[from_currency]

    let calculate = (to_currencyValue/from_currencyValue)*amount
    console.log(`\n${chalk.yellowBright(amount)} ${chalk.greenBright(from_currency)} = ${chalk.yellowBright(calculate.toPrecision(5))} ${chalk.greenBright(to_currency)}`)
}

async function main() {
    await data_request()
    do{
        await welcome(welcome_msg)
        await questions()
        await operation()
        await welcome(closing_msg)

        var again_ask = await inquirer.prompt([{
            type: "input",
            name: "ask",
            message: "Do you want to attempt again (Y|N) ?"     
        }])

    }while(again_ask.ask == "Y" || again_ask.ask == "y")

    
}

main()