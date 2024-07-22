const { toHaveFormValues } = require("@testing-library/jest-dom/dist/matchers");

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
    babelOptions: {
      presets: ["@babel/preset-react"]
    }
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/prop-types': 'off'
  },
  settings: {
    react: {
        version: 'detect',
    },
},
}
