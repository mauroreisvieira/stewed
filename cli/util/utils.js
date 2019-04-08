import chalk from 'chalk'
import shell from "shelljs";
import * as emoji from './emoji'
import { ensureFileSync, existsSync, outputFileSync, readFileSync } from 'fs-extra'

/**
 * Gets CLI parameters.
 *
 * @param {string[]} cliArgs
 * @return {string[]}
 */
export function parseCliParams(cliArgs) {
  console.log('cliArgs', cliArgs);
  const firstOptionIndex = cliArgs.findIndex(cliArg => cliArg.startsWith('-'))
  console.log('firstOptionIndex', firstOptionIndex);
  console.log('cliArgs.slice(0, firstOptionIndex)', cliArgs.slice(0, firstOptionIndex));

  return firstOptionIndex > -1 ? cliArgs.slice(0, firstOptionIndex) : cliArgs
}

/**
 * Prints messages to console.
 *
 * @param {...string} [msgs]
 */
export function log(...msgs) {
  console.log('  ', ...msgs)
}

/**
 * Prints error messages to console.
 *
 * @param {...string} [msgs]
 */
export function error(...msgs) {
  log()
  console.error('  ', emoji.no, chalk.bold.red(msgs.join(' ')));
}


export function success(...msgs) {
  log()
  console.log('  ', emoji.yes, chalk.bold.green(msgs.join(' ')));
}

/**
 * Kills the process. Optionally prints error messages to console.
 *
 * @param {...string} [msgs]
 */
export function die(...msgs) {
  msgs.length && error(...msgs)
  process.exit(1) // eslint-disable-line
}

/**
 * Checks if path exists.
 *
 * @param {string} path
 * @return {boolean}
 */
export function exists(path) {
  return existsSync(path)
}

/**
 * Gets file content.
 *
 * @param {string} path
 * @return {string}
 */
export function readFile(path) {
  return readFileSync(path, 'utf-8')
}

/**
 * Writes content to file.
 *
 * @param {string} path
 * @param {string} content
 * @return {string}
 */
export function writeFile(path, content) {
  ensureFileSync(path)

  return outputFileSync(path, content)
}


/**
 * Creates a file.
 *
 * @param      {string}  filename   The filename
 * @param      {string}  extension  The extension
 * @return     {string}
 */
export function createFile(filename, extension) {
  const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath);

  return filePath;
};
