const path = require('path'); //引入node的path模块
//const uglify = require('uglifyjs-webpack-plugin'); //uglifyjs-webpack-plugin是webpack集成的插件，不需要在安装
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

const website ={
    publicPath: 'http://localhost:1224/'
}
module.exports = {
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    }, //入口
    output: {
        path: path.resolve(__dirname, 'dist'), //生成dist的绝对路径
        filename: '[name].js',
        publicPath: website.publicPath //主要作用就是处理静态文件路径的
    }, //出口
    module: {
        rules: [
           {
               test: /\.css$/,
               //use: ['style-loader', 'css-loader']
                use: extractTextPlugin.extract({  //用于css分离
                    fallback: "style-loader",
                    use: "css-loader"
                })
           },
           {
               test: /\.(png|jpg|gif)/,
               use: [
                   {
                        loader: 'url-loader',
                        options: {
                            limit: 300
                        }
                   }
               ]
           }
        ]
    }, //模块
    plugins: [
        //new uglify()
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true, //去掉属性的引号
            },
            hash: true, //防止缓存
            template: './src/index.html' //写相对路径
        }),
        new extractTextPlugin('/css/index.css') //这里的路经的是打包后的css的路径
    ], //插件
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), //监听dist文件
        host: 'localhost', //建议写本机的ip地址
        compress: true, //服务端是否压缩
        port: 1224 //配置端口号（随便配）
    } //服务
}