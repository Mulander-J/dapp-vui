module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  globals: {
    Nullable: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['off', 'windows'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-explicit-this': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'prefer-promise-reject-errors': 0,
    'import/no-extraneous-dependencies': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'import/extensions': 0,
    'import/no-absolute-path': 0,
    'import/no-unresolved': 0,
    'no-eval': 0,
    'func-names': 0,
    'no-multi-assign': 0,
    'consistent-return': 0,
    'prefer-destructuring': 0,
    'no-unused-expressions': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'prefer-arrow-callback': 0,
    'no-return-assign': 0,
    'global-require': 0,
  },
}
