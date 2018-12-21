const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
console.log("AE", process.env.MIDDLEWARE_API_URL)
module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        include: path.join(__dirname, 'src', 'assets'),
        use: ['file-loader']
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, 'src', 'sass'),
        use: ['style-loader', 'css-loader', 'sass-loader']
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
   }),
   new webpack.DefinePlugin({
     'process.env': {
       'MIDDLEWARE_API_URL': JSON.stringify(process.env.MIDDLEWARE_API_URL),
       'PUSHER_KEY': JSON.stringify(process.env.TF_VAR_pusher_KEY)
     }
   })
 ]
}
