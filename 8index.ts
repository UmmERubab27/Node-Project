#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


async function playGame() {

    const enemies: string[] = ['Skeleton', 'Zombie', 'Warrior', 'Assassin'];
    const maxxEnemyHealth: number = 75;
    const enemyAttackDamage: number = 25;

    let randomEnemyHealth: number = Math.floor((Math.random() * maxxEnemyHealth)) + 1;
    let randomEnemyAttack: number = Math.floor((Math.random() * enemies.length));
    let enemy = enemies[randomEnemyAttack];


    let playerHealth: number = 100;
    const attackDamage: number = 50;
    let numHealthPotions: number = 3;

    const healthPotionHealAmount: number = 30;
    const healthPotionDropChance: number = 50;
    let randomNumber: number = Math.floor(Math.random() * 100) + 1;

    let running: boolean = true;

    console.log(chalk.green(`Welcome to the Adventure Game`))

    while (running) {

        console.log(chalk.magenta(`----------------------------`));
        console.log(chalk.magenta(`${enemy} has Appeared`));

        while (randomEnemyHealth > 0) {

            console.log(chalk.green(`
                Your Hp: ${playerHealth} \n
                ${enemy}'s Hp: ${randomEnemyHealth} \n
            `))

            let operation = await inquirer.prompt([
                {
                    type: "list",
                    name: "do",
                    message: chalk.green("What would you Like to Do ?"),
                    choices: ['Attack', 'Drink Health Potions', 'Run']
                },
            ]);


            if (operation.do == "Attack") {
                let damageAttack = Math.floor((Math.random() * attackDamage));
                let damageTaken = Math.floor((Math.random() * enemyAttackDamage));
                randomEnemyHealth -= damageAttack;
                playerHealth -= damageTaken;


                console.log(chalk.yellow(`You attack the ${enemy} for  ${damageAttack} damage`))
                console.log(chalk.yellow(`You received ${damageTaken} in retailiation`))

                if (playerHealth < 1) {
                    console.log(chalk.green(`You have taken too much damage you are too weak to fight`))
                    break;
                }

            }
            else if (operation.do === "Drink Health Potions") {
                if (numHealthPotions > 0) {
                    playerHealth += healthPotionHealAmount;
                    numHealthPotions--;
                    console.log(chalk.green(`
                        You drink a health potion \n
                        Your current health is ${playerHealth} \n
                        You have ${numHealthPotions} potion left. 
                    `))
                } else {
                    console.log(chalk.red(`You dont have any health potion left`))
                }

            }
            else if (operation.do === "Run") {
                console.log(chalk.red(`You have run away from ${enemy}`))
                continue;
            }
            else {
                console.log(chalk.red(`You have Write invalid command`))
            }

        }

        if (playerHealth < 1) {
            console.log(chalk.green(`You have taken too much damage you are too weak to fight`));
            break;
        }

        console.log(chalk.magenta(`
                --------Congratulations----------- \n
                ---------------------------------- \n
                Your ${enemy} was Defeated 
                Your Hp is  ${playerHealth} \n
        `)
        )

        if (randomNumber < healthPotionDropChance) {
            numHealthPotions++;
            console.log(chalk.green(`the  ${enemy} droped a ${healthPotionDropChance} health potion`));
            console.log(chalk.green(`You now have ${numHealthPotions} health potion left `));
        }

        break;
    }

}

async function AskQuestions() {
    let again;
    do {
        await playGame();
        again = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: chalk.green("What would you Like to Do Now?"),
                choices: ['Continue Fighting', 'Exit the Game']
            }
        ]);

        if (again.action === "Exit the Game") {
            console.log(chalk.red(`You are now exit the game`))
            console.log(chalk.green("Thanks for playing"))
            console.log(chalk.green("Game is developed by Rubab Nasir"))
            break;
        }
        
    } while (again.action === 'Continue Fighting');
}

AskQuestions();