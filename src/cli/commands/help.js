import chalk from 'chalk';
import { forEach, map, padEnd } from 'lodash';

import commands from '.';
import * as constants from '../constants';
import * as utils from '../utils';

export const usage = 'help [command]';
export const description = 'More information about the command.';

const PADDING_SIZE = 3;

/**
 * Prints general help.
 */
export function forApp() {
    const pad = Math.max(...map(commands, 'usage.length')) + PADDING_SIZE;

    utils.log();
    utils.log('Usage:');
    utils.log('  ', chalk.bold(constants.cli + ' <command> [options]'));
    utils.log();
    utils.log('Commands:');
    forEach(commands, command => {
        utils.log(
            '  ',
            chalk.bold(padEnd(command.usage, pad)),
            command.description
        );
    });
}

/**
 * Prints help for a command.
 *
 * @param {object} command
 */
export function forCommand(command) {
    utils.log();
    utils.log('Usage:');
    utils.log('  ', chalk.bold(constants.cli, command.usage));
    utils.log();
    utils.log('Description:');
    utils.log('  ', chalk.bold(command.description));

    if (command.options) {
        const pad =
            Math.max(...map(command.options, 'usage.length')) + PADDING_SIZE;

        utils.log();
        utils.log('Options:');
        forEach(command.options, option => {
            utils.log(
                '  ',
                chalk.bold(padEnd(option.usage, pad)),
                option.description
            );
        });
    }
}

/**
 * Prints invalid command error and general help. Kills the process.
 *
 * @param {string} commandName
 */
export function invalidCommand(commandName) {
    utils.error('Invalid command:', chalk.bold.magenta(commandName));
    forApp();
    utils.die();
}

/**
 * Runs the command.
 *
 * @param {string[]} cliParams
 * @return {Promise}
 */
export function run(cliParams) {
    utils.log('RUN');
    return new Promise(resolve => {
        utils.log();

        const commandName = cliParams[0];
        const command = commands[commandName];

        !commandName && forApp();
        commandName && command && forCommand(command);
        commandName && !command && invalidCommand(commandName);

        utils.log();

        resolve();
    });
}
