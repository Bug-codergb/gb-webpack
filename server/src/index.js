const Koa = require('koa');
const KoaRouter = require("koa-router")
const path = require("path");
const KoaStatic = require('koa-static');
const static = KoaStatic(path.resolve(process.cwd(),"./static"));
const app = new Koa();

app.use(static); 
const router = new KoaRouter();
app.use(router.routes());
router.get("/list", (ctx, next) => {
  ctx.body = {
    status: 200,
    data: [
      {
        text:"hello webpack"
      }
    ]
  }
})
app.listen(8888, () => {
  console.log("服务启动")
})