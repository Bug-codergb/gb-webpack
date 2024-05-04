const webpack = require("webpack");
const WebpackDevServer = require('webpack-dev-server');
const factory = require("../config/webpack.config");
const {appHtml } = require("../config/paths")
const config = factory("development");

const compiler = webpack(config);
const devServer = new WebpackDevServer(
  {
    open: true,
    port: 3000,
    static: {
      directory: appHtml,
      publicPath:"/"
    }
  },
  compiler
)
devServer.startCallback(() => {
  console.log("服务启动")
})