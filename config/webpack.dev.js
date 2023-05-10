const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtemlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: undefined
  },
  mode:"development",
  devServer: {
    host: "localhost",
    open: true,
    port:3000
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        //excludes: "node_modules",
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
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
      }
    ]
  },
  plugins: [
    new EslintWebpackPlugin({
      context:path.resolve(__dirname,"../src")
    }),
    new HtemlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    })
  ]
}