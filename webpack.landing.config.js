"use strict";

const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require("beautify-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");

const packageJson = require("./package.json");
const version = packageJson.version;
const themeName = "expreessi";

const scriptName = "main.js";
const versionedScriptName = `main-${version}.js`;

const styleName = "style.css";
const versionedStyleName = `style-${version}.css`;


module.exports = {
    entry: `./landing/src/js/${scriptName}`,
    output: {
        filename: `./js/${versionedScriptName}`,
        path: path.resolve(__dirname, "landing/dist"),
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|png|svg|jpg)$/,
                use: {
                    loader: "url-loader",
                },
            },
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { url: false } },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                relativeUrls: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                loader: "pug-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./landing/src/index.pug",
            filename: "index.html",
            minify: false,
            inject: false,
        }),
        new HtmlReplaceWebpackPlugin([
            {
                pattern: scriptName,
                replacement: versionedScriptName,
            },
            {
                pattern: styleName,
                replacement: versionedStyleName,
            },
        ]),
        new BeautifyHtmlWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${versionedStyleName}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "static/css/fonts", to: "css/fonts" },
                { from: "landing/static" },
                { from: "node_modules/bootstrap-icons/font/fonts", to: "css/fonts" },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "landing/dist"),
        port: 3035,
    },
};
