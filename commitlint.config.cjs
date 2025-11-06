const config = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "references-empty": [1, "never"],
        "footer-max-line-length": [0, "always"],
        "body-max-line-length": [0, "always"],
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "build",
                "ci",
                "chore",
                "revert",
            ],
        ],
        "header-max-length": [2, "always", 72],
    },
};

module.exports = config;