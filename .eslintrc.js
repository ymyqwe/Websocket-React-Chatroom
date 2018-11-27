module.exports = {
  parser: 'babel-eslint',
  extends: ['google', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  rules: {
    'no-console': 1,
    'react/prop-types': 0,
    'no-undef': 0
  }
};
