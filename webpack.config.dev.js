const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'none',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
    historyApiFallback: true, // Redirects all requests to index.html
    // https://github.com/webpack/docs/wiki/webpack-dev-server#the-historyapifallback-option
  }
});
