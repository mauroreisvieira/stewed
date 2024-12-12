const { styleLintConfig } = require("@harmonix-hub/stylelint");

const { rules, ...rest } = styleLintConfig;

module.exports = {
  ...rest,
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
