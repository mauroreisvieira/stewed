const { getStyleLintConfig } = require("@harmonix-hub/stylelint");

const baseConfig = getStyleLintConfig();

/** @type {import("stylelint").Config} */
module.exports = {
  /**
   * Use main configuration from shared infrastructure
   */
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    "plugin/no-unsupported-browser-features": [
      true,
      {
        severity: "warning",
        browsers: [
          "Firefox ESR",
          "not dead",
          "not iOS < 10",
          "not Chrome < 70",
          "not Explorer <= 11",
          "not ExplorerMobile <= 11",
          "not OperaMobile <= 50",
          "not KaiOS <= 100",
          "not Baidu <= 100",
          "not QQAndroid <= 100",
        ],
        ignore: ["css-nesting", "css-when-else"],
      },
    ],
  },
};
