const webpack = require('webpack')
const { checkVersion } = require('../config/check-version')
const factory = require('../config/webpack.config')
const config = factory('production')
const compiler = webpack(config)

checkVersion()
function build () {
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (stats.hasErrors()) {
        const result = stats.toJson({
          all: false,
          errors: true,
          warnings: true
        })
        for (const item of result.warnings) {
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
