const { error } = require('./chalk')
function createProxy (proxy) {
  try {
    proxy = JSON.parse(proxy)
    const ret = []
    for (const item of proxy) {
      const prefix = item[0]
      const target = item[1]
      ret.push({
        context: [prefix],
        target,
        pathRewrite: { [`^${prefix}`]: '' },
        secure: false,
        changeOrigin: true
      })
    }

    return ret
  } catch (e) {
    error('env error : Error in JSON format conversion for PROXY.')
    process.exit()
  }
}
module.exports = {
  createProxy
}
