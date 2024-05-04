const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  appBuild,
  appSrc,
  appHtml
 } = require("./paths")
module.exports = function (env) {
  return {
    entry: appSrc,
    output: {
      path: appBuild,
      filename: "static/js/[name].[contenthash:8].js",
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      clean:true
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          include: [
            appSrc
          ],
          use: [
            {
              loader: "style-loader",
              options: {
                injectType:"autoStyleTag"
              }
            },
            {
              loader: "css-loader",
            },
            {
              loader:"less-loader"
            }
          ]
        },
        {
          test: /\.less$/,
          include: [
            appSrc
          ],
          use: [
            {
              loader: "style-loader",
              options: {
                injectType:"autoStyleTag"
              }
            },
            {
              loader: "css-loader",
            },
            {
              loader:"less-loader"
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          include: [
            appSrc
          ],
          use: [
            // 将 JS 字符串生成为 style 节点
            'style-loader',
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            // 将 Sass 编译成 CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
          type: 'asset/resource',
          exclude: /(node_modules|bower_components)/,
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: appHtml,
        title:"webpack-next"
      })
    ]
  }
}