const chalk = require('chalk')
function error (msg) {
  console.log(chalk.red(msg))
}
function success (msg) {
  console.log(chalk.green(msg))
}
function warning (msg) {
  console.log(chalk.yellow(msg))
  console.log('\n')
}
module.exports = {
  error,
  success,
  warning
}
