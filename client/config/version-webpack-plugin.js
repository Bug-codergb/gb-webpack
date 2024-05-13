const fs = require('fs')
const path = require('path')
const { error } = require('./chalk')
class VersionWebpackPlugin {
  apply (compiler) {
    const rootPath = process.cwd()
    const pkg = require(`${rootPath}/package.json`)

    compiler.hooks.done.tap('VersionWebpackPlugin', () => {
      const rootPath = path.resolve(process.cwd(), './build')
      fs.access(rootPath, (err) => {
        if (!err) {
          fs.writeFile(
            path.resolve(rootPath, 'version.json'),
            `{"version":"${pkg.version}"}`,
            (err) => {
              error('1234')
              error(err.message)
            }
          )
        } else {
          fs.mkdir(rootPath, (err) => {
            if (!err) {
              fs.writeFile(
                path.resolve(rootPath, 'version.json'),
                `{"version":"${pkg.version}"}`,
                (err) => {
                  error(err.message)
                }
              )
            } else {

            }
          })
        }
      })
    })
  }
}
module.exports = VersionWebpackPlugin
