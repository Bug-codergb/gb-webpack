const path = require('path')
const { warning } = require('./chalk')
function checkVersion () {
  const pkg = require(path.resolve(process.cwd(), './package.json'))
  const version = pkg.engines.node
  warning(`tip: The node version of the current project must ${version}`)
}
module.exports = {
  checkVersion
}
