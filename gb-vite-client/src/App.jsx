import React, {
  memo, useState
} from 'react'
import About from '@/component/About'
const App = () => {
  const [counter, setCounter] = useState(0)
  const add = () => {
    setCounter(counter + 1)
  }
  return <div>
    {counter}
    <button onClick={() => add()}>点击+</button>
    <hr />
    <About/>
  </div>
}
export default memo(App)
