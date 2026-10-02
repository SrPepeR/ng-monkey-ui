// @ts-check
const tseslint = require('typescript-eslint');
const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'monkey',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'monkey',
          style: 'kebab-case',
        },
      ],
      // The library names its classes `Monkey*` without a `Component` suffix; it is part of the public API.
      '@angular-eslint/component-class-suffix': 'off',
      // Renaming the `on*` outputs breaks the public API: roadmap 17.7.
      '@angular-eslint/no-output-on-prefix': 'off',
      // Typing these values changes public signatures: roadmap 17 and 24.3.
      '@typescript-eslint/no-explicit-any': 'warn',
      // `MonkeyButtonData.action` gets a typed signature in roadmap 17.7 (R-12).
      '@typescript-eslint/no-unsafe-function-type': 'warn',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      // Keyboard and focus support changes component behaviour: roadmap 20.
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/mouse-events-have-key-events': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'warn',
    },
  },
);
