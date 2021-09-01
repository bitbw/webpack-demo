/** @format */

module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'warn',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'linebreak-style': [0, 'error', 'windows'],
  },
};
