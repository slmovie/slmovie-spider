module.exports = {
  "env": {
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint-config-alloy/typescript",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      "space"
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    "no-array-constructor": [
      0,
    ],
    "no-loop-func": [
      0,
    ],
    "prefer-promise-reject-errors": [
      0,
    ],
    "no-throw-literal": [
      0,
    ]
  }
};