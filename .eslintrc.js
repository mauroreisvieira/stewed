/** @type import("eslint").Linter.Config */
module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint",
    "eslint-comments",
    "prettier",
    "react",
    "react-hooks",
    "jsx-a11y",
  ],
  extends: [
    "eslint:recommended",
    "plugin:eslint-comments/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": "error",
    "react/jsx-key": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-indent-props": ["error", 2],
    "react/self-closing-comp": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
  ignorePatterns: ["dist"],
};
