import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import Genmain from './components/ui/Generate.jsx/Genmain.jsx'
import Login from "./components/ui/Login.jsx"
import Info from './components/ui/Info.jsx'
import Dashboard from './components/ui/Dashboard.jsx'
import Course from './components/ui/Courseview.jsx/Course.jsx'



let Router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },{
    path:'/gen',
    element:<Genmain/>
  },{
    path:'/auth',
    element:<Login/>
  },
  {
    path:'/info',
    element:<Info/>
  },{
    path:'/dashboard',
    element:<Dashboard/>
  },{
    path:'/courses/:id',
    element:<Course/>
  }
]
)

createRoot(document.getElementById('root')).render(
  <div>
   <RouterProvider router={Router}/>
  </div>,
)
