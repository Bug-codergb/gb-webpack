function createElement(shape,className="box") {
  const dom = document.createElement(shape);
  setStyle(dom, className);
  let text = document.createElement("span");
  text.innerHTML = "hello webpack";
  text.classList = ['label']
  dom.appendChild(text);
  document.body.appendChild(dom)
}
function setStyle(dom,className) {
  dom.className = className;
  dom.style.backgroundColor = "pink";
  dom.style.width = "200px";
  dom.style.height = "200px"
}
export {
  createElement
}