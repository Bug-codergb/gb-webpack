const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin} = require("webpack");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/bundle.js",
    clean:true
  },
  mode:"development",
  devtool: "eval",//eval会通过eval函数，报错信息会现实
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    open: true,
    client: {
      progress: true,
    },
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/serve-public-path-url/',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader:"style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders:1
            }
          },
          {
            loader: "postcss-loader",
            /*options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer"),//这个插件也可以不写，postcss-preset-env 已经包含
                  require("postcss-preset-env")
                ]
              }
            }*/
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {loader:"less-loader"}
        ]
      },
      {
        test: /\.(png|jpe?g|gif)/,
        /*use: [
          {
            //loader: "file-loader" "url-loader",
            options: {
              name: "[name]-[hash:8].[ext]",
              limit:10*1024
            }
          }
        ]*/
        type: "asset",//"asset/resource",
        generator: {
          filename:"img/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize:10*1024
          }
        }
      },
      {
        test: /\.eot|ttf|woff2?$/,
        type: "asset/resource",
        generator: {
          filename:"font/[name].[hash:6][ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title:"gblina"
    }),
    new DefinePlugin({
      BASE_URL:`"./"`
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        }
      ]
    })
  ]
}