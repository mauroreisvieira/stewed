import chalk from 'chalk'
import { ensureFileSync, existsSync, outputFileSync, readFileSync } from 'fs-extra'
import * as emoji from './emoji'


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
  footer()
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
