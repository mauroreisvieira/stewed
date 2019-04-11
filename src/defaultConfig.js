import colors from './plugins/colors';
import fonts from './plugins/fonts';
import textSizes from './plugins/textSizes';
import textWeight from './plugins/textWeight';
import spaces from './plugins/spaces';
import radius from './plugins/radius';
import breakpoints from './plugins/breakpoints';

export default {
    theme: {
        colors: colors,
        fonts: fonts,
        textSizes: textSizes,
        textWeight: textWeight,
        spaces: spaces,
        radius: radius,
        breakpoints: breakpoints,
    },
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
