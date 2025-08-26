import React, { useState,useEffect} from 'react'
import axios from "axios"
import Nav from "../ui/Nav.jsx"
import { LineWave} from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
  let URL = import.meta.env.VITE_URL
  let navigate = useNavigate();
  let [data,setData] = useState({});
  let [loading,setLoading]=useState(true);
let handleClick = (id)=>{
navigate(`/courses/${id}`)

}
let handleLogOut = async()=>{
  let newdata = await axios.get('/logout');
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
         <div className='flex justify-center pt-24'>
   <div className='text-white text-xl'>
Welcome <span className='text-cyan-600 ml-2 text-4xl mt-4'>{data.name} !</span>

       </div>
    
    </div>
    <div onClick={handleLogOut} className='p-4 min-w-fit bg-white text-black exo rounded-xl hover:bg-black hover:text-white'>Logout</div>
       <div className='text-3xl text-white m-4 mt-8 justify-baseline'>
  Courses(click on any course to see)
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