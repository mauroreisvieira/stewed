module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint',
        'react-hooks',
        'prettier',
    ],
    rules: {
        /**
         * React ================================================================================
         */
        'react/jsx-key': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/jsx-first-prop-new-line': ['error', 'multiline'],
        'react/jsx-max-props-per-line': [
            'error',
            { maximum: 'error', when: 'multiline' },
        ],
        'react/jsx-indent-props': ['error', 2],
        'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        'react/self-closing-comp': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
    },
};
