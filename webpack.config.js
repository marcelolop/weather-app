const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // or 'production'
  entry: './script/weather_app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new Dotenv({path:path.resolve(__dirname, './.env')}),
    new webpack.DefinePlugin({
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
      'process.env.APP_LOCATION': JSON.stringify(process.env.APP_LOCATION),
      'process.env.API_LOCATION': JSON.stringify(process.env.API_LOCATION),
      'process.env.OUTPUT_LOCATION': JSON.stringify(process.env.OUTPUT_LOCATION),
    }),
  ],
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify")
    }
  }
};