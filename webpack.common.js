const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // mode: 'development', // https://webpack.js.org/configuration/mode/
  // devtool: 'none', // Choose a style of source mapping to enhance the debugging process
  //                  // https://webpack.js.org/configuration/devtool
  entry: {
    main: './src/index.js', // Path to entry file
    vendors: './src/vendors.js',
  },
  output: {
    filename: '[name].[contentHash].bundle.js', // Add the content hash to filename to prevent browser caching
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader', // 3. Inject styles into DOM
          'css-loader',   // 2. Turn CSS into CommonJS
          'sass-loader',  // 1. Turn SASS into CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Training',
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(), // It cleans all files in dist directory when build
  ]
};
