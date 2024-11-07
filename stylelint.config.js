const { getStyleLintConfig } = require("@harmonix-hub/stylelint");

const { rules, ...styleLintConfig } = getStyleLintConfig();

module.exports = {
  ...styleLintConfig,
  rules: {
    ...rules,
    "plugin/no-unsupported-browser-features": [
      true,
      {
        browsers: ["last 5 Chrome versions"],
        ignorePartialSupport: true,
        severity: "warning",
      },
    ],
  },
};
