// import React from 'react'
// import { createApp } from 'vue'
// import { createRoot } from 'react-dom/client'
// import '@/assets/css/common.css'
// import App from './App.jsx'
// import VueApp from './Main.vue'
/* const root = createRoot(document.getElementById('root'))
root.render(<App />) */
// const app = createApp(VueApp)
// app.mount('#app')
const a = () => { console.log(1) }
new Promise((resolve) => {
  resolve(a)
}).then(() => {
  a()
})
