const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // mode: 'development', // https://webpack.js.org/configuration/mode/
  // devtool: 'none', // Choose a style of source mapping to enhance the debugging process
  //                  // https://webpack.js.org/configuration/devtool
  entry: { // Path to entry file(s)
    vendors: './src/vendors.js',
    main: './src/index.js',
  },
  output: {
    filename: '[name].[contentHash].bundle.js', // Add the content hash to filename to prevent browser caching
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.hbs$/i,
        use: [{
          loader: 'handlebars-loader',
          options: {
            helperDirs: path.resolve(__dirname, "./components")
          }
        }],
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          // 'style-loader', // 3. Inject styles into DOM
          { // This plugin extracts the css to a separate file each
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',   // 2. Turn CSS into CommonJS
          'sass-loader',  // 1. Turn SASS into CSS
        ],
      },
      {
        test: /(jpg|jpeg|png|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img/',
            useRelativePath: true,
          }
        }]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Training',
      template: './src/index.hbs',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(), // It cleans all files in dist directory when build
  ]
};
