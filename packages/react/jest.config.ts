import { Jest } from "@harmonix-hub/testing";

module.exports = {
  ...Jest.jestConfig(),
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
};
