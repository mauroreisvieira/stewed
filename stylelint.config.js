const { getStyleLintConfig } = require("@harmonix-hub/stylelint");

const baseConfig = getStyleLintConfig();

/** @type {import("stylelint").Config} */
module.exports = {
  /**
   * Use main configuration from shared infrastructure
   */
  ...baseConfig,
};
