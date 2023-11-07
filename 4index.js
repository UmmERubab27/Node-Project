#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
//welcome code
let welcome_msg = "\n<== To-Do List ==>\n";
let closing_msg = "\n<== Program Ends ==>";
async function welcome(param) {
    let msg = chalkAnimation.rainbow(param);
    let promise = await new Promise((resolve, reject) => {
        setTimeout(() => {
            msg.stop();
            resolve();
        }, 1000);
    });
}
async function initialization() {
    let answer = await inquirer.prompt([
        {
            name: "command",
            type: "list",
            message: chalk.yellow("Please Choose An Operation from list:"),
            choices: ["Add Task", "Task List", "Complete Task", "Quit"],
        }
    ]);
    switch (answer.command) {
        case "Add Task":
            await addTask();
            break;
        case "Tasks List":
            await tasksList();
            break;
        case "Complete Task":
            await completeTask();
        // break
        case "Quit":
            await welcome(closing_msg);
            process.exit();
    }
}
let task_list = [];
//add a task
async function addTask() {
    do {
        var tasks = await inquirer.prompt([
            {
                name: "task",
                type: "input",
                message: "Add Task Name:",
                choices: ["Add Task", "Tasks List", "Complete Task"]
            }
        ]);
        if (tasks.task) {
            task_list.push(tasks.task);
            //ask again to add a task
            var tasks_again = await inquirer.prompt([
                {
                    name: "task_again",
                    type: "list",
                    message: chalk.yellow("Do you want to add another Task ?"),
                    choices: ["Yes", "No"]
                }
            ]);
            if (tasks_again.task_again == "No") {
                await initialization();
            }
        }
        else {
            console.log(chalk.redBright(`Enter Some Task`));
        }
    } while (tasks.task == "" || tasks_again.task_again == "Yes");
    // console.log(task_list)
    return task_list;
}
// display tasks list
async function tasksList() {
    if (task_list.length > 0) {
        task_list.map((value, index) => {
            console.log(`${chalk.greenBright(`Task ${index + 1}`)} = ${chalk.greenBright(`${value}`)}`);
        });
    }
    else {
        console.log(chalk.redBright(`No Task Found\nAdd Some Task First`));
    }
    await initialization();
}
// Mark a task complete in list
async function completeTask() {
    do {
        if (task_list.length > 0) {
            let ans_del = await inquirer.prompt([
                {
                    name: "deleteIndex",
                    type: "list",
                    message: chalk.yellow("Choose a Task to Mark it Complete:"),
                    choices: task_list
                }
            ]);
            task_list.splice(task_list.indexOf(ans_del.deleteIndex), 1);
            console.log(chalk.cyanBright("\t*Task Completed Successfully*"));
            var again_ask = await inquirer.prompt([{
                    type: "list",
                    name: "ask",
                    message: chalk.yellow("Do you want to Mark Complete Another Task?"),
                    choices: ["Yes", "No"]
                }]);
            if (again_ask.ask == "No") {
                await initialization();
            }
        }
        else {
            console.log(chalk.redBright(`No Task Found\nAdd Some Task First`));
            await initialization();
        }
    } while (again_ask.ask == "Yes");
}
//welcome
await welcome(welcome_msg);
//code initialization
initialization();
