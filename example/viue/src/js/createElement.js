function createElement() {
  const div = document.createElement("div");
  div.innerHTML = "hello world";
  div.className = "content";
  document.body.appendChild(div);
}
export {
  createElement
}