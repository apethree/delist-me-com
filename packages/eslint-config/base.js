/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/", "dist/", ".next/", "out/"],
  rules: {
    "prefer-const": "warn",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
