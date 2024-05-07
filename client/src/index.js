//import $ from 'jquery';
import App from "./vue/App.vue"
import axios from "axios";
import { createElement } from "./js/index";
import {createApp} from "vue";
import "./style/css/common.css";
import "./style/less/common.less";
import "./style/scss/common.sass"


createElement("div","container");
createElement("p","text");
console.log($(".box"))
const app = createApp(App);
app.mount("#app");
createElement("p", "text");
const btn = createElement("button", "btn", "点击发送网络请求");
btn.addEventListener("click", function () {
  axios({
    baseURL:"http://localhost:3000/api",
    method: "get",
    url: `/list`,
    params: {
      id:12
    }
  }).then((res) => {
    console.log(res.data);
  })
})
