import { jestConfig } from "@harmonix-hub/testing";

module.exports = {
  ...jestConfig(),
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@hello-week/(utilities|hooks)$": "<rootDir>/__mocks__/hello-week.js",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  }
};
