#!usr/bin/env node
import inquirer from "inquirer";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
    ;
}
;
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
    ;
}
;
const persons = new Person();
const ProgramStart = async (persons) => {
    do {
        console.log("Welcome Guest");
        const ans = await inquirer.prompt({
            type: "list",
            message: "Who Would You Like To talk To?",
            name: "select",
            choices: ["self", "Student"],
        });
        if (ans.select == "self") {
            console.log("Hello I'm Talking To My Self");
            console.log("& I'm Fine Very Well Today");
        }
        ;
        if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                type: "input",
                message: "",
                name: "student",
            });
            const student = persons.students.find(value => value.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(`Hello i am ${name.name}, and i am fine`);
                console.log(persons.students);
            }
            ;
            if (student) {
                console.log(`Hello i am ${student.name}, and i am fine..........`);
                console.log(persons.students);
            }
            ;
        }
        ;
    } while (true);
};
ProgramStart(persons);
