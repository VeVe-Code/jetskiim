import React from 'react'
import { Link } from 'react-router-dom'

function jetskii({j}) {
  return (
  <div className="p-6 rounded-lg shadow bg-white hover:shadow-lg transition">
              <img
        src={j.images?.[0]}
        alt={j.title}
        className="w-full h-48 object-cover rounded"
      />
            <h3 className="mt-4 text-xl font-semibold">{j.time}</h3>
            <p className="text-gray-600 mt-2">
             {j.name}
            </p>
           <Link to={`/service/${j._id}`}>
            <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Book Now
            </button></Link>
          </div>
  )
}

export default jetskii