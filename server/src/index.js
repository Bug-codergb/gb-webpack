const Koa = require('koa');
const path = require("path");
const KoaStatic = require('koa-static');
const static = KoaStatic(path.resolve(process.cwd(),"./static"));
const app = new Koa();

app.use(static); 
app.listen(8888, () => {
  console.log("服务启动")
})