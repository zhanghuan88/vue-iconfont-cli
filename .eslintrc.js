module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint-config-airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // 强制数组元素间出现换行
    "array-element-newline": ["error", { multiline: true }],
    // 在数组开括号后和闭括号前强制换行
    "array-bracket-newline": ["error", { multiline: true }],
  },
};
