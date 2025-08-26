import React, { useState,useEffect} from 'react'
import axios from "axios"
import Nav from "../ui/Nav.jsx"
import { LineWave} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  let env = 'production'
  let URL;
  if(env == "production"){
    URL = import.meta.env.VITE_URL
  }else{
     URL = 'http://localhost:8080'
  }
 
  let navigate = useNavigate();
  let [data,setData] = useState({});
  let [loading,setLoading]=useState(true);
let handleClick = (id)=>{
navigate(`/courses/${id}`)

}
let handleLogOut = async()=>{
  let newdata = await axios.get(`${URL}/logout`,{withCredentials:true});
  let realdata = newdata.data;
  if(realdata.logout){
  return  navigate('/auth')
  }
  console.log('logout failed')
}
  useEffect(()=>{
    async function fn(){
let first = await axios.get(`${URL}/`,{withCredentials:true})
  let result = first.data;
  setData(result.user);
  setLoading(false)
  console.log('this is result'+JSON.stringify(result));

    }
    fn()
  },[])
  return (
    <div className='new min-h-screen'>
      <Nav/>
{
  !loading &&  <div className='flex flex-col'>
         <div className='flex justify-between pt-24'>
   <div className='text-white text-xl m-2'>
Welcome <span className='text-cyan-600 ml-2 text-4xl mt-4'>{data.name} !</span>

       </div>
     <div onClick={handleLogOut} className='p-4 m-2 hover:cursor-pointer max-w-fit bg-linear-to-r from-black to-white/10 text-white exo rounded-xl hover:bg-linear-to-r hover:from-black hover:to-white/50'>Logout</div>
    </div>
   
       <div className='text-3xl text-white m-4 mt-8 justify-baseline'>
  Courses<span className='text-white/50 text-lg'>(click on any course to see)</span>
</div>
<div className='w-full flex flex-wrap items-center' >
  {
    data.courses?.map((el)=>{
      return <div onClick={()=>handleClick(el._id)} className=' bg-linear-to-b hover:cursor-pointer from-white to-[#4b4a4a] exo text-lg font-semibold w-fit p-8 m-4 rounded-xl ' name={el._id}>{el.name}</div>
    })
  }
</div>
</div>
  
}
  
  {
    loading &&   <div className='h-screen flex justify-center items-center'><LineWave
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="line-wave-loading"
  wrapperStyle={{}}
  firstLineColor=""
  middleLineColor=""
  lastLineColor=""
  /></div>
  }  </div>
  )
}

export default Dashboard