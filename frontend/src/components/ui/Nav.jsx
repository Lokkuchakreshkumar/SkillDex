import { useState } from "react"
import logo from "../../assets/Adobe Express - file (1).png"
import { useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Nav = (addr) => {
  let [link,setLink] = useState('')
  let [profile,setProfile] = useState(false)
  let env = 'production'
  let URL;
  if(env == "production"){
    URL = import.meta.env.VITE_URL
  }else{
     URL = 'http://localhost:8080'
  }
  let navigate = useNavigate();
  useEffect(()=>{
    async function fn(){
   let data = await axios.get(`${URL}/`,{withCredentials:true})
  let realdata = data.data;
  if(realdata.user.profilePic){
    setLink(realdata.user.profilePic)
    setProfile(true);
    console.log(`this is link:${realdata.user.profilePic}`)
  }
    }
      fn()

  },[])
let handleClick = ()=>{
  navigate('/dashboard')
  
}
  return (
    <div className='fixed  top-0 h-15 w-[100%] bg-black/10 z-100 backdrop-blur-lg flex items-center'>

<div className="flex justify-between w-full  items-center">
  <div className="flex justify-center items-center">
  <div ><img src={logo} alt="" className="w-14 p-0 m-0"/></div><div className="exo tracking-wide text-xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-[#9d9b9b]">SkillDex
 
</div>
</div >
{
  profile && 
<div onClick={handleClick} className="flex items-center border border-yellow-400  hover:cursor-pointer    rounded-full sweep   mr-4">

 <img src={link} className="w-10 h-10 text-center border-3 border-amber-400  flex justify-center rounded-full" alt="pfp" />
   <div className="  text-white px-4 py-1  ">Dashboard</div>
</div>

}
</div>

    </div>
  )
}
export default Nav
