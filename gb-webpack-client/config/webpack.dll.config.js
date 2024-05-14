const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    vue: ['vue']
  },
  mode: 'production',
  output: {
    filename: '[name].dll.js',
    path: path.resolve(process.cwd(), './build/dll'),
    library: '[name]_dll_[hash]',
    clean: {
      keep: /(index.html|version.json|static\/)/
    }
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll_[hash]',
      path: path.resolve(process.cwd(), 'build/dll', '[name].manifest.json')
    })
  ]
}
