module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? 'off' : 'off',
    'no-debugger': (['production', 'stage'].indexOf(process.env.NODE_ENV) >= 0) ? 'off' : 'off',
    // 'max-len': ['error', { 'code': 160 }],
    'max-len': 'off',
    'quote-props': 'off',
    'no-param-reassign': 'off',
    'no-shadow':'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'object-shorthand': 'off',
    'no-unneeded-ternary': 'off',
    'no-var': 'off',
    'vars-on-top': 'off',
    'consistent-return': 'off',
    'array-callback-return': 'off',
    'prefer-destructuring': 'off',
    'func-names': 'off',
    'import/no-cycle': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  'globals': {
    '$': true,
    'jQuery': true,
    'flowplayer': true,
    '_': true,
  },
}
