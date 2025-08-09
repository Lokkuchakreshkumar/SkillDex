import { PiStarFourFill } from "react-icons/pi";
import { IoBookSharp } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { LuDraftingCompass } from "react-icons/lu";
const Each = ({Title,p,icon}) => {
    let iconMap = {
        book:<IoBookSharp className="text-blue-500 text-center text-2xl"/>,
        star:<PiStarFourFill className="text-blue-500 text-center text-2xl"/>,
        tick:<SiTicktick className="text-blue-500 text-center text-2xl"/>,
        compass:<LuDraftingCompass className="text-blue-500 text-center text-2xl"/>


    }
    
  return (
    <div className="flex flex-col border sm:m-4 m-1 p-2 sm:w-[35%]  w-[80%] items-center backdrop-blur-lg rounded-xl hover:duration-300 hover:shadow-lg hover:shadow-black hover:scale-105 border-black/10 hover:bg-black/25 bg-white/10 ">
        <div className="   flex justify-center p-4    bg-blue-400/10  rounded-full">
            <div className="flex justify-center items-center">
                {iconMap[icon]}
            </div>
        </div>
        <div className="text-white mt-2 exo font-bold text-center text-xl">{Title}</div>
        <div className="text-sm mt-8 sora text-center  text-white/40">{p}</div>
    </div>
  )
}

export default Each