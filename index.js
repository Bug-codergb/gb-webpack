const path = require("path")
const fs = require("fs");
const sourcePath = path.resolve(process.cwd(), "./gb-webpack-client/build/");
const targetPath = path.resolve(process.cwd(), "./server/static/");
function deleteFile(folderPath, isRoot) {
  const dirs = fs.readdirSync(folderPath);
  if (dirs && dirs.length > 0) {
    fs.readdirSync(folderPath).forEach(file => {
      const curPath = path.resolve(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFile(curPath,false);
      } else {
        fs.unlinkSync(curPath);
      }
    })
  }
  (!isRoot)&&fs.rmdirSync(folderPath)
}
// 复制文件操作
function copyFile(sourcePath, targetPath){
  let rs = fs.createReadStream(sourcePath)
  let ws = fs.createWriteStream(targetPath)
  
  rs.pipe(ws)
}
function copyDir(sourceDir, targetDir){
  // 判断目标文件夹是否存在，不存在直接创建一个
  if(fs.existsSync(targetDir)){
      // 读取源文件夹中的文件
      fs.readdir(sourceDir, (err, files) => {
          if(err) {
              return 
          }
          files.forEach((file,index) => {
              // 获取到各个文件的路径
              let sourcePath = path.join(sourceDir, file)
              let targetPath = path.join(targetDir, file)
              
              fs.stat(sourcePath, (err, stats) => {
                  if(err) return
                  if(stats.isDirectory()){ // 判断是不是文件夹
                      fs.mkdir(targetPath, (terr) => {
                          if(terr) return
                          copyDir(sourcePath, targetPath)  // 递归处理
                      })
                  }else{
                      copyFile(sourcePath, targetPath) // 执行复制文件
                  }
              })
          })
      })
  }else{  
      fs.mkdir(targetDir, (err) => {
          if(err) return 
          copyFile(sourceDir, targetDir)
      })
  }
}

async function init() {
  try {
    fs.accessSync(sourcePath);
    fs.accessSync(targetPath);
    await deleteFile(targetPath, true);
    copyDir(sourcePath,targetPath)
  } catch (e) {
    console.log(e.message);
  }
}
init();
