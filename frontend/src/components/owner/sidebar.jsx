import React from 'react'
import { UserButton } from "@clerk/clerk-react";
function sidebar() {
  return (
        <aside className="w-1/6   bg-gray-950 space-y-3 p-7 text-white">
      <div className="flex gap-10 items-center">
        <h1 className="font-bold text-2xl">LOGO</h1>
        <h1>Jet Skii</h1>
      </div>
            <UserButton />
      <h1 className="w-full bg-blue-300 py-5 text-center rounded">Dashboard</h1>
      <h1 className="w-full bg-blue-300 py-5 text-center rounded">Jetskiiservices</h1>
      <h1 className="w-full bg-blue-300 py-5 text-center rounded">Booking Lists</h1>
      <h1 className="w-full bg-blue-300 py-5 text-center rounded">Contact us</h1>

      
    </aside>
  )
}

export default sidebar


    