const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtemlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
    clean:true
  },
  mode:"production",
  module: {
    rules: [
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
      }
    ]
  },
  plugins: [
    new EslintWebpackPlugin({
      context:path.resolve(__dirname,"../src")
    }),
    new HtemlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new MiniCssExtractPlugin({
      filename:"static/css/[contenthash].css"
    }),
    new CssMinimizerPlugin()
  ]
}