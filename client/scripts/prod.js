const webpack = require('webpack')

const factory = require('../config/webpack.config')
const config = factory('production')
const compiler = webpack(config)
compiler.run((error, stats) => {
  // console.log(stats.hasErrors())
  // console.log(stats.hasWarnings())
  const result = stats.toJson({
    all: false,
    errors: true,
    warnings: false
  })

  if (stats.hasErrors() || stats.hasWarnings()) {
    console.log(result.errors)

    for (const item of result.errors) {
      console.log(item.message)
    }
    process.exit(1)
  }
})
