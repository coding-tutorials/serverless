const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  /*resolve: {
    extensions: ['*', '.js', '.jsx']
  },*/
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
   new HtmlWebpackPlugin({
     template: path.join(__dirname,'src','index.html')
   })
 ]
}
