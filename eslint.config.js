import * as tanstackQuery from '@tanstack/eslint-plugin-query';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default {
  files: ['**/*.{js,jsx}'],
  ignores: ['dist', 'craco.config.js', '.eslintrc.json'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    prettier: prettierPlugin,
    'unused-imports': unusedImports,
    '@tanstack/query': tanstackQuery,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    // React Refresh 권장 규칙

    // Prettier 규칙
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        singleQuote: true,
        semi: true,
      },
    ],

    // Unused imports 관련 규칙
    'unused-imports/no-unused-imports': 'error',
    'no-multiple-empty-lines': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
