const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader"
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'vacation.io',
      template: 'index.html'
    })
  ],

  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'build')
    },
    port: 8080,
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};