module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        jsxSingleQuote: false,
        bracketSpacing: false,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    indent: 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-curly-newline': 'off',
    'object-curly-newline': 'off',
    'object-curly-spacing': 'off',
    'react/destructuring-assignment': 'off',
    'operator-linebreak': 'off',
    'no-param-reassign': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'no-plusplus': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-one-expression-per-line': 'off',
    // 'react-hooks/exhaustive-deps': 'off',
  },
};
