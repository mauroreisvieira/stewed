import * as utils from './utils'

/**
 * Compiler options
 *
 * @typedef {Object} CompileOptions
 * @property {string} inputFile
 * @property {string} outputFile
 * @property {array} plugins
 */

const defaultOptions = {
  inputFile: null,
  outputFile: null,
  plugins: [],
}

/**
 * Compiles CSS file.
 *
 * @param {CompileOptions} options
 * @return {Promise}
 */
export default function compile(options = {}) {
  // const config = { ...defaultOptions, ...options };

  // return new Promise((resolve, reject) => {
  //   utils.log(resolve);
  // })
}
