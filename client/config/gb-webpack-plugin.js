const fs = require("fs");
const path = require("path");
class GbWebpackPlugin {
  apply(compiler) {
    const rootPath = process.cwd();
    const pkg = require(`${rootPath}/package.json`);
    compiler.hooks.done.tap("GbWebpackPlugin", () => {
      const rootPath = path.resolve(process.cwd(), "./build");
      fs.access(rootPath, (err) => {
        if (!err) {
          fs.writeFile(
            path.resolve(rootPath, `version.json`),
            `{"version":"${pkg.version}"}`,
            (err) => {}
          );
        } else {
          fs.mkdir(rootPath, (err) => {
            fs.writeFile(
              path.resolve(rootPath, `version.json`),
              `{"version":"${pkg.version}"}`,
              (err) => {}
            );
          });
        }
      });
     
    });
  }
}
module.exports = GbWebpackPlugin;
