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
      // Add more loaders for other file types if needed
    ],
  },
  plugins: [
    new Dotenv(),
    // new webpack.DefinePlugin({
    //   'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    // })
    // ... other plugins
  ],
};