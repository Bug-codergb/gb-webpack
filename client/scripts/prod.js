const webpack = require('webpack')
const { checkVersion } = require('../config/check-version')
const factory = require('../config/webpack.config')
const config = factory('production')
const compiler = webpack(config)

checkVersion()
function build () {
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (stats.hasErrors() || stats.hasWarnings()) {
        const result = stats.toJson({
          all: false,
          errors: true,
          warnings: false
        })
        for (const item of result.errors) {
          console.log(item.message)
        }
        return reject()
      }
    })
  })
}
build().then(() => {

}).catch((e) => {
  process.exit(1)
})
