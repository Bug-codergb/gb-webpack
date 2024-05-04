const webpack = require("webpack");
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { 
  rootPath,
  appSrc,
  appBuild,
  appHtml
} = require("../config/paths");
let obj = {
  entry: appSrc,
  output: {
    filename: "bundle.js",
    path: appBuild,
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
const compiler = webpack(obj);
const devServer = new WebpackDevServer(
  {
    open: true,
    port: 3000 
  },
  compiler
)
devServer.startCallback(() => {
  console.log("服务启动")
})