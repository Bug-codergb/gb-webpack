module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    browser:true
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion:6
  },
  rules: {
    'no-var': 2,
    "no-undef":'off'
  }
}