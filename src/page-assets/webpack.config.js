const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: ['./js/index.js']
    },
    output: {
        path: path.resolve(__dirname, '../../assets/js'),
        filename: '[name].js',
    },
    plugins: [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({filename: '../css/[name].css'}),
        // new HtmlWebpackPlugin(
        //     {
        //         inject: false,
        //         template: '!!raw-loader!' + path.resolve(__dirname, './views/index.ejs'),
        //         filename: '../../src/views/index.ejs'
        //     }
        // ),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            }
        ]
    },
    mode: "production"
};