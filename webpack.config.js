"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require("beautify-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
        test: /\.(less)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
          }),
        ]
      );

      return allPages;
    }, []),
    new BeautifyHtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),
    new CopyWebpackPlugin({ patterns: [{ from: "static" }] }),
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
    ],
  },
};
