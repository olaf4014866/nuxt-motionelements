import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const banner = `/**
 * motionelements/frontend-modules v${pkg.version}
 * (c) MotionElements ${new Date().getFullYear()}
 * * meUrl into deprecated, please change to meHelper
 * - siteUrl: handle internal ME url w/ lang.
 * - site: handle outside ME url w/ lang.
 * - defaultLang: helper for url lang setting.
 * - term: handle mediatypes name variation.
 */
`;

const babelConfig = () => ({
  babelrc: false,
  configFile: false, // not use project root vue babel setting
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 8,
          ie: 11,
          safari: '5.1',
        },
      },
    ],
  ],
});

export default [
  {
    input: './src/helper/index.js',
    output: [
      {
        name: 'meHelper',
        file: 'library/meHelper.js',
        format: 'umd',
        banner,
      },
      // {
      //   file: 'library/meHelper.cjs.js',
      //   format: 'cjs',
      // },
      // {
      //   file: 'library/meHelper.es.js',
      //   format: 'es',
      // },
    ],
    external: ['store'],
    plugins: [
      json(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      babel(babelConfig()),
    ],
  },
  {
    input: './src/helper/index.js',
    output: [
      {
        name: 'meHelper',
        file: 'library/meHelper.min.js',
        format: 'umd',
      },
      // {
      //   file: 'library/meHelper.cjs.min.js',
      //   format: 'cjs',
      // },
      // {
      //   file: 'library/meHelper.es.min.js',
      //   format: 'es',
      // },
    ],
    external: ['store'],
    plugins: [
      json(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      babel(babelConfig()),
      terser({
        compress: {
          drop_console: true,
        },
      }),
    ],
  },
];
