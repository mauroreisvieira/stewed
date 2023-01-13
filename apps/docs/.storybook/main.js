const path = require('path');

module.exports = {
    stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.tsx'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/preset-scss',
            options: {
                cssLoaderOptions: {
                    modules: true,
                },
            },
        },
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};
