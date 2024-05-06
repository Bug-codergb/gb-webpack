function createElement(shape,className="box",str="hello webpack") {
  const dom = document.createElement(shape);
  setStyle(dom, className);
  let text = document.createElement("span");
  text.innerHTML = str;
  text.classList = ['label']
  dom.appendChild(text);
  document.body.appendChild(dom)  
  return dom;
}
async function setStyle(dom,className) {
  dom.className = className;
  dom.style.backgroundColor = "pink";
  dom.style.width = "200px";
  dom.style.height = "200px";
  if (className === "text") {
    const src = await import("../assets/img/rose.jpeg");
    console.log(src)
    dom.style.backgroundImage = `url(${src.default})`;
    dom.style.backgroundSize = "contain";
    dom.style.backgroundRepeat = "no-repeat";
    dom.style.backgroundPosition = "center";
  }
  
}
export {
  createElement
}