import React from 'react'
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='flex justify-between w-[95%] items-center mt-4 mb-4'>
        <div className='text-white/50 exo text-2xl'>&copy;&nbsp;SkillDex</div>
        <a href='https://github.com/Lokkuchakreshkumar/SkillDex'  target='_blank'><FaGithub className='inline text-4xl mx-4 hover:cursor-pointer'/></a>

    </div>
  )
}

export default Footer