function createElement (tag, props = {}, children = []) {
  const el = document.createElement(tag)
  const { style, className } = props
  if (style) {
    for (const key in style) {
      el.style[key] = style[key]
    }
  }
  for (const key in props) {
    if (/^on/.test(key)) {
      const eventName = key.slice(2).toLowerCase()
      el.addEventListener(eventName, props[key])
    }
  }
  el.className = className || ''
  if (children && children.length !== 0) {
    Array.from(children).forEach((child) => {
      if (child) {
        el.insertBefore(child, null)
      }
    })
  }
  return el
}
export { createElement }
