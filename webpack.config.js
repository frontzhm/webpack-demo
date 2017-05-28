var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path'); // 引用node的path库


var config = {
  entry: [// 写在入口文件之前
    './app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'), // 指定编译后的源码位置./dist/bundle.js
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.less$/,
      // use: ['style-loader', 'css-loader', 'less-loader'],
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ['css-loader', 'less-loader']
      }),
      include: path.resolve(__dirname, 'app')
    }, {
      test: /\.pug$/,
      exclude: /node_modules/,
      use: {
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }]
    }]
  },
  devtool: 'cheap-module-source-map',

  devServer: {
    hot: true,
    clientLogLevel: "error", // 只显示错误信息
    contentBase: path.join(__dirname, 'dist'), // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
    port: 3000, // 端口号
    // publicPath: "/assets/",// 你的包现在可以通过 http://localhost:8080/assets/bundle.js,默认是/
    stats: "errors-only" //只显示控制台错误信息
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hauhua is studying webpack',
      template: path.resolve(__dirname, 'app/templates/index.pug'),
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css")

  ]

}
var isRelease = false;
if (isRelease) {
  config.plugins.push(
    new webpack.DefinePlugin({
      // 这里是暴露给第三方插件，让插件知道这是生产环境，从而会进行某些操作如删除注释
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: config.devtool && (config.devtool.indexOf("sourcemap") >= 0 || config.devtool.indexOf("source-map") >= 0)
    })

  )
}




module.exports = config;
// 生产-发布
