import React, { useState } from 'react'
import Navbar from './components/navbar.jsx'
import { Outlet, useLocation } from 'react-router-dom'
import HotelReg from './components/hotelreg.jsx'
import {Toaster} from  'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx'

function App() {
   const [open, setOpen] = useState(false);
  let OwnerPath = useLocation().pathname.includes('owner');
  let {showJetskiiReg} = useAppContext()
  return (
    <div>
      <Toaster></Toaster>
      {!OwnerPath && <Navbar></Navbar>}
      {showJetskiiReg && <JetskiiReg></JetskiiReg>}
    <div className="p-10">
      <button
        onClick={() => setOpen(true)}
        className="px-5 py-3 bg-blue-600 text-white rounded-lg"
      >
        Open Register Modal
      </button>

      {open && <HotelReg closeModal={() => setOpen(false)} />}
    </div>
      <Outlet></Outlet>
    </div>
  )
}

export default App