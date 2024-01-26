module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  // extends: [
  //   'plugin:vue/essential',
  //   '@vue/airbnb',
  // ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2017,
  },
  overrides: [
    {
      files: [
        '**/tests/*.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
      rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'import/extensions': 'off',
        'max-len': 'off',
        'quote-props': 'off',
        'no-param-reassign': 'off',
        'no-shadow':'off',
        'import/no-unresolved': 'off',
        'object-shorthand': 'off',
        'no-unneeded-ternary': 'off',
        'no-var': 'off',
        'vars-on-top': 'off',
        'consistent-return': 'off',
        'array-callback-return': 'off',
        'prefer-destructuring': 'off',
        'func-names': 'off',
        'import/no-cycle': 'off',
        'import/no-extraneous-dependencies': 'off'
      },
    },
  ],
};
