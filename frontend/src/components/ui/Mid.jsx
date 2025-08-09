import React from 'react'
import Card from './Card.jsx'
import man from "../../assets/Adobe Express - file (2).png"


const Mid = () => {
  return (
    <div className="sm:flex  flex-wrap items-center justify-center  w-full  px-8 mt-10">
        <Card className="ml-8"/>
        <div className='flex justify-center sm:w-[50%]'>
          <img src={man} className='sm:w-[70%] ' alt="" />
        </div>
    </div>
  )
}

export default Mid