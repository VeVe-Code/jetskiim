import React, { useEffect, useState } from 'react'
import Jetskiicard from '../components/jetskiicard'
import { Link } from 'react-router-dom'
import axios from 'axios'


function allservices() {
  let [jetskii, setjetskii] = useState([])
  useEffect(()=>{
    let fetchdata = async() => {
      let res = await axios.get('/api/jetskii')
      setjetskii (res.data)
      console.log(res.data)
    }
    fetchdata()
  },[])


  return (
    <section className="py-20 px-6 md:px-10 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Reserve Your Jet Car Today!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* CARD 1 */}
          {jetskii.map((j)=> (
              <div className="p-6 rounded-lg shadow bg-white hover:shadow-lg transition" key={j._id}>
                        <img
                          src={j.images?.[0]}
                          className="w-full h-48 rounded object-cover"
                        />
                        <h3 className="mt-4 text-xl font-semibold">{j.title}</h3>
                        <p className="text-gray-600 mt-2">
                         {j.description}
                        </p>
                       <Link to={`/service/${j._id}`}>
                        <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                          Book Now
                        </button></Link>
                      </div>
          )    )}

          
         
        </div>
      </section>

  )
}

export default allservices


