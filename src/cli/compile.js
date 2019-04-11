import path from 'path';

import * as utils from './utils';
import defaultOptions from './../defaultConfig';

/**
 * Compiles CSS file.
 *
 * @param {CompileOptions} options
 * @return {Promise}
 */
export default function compile(options = {}) {
    console.log(options);
    //const filename = options.outputFile;
    const config = require(`${process.cwd()}/${options.inputFile}`);
    let loadPkg = [];

    if (config.packages[0] === '*') {
        loadPkg = defaultOptions.packages;
    } else if (config.packages.length > 0) {
        loadPkg = config.packages;
    }

    options = {
        breakpoints: Object.assign(
            defaultOptions.breakpoints,
            config.breakpoints
        ),
        colors: Object.assign(defaultOptions.colors, config.colors),
        tones: Object.assign(defaultOptions.tones, config.tones),
        textSizes: Object.assign(defaultOptions.textSizes, config.textSizes),
        textWeight: Object.assign(defaultOptions.textWeight, config.textWeight),
        packages: loadPkg,
    };

    return new Promise((resolve, reject) => {
        const filePath = utils.createFile('test', 'js');
        utils.writeFile(filePath, JSON.stringify(options, null, 4));
    });
}
