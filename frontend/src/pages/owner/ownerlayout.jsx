
import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/owner/sidebar"
import { useAppContext } from '../../context/AppContext';
import { useEffect } from 'react';


function ownerlayout() {
  // let {isOwner } = useAppContext
  // let navigate =useNavigate()
//   useEffect(()=>{
// if(!isOwner){
//   navigate('/')
// }
  // },[isOwner])
  return (
    <div className='flex h-screen'>
<Sidebar></Sidebar>
        <div className='w-5/6 '>
         <Outlet/>
        </div>
    </div>
  )
}

export default ownerlayout