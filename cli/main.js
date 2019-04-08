#!/usr/bin/env node

const utils = require("./util/utils");
const commands = require("./commands");
const inquirer = require("inquirer");


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
  utils.log('Welcome to Stewed CLI');

  // ask questions
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  // create the file
  const filePath = utils.createFile(FILENAME, EXTENSION);

  // show success message
  utils.success(`Done! File created at ${filePath}`);
};


export default function main(cliArgs) {
  return new Promise((resolve, reject) => {
    console.log('MAIN');
    const params = utils.parseCliParams(cliArgs);
    console.log('params', params);
    const command = commands[params[0]];
    console.log('command', command);
    const options = command ? utils.parseCliOptions(cliArgs, command.optionMap) : {};
    const commandPromise = command ? command.run(params.slice(1), options) : commands.help.run(params);

    commandPromise.then(resolve).catch(reject);
  })
}

