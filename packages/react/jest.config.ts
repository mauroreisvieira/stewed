import { jestConfig } from "@harmonix-hub/testing";

module.exports = {
  ...jestConfig,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  }
};
