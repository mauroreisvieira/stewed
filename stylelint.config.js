const hxh = require("@harmonix-hub/stylelint");

const { stylelintConfig } = hxh;

const {
  extends: baseExtends = [],
  plugins: basePlugins = [],
  rules: baseRules = {},
  ...rest
} = stylelintConfig;

module.exports = {
  ...rest,
  extends: baseExtends.filter(
    (e) => !e.includes("prettier")
  ),
  plugins: basePlugins.filter(
    (p) => !p.includes("prettier")
  ),
  rules: {
    ...Object.fromEntries(
      Object.entries(baseRules).filter(
        ([rule]) => !rule.startsWith("prettier")
      )
    ),
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
