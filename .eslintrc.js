module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    // 强制数组元素间出现换行
    "array-element-newline": ["error", "consistent"],
    // 在数组开括号后和闭括号前强制换行
    "array-bracket-newline": ["error", { multiline: true }],
    "no-console": "off",
  },
};
