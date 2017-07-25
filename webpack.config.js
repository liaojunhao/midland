//一个常见的Webpack配置文件
var path = require('path');
var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    //打包的入口文件  String|Object
    entry: __dirname + "./src/main.js",
    //配置打包结果
    output: {
        //定义输出文件路径
        path: __dirname + "/views/About",
        //指定打包文件名称
        filename: "[name]-[hash].js"
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            }
        ]
    },
    resolve: {
        //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
        extensions: ["",".js",".css",".json"],
        //配置别名可以加快webpack查找模块的速度
        //alias:{
        //    'jquery': jqueryPath
        //}
    },
    //调用插件
    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],
    //启动本地服务器
    devServer: {
        contentBase: "./views/About",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }


}