require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base', // includes plugin:import
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],

    'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }], // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L139
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['.eslintrc.js', 'vite.config.ts'] }],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
        indent: 'off', // Replaced by vue/script-indent

        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/no-deprecated-slot-attribute': 'off', // Ionic uses Web Component slots
        'vue/multi-word-component-names': 'off',
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'lines-between-class-members': ['warn', 'always', { exceptAfterSingleLine: true }],
        'no-param-reassign': 'off', // TODO

        'import/prefer-default-export': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': { typescript: {} },
  },
}
