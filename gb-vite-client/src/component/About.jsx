import React, { memo } from 'react'
import img1 from '@/assets/img/1.jpeg?url'
import img2 from '@/assets/img/2.avif?url'
import { AboutWrapper } from './style'
const About = () => {
  return <AboutWrapper>
    这是一段关于的页面的描述
    <img src={img1} />
    <img src={img2} />
    <div className='app'></div>
  </AboutWrapper>
}
export default memo(About)
