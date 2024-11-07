const { getEslintConfig } = require("@harmonix-hub/eslint");

const { rules, ...eslintConfig } = getEslintConfig({ useReact: true });

/** @type import("eslint").Linter.Config */
module.exports = {
  ...eslintConfig,
  rules: {
    ...rules,
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
  },

  ignorePatterns: ["dist", "coverage"],
};
