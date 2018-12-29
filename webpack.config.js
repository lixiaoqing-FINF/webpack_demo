const glob = require('glob');
const path = require('path'); //引入node的path模块
//const uglify = require('uglifyjs-webpack-plugin'); //uglifyjs-webpack-plugin是webpack集成的插件，不需要在安装
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const purifycssPLugin = require('purifycss-webpack');
const website ={
    publicPath: 'http://localhost:1224/'
}
module.exports = {
    devtool: 'eval-source-map',  //开发工具 有四种方式，看项目大小决定
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
                    use: ["css-loader", "postcss-loader"]
                })
           },
           {
               test: /\.less$/,
            //    use: [
            //        {
            //            loader: 'style-loader'
            //        },
            //        {
            //            loader: 'css-loader',
            //        },
            //        {
            //            loader: 'less-loader'
            //        }
            //    ]
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader:'css-loader' 
                        },
                        {
                            loader:'less-loader' 
                        }
                    ]
                })
           },
           {
               test: /\.scss$/,
            //    use:[
            //        {
            //            loader: 'style-loader'
            //        },
            //        {
            //             loader: 'css-loader'
            //         },
            //         {
            //             loader: 'sass-loader'
            //         }
            //    ]
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
           },
           {
               test: /\.(png|jpg|gif)/,
               use: [
                   {
                        loader: 'url-loader',
                        options: {
                            limit: 300,
                            outputPath: 'images/' //图片打包到images文件夹中
                        }
                   }
               ]
           },
           {
               test: /\.(htm|html)$/i,
               use: ['html-withimg-loader'] //打包html里以img标签插入的图片
           },
           {
                test: /\.(jsx|js)/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
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
        new extractTextPlugin('css/index.css'), //这里的路经的是打包后的css的路径
        // new extractTextPlugin({ //本来想着分离多个css出来，没成想这样做分离出来的css文件名是引入css的那个js的文件名
        //     filename: (getPath) => {
        //         return getPath('css/[name].css').replace('css/js', 'css');
        //     },
        //     allChunks: true
        // })
        new purifycssPLugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        })

    ], //插件
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), //监听dist文件
        host: 'localhost', //建议写本机的ip地址
        compress: true, //服务端是否压缩
        port: 1224 //配置端口号（随便配）
    } //服务
}