module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser  
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin    
    'prettier',
  ],
  plugins: ['eslint-plugin-react'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs    
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // 0:"off", 1:"warn", 2:"error"    
    semi: 2,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-types': [
      2,
      {
        types: {
          Function: {
            message: 'Prefer a specific function type, like `() => void`.',
          },
        },
      },
    ],
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: { jsx: true, },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use    
    },
  },
}