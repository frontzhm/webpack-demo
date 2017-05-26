var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path'); // 引用node的path库
var config = {
	entry:['./app/index.js'],
	output:{
		path:path.resolve(__dirname,'dist'), // 指定编译后的源码位置./dist/bundle.js
		filename:'bundle.js'
	},

	module: {
	  rules: [
	      { 
	        test: /\.less$/, 
	        use: ['style-loader', 'css-loader', 'less-loader'],
	        include: path.resolve(__dirname, 'app') 
	      },
	      {
	        test:/\.pug$/,
	        exclude:/node_modules/,
	        use:{
	          loader:'pug-loader',
	        }
	      }
	  ]
	},
	plugins:[
		new HtmlWebpackPlugin({
		  title: 'hauhua is studying webpack',
		  template: path.resolve(__dirname, 'app/templates/index.pug'),
		  inject: 'body'
		})
	],
	
}

module.exports = config;
