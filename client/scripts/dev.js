const webpack = require("webpack");
const WebpackDevServer = require('webpack-dev-server');
const factory = require("../config/webpack.config");
const {appHtml } = require("../config/paths")
const config = factory("development");
const { createProxy } = require("../config/createProxy");

const compiler = webpack(config);

console.log()
const devServer = new WebpackDevServer(
  {
    open: true,
    port: 3000,
    static: {
      directory: appHtml,
      publicPath:"/"
    },
    client: {
      overlay: false,
    },
    proxy: createProxy(process.env.PROXY)
  },
  compiler
)
devServer.startCallback((err) => {
  if (!err) {
    console.log("服务启动")
  } else {
    console.log(err);
  }
  
})