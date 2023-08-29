const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin")
const path = require("path");
module.exports = {
  entry: {
    main:"./src/index.js",
  },
  output: {
    path: path.resolve(__dirname,"dist"),
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[hash:10][ext][query]",
    clean:true
  },
  resolve: {
    extensions: ['.js', '.json', '.wasm'],
  },
  mode: "development",
  devServer: {
    port: 8888,
    open: true,
    hot:true
  },
  optimization: {
    mininizer: [
      new CssMinimizerWebpackPlugin()
    ],
    splitChunks: {
      chunks:"all"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins:['postcss-preset-env']
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins:['postcss-preset-env']
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(jpeg|png|gif|webpp|svg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize:10*1024
          }
        }
      },
      {
        test: /\.(woff2?|ttf)/,
        type:"asset/resource"
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression:false
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation:path.resolve(__dirname,"../node_modules/.cache/.eslintcache")
    }),
    new HtmlWebpackPlugin({
      title:"hello lina",
      template:path.resolve(__dirname,"./public/index.html")
    }),
    new CompressionWebpackPlugin(),
    new CopyWebpackPlugin()
  ]
}