const path = require('path')
const webpack = require('webpack')

const VersionWebpackPlugin = require('./version-webpack-plugin')

const { envConfigPath } = require('./dotenv')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlTagsPlugin = require('html-webpack-tags-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

const { appBuild, appSrc, appHtml } = require('./paths')
const { entries } = require('./aliases')

const pkg = require('../package.json')
const appInfo = {
  dependencies: Object.assign(pkg.dependencies, pkg.devDependencies)
}
const rootPath = process.cwd()

module.exports = function (env) {
  const isDevelopment = env === 'development'
  const isProduction = env === 'production'
  return {
    // target: ['browserslist'],
    stats: 'errors-warnings',
    bail: true,
    entry: appSrc,
    output: {
      path: appBuild,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'static/media/[name].[hash][ext]',
      clean: {
        keep: /dll\// // 保留 'dll文件' 下的静态资源
      },
      publicPath: '/'
    },
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'source-map' : false,
    resolve: {
      alias: entries,
      extensions: ['.js', '.json', '.wasm']
    },
    cache: {
      type: 'filesystem',
      allowCollectingMemory: true
    },
    externalsType: 'script',
    externals: {
      jquery: [
        'https://code.jquery.com/jquery-3.7.1.min.js',
        'jQuery'
      ]
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 5,
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              inline: 2
            },
            format: {
              comments: false
            }
          }
        })
      ],

      emitOnErrors: false// 出现错误时，是否输出打包资源
    },
    module: {
      rules: [
        {
          test:/\.(js|jsx|ts|tsx)$/,
          exclude:/node_modules/,
          use:[
            {
              loader:"babel-loader"
            }
          ]
        }
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          include: [appSrc],
          use: [
            {
              loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader
            },
            /* {
              loader: "style-loader",
              options: {
                injectType:"autoStyleTag"
              }
            }, */
            {
              loader: 'css-loader'
            },
            {
              loader:"postcss-loader"
            }
          ]
        },
        {
          test: /\.less$/,
          include: [appSrc],
          use: [
            /* {
              loader: "style-loader",
              options: {
                injectType:"autoStyleTag"
              }
            }, */
            {
              loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader:"postcss-loader"
            },
            {
              loader: 'less-loader'
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          include: [appSrc],
          use: [
            // 将 JS 字符串生成为 style 节点
            isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            'postcss-loader',
            // 将 Sass 编译成 CSS
            'sass-loader'
          ]
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
        title: 'webpack-next',
        templateParameters: {
          host: process.env.SERVER_HOST,
          port: isProduction ? process.env.SERVER_PORT : process.env.CLIENT_PORT,
          version: pkg.version,
          cur_env: process.env.NODE_ENV
        }
      }),
      new VueLoaderPlugin(),
      new VersionWebpackPlugin(),
      isProduction &&
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: path.resolve(process.cwd(), 'build/dll/vue.manifest.json')
        }),
      isProduction &&
        new HtmlTagsPlugin({
          append: false, // 在生成资源后插入
          publicPath: '/', // 使用公共路径
          tags: ['dll/vue.dll.js'] // 资源路径
        }),
      new DotenvWebpack({
        path: envConfigPath[process.env.CURRENT_ENV] // 根据环境配置文件路径
      }),
      new webpack.DefinePlugin({
        __APP_INFO__: JSON.stringify(appInfo)
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(rootPath, './public/'),
            to: path.resolve(rootPath, './build/'),
            toType: 'dir', // "template",//template所有文件
            globOptions: {
              ignore: ['**/index.html']
            }
          },
          {
            from: path.resolve(rootPath, './src/common'),
            to: path.resolve(rootPath, './build/guobin'),
            toType: 'dir'
          }
        ]
      }),
      new webpack.ProvidePlugin({
        moment: 'moment'
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
      new webpack.ProgressPlugin({
        modules: true,
        modulesCount: 5000,
        profile: false,
        dependencies: true,
        dependenciesCount: 10000,
        percentBy: null
      }),
      new ESLintPlugin({
        context: path.resolve(rootPath, './src'),
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        failOnError: true,
        emitError: true,
        fix: true,
        eslintPath: require.resolve('eslint')
      }),
      new StylelintPlugin({
        context: path.resolve(rootPath, './src'),
        fix: true
      })
    ]
  }
}
