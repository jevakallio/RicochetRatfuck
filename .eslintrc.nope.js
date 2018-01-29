module.exports = {
  parser: 'babel-eslint',
  extends: ['formidable/configurations/es6-react', 'plugin:flowtype/recommended'],
  plugins: ['react', 'flowtype', 'prettier', 'flowtype-errors'],
  globals: {
    Promise: true,
    __DEV__: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js']
      },
      'babel-module': {
        cwd: 'babelrc',
        root: ['.'],
        alias: {
          Ancoria: './src',
          Alias: './assets'
        }
      }
    }
  },
  env: {
    node: true,
    jest: true
  },
  ecmaFeatures: {
    jsx: true,
    modules: true
  },
  rules: {
    'no-param-reassign': ['error', { props: true }],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_'
      }
    ],
    'no-magic-numbers': 'off',
    'no-invalid-this': 'off',
    'no-unused-expressions': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'new-cap': 'off',
    'func-style': 'off',
    'generator-star-spacing': 'off',
    'max-len': 'off',
    'comma-dangle': ['error', 'never'],
    'arrow-parens': 'off',
    eqeqeq: ['error', 'smart'],
    complexity: 'off',

    'filenames/match-regex': 'off',
    'filenames/match-exported': 'off',
    'filenames/no-index': 'off',
    'react/sort-comp': 'off',
    'react/jsx-handler-names': 'off',
    'react/jsx-wrap-multilines': 'off',
    'flowtype/require-valid-file-annotation': [2, 'always'],

    'no-use-before-define': 'off',

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100
      }
    ],

    'flowtype-errors/show-errors': 2,

    'import/no-unresolved': 'off'
  }
};
