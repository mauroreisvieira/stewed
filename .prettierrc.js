const { getPrettierConfig } = require("@harmonix-hub/prettier");

 /** @type {import("prettier").Config} */
module.exports = {
  ...getPrettierConfig(),
};
