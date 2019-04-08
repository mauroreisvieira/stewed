#!/usr/bin/env node

const utils = require("./utils");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
  utils.log('Welcome to Stewed CLI');
};

const askQuestions = () => {
  const questions = [
  {
    name: "FILENAME",
    type: "input",
    message: "What is the name of the file without extension?"
  },
  {
    type: "list",
    name: "EXTENSION",
    message: "What is the file extension?",
    choices: [".rb", ".js", ".php", ".css"],
    filter: function(val) {
      return val.split(".")[1];
    }
  }
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath);
  return filePath;
};

const run = async () => {
  // show script introduction
  init();

  // ask questions
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  // create the file
  const filePath = createFile(FILENAME, EXTENSION);

  // show success message
  utils.success(`Done! File created at ${filePath}`);
};


export default function main() {
  run();
}
