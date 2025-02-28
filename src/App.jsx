import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {login,logout} from "./store/authSlice"
import authService from './appwrite/auth'
import  {Header}  from './components/index'
import {Footer} from './components/index'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
    const [loading,setLoading]  =useState(true)
    const dispatch=useDispatch()

    useEffect(()=>{

      authService.getcurrentuser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      }).finally(()=> setLoading(false))

    },[])

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className="w-full block">
        <Header/>
        <main>
         TODO: <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ): null
}

export default App
