const webpack = require("webpack");
const factory = require("../config/webpack.config");
const config = factory("production");
const compiler = webpack(config);
compiler.run(() => {
  console.log("compiler run ...")
})
