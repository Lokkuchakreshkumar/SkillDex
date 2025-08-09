import logo from "../../assets/Adobe Express - file (1).png"
const Nav = () => {
  return (
    <div className='fixed top-0 h-15 w-[100%] bg-black/10 z-100 backdrop-blur-lg flex items-center'>
<div><img src={logo} alt="" className="w-14 p-0 m-0"/></div><div className="exo tracking-wide text-xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-[#9d9b9b]">SkillDex</div>
    </div>
  )
}

export default Nav
