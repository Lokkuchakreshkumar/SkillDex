import React from "react";

const Scroll = () => {
   let array = ["Quantum Computing","Operating systems","Japanese","Java Script","HTML","React","Next.js","Java","Python","Human values"]
  return (
   
    <div className="flex mt-24 mb-30 whitespace-nowrap w-[78%] rounded-full border border-t-transparent border-b-transparent      overflow-x-hidden">
<div className="scroll flex scroll ">
 {
   array.map((item)=>{
   return   <div className=" rounded-3xl text-center jet text-black bg-linear-to-b inset-shadow-sm inset-shadow-slate-900 from-white to-[#4b4a4a] w-46 m-4 p-4">{item}</div>
   })
 }
  
 {
   array.map((item)=>{
   return    <div className=" w-46  p-4 m-4  jet rounded-3xl text-black  bg-linear-to-b inset-shadow-sm inset-shadow-slate-900 from-white to-[#4b4a4a] text-center ">{item}</div>
   })
 }
   </div>  
    </div>
  );
};

export default Scroll;
