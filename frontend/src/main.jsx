import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import Genmain from './components/ui/Generate.jsx/Genmain.jsx'
let Router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },{
    path:'/gen',
    element:<Genmain/>
  }
]
)

createRoot(document.getElementById('root')).render(
  <div>
   <RouterProvider router={Router}/>
  </div>,
)
