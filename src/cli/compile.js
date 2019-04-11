import * as utils from './utils';

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
};

/**
 * Compiles CSS file.
 *
 * @param {CompileOptions} options
 * @return {Promise}
 */
export default function compile(options = {}) {
    const config = Object.assign(defaultOptions, options);
    console.log(config);
    const css = utils.readFile(config.inputFile);

    return new Promise((resolve, reject) => {
        utils.log(resolve);
    });
}
