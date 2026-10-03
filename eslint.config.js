// @ts-check
const { defineConfig } = require('eslint/config');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-config-prettier');

module.exports = defineConfig(
  { ignores: ['dist/', 'out-tsc/', '.angular/', 'coverage/'] },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'gorilla', style: 'camelCase' },
      ],
      // Components are elements (`<gorilla-card>`) or attributes on native elements
      // (`<button gorilla-button>`), always kebab-case.
      '@angular-eslint/component-selector': [
        'error',
        { type: ['element', 'attribute'], prefix: 'gorilla', style: 'kebab-case' },
      ],
      // Typed APIs only (R-12 in docs/ERRORES-A-EVITAR.md).
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
  },
  // Leave formatting to Prettier.
  prettier,
);
