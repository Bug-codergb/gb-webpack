const path = require("path");
const webpack = require("webpack");
const os = require("os");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtemlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { ProvidePlugin } = require("webpack");
const StylelintPlugin = require('stylelint-webpack-plugin');

const threads = os.cpus().length;
function getStyleLoader(prev){
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env"
          ]
        }
      }
    },
    prev
  ].filter(Boolean)
}

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/[contenthash].js",
    chunkFilename:"static/js/[name].[chunkhash:6].chunk.js",
    clean:true
  },
  externals: {
    lodash:"_"
  },
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel:threads
      }),
      new HtmlMinimizerPlugin()
    ]
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/i, //普通打包方式会将css形成的style标签插入html中，这样会形成闪屏的现象，需要将style通过link的形式插入性能会好
            //excludes: "node_modules",
            use: getStyleLoader()
          },
          {
            test: /\.less$/,
            use: getStyleLoader("less-loader")
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoader("sass-loader")
          },
          {
            test: /\.(jpe?g|png|gif|webp)/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize:10*1024 //超过这个配置就会转为base64
              }
            },
            generator: {
              filename:"static/img/[contenthash:10][ext]"
            }
          },
          {
            test: /\.(ttf|woff2?)/,
            type: "asset/resource",
            generator: {
              filename:"static/font/[contenthash:12][ext]"
            }
          },
          {
            test: /\.(jsx?|tsx?)/i,
            use: [
              {
                loader: "thread-loader",
                options: {
                  works:threads
                }
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true,
                  cacheCompression:false
                },
               
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      cache: true,
      cacheLocation:path.resolve(__filename,"../node_modules/.cache/eslintcache")
    }),
    new HtemlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new MiniCssExtractPlugin({
      filename:"static/css/[chunkhash].css"
    }),
    //压缩css
    new CssMinimizerPlugin(),
    new ProvidePlugin({
      axios:"axios"
    }),
    new CompressionPlugin(),//gzip压缩
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/jquery",
          to:"jquery"
        }
      ]
    }),
    new webpack.ProgressPlugin({})
  ]
}