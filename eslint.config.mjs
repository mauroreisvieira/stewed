import hxh from "@harmonix-hub/eslint";
import storybook from "eslint-plugin-storybook";
import prettierConfig from "eslint-plugin-prettier/recommended";
import reactCompilerPlugin from "eslint-plugin-react-compiler";

/** @type import("eslint").Linter.Config */
export default [
  {
    ignores: ["dist", "node_modules", "**/*.d.ts", "**/*.js"]
  },
  {
    files: ["*.ts", "*.tsx"]
  },
  ...hxh.tsConfigs,
  hxh.reactConfigs,
  hxh.jestConfigs,
  prettierConfig,
  ...storybook.configs["flat/recommended"],
  {
    plugins: {
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "react-compiler": reactCompilerPlugin
    },
    rules: {
      "react-compiler/react-compiler": "error"
    }
  }
];
