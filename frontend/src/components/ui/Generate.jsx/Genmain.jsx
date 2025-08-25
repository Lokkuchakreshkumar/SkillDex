import axios from "axios";
import { useEffect,useRef,useState } from "react";
import { useLocation } from "react-router-dom";
import { MdElectricalServices, MdKeyboardDoubleArrowUp } from "react-icons/md";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; 
import { HiMiniSparkles } from "react-icons/hi2";
import hljsCopy from "highlightjs-copy";
import Nav from '../Nav.jsx'
import { RxCross2 } from "react-icons/rx";
import Markdown from 'react-markdown'


const Genmain = () => {
  let URL = import.meta.env.VITE_URL
  let [msg,setMsg] = useState([]);
  let [one,setOne] = useState(true)
  let [chatinput,setChatinput] = useState('');
  let [selected,setSelected]=useState({})
  let [loading, setLoading] = useState(true);
  let [chat,setChat] = useState(false);
  let [content, setContent] = useState(0);
  let [click, setClick] = useState(0);
  let [moduleindex, setIndex] = useState(null);
  let [real, setReal] = useState("");
  let [mod,setModules] = useState("");
  const location = useLocation();
  const input = location.state?.input;
  let handleChatInput = (e)=>{
     setChatinput(e.target.value);
  }

 let handleChat = ()=>{
setChat(!chat);
 }
  let checkAnswer = (idx,lowidx,isCorrect)=>{
      setSelected((prev)=>({
        ...prev,[idx]:{lowidx,isCorrect}
      }))
      console.log(selected)
     }
 const bottomRef = useRef(null);
 useEffect(()=>{
  bottomRef.current?.scrollIntoView({behavior:"smooth"})
 })
 let handleCross = ()=>{
  setChat(!chat);
 }
   let handleQuiz = async(content)=>{
console.log(content)
let newdata = await axios.post(`${URL}/quiz`,{content:content},{withCredentials:true})
let realdata = newdata.data;
console.log('this came from backend:'+JSON.stringify(realdata))
setQuiz(realdata);
setSelected({});
     }
  useEffect(() => {
    const fetchdata = async () => {
     
      

      if (input) {
    
        let data = await axios.post(`${URL}/gen`, {
          input: input,
        },{withCredentials:true});
        
        let extracted = await data.data;
if(extracted.stop){
  return
}
        let moduled = Object.values(extracted.realmodules).flatMap((obj) => {
          return obj.topics.map((topic) => {
            const text = new DOMParser();
            console.log(topic);
            const parsed = text.parseFromString(topic, "text/html");
            let h2 = parsed.querySelector("h2")?.textContent;
            return {
              index: obj.index,
              heading: h2,
              data: topic,
            };
          });
        });
        let modules = extracted.real.map((obj, index) => {
          return {
            index: index,
            modulename: obj.module,
          };
        });
setModules(modules)
  
        console.log(`This is modules length: ${modules.length}`);

        let final = [];
        for (let i = 0; i < modules.length; i++) {
          final.push({
            index: i,
            modulename: modules[i].modulename,
            explanation: moduled.filter((obj) => obj.index === i),
          });
        }
        setReal(final);
        setContent(final[0].explanation[0]);
        setLoading(false);

      } else {
        console.log("no input came");
        return;
      }
    };
    fetchdata();
  }, [input]);
  let moduleClick = (index) => {
    let opened = index === moduleindex;
    setIndex(opened ? null : index);
     if(index==0 && one)
   {
     setClick(0)
  setOne(false);
   }
else
  setClick(null)
  };
  let conceptClick = (index,globeindex)=>{
   let data =  real[globeindex].explanation[index]
   setContent(data);
   setSelected({});
   setClick(index)
  }
  useEffect(()=>{
    let convert = ()=>{
      hljs.addPlugin(new hljsCopy())
     hljs.highlightAll(); 
 
    }

    convert();
  },[content]);
    let handleSubmit = async(e)=>{

    e.preventDefault();
    setMsg((prev)=>[...prev,{role:'user',msg:chatinput}])
 let data = await axios.post(`${URL}/chat`,{input:chatinput,context:JSON.stringify(mod),history:JSON.stringify(msg)});
 let realdata = await data.data;
  setChatinput('');
 console.log(`this is realdata:${JSON.stringify(realdata)}`)
 setMsg((prev)=>[...prev,{role:'ai',msg:realdata.answer}])

  }
  return (
    <div className="sm:flex w-full relative bg-[#0B0F14] sm:overflow-y-hidden min-h-screen sm:h-screen ">
      {
        chat && <div className="sm:w-[30%] space w-[90%]  transition flex flex-col bg-white/10 backdrop-blur-3xl border border-gray-700
 top-15 rounded-xl items-center justify-between m-4 h-200 sm:h-[90.1%] fixed z-100   ">
       <div  className="flex w-full  justify-end  p-4"><RxCross2 onClick={handleCross} className="inline text-xl text-white hover:cursor-pointer"/></div>
      <div className="overflow-y-auto flex flex-col w-full">
 {
        msg.map((msg)=>{
          return <div className={`p-4  [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:max-w-full [&_pre]:box-border mt-4 mb-4 mr-2 ml-3 [&_pre]:whitespace-pre-wrap [&_code]:break-words ${msg.role == 'user'?'bg-amber-400 text-black rounded-2xl px-4 py-2 self-end max-w-[70%]':'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl px-4 py-2 max-w-[70%] self-start'}`}><Markdown>{msg.msg}</Markdown></div>
        })
       }
       <div ref={bottomRef}></div>
      </div>
     
        <form action="" onSubmit={handleSubmit} className="flex min-w-0 w-full justify-center sm:flex-nowrap flex-wrap  items-center gap-x-2  p-2">
          <input name="" value={chatinput} onChange={handleChatInput} id=""  className="border mr-2 sm:w-[82%] w-[70%]   border-teal-700 bg-[#1b2738] text-white rounded-xl   p-4 resize-none outline-none "/>
          <button type="submit" className=" p-4  rounded-3xl hover:cursor-pointer mt-1 w-[20%] sm:w-[18%]  bg-linear-to-l whitespace-nowrap from-amber-700 to-yellow-400 flex justify-center items-center text-white">Ask</button>
        </form>
      
      </div>
      }
    
      {
        !loading &&<div className="group fixed top-24 left-4"> <div onClick={handleChat} className=" sm:w-16 hover:cursor-pointer w-12 h-12  sm:h-16  flex justify-center items-center  bg-linear-to-tr from-blue-400 to-teal-800   backdrop-blur-md rounded-full ">
<HiMiniSparkles className=" text-2xl inline"/>
        </div>
        <div className=" bg-black rounded-2xl p-3 text- text-white my-4   opacity-0 group-hover:opacity-100 left-4 transition">Chat with SkillDex AI</div>
        </div>
        
      }
      <Nav/>
      <div className="sm:w-[35%] w-full overflow-y-auto h-screen  rounded-xl flex flex-col py-24 bg-[#0E1219]  gap-y-4 sm:mt-24  ">
        {loading && (
          <div className="animate-pulse flex   mx-4 gap-y-4  flex-col sm:mt-24 ">
            <div className="h-3 bg-slate-800 w-full rounded-full"></div>
            <div className="h-4 bg-slate-800 w-full rounded-full"></div>
            <div className="h-3 w-[50%] bg-slate-800  rounded-full"></div>
            <div className="h-3 bg-slate-800 w-full rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
            <div className="h-3 w-[50%] bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
            <div className="h-3 w-[50%] bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
            <div className="h-3 bg-slate-800 rounded-full"></div>
          </div>
        )}
        {!loading && (
          <div className="text-white p-8 w-full ">
            <div className="text-3xl text-center w-full exo">
              Course Outline
            </div>
            <div className="mt-8 flex flex-col w-full py-12">
              {real.map((obj, globeindex) => {
                return (
                  <div className="flex flex-col w-full">
                    {" "}
                    <div
                      className={`flex w-full justify-between mt-2 hover:cursor-pointer text-[#EAEFFE] p-4 ${
                        globeindex == moduleindex
                          ? "p-4 text-center rounded-xl bg-[#221A39] hover:bg-[#171C2A] text-white"
                          : "bg-[#121621] rounded hover:bg-[#171C2A]"
                      }`}
                      key={globeindex}
                      onClick={() => moduleClick(globeindex)}
                    >
                      {obj.modulename}
                      <div
                        className={`${
                          globeindex === moduleindex ? "rotate-180 " : ""
                        }`}
                      >
                        <MdKeyboardDoubleArrowUp className="inline" />
                      </div>
                    </div>
                    {moduleindex == globeindex && (
                      <div>
                        {real[globeindex].explanation.map((obj, index) => {
                          return (
                            <div
                              className={`text-[#D8DFF0] border border-t-transparent border-r-transparent border-l-blue-400 hover:bg-[rgba(124,92,255,0.10)] hover:text-[#F0F3FB] border-b-[#1B2230] mt-2 p-4 rounded hover:cursor-pointer ${index == click?'bg-[rgba(124,92,255,0.24)] text-[#FFFFFF]':''}`}
                              key={index}
                              onClick={()=>conceptClick(index,globeindex)}
                            >
                              {obj.heading}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="sm:w-[65%] mt-24 overflow-y-auto exo p-4 sm:p-8 w-full duration-500 ">
        {loading && (
          <div className="animate-pulse flex  m-4 mx-8 gap-y-4  flex-col sm:mt-24 ">
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>

            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 w-[70%] bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>

            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 w-[70%] bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 w-[70%] bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 w-[70%] bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>

            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 w-[70%] bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 w-[70%] bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
            <div className="h-4 bg-slate-800 rounded-full"></div>
          </div>
        )}
        {!loading && (
          <div className="flex justify-center items-center text-lg p-4">
            <div
              dangerouslySetInnerHTML={{ __html: content.data }}
              className="text-white [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:max-w-full [&_pre]:box-border [&_pre]:whitespace-pre-wrap [&_code]:break-words"
            ></div>
             <div onClick={()=>handleQuiz(content.data)} className="p-4 hover:cursor bg-linear-to-r from-violet-600 to-blue-700 rounded-3xl">
              Generate quiz/New
            </div>
            <div>
              {
          
                 quiz.map((el,idx)=>{
                  return <div>
                    <div className="text-amber-500 my-4">{idx+1}.{el.question}</div>
                   {
                    el.options.map((el,lowidx)=>{
                      let Selected = selected[idx]
                      let lower = Selected?.lowidx === lowidx;
                      let Correct =  Selected?.isCorrect;
                      return <div className="flex">
                        
                        
                      
                        
                        <div  onClick={()=>checkAnswer(idx,lowidx,el.isCorrect)} className={`p-2 border border-blue-500 text-blue-800 rounded cursor-pointer m-2 ${lower?(Correct?'text-green-500':'text-red-800'):''}`} >{el.text}</div>
                      </div>
                    })
                   }
                  </div>
                 })
              }
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Genmain;
