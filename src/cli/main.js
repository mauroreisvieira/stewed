#!/usr/bin/env node

const inquirer = require('inquirer');
const utils = require('./utils');
const commands = require('./commands');

const init = async () => {
    utils.header();

    // ask questions
    // const answers = await askQuestions();
    // const { FILENAME, EXTENSION } = answers;

    // create the file
    const filePath = commands.default.build.run('stewed.config.js', 'dist/');
    // const filePath = utils.createFile(FILENAME, EXTENSION);

    // show success message
    // utils.success(`Done! File created at ${filePath}`);
};

export default function run(cliArgs) {
    return new Promise((resolve, reject) => {
        commands.default.build.run('stewed.config.js', 'dist/');
    });
}
