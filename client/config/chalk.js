const chalk = require("chalk");
function error(msg) {
  console.log(chalk.red(msg))
}
function success(msg) {
  console.log(chalk.success(msg))
}
module.exports = {
  error,
  success
}