#!/usr/bin/env node
import inquirer from 'inquirer';
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswerIndex: 0,
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswerIndex: 1,
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswerIndex: 2,
    },
];
const main = async () => {
    console.log("Welcome to the Quiz!\n");
    let correctAnswers = 0;
    for (const [index, question] of questions.entries()) {
        const answer = await promptQuestion(index + 1, question);
        if (answer === question.correctAnswerIndex) {
            correctAnswers++;
        }
    }
    const quizResult = {
        totalQuestions: questions.length,
        correctAnswers: correctAnswers,
    };
    showResult(quizResult);
};
const promptQuestion = async (questionNumber, question) => {
    const questionPrompt = `${questionNumber}. ${question.question}`;
    const options = question.options;
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'answer',
            message: questionPrompt,
            choices: options,
        },
    ]);
    return options.indexOf(answer.answer);
};
const showResult = (quizResult) => {
    console.log("\nQuiz Result:");
    console.log(`Total Questions: ${quizResult.totalQuestions}`);
    console.log(`Correct Answers: ${quizResult.correctAnswers}`);
    console.log(`Incorrect Answers: ${quizResult.totalQuestions - quizResult.correctAnswers}`);
    console.log(`Percentage: ${(quizResult.correctAnswers / quizResult.totalQuestions) * 100}%`);
};
main();
