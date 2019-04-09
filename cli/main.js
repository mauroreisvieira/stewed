#!/usr/bin/env node

const inquirer = require("inquirer");

const utils = require("./util/utils");
const commands = require("./commands");

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

const init = async () => {
  utils.header();

  // ask questions
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  // create the file
  const filePath = utils.createFile(FILENAME, EXTENSION);

  // show success message
  utils.success(`Done! File created at ${filePath}`);
};


export default function main(cliArgs) {
  init();
}

