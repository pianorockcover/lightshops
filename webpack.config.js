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
const HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const templateName = "liteShops";

const defaultThemeName = "default";

module.exports = (_env, argv) => {
  const theme = argv.env.theme || defaultThemeName;
  const isDefaultTheme = theme === defaultThemeName;

  const packageJson = require("./package.json");
  const version = packageJson.version;

  const scriptName = "main.js";
  const versionedScriptName = `main-${version}.js`;

  const styleName = "style.css";
  const versionedStyleName = isDefaultTheme ? `style-${version}.css` : `style-${theme}-${version}.css`;

  const distPath = isDefaultTheme ? "dist" : `dist-${theme}`;

  const pagesPath = path.resolve(__dirname, "src");
  const pages = fs
    .readdirSync(pagesPath)
    .filter((fileName) => fileName.endsWith(".pug"));

  const themesPath = path.resolve(__dirname, "src/styles/themes");
  const themes = fs
    .readdirSync(themesPath)
    .filter((fileName) => fileName.endsWith(".less"))
    .map((themeName) => {
      const themeData = fs.readFileSync(path.resolve(themesPath, themeName), "utf-8");
      const primaryColor = /@primary: (.*?);/g.exec(themeData)[0]
        .replace("@primary: ", "")
        .replace(";", "");

      return ({
        name: themeName.replace(".less", ""),
        primaryColor,
      });
    });

  const getUtils = require("./src/views/utils");

  return ({
    entry: `./src/js/${scriptName}`,
    output: {
      filename: `./js/${versionedScriptName}`,
      path: path.resolve(__dirname, distPath),
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
                  modifyVars: {
                    theme,
                  }
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
      ...pages.reduce((allPages, cur) => {
        const themeSuffix = !isDefaultTheme ? `-${theme}` : "";

        allPages.push(
          new HtmlWebpackPlugin({
            template: `${pagesPath}/${cur}`,
            filename: `./${cur.replace(/\.pug/, `${themeSuffix}.html`)}`,
            minify: false,
            inject: false,
            utils: getUtils(theme),
            templateName,
            themes,
            theme,
          })
        );

        return allPages;
      }, []),
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
          { from: "static" },
          { from: "node_modules/bootstrap-icons/font/fonts", to: "css/fonts" },
        ],
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
          ]
        }
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
      contentBase: path.join(__dirname, distPath),
      port: 3034,
      host: "192.168.0.12",
    },
  });
}
