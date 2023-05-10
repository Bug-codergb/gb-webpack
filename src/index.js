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
}
console.log(a);
sum(1, 2, 3, 4);