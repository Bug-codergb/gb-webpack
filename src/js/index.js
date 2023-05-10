const createElement = () => {
  const el = document.createElement("img");
  el.width = "200";
  el.src= require("../assets/anni.jpeg");
  document.body.appendChild(el);

  const i = document.createElement("i");
  i.className = "iconfont icon-thumbs-up";
  document.body.appendChild(i);
}
export {
  createElement
}