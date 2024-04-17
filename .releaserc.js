/** @type import("semantic-release").GlobalConfig */
const config = {
  release: {
    branches: ["main"],
  },
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
};

module.exports = config;
