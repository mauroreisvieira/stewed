import breakpoints from './plugins/breakpoints';
import colors from './plugins/colors';
import tones from './plugins/tones';
// import fonts from './plugins/fonts';
// import radius from './plugins/radius';
// import spaces from './plugins/spaces';
import textSizes from './plugins/textSizes';
import textWeight from './plugins/textWeight';

console.log('breakpoints', breakpoints);

export default {
    breakpoints: breakpoints,
    colors: colors,
    tones: tones,
    textSizes: textSizes,
    textWeight: textWeight,
    packages: [
        'typography',
        'alert',
        'badge',
        'breadcrumb',
        'button',
        'card',
        'checkbox',
        'form-field',
        'grid',
        'menu',
        'progress',
        'radio',
        'select',
        'switch',
        'table',
        'tag',
        'textfield',
        'tooltip',
    ],
};
