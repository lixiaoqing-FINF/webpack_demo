const path = require('path'); //引入node的path模块
module.exports = {
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    }, //入口
    output: {
        path: path.resolve(__dirname, 'dist'), //生成dist的绝对路径
        filename: '[name].js'
    }, //出口
    module: {}, //模块
    plugins: [], //插件
    devServer: {} //服务
}