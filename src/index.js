import "./css/style.css";
import "./less/style.less";
import "./scss/style.scss";
import "./font/iconfont/iconfont.css"
import {
  createElement
} from "./js/index.js";
createElement();

const a = 12;
const sum = (...rest) => {
  console.log("今天是个好日子");
  console.log(rest);
  return ()=>{};
}
console.log(a);
let fn = sum(1, 2, 3, 4);
fn();
//对于js模块需要特殊处理
if (module.hot) {
  module.hot.accept("./js/index.js", function () {
    //这里接受一个函数，在文件./js/index.js发生改变时，会回调这里的函数
  })
}