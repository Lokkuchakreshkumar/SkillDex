import React from 'react'
import Nav from '../ui/Nav.jsx'
import img from "../../assets/generated-image.png"

const Login = () => {
  return (
    <div className='bg-black  min-h-screen w-full flex justify-center items-center'>
      <Nav/>
      <div className='w-full flex flex-col-reverse  justify-center sm:flex-row items-center  h-full'>
            
                  <a href="http://localhost:8080/auth/google" className='p-4 text-sm text-wrap m-4 px-12 sm:w-[40%] w-[95%] sm:text-lg rounded-3xl h-[10%] text-slate-900 hover:shadow-lg hover:shadow-slate-800  transition duration-400 sora hover:animate-none  tracking-wider font-bold hover:-translate-y-0.5  google'>Continue with Google</a>
     
             
             <div  className='sm:w-[40%] w-[80%] flex justify-center items-center'>
               <img src={img} className='w-[80%]' alt="" />
             </div>
             
      </div>

    </div>
  )
}

export default Login 