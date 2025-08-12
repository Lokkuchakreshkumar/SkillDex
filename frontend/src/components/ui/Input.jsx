import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Input = () => {
    let [input,setInput] = useState('');
    let navigate = useNavigate();
let handleInput = (e)=>{
    setInput(e.target.value)
}
let handleSubmit = (e)=>{
    e.preventDefault();
    console.log(input);
    navigate('/gen',{state:{input}});


}
    return (
    <div className='w-full flex items-center justify-center'>
        <div className='sm:w-[65%] w-[90%] mt-16 rounded-4xl h-15 flex items-center  bg-white/10 backdrop-blur-3xl'>
        <form onSubmit={handleSubmit} action="" className='h-full w-full flex  items-center'>
            <input type="text" onChange={handleInput} placeholder='HTML,CSS,JS,OOPS,GRAVITY Ask Anything' className='outline-none text-lg rounded-4xl placeholder:font-medium placeholder:text-sm placeholder:tracking-widest p-4 px-8 text-white font-bold h-full w-[78%] '/>
            <button className='sm:w-[20%] mr-2  bg-blue-600 h-[80%] rounded-3xl p-3 hover:cursor-pointer  hover:bg-linear-to-l hover:h-[85%] hover:rounded-xl hover:duration-300 exo text-xl from-blue-800 via-blue-700 to-blue-600'  type="submit">Generate </button>
            </form></div>
    </div>
  )
}

export default Input