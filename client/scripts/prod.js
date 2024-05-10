const webpack = require('webpack')

const factory = require('../config/webpack.config')
const config = factory('production')
const compiler = webpack(config)
compiler.run((error, stats) => {
  // console.log(stats.hasErrors())
  // console.log(stats.hasWarnings())
  console.log(stats.toJson({
    assets: false,
    hash: false,
    errors: true,
    errorStack: false
  }))
})
