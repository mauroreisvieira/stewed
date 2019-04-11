import scss from 'rollup-plugin-scss';

import rimraf from 'rimraf';
import serve from 'rollup-plugin-serve';

rimraf.sync('dist');

export default {
    input: 'src/stewed.js',
    output: {
        file: 'dist/scripts/stewed.js',
        format: 'iife'
    },
    watch: {
        exclude: ['node_modules']
    },
    plugins: [
        scss({
            output: 'dist/stewed.css',
        }),
        serve('./')
    ]
};
