const dotenv = require("dotenv");
const rootPath = process.cwd();
const path = require("path");
const envConfigPath = {
  development: path.resolve(rootPath, ".env.development"),
  production:path.resolve(rootPath,".env.production")
}
const envConfig = dotenv.config({
  path:envConfigPath[process.env.CURRENT_ENV]
})
module.exports = {
  dotenv,
  envConfig,
  envConfigPath
}