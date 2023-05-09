const createElement = () => {
  const el = document.createElement("img");
  el.width = "200";
  el.src= require("../assets/anni.jpeg");
  document.body.appendChild(el);
}
export {
  createElement
}