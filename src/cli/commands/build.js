import bytes from 'bytes'
import chalk from 'chalk'
import prettyHrtime from 'pretty-hrtime'

import * as emoji from '../emoji'
import * as utils from '../utils'
import commands from '.'
import compile from '../compile'

export const usage = 'build <file> [options]'
export const description = 'Compiles Stewed CSS file.'

export const options = [
  {
    usage: '-o, --output <file>',
    description: 'Output file.',
  },
  {
    usage: '-c, --config <file>',
    description: 'Stewed config file.',
  }
]

export const optionMap = {
  output: ['output', 'o'],
  config: ['config', 'c']
}

function stopWithHelp(...msgs) {
  utils.header()
  utils.error(...msgs)
  commands.help.forCommand(commands.build)
  utils.die()
}

/**
 * Compiles CSS file and writes it to a file.
 *
 * @param {CompileOptions} compileOptions
 * @param {int[]} startTime
 * @return {Promise}
 */
function buildToFile(compileOptions, startTime) {
  utils.header()
  utils.log()
  utils.log(emoji.go, 'Building...', chalk.bold.cyan(compileOptions.inputFile))

  return compile(compileOptions).then(result => {
    utils.writeFile(compileOptions.outputFile, result.css)

    const prettyTime = prettyHrtime(process.hrtime(startTime))

    utils.log()
    utils.log(emoji.yes, 'Finished in', chalk.bold.magenta(prettyTime))
    utils.log(emoji.pack, 'Size:', chalk.bold.magenta(bytes(result.css.length)))
    utils.log(emoji.disk, 'Saved to', chalk.bold.cyan(compileOptions.outputFile))
    utils.log()
  })
}

/**
 * Runs the command.
 *
 * @param {string[]} cliParams
 * @param {object} cliOptions
 * @return {Promise}
 */
export function run(cliParams, cliOptions) {
  return new Promise((resolve, reject) => {
    const startTime = process.hrtime()
    const inputFile = cliParams[0];
    const outputFile = cliOptions.output && cliOptions.output[0];

    !inputFile && stopWithHelp('CSS file is required.');

    const compileOptions = {inputFile, outputFile}
    const buildPromise = buildToFile(compileOptions, startTime);
    buildPromise.then(resolve).catch(reject)
  })
}
