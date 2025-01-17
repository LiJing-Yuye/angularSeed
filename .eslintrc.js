module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    angular: true,
  },
  rules: {
    // "indent": [
    //     "error",
    //     4
    // ],
    'no-console': 0,
    // "linebreak-style": [
    //     "warn",
    //     "unix"
    // ],
    quotes: ['error', 'single'],
    // "semi": [
    //     "error",
    //     "always"
    // ]
  },
}
