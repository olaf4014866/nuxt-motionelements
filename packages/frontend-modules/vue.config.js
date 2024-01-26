// * TEST SERVER CONFIG ONLY

const path = require('path');
const webpack = require('webpack');

module.exports = {
  css: {
    extract: false, // for testing vue components
  },
  chainWebpack: config => config.resolve.alias.set('~', path.join(__dirname, './')),
  // ignore all css, scss, jpg, gif
  configureWebpack: (config) => {
    // config.plugins.push(
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     'window.jQuery': 'jquery',
    //     jquery: 'jquery',
    //     jQuery: 'jquery',
    //   }),
    // );
    config.module.rules.push(
      // { test: /(\.css|\.scss|\.jpg|\.gif)$/, loader: 'null-loader' },
      { test: /\.scss$/, use: ['null-loader'] },
      { test: /\.css$/, use: ['null-loader'] },
    );
  },
};
