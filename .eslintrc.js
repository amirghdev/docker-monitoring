module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // TypeScript Rules
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',

    // General ESLint Rules
    'no-console': 'warn', // Warn instead of error to allow debugging
    'no-shadow': 'error', // Disallow variable shadowing
    'no-return-await': 'error', // Prevent redundant return of awaited promises
    curly: ['error', 'all'], // Enforce consistent use of curly braces
    eqeqeq: ['error', 'always'], // Enforce strict equality
    'prettier/prettier': 'error', // Ensure Prettier formatting is enforced
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Allow `any` in test files
        '@typescript-eslint/explicit-function-return-type': 'off', // Allow flexible testing
      },
    },
  ],
};
