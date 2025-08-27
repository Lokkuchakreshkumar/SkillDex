import React, { useState } from "react";
import axios from "axios";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import image from "../../assets/Adobe Express - file (3).png"  
import { useNavigate } from "react-router-dom";
const Info = () => {
   let env = 'production'
   let URL;
   if(env == "production"){
     URL = import.meta.env.VITE_URL
   }else{
      URL = 'http://localhost:8080'
   }
  const [formData,setFormData] = useState({
    purpose:"1",
    learnStyle:"1",
    speed:"1",
    exampleType:"1",
    outcome:"1"
  })
  let handleChange = (e) =>{
    let {name,value} = e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }
  let navigate = useNavigate();
  let handleForm = async(e)=>{
    e.preventDefault();
    console.log(formData)
    let newdata = await axios.post(`${URL}/update`,formData,{withCredentials:true});
    let data =await newdata.data
    console.log(data)
    if(data.success){
      navigate('/')
    }
  }
  return (
    <div className="new min-h-screen w-full flex p-4 flex-col-reverse sm:flex-row justify-center items-center">
      <form
        action=""
        onSubmit={handleForm}
        className="bg-white/10 backdrop-blur-xl m-4 p-6 rounded-2xl shadow-xl border border-white/20 flex flex-col  sm:w-[55%] w-[95%]  "
      >
        <label htmlFor="purpose" className="mr-auto space font-bold text-gray-300 tracking-wide ">
          Why do you want to learn new Skills?
        </label>
        <div className="flex justify-between mt-2 mb-4   bg-black/80 rounded-2xl p-4">
        <select
          name="purpose"
          id="purpose"
          onChange={handleChange}
          className=" text-white w-full h-full outline-none appearance-none"
        >
          <option value="1" className=" bg-zinc-800 hover:bg-zinc-700 text-white
rounded-2xl">
            🚀 To build/create something
          </option>
          <option value="2" className=" bg-zinc-800 hover:bg-zinc-700 text-white
   rounded-2xl">
            🎯 For career or growth
          </option>
          <option value="3" className="bg-zinc-800 hover:bg-zinc-700 text-white
   rounded-2xl">
            🤔 Just exploring for fun
          </option>
          <option value="4" className=" bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            🔥 To master it deeply
          </option>
          
        </select>
        <span><MdKeyboardDoubleArrowDown className="inline text-white"/></span>
        </div>
        <label htmlFor="learnStyle" className="mr-auto space font-bold text-gray-300  tracking-wide  ">
          How do you prefer to learn?
        </label>
 <div className="flex justify-between bg-black/80 mt-2 mb-4 w-full rounded-2xl p-4">
        <select
          name="learnStyle"
          id="learnStyle"
          onChange={handleChange}
          className="text-white w-full h-full  outline-none appearance-none"
        >
          <option value="1" className="bg-zinc-800 hover:bg-zinc-900 text-white
 rounded-2xl">
            📖 Step-by-step explanations
          </option>
          <option value="2" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            ⚡ Quick tips & shortcuts
          </option>
          <option value="3" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            🛠️ Hands-on practice/projects
          </option>
          <option value="4" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            🎮 More Challenges/quizzes
          </option>
        </select>
         <span><MdKeyboardDoubleArrowDown className="inline text-white"/></span>
        </div>
        

        <label htmlFor="speedexampleType" className="mr-auto space font-bold text-gray-300  tracking-wide  ">
          How long should each module be?
        </label>
 <div className="flex justify-between bg-black/80 mt-2 mb-4 rounded-2xl p-4">
        <select
          name="speedexampleType"
          onChange={handleChange}
          id="speedexampleType"
          className="text-white w-full h-full  outline-none appearance-none"
        >
          <option value="1" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            ⏳ Short 
          </option>
          <option value="2" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            📖 Medium 
          </option>
          <option value="3" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            🧠 Deep dive 
          </option>
        </select>
         <span><MdKeyboardDoubleArrowDown className="inline text-white"/></span>
        </div>



          <label htmlFor="exampleType" className="mr-auto space font-bold text-gray-300  tracking-wide  ">
          What kind of examples connect with you best?
        </label>
 <div className="flex justify-between bg-black/80 mt-2 mb-4 rounded-2xl p-4">
        <select
          name="exampleType"
          id="exampleType"
          onChange={handleChange}
          className="text-white w-full h-full  outline-none appearance-none"
        >
          <option value="1" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            🌍 Real-world everyday situations
          </option>
          <option value="2" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            📊 Data/numbers/facts
          </option>
          <option value="3" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
           🎨 Creative/visual analogies
          </option>
          <option value="3" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
           🎮 Interactive/gamified examples
          </option>
        </select>
         <span><MdKeyboardDoubleArrowDown className="inline text-white"/></span>
        </div>
        


          <label htmlFor="outcome" className="mr-auto space font-bold text-gray-300  tracking-wide  ">
          What outcome do you expect from learning here?
        </label>
 <div className="flex justify-between bg-black/80 mt-2 mb-4 rounded-2xl p-4">
        <select
          name="outcome"
          id="outcome"
          onChange={handleChange}
          className="text-white w-full h-full  outline-none appearance-none"
        >
          <option value="1" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
            📦 Build practical things (apps, products, dishes, art, etc.)
          </option>
          <option value="2" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
           🧠 Gain strong knowledge/fundamentals
          </option>
          <option value="3" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
           🎓 Prepare for career/exams/interviews
          </option>
          <option value="3" className="bg-zinc-800 hover:bg-zinc-700 text-white
 rounded-2xl">
          🌟 Explore & enjoy the journey
          </option>
        </select>
         <span><MdKeyboardDoubleArrowDown className="inline text-white"/></span>
        </div>
<div className="w-full flex justify-center">
  <button type="submit" className="mt-4 btn p-4 hover:cursor-pointer text-black font-bold exo rounded-3xl  w-[50%]">Submit</button>
        
</div>
      </form>
      <div className="sm:w-[40%] w-[80%] m-4 flex justify-center items-center">
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Info;
