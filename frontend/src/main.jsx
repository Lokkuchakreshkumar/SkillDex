import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import Genmain from './components/ui/Generate.jsx/Genmain.jsx'
import Login from "./components/ui/Login.jsx"
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
  }
]
)

createRoot(document.getElementById('root')).render(
  <div>
   <RouterProvider router={Router}/>
  </div>,
)
