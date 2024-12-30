/**
 * Represents the expected types of commits in a version control system.
 * @enum {string}
 */
const commitType = {
    /**
     * A commit of feat means you've added or removed src code, but since you started with 100% coverage,
     * something is either not covered by tests or tests broke.
     */
    feat: "feat",

    /**
     * A commit of fix means that if you were to add a new test reproducing a bug, it would not pass.
     * In this case, the commit will make that test pass.
     */
    fix: "fix",

    /**
     * A commit of test means changes in test files. If you weren't at 100% code coverage, now you would be.
     * If you had failing tests, they would be passing.
     */
    test: "test",

    /**
     * A commit of build means changes related to the build of the project and dependencies.
     * (Basically, anything that can change the build step of the application.)
     */
    build: "build",

    /** A commit of refactor means that you changed src code but unlike feat no tests broke and no lines lost coverage. */
    refactor: "refactor",

    /** A commit of perf, like refactor means changed src code, but in this case performance metrics go up. */
    perf: "perf",

    /**
     * A commit of docs usually means a change in markdown files.
     * I also add as docs changes, comments in src code when only comments are changed.
     */
    docs: "docs",

    /** A commit of ci means changes related to Continuous Integration (usually yml and other configuration files). */
    ci: "ci",

    /**
     * A commit of chore is most likely something that doesn't fit the other possible types.
     * It shouldn't change any src, test, build, or docs related files.
     */
    chore: "chore",

    /**
     * A commit of style, like refactor means changed src code, but instead of actual code changes,
     * only formatting and whitespace are changed. In other words, anything a code formatter or linter changes.
     */
    style: "style",

    /**
     * A commit of revert simply reverts changes made in another commit.
     * (Personally, I think it's better to revert a commit using git, which is also why atomics commits make this easier
     * since other unrelated files aren't changed.)
     */
    revert: "revert",
};

/**
 * Array of expected types of commits.
 * @type {Array<CommitType>}
 */
const expectedTypes = Object.values(commitType);

module.exports = {
    extends: ["@commitlint/config-conventional"],
    ignores: [
        /**
         * Ignore automatic release messages
         */
        (commit) => commit.includes("chore(release):"),
        /**
         * Ignore merge commits
         */
        (commit) => commit.includes("Merge "),
        /**
         * Ignore long message body lines caused by squash
         * merges with merge commits annotations
         */
        (commit) => commit.includes("(#") && commit.includes(")"),
    ],
    plugins: [
        {
            rules: {
                "custom-type-enum": (opts) => {
                    if (!expectedTypes.includes(opts.type)) {
                        return [
                            false,
                            `
                            Invalid commit type.
                            It must be one of the following: ${expectedTypes.toString()}.
                            Example: feat: add new feature.\n
                            `,
                        ];
                    }
                    return [true];
                },
            },
        },
    ],
    rules: {
        "custom-type-enum": [2, "always"],
    },
};
