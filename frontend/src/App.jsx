import './index.css'
import axios from 'axios'
import {useEffect,useState}from "react"
import { LineWave} from 'react-loader-spinner'

import Nav from './components/ui/Nav.jsx'
import Input from './components/ui/Input.jsx'
import Mid from './components/ui/Mid.jsx'
import Scroll from './components/ui/Scroll.jsx'
import Faq from './components/ui/Faq.jsx'
import Quote from './components/ui/Quote.jsx'
import Footer from './components/ui/Footer.jsx'
import { useNavigate } from 'react-router-dom'
const App = () => {
    let [loading,setLoading] = useState(true);
   let env = 'production'
   let URL;
   if(env == "production"){
     URL = import.meta.env.VITE_URL
   }else{
      URL = 'http://localhost:8080'
   }
  let navigate = useNavigate();
  useEffect(()=>{

    let fn = async()=>{
     const newdata = await axios.get(`${URL}/`,{withCredentials:true})
     const realdata = newdata.data;
     setLoading(!loading);
     console.log(`this is realdata: ${JSON.stringify(realdata)}`)
     if(realdata.user == null){
      navigate('/auth');
     }
     
     if(!realdata.user){
     navigate('/auth')
     }
     else if(!realdata.user.question_done){
     navigate('/info')
     }
     else{
      navigate('/')
     }
    }
    fn();
   
  },[])
  return (
<div>
      {
      !loading && 
  <div className='sweep w-full min-h-screen text-white'>
     <Nav/>
   <div className='pt-32 flex flex-col items-center   '>
    <div className='text-3xl  text-center sm:text-7xl p-4 space  tracking-tighter font-extrabold bg-clip-text text-transparent bg-linear-to-b from-white to-[#9c9a9a]'>Learn anything,Instantly</div>
   <div className='text-white/65 px-6 sm:text-lg text-sm text-center '>One tool. One path. All the clarity you’ve been missing.</div>
   <Input/>
   <Mid/>
   <div className='text-5xl mt-20 font-bold tracking-wider text-center bebas bg-clip-text text-transparent bg-linear-to-r from-white to-[#747373]'>Trending Courses</div>
   <Scroll/>
   <div className='text-5xl mt-20 font-bold text-center tracking-wider bebas bg-clip-text text-transparent bg-linear-to-r from-white to-[#747373]'>Frequently Asked Questions</div>
  <Faq/>
  <Quote/>
  <div className='border border-slate-500 w-[95%] mt-24'></div>
  <Footer/>
   </div>
  </div>
   

 
    }
    {
      loading && <div className='flex flex-col sweep justify-center items-center'>
         <div className='h-screen flex justify-center items-center'><LineWave
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
        /></div>
      </div>
    }
 
  </div>

  )
}

export default App