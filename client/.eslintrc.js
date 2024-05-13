module.exports = {
  env: {
    browser: true, // 浏览器运行，则可使用window , document 等变量
    es2021: true,
    node: true,
  },
  extends: [
    "standard",
    "plugin:prettier/recommended"
  ], // 规则， eslint:recommended推荐，eslint:all全部
  globals: {
    $: true, // false则说明全局变量不可以修改
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-debugger":"off",
    "no-var":"error",
  },
};
