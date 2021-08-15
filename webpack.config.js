"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require("beautify-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const path = require("path");
const fs = require("fs");

const pagesPath = path.resolve(__dirname, "src");
const pages = fs
  .readdirSync(pagesPath)
  .filter((fileName) => fileName.endsWith(".pug"));

module.exports = {
  entry: "./src/js/main.js",
  output: {
    filename: "./js/main.js",
    path: path.resolve(__dirname, "dist"),
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
    ],
  },
  plugins: [
    ...pages.reduce((allPages, cur) => {
      allPages.push(
        ...[
          new HtmlWebpackPlugin({
            template: `${pagesPath}/${cur}`,
            filename: `./${cur.replace(/\.pug/, ".html")}`,
            minify: false,
            inject: false,
          }),
        ]
      );

      return allPages;
    }, []),
    new BeautifyHtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "static" },
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
      new UglifyJsPlugin(),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3030,
  },
};
