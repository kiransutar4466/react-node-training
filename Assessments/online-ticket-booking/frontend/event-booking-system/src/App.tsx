
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router/router'

import { ToastContainer } from 'react-toastify'



function App() {

 
  return (
    <>
         <ToastContainer />
         
  <RouterProvider router={router} />


    </>
  )
}

export default App
