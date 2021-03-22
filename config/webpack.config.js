const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: '/src/index.ts',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.resolve(__dirname, '../src/public/index.html')
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.(png|jpe?g|gif|woff2)$/i,
            use: ['file-loader'],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                // 将 JS 字符串生成为 style 节点
                "style-loader",
                // 将 CSS 转化成 CommonJS 模块
                "css-loader",
                // 将 Sass 编译成 CSS
                "sass-loader",
            ]
        },
        ],
    },
    resolve: {

        extensions: ['.tsx', '.ts', '.js', '.css'],
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_[hash].js',
    },
    devServer: {
        contentBase: '../dist',
        port:'8989'
    },
};
