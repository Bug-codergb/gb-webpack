const path = require("path");
const rootPath = process.cwd();

const appSrc = path.resolve(rootPath, "./src");
const appBuild = path.resolve(rootPath, "./build");
const appHtml = path.resolve(rootPath,"./public/index.html")
module.exports = {
  rootPath,
  appSrc,
  appBuild,
  appHtml
}