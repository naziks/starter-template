const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require("fs");


let pages = fs.readdirSync('./src/pages')
    .filter(file => file.endsWith('.html'))
    .map(file => file.split('/').pop().split('.')[0]);

module.exports = {
    entry: './src/index.js',
    devServer: {
        hot: false,
        liveReload: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    module: {
        rules: [
            {test: /\.svg$/, use: 'svg-inline-loader'},
            {test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', "sass-loader"]},
            {test: /\.(js)$/, use: 'babel-loader'},
            {
                test: /\.(png|jpg|jpeg|gif|bmp)$/,
                loader: 'file-loader',
                // options: {
                //     name: '[name].[ext]',
                //     outputPath: 'images'
                // }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        ...pages.map(template => new HtmlWebpackPlugin({
            inject: true,
            template: `./src/pages/${template}.html`,
            filename: `${template}.html`,
        }))
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    watch: true
}