import React, { useState } from 'react'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const Faq = () => {
let [qone,setqone] = useState(false);
let [qtwo,setqtwo] = useState(false);
let [qthree,setqthree] = useState(false);
let [qfour,setqfour] = useState(false);
let [arrowone,setArrowone] = useState(false);
let [arrowtwo,setArrowtwo] = useState(false);
let [arrowthree,setArrowthree] = useState(false);
let [arrowfour,setArrowfour] = useState(false)
let arrowClickOne = (e)=>{
    setArrowone(!arrowone)
    setqone(!qone)
   
}
let arrowClickTwo = () =>{
  setArrowtwo(!arrowtwo);
  setqtwo(!qtwo);
}
let arrowClickthree = ()=>{
  setArrowthree(!arrowthree);
  setqthree(!qthree);
}
let arrowClickfour= ()=>{
  setArrowfour(!arrowfour);
  setqfour(!qfour);
}
  return (
    <div className='flex flex-col sora items-center justify-center w-full m-4 mt-12 mb-24'>
       <div className='flex flex-col items-center  justify-center sm:w-[45%] w-[90%] border-b p-4 border-slate-500'>
        <div onClick={arrowClickOne} className='flex w-full hover:cursor-pointer justify-between'>
           <div className='text-xl ' > How is the Learning Path generated?</div> <span className=' duration-500' id="one" >{arrowone && <MdKeyboardDoubleArrowUp className='inline ml-auto'/>}{!arrowone && <MdKeyboardDoubleArrowDown className='inline ml-auto'/>}</span>
           
        </div>
        {
            (arrowone && qone) ? <div className='text-sm py-8 text-white/40'>Our platform uses a powerful generative AI model to analyze your chosen topic. It breaks down the subject into logical modules and pages, creating a structured, comprehensive curriculum from introduction to advanced concepts, complete with quizzes.</div>:null
           }
           </div>
            <div className='flex flex-col items-center justify-center border-b p-4  sm:w-[45%] w-[90%] border-slate-500'>
         <div onClick={arrowClickTwo} className='flex w-full hover:cursor-pointer justify-between'>
           <div className='text-xl  ' > Is this Service Free?</div> <span className=' duration-500' id="one" >{arrowtwo && <MdKeyboardDoubleArrowUp className='inline ml-auto'/>}{!arrowtwo && <MdKeyboardDoubleArrowDown className='inline ml-auto'/>}</span>
           
        </div>
        {
            (arrowtwo && qtwo) ? <div className='text-sm py-8 text-white/40'>Yes, generating learning paths and exploring the content is completely free. We believe in making education accessible to everyone.</div>:null
           }
           </div>
              <div className='flex flex-col items-center justify-center  sm:w-[45%] w-[90%] border-b p-4 border-slate-500'>
             <div onClick={arrowClickthree} className='flex w-full hover:cursor-pointer justify-between'>
           <div className='text-xl ' > Can i save my progress?</div> <span className=' duration-500' id="one" >{arrowthree && <MdKeyboardDoubleArrowUp className='inline ml-auto'/>}{!arrowthree && <MdKeyboardDoubleArrowDown className='inline ml-auto'/>}</span>
           
        </div>
        {
            (arrowthree && qthree) ? <div className='text-sm py-8 text-white/40' >Currently, we don't support user accounts or saving progress. However, this feature is on our roadmap! For now, you can bookmark the page to return to your learning path.</div>:null
           }
           </div>
            <div className='flex flex-col items-center justify-center border-b  sm:w-[45%] w-[90%] p-4 border-slate-500'>
             <div onClick={arrowClickfour} className='flex w-full  hover:cursor-pointer justify-between'>
           <div className='text-xl ' >What topics can i learn about?</div> <span className=' duration-500' id="one" >{arrowfour && <MdKeyboardDoubleArrowUp className='inline ml-auto'/>}{!arrowfour && <MdKeyboardDoubleArrowDown className='inline ml-auto'/>}</span>
           
        </div>
        {
            (arrowfour && qfour) ? <div className='text-sm py-8 text-white/40'>You can learn about virtually any topic you can imagine, from programming languages and scientific theories to historical events and creative skills. Just type your topic into the search bar and see what the AI can create for you.</div>:null
           }
           </div>
    </div>
  )
}

export default Faq