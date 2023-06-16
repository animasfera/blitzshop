// module.exports = require("@blitzjs/next/eslint")

module.exports = {
  extends: ["./node_modules/@blitzjs/next/eslint"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
  },
}
