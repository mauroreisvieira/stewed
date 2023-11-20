const { getEslintConfig } = require("@harmonix-hub/eslint");

const baseConfig = getEslintConfig();

/** @type import("eslint").Linter.Config */
module.exports = {
  ...baseConfig,

  parserOptions: {
    ...baseConfig.parserOptions,
  },
  extends: ["plugin:storybook/recommended", "plugin:storybook/recommended"]
};
