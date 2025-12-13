import React from 'react'
import Jetskiicard from '../components/jetskiicard'
import { Link } from 'react-router-dom'

function allservices() {
  let jetskii = [
  {
    _id: 1,
    name: "Jet Ski 1",
    time: "1hr",
    price: 150,
    image: "/05.jpg",
    images: ["/05.jpg", "/05b.jpg", "/05c.jpg", "/05d.jpg"],
  },
  {
    _id: 2,
    name: "Jet Ski 2",
    time: "2hr",
    price: 180,
    image: "8f.jpg",
    images: ["8f.jpg", "/8f-2.jpg", "/8f-3.jpg", "/8f-4.jpg"],
  },
  {
    _id: 3,
    name: "Jet Ski 3",
    time: "3hr",
    price: 200,
    image: "/3321_99.jpg",
    images: ["/3321_99.jpg", "/3321_99b.jpg", "/3321_99c.jpg", "/3321_99d.jpg"],
  },
];
  return (
    <section className="py-20 px-6 md:px-10 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Reserve Your Jet Car Today!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* CARD 1 */}
          {jetskii.map((j)=> (
              <div className="p-6 rounded-lg shadow bg-white hover:shadow-lg transition">
                        <img
                          src={j.image}
                          className="w-full h-48 rounded object-cover"
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
          )    )}

          
         
        </div>
      </section>

  )
}

export default allservices