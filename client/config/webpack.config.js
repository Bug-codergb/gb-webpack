const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const GbWebpackPlugin = require("./gb-webpack-plugin")
const { VueLoaderPlugin } = require('vue-loader')
const HtmlTagsPlugin =require("html-webpack-tags-plugin");
const { envConfigPath } = require("./dotenv")
const DotenvWebpack = require('dotenv-webpack');

const CopyPlugin = require('copy-webpack-plugin');
const {
  appBuild,
  appSrc,
  appHtml
 } = require("./paths")
const { entries } = require("./aliases");

const pkg = require("../package.json");
const appInfo = {
  dependencies: Object.assign(pkg.dependencies,pkg.devDependencies),
}
const rootPath = process.cwd();

module.exports = function (env) {
  const isDevelopment = env === "development";
  const isProduction = env === "production";
  return {
    entry: appSrc,
    output: {
      path: appBuild,
      filename: "static/js/[name].[contenthash:8].js",
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      clean: {
        keep: /dll\//, // 保留 'dll文件' 下的静态资源
      },
      publicPath:"/"
    },
    mode: 'development',
    devtool:'cheap-module-source-map',
    resolve:{
      alias:entries,
      extensions: ['.js', '.json', '.wasm'],
    },
    cache: {
       type: 'filesystem',
       allowCollectingMemory: true,
     },
    externals: {
      /*jquery: 'jQuery',*/
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
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
        title: "webpack-next",
        templateParameters: {
          host: process.env.SERVER_HOST,
          port: process.env.SERVER_PORT,
          version:pkg.version
        }
      }),
      new VueLoaderPlugin(),
      new GbWebpackPlugin(),
      isProduction && new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: path.resolve(process.cwd(),'build/dll/vue.manifest.json')
      }),
      isProduction && new HtmlTagsPlugin({
        append: false, // 在生成资源后插入
        publicPath: "/", // 使用公共路径
        tags: ["dll/vue.dll.js"] // 资源路径
      }),
      new DotenvWebpack({
        path: envConfigPath[process.env.CURRENT_ENV] // 根据环境配置文件路径
      }),
      new webpack.DefinePlugin({
        __APP_INFO__:JSON.stringify(appInfo)
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(rootPath, "./public/"),
            to: path.resolve(rootPath, "./build/"),
            toType:"dir",//"template",//template所有文件
            globOptions: {
              ignore: [
                "**/index.html"
              ]
            }
          },
          {
            from: path.resolve(rootPath, "./src/common"),
            to: path.resolve(rootPath, "./build/guobin"),
            toType:"dir",
          }
        ],
        
      }),
    ]
  }
}