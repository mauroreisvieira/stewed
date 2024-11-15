const { getEslintConfig } = require("@harmonix-hub/eslint");

const { rules, ...eslintConfig } = getEslintConfig({ useReact: true });

/** @type import("eslint").Linter.Config */
module.exports = {
  ...eslintConfig,
  plugins: ["eslint-plugin-react-compiler", ...eslintConfig.plugins],
  rules: {
    ...rules,
    "jsx-a11y/no-noninteractive-element-interactions": "warn",
    "react-compiler/react-compiler": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["dist", "coverage"],
};
