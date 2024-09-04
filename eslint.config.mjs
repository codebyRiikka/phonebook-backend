import globals from "globals";
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", 
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest", 
    },
    rules: 
    {
      'indent': 
      [
        'error',
        2
      ],
      'linebreak-style': 
      [
        'error',
        'unix' 
      ],
      'quotes': 
      [
        'error',
        'single' 
      ],
      'semi': 
      [
        'error',
        'never' 
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error', 
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 'off',
    },
  },
  { 
    ignores: ["dist/**", "build/**"], 
  },
]
