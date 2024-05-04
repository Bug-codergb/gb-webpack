const webpack = require("webpack");
const { 
  rootPath,
  appSrc,
  appBuild
} = require("../config/paths");
let obj = {
  entry: appSrc,
  output: {
    filename: "bundle.js",
    path: appBuild,
    clean:true
  },
  mode:"production"
}
const compiler = webpack(obj);
compiler.run(() => {
  
})