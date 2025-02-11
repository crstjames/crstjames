module.exports = {
  extends: ["next", "next/core-web-vitals"],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  settings: {
    next: {
      rootDir: ["./"],
    },
  },
};
