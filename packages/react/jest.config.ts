import { jestConfig } from "@harmonix-hub/testing";

module.exports = {
  ...jestConfig(),
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  }
};
