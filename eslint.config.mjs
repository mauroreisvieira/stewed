import hxh from "@harmonix-hub/eslint";
import storybook from "eslint-plugin-storybook";
import prettierConfig from "eslint-plugin-prettier/recommended";
import reactCompilerPlugin from "eslint-plugin-react-compiler";
import checkFile from "eslint-plugin-check-file";

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
      "react-compiler/react-compiler": "error",
      "jsdoc/require-jsdoc": "warn"
    }
  },
  {
    files: ["**/*.stories.tsx", "**/*.test.ts", "src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "jsdoc/require-jsdoc": "off"
    }
  },
  {
    files: ["packages/**/*"],
    plugins: {
      "check-file": checkFile
    },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts}": "KEBAB_CASE",
          "**/*.{tsx}": "PASCAL_CASE"
        }
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "packages/**/": "KEBAB_CASE"
        }
      ],
      "check-file/folder-match-with-fex": [
        "error",
        {
          "*.test.{js,jsx,ts,tsx}": "**/__tests__/unit/"
        }
      ]
    }
  }
];
