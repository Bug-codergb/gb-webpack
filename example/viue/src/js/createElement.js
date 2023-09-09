function createElement() {
  const img = new Image();
  img.src = require("../assets/anni.jpeg");
  img.width = 200;
  const div = document.createElement("div");
  div.innerHTML = "hello world";
  div.className = "content";
  div.appendChild(img);
  document.body.appendChild(div);
}
//console.log(a);
console.log(13)
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(true)
  }, 1000);
}).then((data) => {
  console.log(data);
})
export {
  createElement
}