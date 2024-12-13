const hxh = require("@harmonix-hub/stylelint");

const { stylelintConfig } = hxh;

/** @type import("stylelint").stylelint.Config */
module.exports = {
  ...stylelintConfig,
  rules: {
    ...stylelintConfig.rules,
    "plugin/no-unsupported-browser-features": [
      true,
      {
        browsers: ["last 5 Chrome versions"],
        ignorePartialSupport: true,
        severity: "warning"
      }
    ]
  }
};
