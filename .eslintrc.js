/** @format */
module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'warn',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': [0, 'error', 'windows'],
  },
};
