module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    browser:true
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion:6
  },
  rules: {
    'no-var':2
  }
}